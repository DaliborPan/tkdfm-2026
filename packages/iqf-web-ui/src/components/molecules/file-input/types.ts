import type { HTMLProps, PropsWithChildren, Ref } from "react";

import { type ContentType } from "../../../content/schema";
import { type AtomMessageProps } from "../../atoms/atom-message/types";
import { type StateAtomControlContextType } from "../../atoms/state-atom-control/types";

export type UploadProgress = Record<
  string,
  {
    name: string;
    size: number;
    type: string;
    progress: number | undefined;
  }
>;

export type FileInputHandle = {
  resetInputValue: () => void;
};

export type FileInputProps<TFileType extends File | ContentType = File> =
  PropsWithChildren<Omit<HTMLProps<HTMLInputElement>, "onChange" | "value">> & {
    /**
     * Value is an array of files.
     */
    value: TFileType[];

    /**
     * Called when user selects new files.
     *
     * @param newFiles contains only new files, not the existing ones.
     */
    onChange: (newFiles: File[]) => void;

    /**
     * Called when user removes a file.
     */
    onRemoveFile: (file: TFileType) => void;

    /**
     * Label for the file input.
     */
    label?: React.ReactNode;

    /**
     * Message to display below the file input.
     */
    message?: AtomMessageProps;

    /**
     * FileInput's state. For `FormFileInput`, state is passed via `FormControl` component.
     */
    state?: StateAtomControlContextType["state"];

    /**
     * Custom render for selected files. Set `null` to hide selected files.
     */
    selectedFiles?:
      | ((params: SelectedFilesProps<TFileType>) => React.ReactNode)
      | null;

    /**
     * If uploading a file, set the progress of the upload for each file.
     *
     * Example:
     * ```
     * {
     *  "file-name.jpg": {
     *     name: "file-name.jpg",
     *     size: 1000,
     *     progress: 0.5,
     *  },
     * }
     * ```
     */
    uploadProgress?: UploadProgress;

    /**
     * Handle for manipulating with `<input>` element.
     */
    inputHandle?: Ref<FileInputHandle>;
  };

export type SelectedFilesProps<
  TFileType extends { name: string; size: number } | ContentType,
> = {
  files: TFileType[];
  onRemoveFile?: (file: TFileType) => void;
  disabled?: boolean;
  uploadProgress?: UploadProgress;
  multiple?: boolean;
};
