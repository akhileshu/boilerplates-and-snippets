import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

export interface DialogComponentProps {
  trigger: React.ReactNode; // can be string or JSX
  triggerType?: "text" | "icon"; // optional, defaults to "text"
  children: React.ReactNode;
  dialogDetails: {
    title: string;
    description: string;
  };
  className?: string;
}

export const DialogComponent = forwardRef<
  HTMLButtonElement,
  DialogComponentProps
>(
  (
    { trigger,triggerType = "text", children, dialogDetails ,className}: DialogComponentProps,
    ref
  ) => {
    const { title, description } = dialogDetails;

    return (
      <Dialog>
        <DialogTrigger className={cn("",className)} asChild>
          {typeof trigger === "string" && triggerType === "text" ? (
            <button ref={ref} className="bg-blue-500 p-1 rounded-sm text-white">
              {trigger}
            </button>
          ) : triggerType === "icon" ? (
            <span
              ref={ref as any}
              className="border p-1 rounded-sm w-fit"
              title={title}
            >
              {trigger}
            </span>
          ) : (
            trigger
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button ref={ref} type="button">
                Close
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

DialogComponent.displayName = "DialogComponent";
