import { createContext, useContext } from "react";

import { type ApiFetchOptions } from "../utils/api-fetch/types";
import { type ContentType } from "./schema";

export type ContentContextType<TContentType extends ContentType = ContentType> =
  {
    /**
     * Content base API for working with contents.
     */
    contentApi?: string;

    /**
     * Signed content API for working with contents.
     */
    signedContentApi?: string;

    /**
     * Uploads a file to the content API. Passes `apiFetchOptios` to `apiFetch`
     * to allow for progress tracking and cancellation.
     *
     * @param file - the file to upload
     * @param apiFetchOptions - optional options for the request, that can be used
     * to track the progress of the upload.
     */
    uploadFile: (data: {
      file: File;
      apiFetchOptions?: Partial<ApiFetchOptions>;
    }) => Promise<TContentType>;

    /**
     * Gets a file from the content API.
     *
     * @param contentId - the ID of the content
     * @param options - optional options for the request, that can be used
     * to track the progress of the download.
     */
    getFile: (
      contentId: string,
      options?: {
        onProgress?: (progress: number) => void;
        signal?: AbortSignal;
      },
    ) => Promise<Blob>;

    /**
     * Gets a file from the content API and downloads it.
     */
    downloadFile: (
      content: Pick<TContentType, "id" | "title">,
    ) => Promise<void>;

    /**
     * Downloads a file from the signed content API.
     */
    downloadSignedFile: (
      content: Pick<TContentType, "id" | "title">,
      filename?: string,
    ) => Promise<void>;
  };

export const ContentContext = createContext<ContentContextType<any> | null>(
  null,
);

export function useContentContext<
  TContentType extends ContentType = ContentType,
>() {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error("ContentContext not found");
  }

  return context as ContentContextType<TContentType>;
}
