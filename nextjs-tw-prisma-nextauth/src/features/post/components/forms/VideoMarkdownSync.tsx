import MDEditor from "@uiw/react-md-editor";
import { Dispatch, SetStateAction, useRef } from "react";

export default function VideoMarkdownSync({
  content,
  setContent,
}: {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null); // to access .textarea inside

  // ✅ Insert bookmark comment before current line

  function insertBookmark() {
    const textarea = editorRef.current?.textarea;
    if (!textarea) return;

    const time = Math.floor(videoRef.current?.currentTime || 0);
    const lines = content.split("\n");
    const cursor = textarea.selectionStart;

    let charCount = 0;
    let lineIndex = 0;
    for (; lineIndex < lines.length; lineIndex++) {
      charCount += lines[lineIndex].length + 1;
      if (charCount > cursor) break;
    }

    lines.splice(lineIndex, 0, `<!-- @bookmark=${time} -->`);
    const updated = lines.join("\n");
    setContent(updated);

    setTimeout(() => textarea.focus(), 0);
  }

  // ✅ Wrap selected text with highlight tags

  function insertHighlightWrap() {
    const textarea = editorRef.current?.textarea;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const time = Math.floor(videoRef.current?.currentTime || 0);
    const duration = 10;
    const endTime = time + duration;

    //bug : inserted of start , end of highlight anotation for selected range is not accurate sometimes
    //reason : before , selected , after are not accurate .

    /*
🔍 What’s happening:
When you already have annotations like:

<!-- @bookmark=20 -->
<!-- @highlight=10-20 -->
They add extra characters (invisible in rendered markdown), so when you select a portion of text after them, your indices (start, end) are off by the number of characters inserted earlier, causing misalignment.
*/

    //fix : always fetch fresh textarea content before slicing
    const fullText = editorRef.current?.textarea?.value || "";
    const selectedText = fullText.substring(start, end);

    const wrapped = `<!-- @highlight=${time}-${endTime} -->\n${selectedText}\n<!-- @end-highlight -->`;

    // Now inject exactly at current cursor position
    const updatedText =
      fullText.slice(0, start) + wrapped + fullText.slice(end);

    setContent(updatedText);

    // Set cursor right after inserted block
    setTimeout(() => {
      textarea.focus();
      const cursorPos = start + wrapped.length;
      textarea.selectionStart = textarea.selectionEnd = cursorPos;
    }, 0);
  }

  return (
    <div className="flex gap-4 p-4">
      {/* Video Panel */}
      <div className="w-1/2 space-y-2">
        <video
          ref={videoRef}
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          controls
          className="w-full rounded"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={insertBookmark}
            className="px-3 py-1 bg-yellow-400 rounded"
          >
            🔖 Insert Bookmark
          </button>
          <button
            type="button"
            onClick={insertHighlightWrap}
            className="px-3 py-1 bg-blue-400 text-white rounded"
          >
            🎯 Highlight Selection
          </button>
        </div>
      </div>

      {/* Markdown Editor */}
      <div className="w-1/2">
        <MDEditor
          value={content}
          onChange={(val) => setContent(val || "")}
          height="100vh"
          className="w-full"
          ref={editorRef}
        />
      </div>
    </div>
  );
}
