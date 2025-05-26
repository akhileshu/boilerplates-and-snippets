import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type ButtonState = {
  tooltip?: string;
  disabled: boolean;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonState & {
    size?: "sm" | "md" | "lg";
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    fullWidth?: boolean;
  };

export function Button({
  size = "sm",
  leftIcon,
  rightIcon,
  className,
  fullWidth,
  children,
  ...props
}: ButtonProps) {
  const {disabled, tooltip}=props
  const button = (
    <button
      className={cn(
        "border cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] ",
        {
          "h-8 px-2 text-sm": size === "sm",
          "h-9 px-3 text-base": size === "md",
          "h-11 px-4 text-lg": size === "lg",
          "disabled:pointer-events-auto cursor-default":
            tooltip && disabled,
          "hover:text-cyan-500": !disabled,
        },
        fullWidth && "w-full",
        className
      )}
      onClick={disabled ? (e) => e.preventDefault() : props.onClick}
      {...props}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );

  return tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    button
  );
}
