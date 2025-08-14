import { cn } from "@/lib/utils";
import React from "react";

interface ChipProps {
  label: string;
  onRemove?: () => void;
  icon?: React.ReactNode;
  avatar?: string;
  color?: "primary" | "secondary" | "default";
  className?: string;
}

const Chip: React.FC<ChipProps> = ({
  label,
  onRemove,
  icon,
  avatar,
  color = "default",
  className = "",
}) => {
  const colorClasses = {
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-purple-100 text-purple-800",
    default: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={cn(
        `inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${colorClasses[color]}`,className
      )}
    >
      {avatar && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="w-4 h-4 rounded-full mr-2" src={avatar} alt="" />
      )}
      {icon && <span className="mr-1">{icon}</span>}
      {label}
      {onRemove && (
        <button
          type="button"
          className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onRemove}
        >
          &times;
        </button>
      )}
    </span>
  );
};

export default Chip;
