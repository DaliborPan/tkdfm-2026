import { useEffect, useState } from "react";

import { MonacoEditor } from "../../../atoms/monaco-editor/monaco-editor";
import { type FileViewerProps } from "../types";

export function TextViewer({ file, className }: FileViewerProps) {
  const [content, setContent] = useState("");

  useEffect(() => {
    const reader = new FileReader();

    reader.onload = () => {
      setContent(reader.result?.toString() ?? "");
    };

    reader.readAsText(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className}>
      <pre className="h-[768px] w-full overflow-auto bg-white px-4 text-sm">
        <MonacoEditor value={content} language="html" height="100%" />
      </pre>
    </div>
  );
}
