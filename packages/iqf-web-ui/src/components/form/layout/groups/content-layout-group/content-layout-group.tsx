import { useContentContext } from "../../../../../content/content-context";
import { type ContentType } from "../../../../../content/schema";
import {
  FileUploadLayoutGroup,
  type FileUploadLayoutGroupProps,
} from "../file-upload-layout-group/";
import { DownloadAction, ViewAction } from "./actions";

export type ContentLayoutGroupProps<
  TContentType extends ContentType = ContentType,
> = Omit<FileUploadLayoutGroupProps<TContentType>, "uploadFile">;

export function ContentLayoutGroup<
  TContentType extends ContentType = ContentType,
>(props: ContentLayoutGroupProps<TContentType>) {
  const { uploadFile } = useContentContext<TContentType>();

  return (
    <FileUploadLayoutGroup
      {...props}
      uploadFile={uploadFile}
      rowActions={(item) => (
        <div className="flex items-center gap-x-1">
          <DownloadAction content={item} />
          <ViewAction content={item} />

          <FileUploadLayoutGroup.RemoveFileAction
            name={props.name}
            removedFile={item}
          />
        </div>
      )}
    />
  );
}
