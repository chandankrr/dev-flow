"use client";

import { LoaderIcon, PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useCallback } from "react";

import { DottedSeparater } from "@/components/dotted-separater";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useBulkUpdateTasks } from "../api/use-bulk-update-tasks";
import { useGetTasks } from "../api/use-get-tasks";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useTaskFilters } from "../hooks/use-task-filters";
import { TaskStatus } from "../types";
import { columns } from "./columns";
import { DataCalendar } from "./data-calendar";
import { DataFilters } from "./data-filters";
import { DataKanban } from "./data-kanban";
import { DataTable } from "./data-table";

interface TaskViewSwitcherProps {
  hideProjectFilter?: boolean;
  hideAssigneeFilter?: boolean;
  isMyTaskPage?: boolean;
}

export const TaskViewSwitcher = ({
  hideProjectFilter,
  hideAssigneeFilter,
  isMyTaskPage = false,
}: TaskViewSwitcherProps) => {
  const workspaceId = useWorkspaceId();
  const paramProjectId = useProjectId();

  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });
  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters();

  const { open } = useCreateTaskModal();

  const { data: workspace } = useGetWorkspace({ workspaceId });

  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId: paramProjectId || projectId,
    assigneeId: isMyTaskPage ? workspace?.memberId : assigneeId,
    status,
    dueDate,
  });

  const { mutate: bulkUpdate } = useBulkUpdateTasks();

  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdate({
        json: { tasks },
      });
    },
    [bulkUpdate]
  );

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="w-full flex-1 rounded-lg border"
    >
      <div className="flex h-full flex-col overflow-auto p-4">
        <div className="flex flex-col items-center justify-between gap-y-2 lg:flex-row">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger value="table" className="h-8 w-full lg:w-auto">
              Table
            </TabsTrigger>
            <TabsTrigger value="kanban" className="h-8 w-full lg:w-auto">
              Kanban
            </TabsTrigger>
            <TabsTrigger value="calendar" className="h-8 w-full lg:w-auto">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button size="sm" className="w-full lg:w-auto" onClick={open}>
            <PlusIcon className="mr-1 size-4" /> New
          </Button>
        </div>
        <DottedSeparater className="my-4" />
        <DataFilters
          hideProjectFilter={hideProjectFilter}
          hideAssigneeFilter={hideAssigneeFilter}
        />
        <DottedSeparater className="my-4" />
        {isLoadingTasks ? (
          <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-lg border">
            <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban
                data={tasks?.documents ?? []}
                onChange={onKanbanChange}
              />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              <DataCalendar data={tasks?.documents ?? []} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};
