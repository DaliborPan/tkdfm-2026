import { useRef, useState } from "react";

import { type ContentType } from "../../../content/schema";
import { errorToast } from "../../atoms/toast";
import { ACCEPT_ALL, FileInput, type UploadProgress } from "../file-input";
import { type FileInputHandle } from "../file-input/types";
import { useAbortController } from "./abort-controller";
import { FileUploadContextProvider } from "./context";
import { FileUploadTrigger } from "./file-upload-trigger";
import { useUploadFilesMutation } from "./mutation";
import { type FileUploadProps } from "./types";

function categorizeFiles(files: File[], accept: string | undefined) {
  const acceptedExtensions =
    accept === ACCEPT_ALL ? true : accept?.split(",").map((ext) => ext.trim());

  const acceptedFiles: File[] = [];
  const unacceptedFiles: File[] = [];

  files.forEach((file) => {
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (
      acceptedExtensions === true ||
      acceptedExtensions?.includes(`.${extension}`)
    ) {
      acceptedFiles.push(file);
    } else {
      unacceptedFiles.push(file);
    }
  });

  return { acceptedFiles, unacceptedFiles };
}

export function useFileUpload<TContentType extends ContentType = ContentType>({
  uploadFile,
  accept = ACCEPT_ALL,
}: Pick<FileUploadProps<TContentType>, "uploadFile" | "accept">) {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>();

  const { abort, initializeAbortController } = useAbortController();

  const mutation = useUploadFilesMutation({
    uploadFile,
    setUploadProgress,
  });

  const uploadFiles = async (newFiles: File[]) => {
    const { acceptedFiles, unacceptedFiles } = categorizeFiles(
      newFiles,
      accept,
    );

    if (unacceptedFiles.length > 0) {
      errorToast(
        `Následující soubory nejsou podporovány: ${unacceptedFiles
          .map((file) => file.name)
          .join(", ")}`,
      );
    }

    return mutation.mutateAsync({
      acceptedFiles,
      signal: initializeAbortController().signal,
    });
  };

  return {
    uploadProgress,
    uploadFiles,
    isUploading: mutation.isPending,
    abort,
  };
}

export function FileUpload<TContentType extends ContentType = ContentType>({
  uploadFile,
  onChange,

  multiple = false,
  accept = ACCEPT_ALL,

  children,

  ...props
}: FileUploadProps<TContentType>) {
  const fileInputHandle = useRef<FileInputHandle>(null);

  const { uploadProgress, isUploading, uploadFiles, abort } = useFileUpload({
    uploadFile,
    accept,
  });

  return (
    <FileUploadContextProvider
      value={{
        isUploading,
        uploadProgress,
        onAbort: () => {
          abort();

          fileInputHandle.current?.resetInputValue();
        },
      }}
    >
      <FileInput
        {...props}
        inputHandle={fileInputHandle}
        accept={accept}
        multiple={multiple}
        onChange={async (newFiles) => {
          const contents = await uploadFiles(newFiles);

          onChange(contents, newFiles);
        }}
        uploadProgress={uploadProgress}
      >
        {children ?? <FileUploadTrigger />}
      </FileInput>
    </FileUploadContextProvider>
  );
}
