"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { DottedSeparater } from "@/components/dotted-separater";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";

interface JoinWorkspaceFormProps {
  initialValue: {
    name: string;
  };
}

export const JoinWorkspaceForm = ({ initialValue }: JoinWorkspaceFormProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const inviteCode = useInviteCode();

  const { mutate, isPending } = useJoinWorkspace();

  const onSubmit = () => {
    mutate(
      { param: { workspaceId }, json: { code: inviteCode } },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join Workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join <strong>{initialValue.name}</strong>{" "}
          workspace
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparater />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col items-center justify-between gap-2 lg:flex-row">
          <Button
            disabled={isPending}
            variant="secondary"
            size="lg"
            type="button"
            asChild
            className="w-full lg:w-fit"
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isPending}
            size="lg"
            className="w-full lg:w-fit"
            type="button"
          >
            Join Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
