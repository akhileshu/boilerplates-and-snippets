import { cn } from "@/lib/utils";
import React from "react";

interface PillProps {
  label: string;
  color?: "blue" | "purple" | "green" | "red" | "gray";
  className?: string;
  onClick?: () => void;
}

const Pill: React.FC<PillProps> = ({
  label,
  color = "blue",
  className = "",
  onClick,
}) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        colorClasses[color],
        onClick && "cursor-pointer hover:opacity-80",
        className
      )}
      onClick={onClick}
    >
      {label}
    </span>
  );
};

export default Pill;
