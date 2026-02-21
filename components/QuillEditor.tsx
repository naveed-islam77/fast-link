"use client";

import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

interface CustomQuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CustomQuillEditor({
  value,
  onChange,
  placeholder = "Write specifications here...",
}: CustomQuillEditorProps) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<any>(null);
  const editorIdRef = useRef<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!editorContainerRef.current) return;

    const cleanup = () => {
      if (quillInstanceRef.current) {
        const toolbar = document.querySelector(".ql-toolbar");
        const container = editorContainerRef.current;

        if (container) {
          container.innerHTML = "";
        }

        if (toolbar && toolbar.parentNode) {
          toolbar.remove();
        }

        quillInstanceRef.current = null;
      }
    };

    const editorId = `quill-editor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    editorIdRef.current = editorId;

    const initQuill = async () => {
      try {
        cleanup();

        if (editorContainerRef.current) {
          editorContainerRef.current.innerHTML = "";

          const editorElement = document.createElement("div");
          editorElement.id = editorId;
          editorElement.style.minHeight = "300px";
          editorContainerRef.current.appendChild(editorElement);

          const Quill = (await import("quill")).default;

          quillInstanceRef.current = new Quill(`#${editorId}`, {
            theme: "snow",
            modules: {
              toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ align: [] }],
                ["link", "image"],
                ["clean"],
              ],
            },
            placeholder,
          });

          if (value) {
            quillInstanceRef.current.root.innerHTML = value;
          }

          quillInstanceRef.current.on("text-change", () => {
            if (quillInstanceRef.current) {
              const content = quillInstanceRef.current.root.innerHTML;
              onChange(content);
            }
          });
        }
      } catch (error) {
        console.error("Failed to initialize Quill:", error);
      }
    };

    const timer = setTimeout(initQuill, 100);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (quillInstanceRef.current) {
      const currentContent = quillInstanceRef.current.root.innerHTML;
      if (value !== currentContent) {
        quillInstanceRef.current.root.innerHTML = value;
      }
    }
  }, [value]);

  return (
    <div className="bg-white rounded-md border border-gray-200">
      <div ref={editorContainerRef} />
    </div>
  );
}
