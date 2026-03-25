import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { PageBreakComponent } from "./component";

export const PageBreak = Node.create({
  name: "pageBreak",

  group: "block",

  atom: true,

  parseHTML() {
    return [
      {
        tag: "div",
        attrs: {
          "data-page-break": true,
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes({
        ...HTMLAttributes,
        "data-page-break": true,
        style:
          "line-height: 100%; margin-bottom: 0mm; page-break-before: always",
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(PageBreakComponent);
  },
});
