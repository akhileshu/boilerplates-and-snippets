"use client";

import { FieldError } from "@/components/app/form-and-inputs/__internal__/FieldError";
import React from "react";

interface LabeledFieldProps {
  label: string;
  infoText?: string;
  name: string;
  children: React.ReactNode;
  errors?: string[];
  isCheckbox?: boolean;
}

export function LabeledField({
  label,
  name,
  children,
  errors,
  infoText,
  isCheckbox = false,
}: LabeledFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      {isCheckbox ? (
        <label
          // htmlFor={name}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          {children}
          {label}
        </label>
      ) : (
        <>
          <label htmlFor={name} className="text-sm font-semibold text-gray-700">
            {label}
          </label>
          {infoText && <p className="text-xs text-gray-500">{infoText}</p>}
          {children}
        </>
      )}
      {errors && <FieldError errors={errors} />}
    </div>
  );
}
