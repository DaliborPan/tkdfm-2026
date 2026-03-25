import { useContentContext } from "../../../content/content-context";
import { type ContentType } from "../../../content/schema";
import { FormFileUpload, type FormFileUploadProps } from "./form-file-upload";

export type FormContentProps<TContentType extends ContentType = ContentType> =
  Omit<FormFileUploadProps<TContentType>, "uploadFile">;

export function FormContent<TContentType extends ContentType = ContentType>({
  ...props
}: FormContentProps<TContentType>) {
  const { uploadFile } = useContentContext<TContentType>();

  return <FormFileUpload {...props} uploadFile={uploadFile} />;
}
