import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { getWorkplace } from "@/features/workspaces/queries";

interface WorkspaceIdSettingsPageProps {
  params: Promise<{ workspaceId: string }>;
}

const WorkspaceIdSettingsPage = async ({
  params,
}: WorkspaceIdSettingsPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const { workspaceId } = await params;

  const initialValues = await getWorkplace({ workspaceId });

  if (!initialValues) redirect(`/workspaces/${workspaceId}`);

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdSettingsPage;
