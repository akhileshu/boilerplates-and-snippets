import { cn } from '@/lib/utils';
import React from 'react'

interface LabelProps {
  label: string;
  icon?: React.ReactNode;
  className?: string;
}
function Label({ label, icon, className }: LabelProps) {
  return (
    <h2 className={cn("flex gap-2 text-lg font-semibold text-gray-800 items-center", className)}>
      {icon}
      {label}
    </h2>
  );
}

export default Label