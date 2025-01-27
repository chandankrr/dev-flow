import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { getProject } from "@/features/projects/queries";

import { ProjectIdClient } from "./client";

interface ProjectIdPageProps {
  params: Promise<{ projectId: string }>;
}

export async function generateMetadata({ params }: ProjectIdPageProps) {
  const { projectId } = await params;
  const project = await getProject(projectId);

  return {
    title: `${project.data}`,
  };
}

const ProjectIdPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <ProjectIdClient />;
};

export default ProjectIdPage;
