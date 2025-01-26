"use client";

import type React from "react";
import { useState } from "react";
import { ClipboardCopyIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { useMedia } from "react-use";

import { Button } from "./ui/button";
import { DottedSeparater } from "./dotted-separater";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface Credential {
  label: string;
  value: string;
}

const credentials: Credential[] = [
  { label: "Email", value: "testuser1@gmail.com" },
  { label: "Password", value: "qwerty123" },
];

export const TestCredentials = () => {
  const isDesktop = useMedia("(min-width: 1024px", true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy ");
    }
  };

  return (
    <div className="fixed right-0 top-1/2 flex -translate-y-1/2 transform items-center">
      {isOpen ? (
        <div className="bg- max-w-xs rounded-l-lg bg-white p-4 shadow">
          <button
            onClick={toggleOpen}
            className="absolute right-2 top-2 text-neutral-500 hover:text-neutral-700"
            aria-label="Close"
          >
            <XIcon size={20} />
          </button>
          <h2 className="text-lg font-semibold">Demo Credentials</h2>
          <DottedSeparater className="py-4" />
          {credentials.map((cred, index) => (
            <div key={index} className="mb-2">
              <Label className="mb-2 font-medium">{cred.label}:</Label>
              <div className="flex items-center">
                <Input
                  contentEditable={false}
                  type={`${cred.label === "Password" ? "password" : "text"}`}
                  readOnly
                  value={cred.value}
                  className="mr-2 text-muted-foreground"
                />
                <Button
                  variant="ghost"
                  onClick={() => copyToClipboard(cred.value)}
                  className="h-12"
                  aria-label={`Copy ${cred.label}`}
                >
                  <ClipboardCopyIcon className="size-5 text-blue-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Button
          variant="teritary"
          size={isDesktop ? "default" : "xs"}
          onClick={toggleOpen}
          className="right-2 origin-bottom-right -rotate-90 rounded-t-lg"
        >
          Show Demo Credentials
        </Button>
      )}
    </div>
  );
};
