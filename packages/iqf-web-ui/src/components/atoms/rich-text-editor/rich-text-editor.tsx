import "./rich-text-editor.css";

import { Portal } from "@radix-ui/react-portal";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import {
  type Editor,
  EditorContent,
  type Extensions,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";

import { cn } from "../../../utils/cn";
import { type AtomMessageProps } from "../atom-message/types";
import {
  StateAtomControlProvider,
  StateAtomMessage,
} from "../state-atom-control";
import { type StateAtomControlContextType } from "../state-atom-control/types";
import { PageBreak } from "./extensions/page-break/extension";
import { useWildcardContext } from "./extensions/wildcard/context";
import { Wildcard } from "./extensions/wildcard/extension";
import {
  type RichEditorButtons,
  RichTextEditorToolbar,
} from "./rich-text-editor-toolbar";

export type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  wrapperClassName?: string;
  disabled?: boolean;
  hideButtons?: RichEditorButtons[];
  message?: AtomMessageProps;

  /**
   * RichTextEditor's state. For `FormRichTextEditor`, state is passed via `FormControl` component.
   */
  state?: StateAtomControlContextType["state"];

  /**
   * Custom secondary toolbar, that is being rendered below the main toolbar.
   *
   * @default undefined
   */
  secondaryToolbar?: (editor: Editor) => React.ReactNode;

  /**
   * Custom extensions, that are being added to the editor.
   */
  customExtensions?: Extensions;

  /**
   * Set `false` when using Nextjs.
   *
   * @default true
   */
  immediatelyRender?: boolean;

  /**
   * Set `true` when you want to hide a scrollbar.
   *
   * @default same as "disabled". When editor is disabled, scrollbar is hidden.
   */
  noScrollbar?: boolean;
};

function useRichTextEditor({
  value,
  onChange,
  disabled,
  customExtensions = [],
  immediatelyRender = true,
}: Omit<RichTextEditorProps, "className" | "wrapperClassName">) {
  const intl = useIntl();

  const editor = useEditor(
    {
      immediatelyRender,
      editable: !disabled,
      extensions: [
        ...customExtensions,

        PageBreak,
        Wildcard,
        StarterKit,
        Superscript,
        Subscript,
        Placeholder.configure({
          placeholder: disabled
            ? ""
            : intl.formatMessage({
                id: "rich-text-editor.placeholder",
                defaultMessage: "Začněte psát...",
              }),
        }),
        Highlight.configure({ multicolor: true }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
      ],
      editorProps: {
        attributes: {
          class: "focus:outline-none prose max-w-none",
        },
      },
      onUpdate: ({ editor }) => {
        const html = editor.getText() ? editor.getHTML() : "";
        const htmlWithBreaks = html.replace(/(\r\n|\r|\n)/g, "<br />");
        onChange(htmlWithBreaks);
      },
      content: value,
      parseOptions: {
        preserveWhitespace: "full",
      },
    },
    [disabled],
  );

  useEffect(() => {
    const editorValue = editor?.getHTML();

    if (editorValue !== value) {
      editor?.commands.setContent(value, {
        parseOptions: {
          preserveWhitespace: "full",
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return editor;
}

function RichTextEditorComponent({
  editor,
  fullscreen,
  setFullscreen,
  disabled,
  className,
  wrapperClassName,
  hideButtons,
  secondaryToolbar,
  showWildcardButton,
  widlcardItems,

  noScrollbar = disabled,
}: RichTextEditorProps & {
  editor: Editor | null;
  fullscreen: boolean;
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;

  showWildcardButton?: boolean;
  widlcardItems?: { id: string; label: string }[];
}) {
  return (
    <div className="prose relative max-w-none">
      {editor && (
        <div
          className={cn(
            "w-full rounded-[3px] bg-primary-100 px-4 pb-4 pt-2",
            disabled && "py-4",
            wrapperClassName,
            {
              "fixed left-0 top-0 z-[999] h-full": fullscreen,
            },
          )}
        >
          {!disabled && (
            <>
              <RichTextEditorToolbar
                editor={editor}
                fullscreen={fullscreen}
                setFullscreen={setFullscreen}
                showWildcardButton={showWildcardButton}
                widlcardItems={widlcardItems}
                hideButtons={hideButtons}
              />

              {secondaryToolbar ? secondaryToolbar(editor) : null}
            </>
          )}

          <div
            className={cn(
              "max-h-96 min-h-24 cursor-text overflow-y-scroll",
              noScrollbar && "no-scrollbar",
              className,
              {
                "!max-h-[calc(100%_-_44px)]": fullscreen,
              },
            )}
            {...(!disabled && {
              role: "button",
              tabIndex: 0,
              onClick: () => {
                editor?.commands.focus();
              },
              onKeyDown: (e) => {
                const isFromWrapper = e.currentTarget === e.target;

                if (isFromWrapper && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  editor?.commands.focus();
                }
              },
            })}
          >
            <EditorContent editor={editor} />
          </div>
        </div>
      )}
    </div>
  );
}

export function RichTextEditor({
  message,
  state,
  ...props
}: RichTextEditorProps) {
  const [fullscreen, setFullscreen] = useState(false);

  const editor = useRichTextEditor(props);

  const { showWildcardButton, widlcardItems } = useWildcardContext();

  const editorComponent = useMemo(
    () => (
      <RichTextEditorComponent
        {...props}
        editor={editor}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
        showWildcardButton={showWildcardButton}
        widlcardItems={widlcardItems}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props, editor, fullscreen, setFullscreen],
  );

  return (
    <StateAtomControlProvider state={state}>
      <div className="prose relative max-w-none overflow-hidden">
        {fullscreen && <Portal>{editorComponent}</Portal>}
        {!fullscreen && editorComponent}

        <StateAtomMessage {...message} />
      </div>
    </StateAtomControlProvider>
  );
}
