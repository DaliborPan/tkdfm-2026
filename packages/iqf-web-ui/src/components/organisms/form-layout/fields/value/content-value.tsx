import { Download, Eye, FolderOpen } from "lucide-react";
import { useCallback, useState } from "react";

import { type ContentType, useContentBlobQuery } from "../../../../../content";
import { useContentContext } from "../../../../../content/content-context";
import { IconButton } from "../../../../atoms/button";
import { errorToast } from "../../../../atoms/toast";
import { warningToast } from "../../../../atoms/toast/toast";
import { Alert } from "../../../../molecules/alert";
import { FileViewer } from "../../../file-viewer";
import { ChipValue } from "./chip-value";

export type ContentValueProps = {
  value?: ContentType;
  hideLabel?: boolean;
  preloadFunction?: (content: ContentType) => Promise<boolean>;
  actions?: React.ReactNode;
};

function ContentPreview({ content }: { content: ContentType }) {
  const { data, isFetching, progress } = useContentBlobQuery(content);

  return (
    <div>
      {isFetching && (
        <div className="text-sm text-gray-500">
          Načítání: {progress ? `${progress}%` : "0%"}
        </div>
      )}
      {data?.file ? <FileViewer file={data.file} content={content} /> : null}
    </div>
  );
}

async function preloadContent({
  value,
  preloadFunction,
  successCallback,
}: {
  value: ContentType;
  preloadFunction?: (content: ContentType) => Promise<boolean>;
  successCallback: () => void;
}) {
  const shouldPreload = preloadFunction;

  if (shouldPreload) {
    const preloadPromise = preloadFunction(value);
    let showWarning = true;

    setTimeout(() => {
      if (showWarning) {
        warningToast("Probíhá načítání obsahu souboru.");
      }
    }, 500);

    const preloadResult = await preloadPromise;
    showWarning = false;

    if (preloadResult) {
      successCallback();
    } else {
      errorToast("Nepodařilo se načíst obsah souboru.");
    }
  } else {
    successCallback();
  }
}

export function ContentValue({
  value,
  hideLabel,
  preloadFunction,
  actions,
}: ContentValueProps) {
  const { downloadFile, downloadSignedFile, signedContentApi } =
    useContentContext();

  const [alertOpen, setAlertOpen] = useState(false);

  const handleDownload = useCallback(() => {
    if (!value) {
      errorToast("Žádný soubor k stažení.");
      return;
    }

    preloadContent({
      value,
      preloadFunction,
      successCallback: () => {
        if (signedContentApi) {
          return downloadSignedFile(value);
        } else {
          return downloadFile(value);
        }
      },
    });
  }, [
    downloadFile,
    downloadSignedFile,
    signedContentApi,
    preloadFunction,
    value,
  ]);

  return (
    <div className="flex h-8 gap-2">
      {!hideLabel && (
        <ChipValue
          className="h-auto w-[calc(100%_-_86px)] cursor-pointer py-0"
          textClassName="hover:text-primary"
          icon={{ Icon: FolderOpen, className: "min-w-4" }}
          value={value?.title}
          as="span"
          onClick={handleDownload}
        />
      )}
      {!!value && (
        <div className="flex">
          <Alert
            dialogProps={{ className: "max-w-[80vw]" }}
            title="Detail souboru"
            open={alertOpen}
            onOpenChange={(open) => {
              if (!open) {
                setAlertOpen(open);

                return;
              }

              preloadContent({
                value,
                preloadFunction,
                successCallback: () => setAlertOpen(open),
              });
            }}
            content={<div>{value && <ContentPreview content={value} />}</div>}
          >
            <IconButton
              tooltip="Otevřít"
              size="s"
              className="[&_button]:!px-1"
              iconLeft={{
                Icon: Eye,
                className: "size-5 text-primary",
              }}
            />
          </Alert>
          <IconButton
            tooltip="Stáhnout"
            size="s"
            onClick={handleDownload}
            iconLeft={{ Icon: Download, className: "size-5 text-primary" }}
          />
          {actions}
        </div>
      )}
    </div>
  );
}
