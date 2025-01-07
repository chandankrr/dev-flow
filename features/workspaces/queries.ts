import { Query } from "node-appwrite";

import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";

import { getMember } from "../members/utils";
import { Workspace } from "./types";

export const getWorkplaces = async () => {
  const { account, databases } = await createSessionClient();

  const user = await account.get();

  const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
    Query.equal("userId", user.$id),
  ]);

  if (members.total === 0) {
    return { documents: [], total: 0 };
  }

  const workspaceIds = members.documents.map((member) => member.workspaceId);

  const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACES_ID, [
    Query.orderDesc("$createdAt"),
    Query.contains("$id", workspaceIds),
  ]);

  return workspaces;
};

interface GetWorkplaceProps {
  workspaceId: string;
}

export const getWorkplace = async ({ workspaceId }: GetWorkplaceProps) => {
  const { account, databases } = await createSessionClient();

  const user = await account.get();

  const members = await getMember({
    databases,
    userId: user.$id,
    workspaceId,
  });

  if (!members) {
    throw new Error("Unauthorized");
  }

  const workspace = await databases.getDocument<Workspace>(
    DATABASE_ID,
    WORKSPACES_ID,
    workspaceId
  );

  return workspace;
};

interface GetWorkplaceInfoProps {
  workspaceId: string;
}

export const getWorkplaceInfo = async ({
  workspaceId,
}: GetWorkplaceInfoProps) => {
  const { databases } = await createSessionClient();

  const workspace = await databases.getDocument<Workspace>(
    DATABASE_ID,
    WORKSPACES_ID,
    workspaceId
  );

  return { name: workspace.name };
};
