import { type NodeViewRendererProps, NodeViewWrapper } from "@tiptap/react";

import { useWildcardContext } from "./context";

export function getWildcardLabel(
  type: string,
  items: { id: string; label: string }[],
) {
  const item = items.find((item) => item.id === type);

  return item?.label || type;
}

export function WildcardComponent(props: NodeViewRendererProps) {
  const { widlcardItems } = useWildcardContext();

  return (
    <NodeViewWrapper className="my-2 border-2 border-red-300" as="span">
      <span className="mb-0 text-center text-sm text-red-400">
        {getWildcardLabel(props.node.attrs?.type, widlcardItems)}
      </span>
    </NodeViewWrapper>
  );
}
