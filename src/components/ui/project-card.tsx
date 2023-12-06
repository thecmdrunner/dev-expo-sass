'use client';

import { useAuth } from '@/hooks/user/auth';
import logClientEvent from '@/lib/analytics/posthog/client';
import { type getAllProjects } from '@/server/actions/projects';
import Image from 'next/image';

type ProjectCardProps = {
  projectId: number;
  projectName: string;
  creator: string;
  likes?: number;
} & Pick<Awaited<ReturnType<typeof getAllProjects>>[number], 'tags' | 'media'>;

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectId,
  projectName,
  creator,
  tags,
  media,
}) => {
  const { userId } = useAuth();
  const visibleTags = tags.slice(0, 3);

  return (
    <div
      onClick={() => {
        logClientEvent('click_project_card', {
          userId: userId ?? undefined,
          projectId: projectId.toString(),
          timestamp: Date.now(),
        });
      }}
      className="overflow-hidden rounded-md"
    >
      <div className="relative h-64 w-80 overflow-hidden rounded-md sm:h-56 sm:w-72">
        <Image
          // fill={true}
          width={1000}
          height={1000}
          src={
            (media?.[0]?.type === 'image' ? media?.[0]?.url : null) ??
            'https://images.unsplash.com/photo-1597484661973-ee6cd0b6482c?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt="demo"
          className="h-full w-full object-cover object-center transition-all duration-200 group-hover:brightness-105"
        />
      </div>

      <div className="flex items-center justify-between px-2 pb-2 pt-1.5">
        <div>
          <h2 className="h-6 w-full text-lg font-semibold">{projectName}</h2>
          <div className="mt-1 flex flex-col justify-between">
            <h3 className="text-left text-sm font-medium">{creator}</h3>
            <div className="mt-1.5 flex gap-1 text-center text-xs font-medium text-white">
              {visibleTags.map((tag) => {
                return (
                  <div
                    key={String(tag.id)}
                    className="rounded-md border border-brand-tertiary bg-[rgba(0,0,0,0.85)] px-2 py-1 text-xs text-brand-tertiary"
                  >
                    # {tag.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* {likes!==null && (
          <div>
            <span className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-2 py-1">
              <LucideTriangle size={12} className="fill-white" />
              {likes}
            </span>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ProjectCard;
