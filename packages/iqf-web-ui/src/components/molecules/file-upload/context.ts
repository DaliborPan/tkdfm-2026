import { createContext, useContext } from "react";

import { type UploadProgress } from "../file-input/types";

export type FileUploadContextType = {
  onAbort: () => void;
  isUploading: boolean;
  uploadProgress: UploadProgress | undefined;
};

export const FileUploadContext = createContext<FileUploadContextType | null>(
  null,
);

export const FileUploadContextProvider = FileUploadContext.Provider;

export function useFileUploadContext() {
  const context = useContext(FileUploadContext);

  if (!context) {
    throw new Error(
      "useFileUploadContext must be used within a FileUploadContextProvider",
    );
  }

  return context;
}
