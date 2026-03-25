import { type ContentType } from "../../../content/schema";
import { FileUpload, type FileUploadProps } from "../../molecules/file-upload";
import { useFormContext } from "../context/form-context";
import { FormField } from "../form-field";
import { createFieldMessage } from "./const/create-field-message";

export type FormFileUploadProps<
  TContentType extends ContentType = ContentType,
> = Omit<FileUploadProps<TContentType>, "value" | "onChange" | "onRemoveFile"> &
  Pick<Partial<FileUploadProps<TContentType>>, "onChange" | "onRemoveFile"> & {
    name: string;
  };

export function FormFileUpload<TContentType extends ContentType = ContentType>({
  id,
  name,
  message,

  multiple = false,

  ...props
}: FormFileUploadProps<TContentType>) {
  const { control, editing } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      id={id}
      formItemClassName={props.className}
      render={({ field, fieldState: { error } }) => {
        const value = !field.value
          ? []
          : Array.isArray(field.value)
            ? field.value
            : [field.value];

        return (
          <FileUpload
            {...props}
            id={name}
            value={value}
            disabled={!editing || props.disabled}
            multiple={multiple}
            onChange={(newContents, newFiles) => {
              if (multiple) {
                field.onChange([...value, ...newContents]);
              } else {
                const content = newContents.at(0);

                if (content) {
                  field.onChange(content);
                }
              }

              props.onChange?.(newContents, newFiles);
            }}
            onRemoveFile={(removedContent) => {
              if (multiple && value.length > 1) {
                field.onChange(
                  value.filter(
                    (content: TContentType) => content.id !== removedContent.id,
                  ),
                );
              } else {
                field.onChange(null);
              }

              props.onRemoveFile?.(removedContent);
            }}
            message={createFieldMessage(message, error)}
          />
        );
      }}
    />
  );
}
