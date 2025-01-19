"use client";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { useProjectId } from "@/features/projects/hooks/use-project-id";

export const ProjectIdSettingsClient = () => {
  const projectId = useProjectId();

  const { data: initialValues, isLoading } = useGetProject({ projectId });

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-210px)] items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  if (!initialValues) {
    return (
      <div className="flex min-h-[calc(100vh-210px)] items-center justify-center">
        <PageError message="project not found" />
      </div>
    );
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={initialValues} />
    </div>
  );
};
