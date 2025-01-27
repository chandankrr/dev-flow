import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { getTask } from "@/features/tasks/queries";

import { TaskIdClient } from "./client";

interface TaskPageIdProps {
  params: Promise<{ taskId: string }>;
}

export async function generateMetadata({ params }: TaskPageIdProps) {
  const { taskId } = await params;
  const task = await getTask(taskId);

  return {
    title: `${task.data}`,
  };
}

const TaskPageId = async () => {
  const user = await getCurrent();
  if (!user) redirect("sign-in");

  return <TaskIdClient />;
};

export default TaskPageId;
