import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";

import { Project } from "./types";

export const getProject = async (projectId: string) => {
  const { databases } = await createSessionClient();

  const project = await databases.getDocument<Project>(
    DATABASE_ID,
    PROJECTS_ID,
    projectId
  );

  return {
    data: project.name,
  };
};
