import { FormEditor } from "../../../../form/RHF-fields/form-editor";

export type FormEditorFieldProps = {
  name: string;
};

/**
 * @deprecated use *LayoutField from `iqf-web-ui/form-layout-fields` instead
 */
export function FormEditorField({ name }: FormEditorFieldProps) {
  return (
    <div className="group border-b last-of-type:border-none">
      <FormEditor
        name={name}
        wrapperClassName="editor-wrapper rounded-b-none rounded-t-none group-last-of-type:rounded-b-[7px]"
      />
    </div>
  );
}
