import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";

export const metadata: Metadata = {
  title: "My Tasks",
};

const TaskPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className="flex h-full flex-col">
      <TaskViewSwitcher hideAssigneeFilter isMyTaskPage />
    </div>
  );
};

export default TaskPage;
