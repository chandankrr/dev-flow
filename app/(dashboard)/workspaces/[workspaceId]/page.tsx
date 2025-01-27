import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { getWorkspace } from "@/features/workspaces/queries";

import { WorkspaceIdClient } from "./client";

interface WorkspaceIdPageProps {
  params: Promise<{ workspaceId: string }>;
}

export async function generateMetadata({ params }: WorkspaceIdPageProps) {
  const { workspaceId } = await params;
  const workspace = await getWorkspace(workspaceId);

  return {
    title: `${workspace.data}`,
  };
}

const WorkspaceIdPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <WorkspaceIdClient />;
};

export default WorkspaceIdPage;
