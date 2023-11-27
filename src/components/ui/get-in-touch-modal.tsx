'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { GetInTouch } from './get-in-touch';

type GetInTouchModalProps = {
  username?: string;
  text?: string;
  roundedFull?: boolean;
};

function GetInTouchModal({
  username,
  text,
  roundedFull,
}: GetInTouchModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant="brand" className={roundedFull ? '' : 'rounded-xl'}>
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-screen min-w-full overflow-scroll md:h-max md:min-w-50">
        <DialogHeader>
          <DialogTitle>Message {username}</DialogTitle>
        </DialogHeader>
        <GetInTouch setIsModalOpen={setIsModalOpen} />
      </DialogContent>
    </Dialog>
  );
}

export default GetInTouchModal;
