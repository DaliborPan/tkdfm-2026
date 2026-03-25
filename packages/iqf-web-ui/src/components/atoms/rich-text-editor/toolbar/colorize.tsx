import { type Editor, useEditorState } from "@tiptap/react";
import { useCallback } from "react";
import { useIntl } from "react-intl";

import { type ButtonProps } from "../../button/types";

export function useColorizeButtons(editor: Editor, hideButtons: string[] = []) {
  const intl = useIntl();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isColorizeRed:
          ctx.editor.isActive("highlight", { color: "#ffa8a8" }) ?? false,
        isColorizeYellow:
          ctx.editor.isActive("highlight", { color: "#faf594" }) ?? false,
        isColorizeGreen:
          ctx.editor.isActive("highlight", { color: "#8ce99a" }) ?? false,
        isColorizePurple:
          ctx.editor.isActive("highlight", { color: "#CBC3E3" }) ?? false,
        isColorizeOrange:
          ctx.editor.isActive("highlight", { color: "#FBCEB1" }) ?? false,
      };
    },
  });

  const colorizeItem = useCallback(
    (color: string) => {
      editor.chain().focus().toggleHighlight({ color }).run();
    },
    [editor],
  );

  const buttons: ButtonProps[] = [
    {
      onClick: () => colorizeItem("#ffa8a8"),
      children: <span className="h-4 w-4 rounded-full bg-[#ffa8a8]" />,
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.colorize-red",
        defaultMessage: "Zvýraznit červeně",
      }),
      inverse: !editorState.isColorizeRed,
      key: "highlightRed",
    },
    {
      onClick: () => colorizeItem("#faf594"),
      children: <span className="h-4 w-4 rounded-full bg-[#faf594]" />,
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.colorize-yellow",
        defaultMessage: "Zvýraznit žlutě",
      }),
      inverse: !editorState.isColorizeYellow,
      key: "highlightYellow",
    },
    {
      onClick: () => colorizeItem("#8ce99a"),
      children: <span className="h-4 w-4 rounded-full bg-[#8ce99a]" />,
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.colorize-green",
        defaultMessage: "Zvýraznit zeleně",
      }),
      inverse: !editorState.isColorizeGreen,
      key: "highlightGreen",
    },
    {
      onClick: () => colorizeItem("#CBC3E3"),
      children: <span className="h-4 w-4 rounded-full bg-[#CBC3E3]" />,
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.colorize-purple",
        defaultMessage: "Zvýraznit fialově",
      }),
      inverse: !editorState.isColorizePurple,
      key: "highlightPurple",
    },
    {
      onClick: () => colorizeItem("#FBCEB1"),
      children: <span className="h-4 w-4 rounded-full bg-[#FBCEB1]" />,
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.colorize-orange",
        defaultMessage: "Zvýraznit oranžově",
      }),
      inverse: !editorState.isColorizeOrange,
      key: "highlightOrange",
    },
  ].filter((button) => !hideButtons.includes(button.key));

  return { buttons };
}
