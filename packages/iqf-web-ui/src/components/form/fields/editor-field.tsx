import { cn } from "../../../utils/cn";
import { FormEditor, type FormEditorProps } from "../RHF-fields/form-editor";

export type EditorFieldProps = FormEditorProps;

export function EditorField({ wrapperClassName, ...props }: EditorFieldProps) {
  // TODO: readOnly? Or do unstyled and in EditorLayoutField put these styles?
  return (
    <div className="group border-b last-of-type:border-none">
      <FormEditor
        {...props}
        wrapperClassName={cn(
          "editor-wrapper rounded-b-none rounded-t-none group-last-of-type:rounded-b-[7px]",
          wrapperClassName,
        )}
      />
    </div>
  );
}
