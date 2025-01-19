"use client";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const WorkspaceIdJoinClient = () => {
  const workspaceId = useWorkspaceId();

  const { data: initialValue, isLoading } = useGetWorkspaceInfo({
    workspaceId,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-210px)] items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  if (!initialValue) {
    return (
      <div className="flex min-h-[calc(100vh-210px)] items-center justify-center">
        <PageError message="Workspace not found" />
      </div>
    );
  }

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValue={initialValue} />
    </div>
  );
};
