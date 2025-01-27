"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import type { Workspace } from "@/features/workspaces/types";

import {
  getLastWorkspaceId,
  setLastWorkspaceId,
} from "@/lib/workspace-storage";

interface WorkspaceRedirectClientProps {
  workspaces: {
    documents: Workspace[];
  };
}

export const WorkspaceRedirectClient = ({
  workspaces,
}: WorkspaceRedirectClientProps) => {
  const router = useRouter();

  useEffect(() => {
    const lastWorkspaceId = getLastWorkspaceId();
    if (
      lastWorkspaceId &&
      workspaces.documents.some(
        (workspace) => workspace.$id === lastWorkspaceId
      )
    ) {
      router.push(`/workspaces/${lastWorkspaceId}`);
    } else if (workspaces.documents.length > 0) {
      const fallbackWorkspaceId = workspaces.documents[0].$id;
      setLastWorkspaceId(fallbackWorkspaceId);
      router.push(`/workspaces/${fallbackWorkspaceId}`);
    }
  }, [workspaces, router]);

  return null;
};
