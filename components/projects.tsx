"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiPlusCircleFill } from "react-icons/pi";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";

export const Projects = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();

  const { open } = useCreateProjectModal();
  const { data } = useGetProjects({ workspaceId });

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <PiPlusCircleFill
          onClick={open}
          className="size-5 cursor-pointer fill-neutral-500 text-white transition hover:opacity-75"
        />
      </div>
      {data?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
        const isActive = pathname === href;

        return (
          <Link key={project.$id} href={href}>
            <div
              className={cn(
                "trnasition flex cursor-pointer items-center gap-2.5 rounded-md p-2.5 text-neutral-500 hover:opacity-75",
                isActive && "bg-white text-primary shadow-sm hover:opacity-100"
              )}
            >
              <ProjectAvatar image={project.imageUrl} name={project.name} />
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
