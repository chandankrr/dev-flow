"use client";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const WorkspaceIdSettingsClient = () => {
  const workspaceId = useWorkspaceId();

  const { data: initialValues, isLoading } = useGetWorkspace({ workspaceId });

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
        <PageError message="Workspace not found" />
      </div>
    );
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
};
