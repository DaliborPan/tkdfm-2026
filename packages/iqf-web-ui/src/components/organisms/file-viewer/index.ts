"use client";

import { lazy } from "react";

export { getViewer } from "./viewers/get-viewer";
export { FileViewer } from "./file-viewer";
export { ImageViewer } from "./viewers/image-viewer";
export { TextViewer } from "./viewers/text-viewer";

export const PdfViewer = lazy(() =>
  import("./viewers/pdf-viewer/pdf-viewer").then((module) => ({
    default: module.PdfViewer,
  })),
);
