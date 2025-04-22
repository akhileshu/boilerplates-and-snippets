"use client";

import { useRef, useState } from "react";
import { useEasyMDE } from "./useEasyMDE";
import { useLiveMDX } from "./useLiveMDX";
import "easymde/dist/easymde.min.css";
import "github-markdown-css/github-markdown-light.css";

export default function MDXEditorPage() {
  const [input, setInput] = useState<string>(
    "## Hello MDX\n\nThis is **live preview**"
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEasyMDE({ ref: textareaRef, value: input, onChange: setInput });
  const { RenderedMDX } = useLiveMDX(input);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 min-h-screen">
      <textarea ref={textareaRef} className="max-h-96 overflow-auto" />
      <div className="prose max-w-none markdown-body border rounded-lg p-4 bg-white shadow-sm overflow-auto">
        <RenderedMDX />
      </div>
    </div>
  );
}
