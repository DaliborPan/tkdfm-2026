import { type Editor, useEditorState } from "@tiptap/react";
import {
  Bold,
  Italic,
  Link,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from "lucide-react";
import { useCallback } from "react";
import { useIntl } from "react-intl";

import { type ButtonProps } from "../../button/types";

export function useEmphasizeButtons(
  editor: Editor,
  hideButtons: string[] = [],
) {
  const intl = useIntl();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        isSuperscript: ctx.editor.isActive("superscript") ?? false,
        isSubscript: ctx.editor.isActive("subscript") ?? false,
        isLink: ctx.editor.isActive("link") ?? false,
      };
    },
  });

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  const toggleSuperscript = useCallback(() => {
    editor.chain().focus().toggleSuperscript().run();
  }, [editor]);

  const toggleSubscript = useCallback(() => {
    editor.chain().focus().toggleSubscript().run();
  }, [editor]);

  const toggleLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;

    if (previousUrl) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    const url = window.prompt(
      intl.formatMessage({
        id: "atoms.rich-text-editor.link.prompt",
        defaultMessage: "URL adresa",
      }),
      "",
    );

    if (!url) {
      return;
    }

    editor
      .chain()
      .focus()
      .setLink({
        href: url.startsWith("http") ? url : `https://${url}`,
        target: "_blank",
      })
      .run();
  }, [editor, intl]);

  const buttons: ButtonProps[] = [
    {
      onClick: toggleBold,
      iconLeft: { Icon: Bold },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.bold",
        defaultMessage: "Tučné",
      }),
      inverse: !editorState.isBold,
      key: "bold",
    },
    {
      onClick: toggleItalic,
      iconLeft: { Icon: Italic },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.italic",
        defaultMessage: "Kurzíva",
      }),
      inverse: !editorState.isItalic,
      key: "italic",
    },
    {
      onClick: toggleUnderline,
      iconLeft: { Icon: Underline },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.underline",
        defaultMessage: "Podtržené",
      }),
      inverse: !editorState.isUnderline,
      key: "underline",
    },
    {
      onClick: toggleStrike,
      iconLeft: { Icon: Strikethrough },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.strike",
        defaultMessage: "Přeškrtnuté",
      }),
      inverse: !editorState.isStrike,
      key: "strike",
    },
    {
      onClick: toggleSuperscript,
      iconLeft: { Icon: Superscript },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.superscript",
        defaultMessage: "Horní index",
      }),
      inverse: !editorState.isSuperscript,
      key: "superscript",
    },
    {
      onClick: toggleSubscript,
      iconLeft: { Icon: Subscript },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.subscript",
        defaultMessage: "Dolní index",
      }),
      inverse: !editorState.isSubscript,
      key: "subscript",
    },
    {
      onClick: toggleLink,
      iconLeft: { Icon: Link },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.link",
        defaultMessage: "Odkaz",
      }),
      inverse: !editorState.isLink,
      key: "link",
    },
  ].filter((button) => !hideButtons.includes(button.key));

  return { buttons };
}
