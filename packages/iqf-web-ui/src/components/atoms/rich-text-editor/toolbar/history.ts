import { type Editor } from "@tiptap/react";
import { RotateCcw, RotateCw } from "lucide-react";
import { useCallback } from "react";
import { useIntl } from "react-intl";

import { type ButtonProps } from "../../button/types";

export function useHistoryButtons(editor: Editor, hideButtons: string[] = []) {
  const intl = useIntl();

  const undo = useCallback(() => {
    editor.chain().focus().undo().run();
  }, [editor]);

  const redo = useCallback(() => {
    editor.chain().focus().redo().run();
  }, [editor]);

  const buttons: ButtonProps[] = [
    {
      onClick: undo,
      disabled: !editor.can().undo(),
      iconLeft: { Icon: RotateCcw },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.undo",
        defaultMessage: "Zpět",
      }),
      key: "undo",
    },
    {
      onClick: redo,
      disabled: !editor.can().redo(),
      iconLeft: { Icon: RotateCw },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.redo",
        defaultMessage: "Znovu",
      }),
      key: "redo",
    },
  ].filter((button) => !hideButtons.includes(button.key));

  return { buttons };
}
