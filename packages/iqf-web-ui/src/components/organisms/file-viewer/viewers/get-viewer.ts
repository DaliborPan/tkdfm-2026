import { lazy } from "react";
import { z } from "zod";

import { ImageViewer } from "./image-viewer";
import { TextViewer } from "./text-viewer";

const PdfViewer = lazy(() =>
  import("./pdf-viewer/pdf-viewer").then((module) => ({
    default: module.PdfViewer,
  })),
);

const supportedFileTypeSchema = z.union([
  z.literal("application/pdf"),
  z.literal("application/xml"),
  z.literal("text/plain"),
  z.literal("image"),
]);

type SupportedFileType = z.infer<typeof supportedFileTypeSchema>;

const viewers: Record<SupportedFileType, React.FC<{ file: File }>> = {
  "application/pdf": PdfViewer,
  "application/xml": TextViewer,
  "text/plain": TextViewer,
  image: ImageViewer,
};

/**
 * Supported file types:
 * - application/pdf
 * - image/* (except for apple's .HEIC)
 */
export function getViewer(file: File) {
  const fileType =
    file.type.startsWith("image/") && !file.type.endsWith("heic")
      ? "image"
      : file.type;

  const validatedFileType = supportedFileTypeSchema.safeParse(fileType);

  if (!validatedFileType.success) {
    const fileName = file.name || "";

    // try to fallback

    if (fileName.endsWith(".pdf")) {
      return PdfViewer;
    }

    if (fileName.endsWith(".xml")) {
      return TextViewer;
    }

    if (
      fileName.endsWith(".jpg") ||
      fileName.endsWith(".jpeg") ||
      fileName.endsWith(".png")
    ) {
      return ImageViewer;
    }

    return null;
  }

  return viewers[validatedFileType.data];
}
