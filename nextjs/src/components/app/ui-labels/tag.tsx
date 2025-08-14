import React from "react";

interface TagProps {
  label: string;
  color?: "blue" | "green" | "red" | "yellow" | "gray";
  size?: "sm" | "md" | "lg";
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

const Tag: React.FC<TagProps> = ({
  label,
  color = "gray",
  size = "md",
  removable = false,
  onRemove,
  className = "",
}) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-gray-800",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={`inline-flex items-center ${sizeClasses[size]} ${colorClasses[color]} rounded-md font-medium ${className}`}
    >
      {label}
      {removable && (
        <button
          type="button"
          className="ml-1.5 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onRemove}
        >
          &times;
        </button>
      )}
    </span>
  );
};

export default Tag;
