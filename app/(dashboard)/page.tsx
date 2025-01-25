import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { getWorkplaces } from "@/features/workspaces/queries";

import { WorkspaceRedirectClient } from "./client";

export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspaces = await getWorkplaces();
  if (workspaces.total === 0) {
    redirect("/workspaces/create");
  }

  return <WorkspaceRedirectClient workspaces={workspaces} />;
}
