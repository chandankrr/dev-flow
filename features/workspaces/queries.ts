import { Query } from "node-appwrite";

import type { Workspace } from "./types";

import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";

export const getWorkspace = async (workspaceId: string) => {
  const { databases } = await createSessionClient();

  const workspace = await databases.getDocument<Workspace>(
    DATABASE_ID,
    WORKSPACES_ID,
    workspaceId
  );

  return { data: workspace.name };
};

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

  const transformedDocuments = workspaces.documents.map((doc) => ({
    ...doc,
    name: doc.name,
    imageUrl: doc.imageUrl,
    inviteCode: doc.inviteCode,
    userId: doc.userId,
  })) as Workspace[];

  return { documents: transformedDocuments, total: workspaces.total };
};
