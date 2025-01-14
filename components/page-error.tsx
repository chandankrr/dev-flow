import { AlertTriangleIcon } from "lucide-react";

interface PageErrorProps {
  message: string;
}

export const PageError = ({ message }: PageErrorProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <AlertTriangleIcon className="mb-2 size-6 text-muted-foreground" />
      <p className="text-sm font-medium text-muted-foreground">{message}</p>
    </div>
  );
};
