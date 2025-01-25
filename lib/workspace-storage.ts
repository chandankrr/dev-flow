const LAST_WORKSPACE_KEY = "lastWorkspaceId";

export const getLastWorkspaceId = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LAST_WORKSPACE_KEY);
};

export const setLastWorkspaceId = (workspaceId: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_WORKSPACE_KEY, workspaceId);
};

export const clearLastWorkspaceId = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LAST_WORKSPACE_KEY);
};
