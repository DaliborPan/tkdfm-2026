import { type ContentType } from "../../../content/schema";

export type FileViewerProps<TContentType extends ContentType = ContentType> = {
  file: File;
  content?: TContentType;
  className?: string;
};
