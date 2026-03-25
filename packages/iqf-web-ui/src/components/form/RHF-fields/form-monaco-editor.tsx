import {
  MonacoEditor,
  type MonacoEditorProps,
} from "../../atoms/monaco-editor/monaco-editor";
import { useFormContext } from "../../form/context/form-context";
import { FormField } from "../../form/form-field";

export type FormMonacoEditorProps = Omit<
  MonacoEditorProps,
  "value" | "onChange"
> & {
  name: string;
};

export function FormMonacoEditor({
  name,
  language,
  theme = "vs",
  height,
  width,
  options,
}: FormMonacoEditorProps) {
  const { control, editing } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      formItemClassName="h-full"
      render={({ field }) => (
        <MonacoEditor
          language={language}
          theme={theme}
          value={field.value}
          height={height}
          width={width}
          options={options}
          onChange={field.onChange}
          disabled={!editing}
        />
      )}
    />
  );
}
