import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { WildcardComponent } from "./component";

export const Wildcard = Node.create({
  name: "wildcard",

  group: "inline",

  inline: true,

  addAttributes() {
    return {
      type: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "wildcard",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "wildcard",
      mergeAttributes({
        ...HTMLAttributes,
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(WildcardComponent);
  },
});
