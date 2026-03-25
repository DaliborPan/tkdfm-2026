"use client";

import { RichTextEditor } from "../../atoms/rich-text-editor";
import { type RichTextEditorProps } from "../../atoms/rich-text-editor/rich-text-editor";
import { useFormContext } from "../context/form-context";
import { FormField } from "../form-field";
import { createFieldMessage } from "./const/create-field-message";

export type FormEditorProps = Omit<
  RichTextEditorProps,
  "value" | "onChange"
> & {
  name: string;
};

export function FormEditor({
  name,
  message,
  noScrollbar,
  ...props
}: FormEditorProps) {
  const { control, editing } = useFormContext();

  const isDisabled = !editing || props.disabled;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <RichTextEditor
          {...props}
          disabled={isDisabled}
          noScrollbar={noScrollbar !== undefined ? noScrollbar : isDisabled}
          value={field.value}
          onChange={field.onChange}
          message={createFieldMessage(message, error)}
        />
      )}
    />
  );
}
