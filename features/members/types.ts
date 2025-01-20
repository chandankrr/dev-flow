import { Models } from "node-appwrite";

export type Member = Models.Document & {
  workspaceId: string;
  userId: string;
  role: MemberRole;
};

export enum MemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}
