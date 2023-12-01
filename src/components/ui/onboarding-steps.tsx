'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import VideoRecorder from '@/components/video-recorder';
import { useAuth } from '@/hooks/user/auth';
import { isGithubUserValid } from '@/utils';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

export const devApplicationStatusesEnum = [
  'pending',
  'approved',
  'rejected',
] as const;

const devApplicationStatusesSchema = z.enum(devApplicationStatusesEnum);

export const devApplicationSchema = z.object({
  displayName: z.string().min(1).max(256),
  bio: z
    .string()
    .min(10, 'Bio must be at least 10 characters.')
    .max(300, 'Bio must be less than 300 characters.'),
  websiteUrl: z
    .string()
    .url('Please enter a valid URL.')
    .nullable()
    .default(null),
  gitHubUrl: z
    .string()
    .url('Please enter a valid URL.')
    .nullable()
    .default(null),
  twitterUsername: z.string().nullable().default(null),
  linkedInUrl: z
    .string()
    .url('Please enter a valid URL.')
    .nullable()
    .default(null),
  status: devApplicationStatusesSchema.default('pending'),
  userId: z.string(),
});

export type DevApplicationFormSubmitType = z.infer<typeof devApplicationSchema>;

const onboardingStepsSchema = z.object({
  displayName: z
    .string()
    .min(5, 'Display Name is required.')
    .max(30, 'Display Name must be less than 30 characters.'),
  githubUsername: z
    .string()
    .min(5, 'GitHub Username is required.')
    .max(50, 'GitHub Username must be less than 50 characters.'),
  portfolioLink: z
    .string()
    .transform((val) => {
      if (!val?.startsWith('https://')) {
        val = 'https://' + val;
      }
      return val;
    })
    .pipe(z.string().url('Please enter a valid Portfolio URL')),
  twitterUsername: z.string().min(5, 'Twitter Username is required.'),
  bio: devApplicationSchema.shape.bio,
});

type OnbaordingStepsValues = z.infer<typeof onboardingStepsSchema>;
type VerificationStepValues = 'fields' | 'video';

export function OnboardingSteps() {
  const [verificationStep, setVerificationStep] =
    useState<VerificationStepValues>('fields');

  const { session } = useAuth();
  const displayName = z
    .string()
    .catch('')
    .parse(session?.user.user_metadata?.name);
  const githubUsername = z
    .string()
    .catch('')
    .parse(session?.user.user_metadata?.user_name);

  const form = useForm<OnbaordingStepsValues>({
    resolver: zodResolver(onboardingStepsSchema),
    defaultValues: {
      displayName,
      githubUsername,
      portfolioLink: '',
      twitterUsername: '',
      bio: '',
    },
  });

  async function submitFields(data: OnbaordingStepsValues) {
    console.log(data);

    const validGithubUsername = githubUsername
      ? githubUsername
      : await isGithubUserValid(data.githubUsername);
    console.log(validGithubUsername);

    console.log('isValidGithubUsername', validGithubUsername);

    if (!validGithubUsername) {
      toast({
        title: 'Invalid GitHub Username',
        description: 'Please enter a valid GitHub username.',
        variant: 'destructive',
      });
    } else {
      setVerificationStep('video');
    }
  }

  console.log('githubUsername', githubUsername);
  return (
    <>
      {verificationStep === 'fields' && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitFields)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your display name" />
                  </FormControl>
                  <FormDescription>
                    Edit your user name if you want to change how it appears on
                    your profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your GitHub username"
                      disabled={githubUsername ? true : false}
                    />
                  </FormControl>
                  <FormDescription>
                    Your GitHub username is used to fetch your projects and
                    contributions.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="portfolioLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio Link</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your portfolio URL" />
                  </FormControl>
                  <FormDescription>
                    Your portfolio link is used to showcase your work on your
                    profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitterUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> X (Twitter) Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your Twitter Username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write a few words describing yourself and your work."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mb-4 flex w-full justify-center">
              <Button type="submit" className="w-full">
                Get Verfied
              </Button>
            </div>
          </form>
        </Form>
      )}

      {verificationStep === 'video' && (
        <>
          {/* <p className="text-center text-2xl font-bold text-white"> </p> */}
          <div className="mr-auto flex w-full items-center justify-start gap-3">
            <button
              onClick={() => setVerificationStep('fields')}
              className="flex items-center self-start"
            >
              <ChevronLeft />
              <span>Edit Form</span>
            </button>
            <p className="mx-auto text-center text-sm font-medium">
              Please record a short video introducing yourself and your work.
            </p>
          </div>

          <VideoRecorder />
        </>
      )}
    </>
  );
}
