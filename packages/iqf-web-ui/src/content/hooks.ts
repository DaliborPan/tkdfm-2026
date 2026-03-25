import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useContentContext } from "./content-context";
import { type ContentType } from "./schema";

/**
 * Query that fetches a blob from the content API.
 * Progress tracking is supported.
 *
 * Query itself returns a `{ file: File }` instance.
 */
export function useContentBlobQuery<
  TContentType extends ContentType = ContentType,
>(content: TContentType | undefined) {
  const [progress, setProgress] = useState(0);

  const { getFile } = useContentContext<TContentType>();

  const query = useQuery({
    enabled: !!content,
    queryKey: ["content", content?.id],
    queryFn: async ({ signal }) => {
      if (!content) {
        return null;
      }

      const blob = await getFile(content.id, {
        signal,
        onProgress: setProgress,
      });

      return {
        file: new File([blob], content.title, {
          type: content.contentType || "application/octet-stream",
        }),
      };
    },
    staleTime: 0,
  });

  return {
    ...query,
    progress,
  };
}
