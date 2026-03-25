import { FileDownloadButton } from "../../components/molecules/file-download-button";
import { type FileDownloadButtonProps } from "../../components/molecules/file-download-button/file-download-button";
import { useContentContext } from "../content-context";
import { type ContentType } from "../schema";

export function DownloadContentAction({
  content,
  ...props
}: Omit<FileDownloadButtonProps, "downloadFile" | "file" | "content"> & {
  content: Pick<ContentType, "id" | "title">;
}) {
  const { downloadFile, downloadSignedFile, signedContentApi } =
    useContentContext();

  return (
    <FileDownloadButton
      {...props}
      downloadFile={() => {
        if (signedContentApi) {
          return downloadSignedFile(content, content.title);
        }

        return downloadFile(content);
      }}
    />
  );
}
