"use client";

import { DottedSeparater } from "@/components/dotted-separater";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import { TaskBreadcrumbs } from "@/features/tasks/components/task-breadcrumbs";
import { TaskDescription } from "@/features/tasks/components/task-description";
import { TaskOverview } from "@/features/tasks/components/task-overview";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";

export const TaskIdClient = () => {
  const taskId = useTaskId();

  const { data, isLoading } = useGetTask({ taskId });

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-210px)]">
        <PageLoader />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[calc(100vh-210px)]">
        <PageError message="Task not found" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <TaskBreadcrumbs project={data.project} task={data} />
      <DottedSeparater className="my-6" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TaskOverview task={data} />
        <TaskDescription task={data} />
      </div>
    </div>
  );
};
