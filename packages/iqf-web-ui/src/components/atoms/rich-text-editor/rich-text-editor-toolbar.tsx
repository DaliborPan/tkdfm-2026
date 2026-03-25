import { type Editor } from "@tiptap/react";

import { ButtonGroup } from "./../button-group";
import { useAlignButtons } from "./toolbar/align";
import { useColorizeButtons } from "./toolbar/colorize";
import { useEmphasizeButtons } from "./toolbar/emphasize";
import { useFullscreenButtons } from "./toolbar/fullscreen";
import { useHeadingButtons } from "./toolbar/heading";
import { useHistoryButtons } from "./toolbar/history";
import { useListButtons } from "./toolbar/list";
import { useWhitespaceButtons } from "./toolbar/whitespace";

export type RichEditorButtons =
  | "undo"
  | "redo"
  | "pageBreak"
  | "hardBreak"
  | "link"
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "superscript"
  | "subscript"
  | "alignLeft"
  | "alignCenter"
  | "alignRight"
  | "alignJustify"
  | "bulletList"
  | "orderedList"
  | "liftListItem"
  | "sinkListItem"
  | "highlightRed"
  | "highlightYellow"
  | "highlightGreen"
  | "highlightPurple"
  | "highlightOrange"
  | "fullscreen";

type ToolbarProps = {
  editor: Editor;
  fullscreen: boolean;
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  hideButtons?: RichEditorButtons[];

  showWildcardButton?: boolean;
  widlcardItems?: { id: string; label: string }[];
};

export function RichTextEditorToolbar({
  editor,
  fullscreen,
  setFullscreen,
  hideButtons = [],

  showWildcardButton = false,
  widlcardItems = [],
}: ToolbarProps) {
  const historyButtons = useHistoryButtons(editor, hideButtons);
  const whitespaceButtons = useWhitespaceButtons(
    editor,
    showWildcardButton,
    widlcardItems,
    hideButtons,
  );
  const headingButtons = useHeadingButtons(editor, hideButtons);
  const emphasizeButtons = useEmphasizeButtons(editor, hideButtons);
  const alignmentButtons = useAlignButtons(editor, hideButtons);
  const listButtons = useListButtons(editor, hideButtons);
  const colorizeButtons = useColorizeButtons(editor, hideButtons);
  const fullscreenButtons = useFullscreenButtons(
    fullscreen,
    setFullscreen,
    hideButtons,
  );

  const groups = [
    historyButtons,
    whitespaceButtons,
    headingButtons,
    emphasizeButtons,
    alignmentButtons,
    listButtons,
    colorizeButtons,
    fullscreenButtons,
  ].filter((group) => group.buttons.length > 0);

  return (
    <div className="mb-4 flex">
      <ButtonGroup groups={groups} collapsible={!fullscreen} />
    </div>
  );
}
