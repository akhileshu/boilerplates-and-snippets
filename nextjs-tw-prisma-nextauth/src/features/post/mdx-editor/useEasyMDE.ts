import { useEffect } from "react";

/*

Error: document is not defined
Show 19 ignore-listed frame(s)
./node_modules/easymde/node_modules/codemirror/lib/codemirror.js

 Fix: Load EasyMDE only on client side
Wrap the import and usage of EasyMDE inside useEffect or dynamically import it like this:

*/






export function useEasyMDE({
  ref,
  value,
  onChange,
}: {
  ref: React.RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (val: string) => void;
}) {
  useEffect(() => {
    if (!ref.current) return;

    let editor: any;

    import("easymde").then((mod) => {
      const EasyMDE = mod.default;
      const editor = new EasyMDE({
        element: ref.current,
        autofocus: true,
        placeholder: "Write some Markdown...",
        toolbar: [
          "bold",
          "italic",
          "strikethrough",
          "heading",
          "heading-smaller",
          "heading-bigger",
          "heading-1",
          "heading-2",
          "heading-3",
          "code",
          "quote",
          "unordered-list",
          "ordered-list",
          "clean-block",
          "link",
          "image",
          "table",
          "horizontal-rule",
          "preview",
          "side-by-side",
          "fullscreen",
          "guide",
          "undo",
          "redo",
          {
            name: "note",
            action(editor) {
              const cm = editor.codemirror;
              const selection = cm.getSelection();
              const output = `> **Note:** ${selection}`;
              cm.replaceSelection(output);
              cm.focus();
            },
            className: "fa fa-sticky-note",
            title: "Insert Note block",
          },
        ],
      });

      editor.codemirror.on("change", () => {
        onChange(editor.value());
      });
    });

    return () => {
      editor?.toTextArea();
    };
  }, [ref]);
}
