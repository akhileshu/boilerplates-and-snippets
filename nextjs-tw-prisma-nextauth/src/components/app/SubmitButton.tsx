"use client";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";
import { Button, ButtonState } from "./button";

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonState & {
  text?: string;
  pendingText?: string;
  icon?: React.ReactNode;
  isPending: boolean;
  className?: string;
};

export default function SubmitButton({
  text,
  pendingText,
  icon,
  isPending,
  className = "",
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      {...props}
      type="submit"
      className={cn("", className)}
    >
      {isPending ? (
        <span className="flex gap-1 items-center">
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          {pendingText ?? null}
        </span>
      ) : (
        <span className="flex gap-1 items-center">
          {icon ?? null}
          {text ?? null}
        </span>
      )}
    </Button>
  );
}


