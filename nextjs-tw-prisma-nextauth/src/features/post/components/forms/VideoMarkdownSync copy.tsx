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

    //bug : inserted of start , end of highlight anotation for selected range is not accurate sometimes
//reason : before , selected , after are not accurate
    const before = content.slice(0, start);
    const selected = content.slice(start, end);
    const after = content.slice(end);

    const time = Math.floor(videoRef.current?.currentTime || 0);
    const wrapped = `<!-- @start=${time} -->\n${selected}\n<!-- @end=${time} -->`;

    const updated = `${before}${wrapped}${after}`;
    setContent(updated);

    setTimeout(() => {
      textarea.focus();
      const newPos = start + wrapped.length;
      textarea.selectionStart = textarea.selectionEnd = newPos;
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
