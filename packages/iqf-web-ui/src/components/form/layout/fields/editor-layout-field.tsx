import { EditorField, type EditorFieldProps } from "../../fields/editor-field";

export type EditorLayoutFieldProps = EditorFieldProps;

export function EditorLayoutField(props: EditorLayoutFieldProps) {
  return <EditorField {...props} />;
}
