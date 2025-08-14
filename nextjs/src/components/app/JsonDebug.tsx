"use client";

type JsonDebugProps = {
  data: any;
  label?: string;
};

export function JsonDebug({ data, label = "Raw Data" }: JsonDebugProps) {
  if (!data || process.env.NODE_ENV !== "development") return null;

  return (
    <details className="my-8">
      <summary className="text-sm font-medium text-gray-500 cursor-pointer">
        {label}
      </summary>
      <pre className="text-xs text-gray-600 mt-2 border rounded-sm p-4 bg-gray-50 overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </details>
  );
}
