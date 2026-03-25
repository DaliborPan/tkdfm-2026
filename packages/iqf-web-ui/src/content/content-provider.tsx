import { type PropsWithChildren } from "react";
import { type z } from "zod";

import { apiFetch } from "../utils/api-fetch";
import { ContentContext, type ContentContextType } from "./content-context";
import { type ContentType } from "./schema";

/**
 * Provider for the content API. You need to pass either `contentApi` or `signedContentApi`.
 */
export function ContentProvider<
  TContentType extends ContentType = ContentType,
>({
  children,
  contentApi,
  signedContentApi,
}: PropsWithChildren<{
  contentApi?: string;
  signedContentApi?: string;
}>) {
  const checkApi = ({ signed }: { signed: boolean } = { signed: false }) => {
    if (!contentApi && !signedContentApi) {
      throw new Error("contentApi or signedContentApi is not defined");
    }

    if (signed && !signedContentApi) {
      throw new Error("signedContentApi is not defined");
    }
  };

  const getTokenForContent = (contentId: string, filename?: string) => {
    void checkApi({ signed: true });

    return apiFetch<z.ZodSchema<string>>({
      url: `${signedContentApi}/content/${contentId}`,
      method: "POST",
      data: { filename },
    });
  };

  const uploadFile: ContentContextType<TContentType>["uploadFile"] = (data) => {
    void checkApi();

    const body = new FormData();
    body.append("file", data.file);

    return apiFetch<z.ZodSchema<TContentType>>({
      ...data.apiFetchOptions,
      method: "POST",
      url: contentApi,
      data: body,
    });
  };

  const getFile: ContentContextType<TContentType>["getFile"] = (
    contentId,
    options,
  ) => {
    void checkApi();

    return apiFetch<z.ZodSchema<Blob>>({
      url: `${contentApi}/${contentId}`,
      responseType: "blob",
      signal: options?.signal,

      ...(options?.onProgress && {
        onDownloadProgress: (event) => {
          if (event.total) {
            const progress = Math.round((event.loaded / event.total) * 100);

            options.onProgress?.(progress);
          }
        },
      }),
    });
  };

  const downloadFile: ContentContextType<TContentType>["downloadFile"] = async (
    content,
  ) => {
    const blob = await getFile(content.id);

    const href = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = content?.title || "file";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(href);
  };

  const downloadSignedFile: ContentContextType<TContentType>["downloadSignedFile"] =
    async (content, filename) => {
      void checkApi({ signed: true });

      const token = await getTokenForContent(content.id, filename);

      const link = document.createElement("a");
      link.href = `${signedContentApi}/token/${token}`;
      link.download = content?.title || "file";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    };

  return (
    <ContentContext.Provider
      value={{
        contentApi,
        signedContentApi,

        uploadFile,
        getFile,
        downloadFile,
        downloadSignedFile,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}
