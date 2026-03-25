import Editor from "@monaco-editor/react";
import merge from "lodash/merge";
import type * as monaco from "monaco-editor";

import { type StateAtomControlContextType } from "../state-atom-control/types";
import { registerGroovyLanguageForMonaco } from "./groovy-language-definition";

export type MonacoEditorProps = {
  height?: number | string;
  width?: number | string;
  value: string;
  language: string;
  theme?: string;
  disabled?: boolean;
  options?: monaco.editor.IEditorOptions;
  onChange?: (
    newValue: string | undefined,
    e: monaco.editor.IModelContentChangedEvent,
  ) => void;

  /**
   * Input's state. For `FormInput`, state is passed via `FormControl` component.
   */
  state?: StateAtomControlContextType["state"];
};

export function MonacoEditor({
  width = "100%",
  height = "600px",
  value,
  language,
  disabled = false,
  theme = "vs",
  options,
  onChange,
  // NOTE: work with `state` if needed in the future
  // state,
}: MonacoEditorProps) {
  const mergedOptions = merge(
    {
      selectOnLineNumbers: true,
      readOnly: disabled,
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
      wordWrap: "on",
      wrappingIndent: "indent",
      folding: true,
      scrollBeyondLastLine: false,
    },
    options,
  );

  return (
    <Editor
      loading="Načítám..."
      width={width}
      height={height}
      language={language}
      theme={theme}
      value={value}
      options={mergedOptions}
      onChange={onChange}
      beforeMount={(monaco) => {
        registerGroovyLanguageForMonaco(monaco);
      }}
    />
  );
}
