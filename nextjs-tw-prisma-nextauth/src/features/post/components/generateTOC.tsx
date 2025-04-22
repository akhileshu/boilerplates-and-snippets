import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

function useGenerateTOC(content: string) {
  type TOCItem = {
    href: string;
    text: string | undefined;
    level: number;
  }[];

  const [TOC, setTOC] = useState<TOCItem>([]);

  function getTOC() {
    const previewElement = document.querySelector(
      ".w-md-editor-preview, .wmde-markdown"
    );
    // const isEditing = !!document.querySelector(".w-md-editor-preview");
    // const isViewing = !!document.querySelector(".wmde-markdown");
    if (!previewElement) return [];
    const headings = previewElement.querySelectorAll("a.anchor");
    const newTOC = Array.from(headings)
      .map((anchor) => {
        const href = anchor.getAttribute("href");
        if (!href) return null;
        const headingTag = anchor.parentElement?.tagName || "H1";
        const level = parseInt(headingTag.replace("H", ""), 10);

        return {
          href,
          text: anchor.parentElement?.innerText.replace("🔗", "").trim(),
          level,
        };
      })
      .filter((item) => item !== null);
    return newTOC;
  }

  useEffect(() => {
    setTOC(getTOC());
  }, [content]);

  return TOC;
}

export function TOC({ content, className }: { content: string; className?: string }) {
  const TOCItems = useGenerateTOC(content);

  return (
    <div className={cn("", className)}>
      <h3 className="text-lg font-bold mb-2">Table of Contents</h3>
      <ul>
        {TOCItems.map((item, idx) => (
          <li
            key={idx}
            style={{ marginLeft: `${(item.level - 1) * 16}px` }} // Indent based on heading level
            className="mb-1"
          >
            <a href={item.href} className="text-blue-500 hover:underline">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
