import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, fullWidth = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "rounded-sm py-1 px-2 border border-blue-400 outline-none transition-all",
          "focus:border-2 focus:border-blue-400",
          fullWidth ? "w-full" : "w-sm",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
