import { useCallback, useId, useImperativeHandle, useRef } from "react";

import { type ContentType } from "../../../content/schema";
import {
  StateAtomControlProvider,
  StateAtomLabel,
  StateAtomMessage,
} from "../../atoms/state-atom-control";
import { FileInputContextProvider } from "./context";
import { FileInputTrigger } from "./file-input-trigger";
import { SelectedFiles } from "./selected-files";
import { type FileInputProps } from "./types";

function useFileInputId(propsId: string | undefined) {
  const generatedId = useId();

  return propsId ?? generatedId;
}

export function FileInput<TFileType extends File | ContentType = File>({
  value,
  onChange,
  onRemoveFile,

  label,
  message,

  disabled,
  state,
  required,
  multiple,

  uploadProgress,
  inputHandle,
  selectedFiles,

  children,

  ...props
}: FileInputProps<TFileType>) {
  const inputRef = useRef<HTMLInputElement>(null);

  const id = useFileInputId(props.id);

  /**
   * Reset input value.
   *
   * Reseting input value is needed to allow user pick another or same
   * file for the same field.
   */
  const resetInputValue = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const _onRemoveFile = (file: TFileType) => {
    onRemoveFile(file);

    resetInputValue();
  };

  const onClick = useCallback(() => inputRef.current?.click(), []);

  useImperativeHandle(inputHandle, () => ({
    resetInputValue,
  }));

  return (
    <FileInputContextProvider value={{ id, onClick }}>
      <StateAtomControlProvider state={state}>
        {label && (
          <div className="mb-1">
            <StateAtomLabel required={required} htmlFor={id ?? "UNDEFINED_ID"}>
              {label}
            </StateAtomLabel>
          </div>
        )}

        <input
          {...props}
          ref={inputRef}
          id={id}
          type="file"
          multiple={multiple}
          className="peer hidden"
          disabled={disabled}
          onChange={(e) => {
            const fileList = e.target.files;

            if (!fileList) {
              return;
            }

            onChange(Array.from(fileList));
          }}
        />

        {children ?? <FileInputTrigger />}

        {selectedFiles !== undefined ? (
          selectedFiles?.({
            files: value,
            onRemoveFile: _onRemoveFile,
            disabled,
            uploadProgress,
            multiple,
          })
        ) : (
          <SelectedFiles
            files={value}
            onRemoveFile={disabled ? undefined : _onRemoveFile}
            uploadProgress={uploadProgress}
            multiple={multiple}
          />
        )}

        <StateAtomMessage {...message} />
      </StateAtomControlProvider>
    </FileInputContextProvider>
  );
}
