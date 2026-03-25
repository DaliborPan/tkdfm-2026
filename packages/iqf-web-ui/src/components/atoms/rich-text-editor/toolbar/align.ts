import { type Editor, useEditorState } from "@tiptap/react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import { useCallback } from "react";
import { useIntl } from "react-intl";

import { type ButtonProps } from "../../button/types";

export function useAlignButtons(editor: Editor, hideButtons: string[] = []) {
  const intl = useIntl();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isAlignLeft: ctx.editor.isActive({ textAlign: "left" }) ?? false,
        isAlignCenter: ctx.editor.isActive({ textAlign: "center" }) ?? false,
        isAlignRight: ctx.editor.isActive({ textAlign: "right" }) ?? false,
        isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }) ?? false,
      };
    },
  });

  const setAlignment = useCallback(
    (textAlign: "left" | "center" | "right" | "justify") => {
      editor.chain().focus().setTextAlign(textAlign).run();
    },
    [editor],
  );

  const buttons: ButtonProps[] = [
    {
      onClick: () => setAlignment("left"),
      iconLeft: { Icon: AlignLeft },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.align-left",
        defaultMessage: "Zarovnat vlevo",
      }),
      inverse: !editorState.isAlignLeft,
      key: "alignLeft",
    },
    {
      onClick: () => setAlignment("center"),
      iconLeft: { Icon: AlignCenter },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.align-center",
        defaultMessage: "Zarovnat na střed",
      }),
      inverse: !editorState.isAlignCenter,
      key: "alignCenter",
    },
    {
      onClick: () => setAlignment("right"),
      iconLeft: { Icon: AlignRight },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.align-right",
        defaultMessage: "Zarovnat vpravo",
      }),
      inverse: !editorState.isAlignRight,
      key: "alignRight",
    },
    {
      onClick: () => setAlignment("justify"),
      iconLeft: { Icon: AlignJustify },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.align-justify",
        defaultMessage: "Zarovnat do bloku",
      }),
      inverse: !editorState.isAlignJustify,
      key: "alignJustify",
    },
  ].filter((button) => !hideButtons.includes(button.key));

  return { buttons };
}
