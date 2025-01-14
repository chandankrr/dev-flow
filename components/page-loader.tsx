import { LoaderIcon } from "lucide-react";

export const PageLoader = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};
