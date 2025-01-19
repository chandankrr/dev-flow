"use client";

import { LoaderIcon } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};

export default LoadingPage;
