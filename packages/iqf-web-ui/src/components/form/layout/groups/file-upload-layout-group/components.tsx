import { File, X } from "lucide-react";
import { useIntl } from "react-intl";

import { Button } from "../../../../atoms/button";
import { Icon } from "../../../../atoms/icon";
import { Progress } from "../../../../atoms/progress";
import { FileInputTrigger } from "../../../../molecules/file-input";
import { formatBytes } from "../../../../molecules/file-input/utils";
import { useFileUploadContext } from "../../../../molecules/file-upload";
import { LayoutGroupItem } from "../../layout-group-item";
import { TextLayoutValue } from "../../values/text-layout-value";

export function FileLayoutRow({
  file,
  actions,
}: {
  file: {
    title: string;
    size: number;
    type?: string | null;
  };
  actions: React.ReactNode;
}) {
  return (
    <LayoutGroupItem className="@container/content-layout-group">
      <div className="flex flex-col gap-2.5 py-2 @lg/content-layout-group:flex-row @lg/content-layout-group:items-center">
        <div className="hidden rounded-full bg-primary-100 p-2.5 @lg/content-layout-group:block">
          <Icon Icon={File} className="size-5" />
        </div>

        <div className="mr-2 flex grow flex-col truncate">
          <span className="truncate text-sm">{file.title}</span>

          <div className="flex items-center gap-x-2.5 text-xs text-gray-500">
            <span>{formatBytes(file.size)}</span>

            <div className="size-[3px] rounded-full bg-gray-300" />
            <span>{file.type}</span>
          </div>
        </div>

        {actions}
      </div>
    </LayoutGroupItem>
  );
}

export function ContentsInProgress() {
  const { uploadProgress } = useFileUploadContext();

  return (
    <>
      {Object.values(uploadProgress ?? {}).map((file) => {
        const progress = Math.round((file.progress ?? 0) * 100);

        return (
          <FileLayoutRow
            key={file.name}
            file={{
              ...file,
              title: file.name,
            }}
            actions={
              <div className="flex w-full items-center gap-x-1.5 @lg/content-layout-group:w-[200px]">
                <span className="text-xs text-primary-700">
                  {progress}&nbsp;%
                </span>

                <Progress value={progress} />
              </div>
            }
          />
        );
      })}
    </>
  );
}

export function ZeroContentsRow() {
  const { uploadProgress } = useFileUploadContext();

  return !uploadProgress && <ZeroFilesLayoutRow />;
}

export function ZeroFilesLayoutRow() {
  const intl = useIntl();

  return (
    <TextLayoutValue
      className="text-secondary-700"
      value={intl.formatMessage({
        id: "content-layout-group.no-content",
        defaultMessage: "Žádné soubory",
      })}
    />
  );
}

export function FileUploadTrigger() {
  const intl = useIntl();

  const { isUploading, onAbort } = useFileUploadContext();

  return isUploading ? (
    <Button
      className="min-h-0 py-1"
      variant="outlined"
      color="error"
      iconLeft={{ Icon: X }}
      onClick={onAbort}
    >
      {intl.formatMessage({
        id: "content-layout-group.abort-upload",
        defaultMessage: "Zrušit nahrávání",
      })}
    </Button>
  ) : (
    <FileInputTrigger className="min-h-0 py-1" />
  );
}
