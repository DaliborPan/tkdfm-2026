import { type Editor, useEditorState } from "@tiptap/react";
import { ArrowDown, ArrowUp, List, ListOrdered } from "lucide-react";
import { useCallback } from "react";
import { useIntl } from "react-intl";

import { type ButtonProps } from "../../button/types";

export function useListButtons(editor: Editor, hideButtons: string[] = []) {
  const intl = useIntl();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
      };
    },
  });

  const toggleBulletList = useCallback(() => {
    editor.chain().focus().toggleBulletList().run();
  }, [editor]);

  const toggleOrderedList = useCallback(() => {
    editor.chain().focus().toggleOrderedList().run();
  }, [editor]);

  const liftListItem = useCallback(() => {
    editor.chain().focus().liftListItem("listItem").run();
  }, [editor]);

  const sinkListItem = useCallback(() => {
    editor.chain().focus().sinkListItem("listItem").run();
  }, [editor]);

  const buttons: ButtonProps[] = [
    {
      onClick: toggleBulletList,
      disabled: editor.isActive("orderedList"),
      iconLeft: { Icon: List },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.bullet-list",
        defaultMessage: "Odrážkový seznam",
      }),
      inverse: !editorState.isBulletList,
      key: "bulletList",
    },
    {
      onClick: toggleOrderedList,
      disabled: editor.isActive("bulletList"),
      iconLeft: { Icon: ListOrdered },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.ordered-list",
        defaultMessage: "Číslovaný seznam",
      }),
      inverse: !editorState.isOrderedList,
      key: "orderedList",
    },
    {
      onClick: liftListItem,
      iconLeft: { Icon: ArrowUp },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.lift-list-item",
        defaultMessage: "Posunout úroveň seznamu výše",
      }),
      disabled: !editor.can().liftListItem("listItem"),
      inverse: !editor.can().liftListItem("listItem"),
      key: "liftListItem",
    },
    {
      onClick: sinkListItem,
      iconLeft: { Icon: ArrowDown },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.sink-list-item",
        defaultMessage: "Posunout úroveň seznamu níže",
      }),
      disabled: !editor.can().sinkListItem("listItem"),
      inverse: !editor.can().sinkListItem("listItem"),
      key: "sinkListItem",
    },
  ].filter((button) => !hideButtons.includes(button.key));

  return { buttons };
}
