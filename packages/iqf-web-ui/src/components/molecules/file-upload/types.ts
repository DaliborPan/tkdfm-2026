import { type ContentType } from "../../../content/schema";
import { type ApiFetchOptions } from "../../../utils/api-fetch/types";
import { type FileInputProps } from "../file-input/types";

export type FileUploadProps<TContentType extends ContentType = ContentType> =
  Omit<FileInputProps<TContentType>, "uploadProgress" | "onChange"> & {
    /**
     * @param contents - already uploaded files
     * @param newFiles - raw selected files
     */
    onChange: (contents: TContentType[], newFiles: File[]) => void;

    /**
     * Function that uploads the file to the server.
     *
     * If you want to have working progress, you need to pass `apiFetchOptions`
     * to the apiFetch.
     *
     * @example
     *
     * ```
     * const body = new FormData();
     * body.append("file", file);
     *
     * return apiFetch({
     *   ...apiFetchOptions,
     *   method: "POST",
     *   url: "/api/eportal-bo/contents",
     *   data: body,
     * });
     * ```
     *
     * @param file - selected file
     * @param apiFetchOptions - partial apiFetchOptions, should just be passed to the apiFetch
     */
    uploadFile: (data: {
      file: File;
      apiFetchOptions: Pick<ApiFetchOptions, "signal" | "onUploadProgress">;
    }) => Promise<TContentType>;
  };
