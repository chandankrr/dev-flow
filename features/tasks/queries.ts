import type { Task } from "./types";

import { DATABASE_ID, TASKS_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";

export const getTask = async (taskId: string) => {
  const { databases } = await createSessionClient();

  const task = await databases.getDocument<Task>(DATABASE_ID, TASKS_ID, taskId);

  return { data: task.name };
};
