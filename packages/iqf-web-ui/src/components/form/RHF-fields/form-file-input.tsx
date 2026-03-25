"use client";

import { z } from "zod";

import { type ContentType } from "../../../content/schema";
import { FileInput, type FileInputProps } from "../../molecules/file-input";
import { useFormContext } from "../context/form-context";
import { FormField } from "../form-field";
import { createFieldMessage } from "./const/create-field-message";

/**
 * This schema should be used for file input in form schema.
 */
export const fileSchema = z.instanceof(File);

export type FormFileInputProps<TFileType extends File | ContentType = File> =
  Omit<
    FileInputProps<TFileType>,
    "value" | "onChange" | "onRemoveFile" | "uploadProgress"
  > &
    Pick<Partial<FileInputProps<TFileType>>, "onChange" | "onRemoveFile"> & {
      name: string;
    };

export function FormFileInput({
  name,
  message,

  multiple = false,

  ...props
}: FormFileInputProps<File>) {
  const { control, editing } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const value = !field.value
          ? []
          : Array.isArray(field.value)
            ? field.value
            : [field.value];

        return (
          <FileInput
            {...props}
            id={name}
            value={value}
            disabled={!editing || props.disabled}
            multiple={multiple}
            onChange={(newFiles) => {
              if (multiple) {
                field.onChange([...value, ...newFiles]);
              } else {
                const file = newFiles.at(0);

                if (!file) {
                  return;
                }

                field.onChange(file);
              }

              props.onChange?.(newFiles);
            }}
            onRemoveFile={(removedFile) => {
              if (multiple && value.length > 1) {
                field.onChange(
                  value.filter((file: File) => file.name !== removedFile.name),
                );
              } else {
                field.onChange(null);
              }

              props.onRemoveFile?.(removedFile);
            }}
            message={createFieldMessage(message, error)}
          />
        );
      }}
    />
  );
}
