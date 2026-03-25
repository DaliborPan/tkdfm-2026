import {
  type Editor,
  Node,
  type NodeViewRendererProps,
  mergeAttributes,
} from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { useCallback } from "react";

export type NodeViewProps = NodeViewRendererProps;

/**
 * Returns the props of the node view.
 *
 * @example
 * ```tsx
 * const props = getNodeViewProps<{
 *   document: string;
 * }>(props);
 *
 * const parsedDocument = JSON.parse(props.document) as DocumentBrowseType;
 * ```
 */
export const getNodeViewProps = <TPropsType,>(props: NodeViewProps) => {
  return props.node.attrs as TPropsType;
};

/**
 * This component should be used to wrap a NodeView component.
 */
export const NodeViewProvider = NodeViewWrapper;

/**
 * Creates a new extension for the editor.
 */
export const createExtension = ({
  name,
  Component,
}: {
  /**
   * Extension name and prop name.
   */
  name: string;

  /**
   * Component, that is being rendered in the editor.
   */
  Component: any;
}) => {
  return Node.create({
    name,
    group: "inline",
    inline: true,

    addAttributes() {
      return {
        [name]: {
          default: {},
        },
        id: {
          default: "",
        },
      };
    },

    parseHTML() {
      return [
        {
          tag: name,
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return [
        name,
        mergeAttributes({
          ...HTMLAttributes,
        }),
      ];
    },

    addNodeView() {
      return ReactNodeViewRenderer(Component);
    },
  });
};

/**
 * Returns a function, that can be used to add a custom extension node to the editor.
 *
 * @param editor - The editor instance.
 * @param name - The name of the extension. The same name as in the `createExtension` function.
 *
 * You show be aware, that the `props` are being passed as a string.
 * Then, in a NodeView component, you need to parse the string to the original type.
 *
 * @example
 * ```tsx
 * const addDocumentReference = useAddCustomExtensionNode(editor, "document");
 *
 * addDocumentReference({
 *   props: { id: "doc-123", document: JSON.stringify(document) },
 * });
 * ```
 */
export function useAddCustomExtensionNodeFn(editor: Editor, name: string) {
  return useCallback(
    ({ props }: { props: any }) => {
      editor
        .chain()
        .focus()
        .insertContent({
          type: name,
          attrs: props,
        })
        .run();
    },
    [editor, name],
  );
}

/**
 * Returns a function, that can be used to update a custom extension node by its ID.
 *
 * @param editor - The editor instance.
 * @param name - The name of the extension. The same name as in the `createExtension` function.
 *
 * @example
 * ```tsx
 * const updateNodeById = useUpdateNodeById(editor, "document");
 *
 * updateNodeById({
 *   id: "doc-123",
 *   props: { id: "doc-123", document: JSON.stringify(updatedDocument) },
 * });
 * ```
 */
export function useUpdateCustomExtensionNodeFn(editor: Editor, name: string) {
  return useCallback(
    ({ id, props }: { id: string; props: any }) => {
      const { state } = editor;

      let targetNode = null;
      let targetPos: number | null = null;

      // Find node by ID
      state.doc.nodesBetween(0, state.doc.content.size, (node, pos) => {
        if (node.type.name === name && node.attrs.id === id) {
          targetNode = node;
          targetPos = pos;
        }
      });

      if (targetNode) {
        // Update the found node
        editor
          .chain()
          .focus()
          .command(({ tr }) => {
            if (!targetPos) {
              return false;
            }

            tr.setNodeMarkup(targetPos, undefined, props);
            return true;
          })
          .run();
      } else {
        console.warn(`Node with type "${name}" and id "${id}" not found`);
      }
    },
    [editor, name],
  );
}
