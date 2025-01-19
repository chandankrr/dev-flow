"use client";

import { PencilIcon } from "lucide-react";
import Link from "next/link";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { TaskViewSwitcher } from "@/features/tasks/components/tast-view-switcher";

export const ProjectIdClient = () => {
  const projectId = useProjectId();

  const { data, isLoading } = useGetProject({ projectId });

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-210px)]">
        <PageLoader />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[calc(100vh-210px)]">
        <PageError message="Project not found" />s
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={data.name}
            image={data.imageUrl}
            className="size-8"
          />
          <p className="text-lg font-semibold">{data.name}</p>
        </div>
        <div>
          <Button variant="secondary" size="sm" asChild>
            <Link
              href={`/workspaces/${data.workspaceId}/projects/${data.$id}/settings`}
            >
              <PencilIcon className="mr-1 size-4" />
              Edit Project
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <TaskViewSwitcher hideProjectFilter />
      </div>
    </div>
  );
};
