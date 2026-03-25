import { type Editor } from "@tiptap/react";
import { BetweenHorizontalEnd, CodeXml, WrapText } from "lucide-react";
import { useCallback } from "react";
import { useIntl } from "react-intl";

import { type ButtonProps } from "../../button/types";
import { ToolbarDropdown } from "../rich-text-editor-dropdown";

export function useWhitespaceButtons(
  editor: Editor,
  showWildcardButton: boolean,
  widlcardItems: { id: string; label: string }[],
  hideButtons: string[] = [],
) {
  const intl = useIntl();

  const addHardBreak = useCallback(() => {
    editor.chain().focus().setHardBreak().run();
  }, [editor]);

  const addPageBreak = useCallback(() => {
    editor
      .chain()
      .focus()
      .insertContent({
        type: "pageBreak",
      })
      .run();
  }, [editor]);

  const addWildcard = useCallback(
    (type: string) => {
      editor.chain().focus().insertContent(`<wildcard type="${type}" />`).run();
    },
    [editor],
  );

  const buttons: (ButtonProps & { renderCustom?: () => React.ReactNode })[] = [
    {
      onClick: addHardBreak,
      iconLeft: { Icon: WrapText },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.add-hard-break",
        defaultMessage: "Nový řádek",
      }),
      inverse: true,
      key: "hardBreak",
    },
    {
      onClick: addPageBreak,
      iconLeft: { Icon: BetweenHorizontalEnd },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.add-page-break",
        defaultMessage: "Nová stránka",
      }),
      inverse: true,
      key: "pageBreak",
    },
  ].filter((button) => !hideButtons.includes(button.key));

  if (showWildcardButton) {
    buttons.push({
      renderCustom: () => (
        <ToolbarDropdown
          tooltip="Vložit zástupní znaky"
          iconLeft={{ Icon: CodeXml }}
          items={widlcardItems.map((item) => ({
            id: item.id,
            label: item.label,
            onClick: () => {
              addWildcard(item.id);
            },
          }))}
        />
      ),
    });
  }

  return { buttons };
}
