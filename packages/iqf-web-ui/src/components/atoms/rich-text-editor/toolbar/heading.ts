import { type Editor, useEditorState } from "@tiptap/react";
import { Heading1, Heading2, Heading3, Heading4 } from "lucide-react";
import { useCallback } from "react";
import { useIntl } from "react-intl";

import { type ButtonProps } from "../../button/types";

export function useHeadingButtons(editor: Editor, hideButtons: string[] = []) {
  const intl = useIntl();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
      };
    },
  });

  const toggleHeading = useCallback(
    (level: 1 | 2 | 3 | 4) => {
      editor.chain().focus().toggleHeading({ level }).run();
    },
    [editor],
  );

  const buttons: ButtonProps[] = [
    {
      onClick: () => toggleHeading(1),
      iconLeft: { Icon: Heading1 },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.heading1",
        defaultMessage: "Nadpis 1",
      }),
      inverse: !editorState.isHeading1,
      key: "heading1",
    },
    {
      onClick: () => toggleHeading(2),
      iconLeft: { Icon: Heading2 },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.heading2",
        defaultMessage: "Nadpis 2",
      }),
      inverse: !editorState.isHeading2,
      key: "heading2",
    },
    {
      onClick: () => toggleHeading(3),
      iconLeft: { Icon: Heading3 },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.heading3",
        defaultMessage: "Nadpis 3",
      }),
      inverse: !editorState.isHeading3,
      key: "heading3",
    },
    {
      onClick: () => toggleHeading(4),
      iconLeft: { Icon: Heading4 },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.heading4",
        defaultMessage: "Nadpis 4",
      }),
      inverse: !editorState.isHeading4,
      key: "heading4",
    },
  ].filter((button) => !hideButtons.includes(button.key));

  return { buttons };
}
