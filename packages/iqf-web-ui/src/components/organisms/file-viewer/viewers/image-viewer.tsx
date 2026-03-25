import { type FileViewerProps } from "../types";

export function ImageViewer({ file, className }: FileViewerProps) {
  return (
    <div className={className}>
      <img
        alt="preview"
        className="m-auto h-auto w-auto rounded-sm"
        src={URL.createObjectURL(file)}
      />
    </div>
  );
}
