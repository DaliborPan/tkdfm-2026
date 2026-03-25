import { X } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

import { type ContentType } from "../../../content/schema";
import { cn } from "../../../utils/cn";
import { IconButton } from "../../atoms/button";
import { Progress } from "../../atoms/progress";
import { type SelectedFilesProps } from "./types";
import { formatBytes } from "./utils";

function FileRow<
  TValueType extends { name: string; size: number } | ContentType,
>({
  file,

  onRemoveFile,
}: Pick<SelectedFilesProps<TValueType>, "onRemoveFile"> & {
  file: TValueType;
}) {
  return (
    <div className="flex w-full items-center gap-x-3">
      <span className="truncate text-primary">
        {"name" in file ? file.name : file.title}
      </span>

      <span className="grow whitespace-nowrap text-xs font-light text-secondary-800">
        ({formatBytes(file.size)})
      </span>

      {onRemoveFile && (
        <IconButton
          onClick={() => onRemoveFile(file)}
          iconRight={{ Icon: X }}
        />
      )}
    </div>
  );
}

export function SelectedFiles<TValueType extends File | ContentType = File>({
  files,
  onRemoveFile,
  disabled,
  uploadProgress,
}: SelectedFilesProps<TValueType>) {
  return !files.length && !uploadProgress ? null : (
    <div className="mt-3">
      {files.map((file) => {
        const fileId = file instanceof File ? file.name : file.id;

        return (
          <Fragment key={fileId}>
            <FileRow
              file={file}
              onRemoveFile={disabled ? undefined : onRemoveFile}
            />

            {/**
             * Dummy Progress component used to "reserve" space for the Progress component during file uploads.
             * This prevents content from jumping and ensures the correct size is maintained, even if the Progress component's styling changes.
             */}
            <Progress className="opacity-0" value={0} />
          </Fragment>
        );
      })}

      {Object.values(uploadProgress ?? {}).map((file, index) => {
        const progress = Math.round((file.progress ?? 0) * 100);

        return (
          <div key={file.name} className={cn("mt-4", index === 0 && "mt-0")}>
            <FileRow file={file} />
            <Progress value={progress} />
          </div>
        );
      })}
    </div>
  );
}
