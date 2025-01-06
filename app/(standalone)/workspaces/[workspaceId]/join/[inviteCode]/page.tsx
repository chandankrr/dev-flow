import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import { getWorkplaceInfo } from "@/features/workspaces/queries";

interface WorkspaceIdJoinPageProps {
  params: Promise<{ workspaceId: string; inviteCode: string }>;
}

const WorkspaceIdJoinPage = async ({ params }: WorkspaceIdJoinPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const { workspaceId, inviteCode } = await params;

  const initialValue = await getWorkplaceInfo({ workspaceId });

  if (!initialValue) redirect("/");

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm
        initialValue={initialValue}
        inviteCode={inviteCode}
        workspaceId={workspaceId}
      />
    </div>
  );
};

export default WorkspaceIdJoinPage;
