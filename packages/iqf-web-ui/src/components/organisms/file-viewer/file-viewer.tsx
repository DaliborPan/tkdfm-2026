import { Info } from "lucide-react";
import { useIntl } from "react-intl";

import { DownloadContentAction } from "../../../content/actions/download-content-action";
import { type ContentType } from "../../../content/schema";
import { Icon } from "../../atoms/icon";
import { type FileViewerProps } from "./types";
import { getViewer } from "./viewers/get-viewer";

function Error<TContentType extends ContentType = ContentType>({
  file,
  content,
}: FileViewerProps<TContentType>) {
  const intl = useIntl();

  return (
    <div className="grid w-full place-items-center rounded-lg border">
      <div className="my-4 flex flex-col items-center gap-4 text-error">
        <Icon Icon={Info} className="size-6" />

        {intl.formatMessage({
          id: "data-table.document-preview-error",
          defaultMessage:
            "Formát dokumentu je podporovaný, ale náhled nelze zobrazit. Pro prohlížení dokumentu si jej prosím stáhněte.",
        })}
        <div className="rounded-lg bg-error-100 px-2 py-1 text-sm text-error">
          {file.type}
        </div>

        {content && <DownloadContentAction content={content} />}
      </div>
    </div>
  );
}

export function FileViewer({
  file,
  content,
  className,
  ErrorView = Error,
}: FileViewerProps & {
  ErrorView?: React.FC<FileViewerProps>;
}) {
  const Viewer = getViewer(file) ?? ErrorView;

  // eslint-disable-next-line react-hooks/static-components
  return <Viewer file={file} content={content} className={className} />;
}
