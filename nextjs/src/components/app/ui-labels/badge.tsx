import React from "react";

interface BadgeProps {
  count?: number;
  status?: "active" | "pending" | "inactive";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  children?: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  count,
  status,
  position = "top-right",
  children,
  className = "",
}) => {
  const positionClasses = {
    "top-right": "-top-2 -right-2",
    "top-left": "-top-2 -left-2",
    "bottom-right": "-bottom-2 -right-2",
    "bottom-left": "-bottom-2 -left-2",
  };

  const statusClasses = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    inactive: "bg-gray-100 text-gray-800",
  };

  if (count !== undefined) {
    return (
      <span className={`relative inline-flex ${className}`}>
        {children}
        <span
          className={`absolute ${positionClasses[position]} bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center`}
        >
          {count}
        </span>
      </span>
    );
  }

  if (status) {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]} ${className}`}
      >
        {children || status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }

  return null;
};

export default Badge;
