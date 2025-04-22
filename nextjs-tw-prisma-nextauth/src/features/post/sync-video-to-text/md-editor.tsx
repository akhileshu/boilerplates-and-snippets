"use client";

import MDEditor from "@uiw/react-md-editor";
import { Dispatch, SetStateAction, useRef } from "react";
import { CopyPostLinkButton } from "./copy-post-link-btn";
import ToggleBookmarkForm from "./forms/BookmarkButton";
import { TOC } from "./generateTOC";

export default function MdEditor({
  content,
  setContent,
  isEditing,
  postId,
  postSlug,
}: {
  content: string;
  postId?: number;
  postSlug?: string;
  isEditing?: boolean;
  setContent?: Dispatch<SetStateAction<string>>;
}) {
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  function insertBookmark() {
    const textarea = editorRef.current?.textarea;
    if (!textarea) return;

    // const time = Math.floor(videoRef.current.getCurrentTime());
    const time = 10;
    const lines = content.split("\n");

    const cursor = textarea.selectionStart;

    // Find line number at cursor
    let charCount = 0;
    let lineIndex = 0;
    for (; lineIndex < lines.length; lineIndex++) {
      charCount += lines[lineIndex].length + 1; // +1 for newline
      if (charCount > cursor) break;
    }

    // Insert bookmark above the line
    lines.splice(lineIndex, 0, `<!-- @bookmark=${time} -->`);

    const updated = lines.join("\n");
    setContent(updated);

    setTimeout(() => {
      textarea.focus();
    }, 0);
  }


  function insertAtCursor(text: string) {
    const textarea = editorRef.current?.textarea;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = content.slice(0, start);
    const after = content.slice(end);

    const updated = `${before}${text}\n${after}`;
    setContent(updated);

    // reset cursor
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + text.length + 1;
    }, 0);
  }

  function insertHighlightWrap() {
    const textarea = editorRef.current?.textarea;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = content.slice(0, start);
    const selected = content.slice(start, end);
    const after = content.slice(end);

    // const time = Math.floor(videoRef.current.getCurrentTime());
    const time = 10;

    const wrapped = `<!-- @start=${time} -->\n${selected}\n<!-- @end=${time} -->`;

    const updated = `${before}${wrapped}${after}`;
    setContent(updated);

    // re-focus and move cursor after inserted section
    setTimeout(() => {
      textarea.focus();
      const newPos = start + wrapped.length;
      textarea.selectionStart = textarea.selectionEnd = newPos;
    }, 0);
  }
  // function insertBookmark() {
  //   // const time = Math.floor(videoRef.current.getCurrentTime());
  //   const time = 10;
  //   insertAtCursor(`<!-- @bookmark=${time} -->`);
  // }

  function insertHighlightStart() {
    // const time = Math.floor(videoRef.current.getCurrentTime());
    const time = 10;
    insertAtCursor(`<!-- @start=${time} -->`);
  }

  function insertHighlightEnd() {
    // const time = Math.floor(videoRef.current.getCurrentTime());
    const time = 10;
    insertAtCursor(`<!-- @end=${time} -->`);
  }

  return (
    <div className="flex">
      <div className="min-w-60">
        <TOC className="p-4" content={content} />
        <div className="flex gap-2">
          {!isEditing && postId ? (
            <>
              <ToggleBookmarkForm postId={postId} />{" "}
              <CopyPostLinkButton slug={postSlug ?? ""} />
            </>
          ) : null}
        </div>
      </div>
      {isEditing && setContent ? (
        <>
          <div className="flex gap-2 my-2">
            <button type="button" onClick={insertBookmark}>
              📍 Bookmark
            </button>
            <button type="button" onClick={insertHighlightStart}>
              🔽 Start Highlight
            </button>
            <button type="button" onClick={insertHighlightEnd}>
              🔼 End Highlight
            </button>
            <button type="button" onClick={insertHighlightWrap}>
              🎯 Highlight Selection
            </button>
          </div>
          <MDEditor
            value={content}
            onChange={(val) => {
              setContent(val || "");
            }}
            height={"100vh"}
            className="w-full"
            ref={editorRef}
          />
        </>
      ) : (
        <MDEditor.Markdown
          source={content}
          className="rounded-md p-3 pl-6"
          style={{ whiteSpace: "pre-wrap" }}
        />
      )}
    </div>
  );
}
