import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProjectUpload } from '@/components/ui/project-upload';

function ProjectUploadModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-sm">
          Upload Project
        </Button>
      </DialogTrigger>
      <DialogContent className="md:h-screen-3/4 h-screen min-w-full overflow-scroll md:min-w-50">
        <DialogHeader>
          <DialogTitle>Upload Project</DialogTitle>
          <DialogDescription>
            Add and showcase your project to the community.
          </DialogDescription>
        </DialogHeader>
        <ProjectUpload />
      </DialogContent>
    </Dialog>
  );
}

export default ProjectUploadModal;
