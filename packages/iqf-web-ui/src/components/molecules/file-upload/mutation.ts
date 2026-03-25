import { useIsMutating, useMutation } from "@tanstack/react-query";
import { type Dispatch, type SetStateAction } from "react";

import { type ContentType } from "../../../content/schema";
import { type UploadProgress } from "../file-input/types";
import { type FileUploadProps } from "./types";

const UPLOAD_FILES_MUTATION_KEY = ["upload-files-mutation"] as const;

export function useIsUploadFilesMutationPending() {
  const pendingMutationsCount = useIsMutating({
    mutationKey: UPLOAD_FILES_MUTATION_KEY,
  });

  return pendingMutationsCount > 0;
}

export function useUploadFilesMutation<
  TContentType extends ContentType = ContentType,
>({
  uploadFile,
  setUploadProgress,
}: Pick<FileUploadProps<TContentType>, "uploadFile"> & {
  setUploadProgress: Dispatch<SetStateAction<UploadProgress | undefined>>;
}) {
  return useMutation({
    mutationKey: UPLOAD_FILES_MUTATION_KEY,
    mutationFn: async ({
      acceptedFiles,
      signal,
    }: {
      acceptedFiles: File[];
      signal: AbortSignal;
    }) => {
      const result = await Promise.allSettled(
        acceptedFiles.map((file) =>
          uploadFile({
            file,
            apiFetchOptions: {
              signal,
              onUploadProgress: ({ progress }) => {
                setUploadProgress((prev) => ({
                  ...prev,
                  [file.name]: {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    progress,
                  },
                }));
              },
            },
          }),
        ),
      );

      const contents = result
        .map((r) => (r.status === "fulfilled" ? r.value : undefined))
        .filter((f) => f !== undefined);

      return contents;
    },
    onSettled: () => setUploadProgress(undefined),
  });
}
