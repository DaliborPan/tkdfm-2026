import { useRef } from "react";

import { cn } from "iqf-web-ui/cn";
import { useEvidenceParams } from "iqf-web-ui/evidence";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableSeparator,
} from "iqf-web-ui/layout";
import { usePreferences } from "iqf-web-ui/settings";

import { useEvidenceContext } from "./context";
import { type EvidenceProps } from "./types";

type EvidenceLayoutProps = Pick<EvidenceProps, "table" | "detail"> & {
  defaultDetailSize: number;
};

export function EvidenceLayout({
  table,
  detail,
  defaultDetailSize,
}: EvidenceLayoutProps) {
  const { itemId } = useEvidenceParams();
  const { name, version = 1 } = useEvidenceContext();

  const [detailPanelSize, setDetailPanelSize] = usePreferences({
    preferenceGroupKey: name,
    version,
    preferenceKey: "detailPanelSize",
    defaultValue: defaultDetailSize,
  });

  const initialDetailPanelSize = useRef(detailPanelSize);

  return (
    <ResizablePanelGroup className="flex grow flex-col items-stretch">
      <ResizablePanel
        id="evidence-table"
        className={cn(
          "@container/table m-3 flex-col rounded-lg border md:flex",
          itemId ? "hidden" : "flex",
        )}
        minSize={0}
        maxSize={100}
      >
        {table}
      </ResizablePanel>

      <ResizableSeparator
        className={cn(itemId && "hidden md:flex")}
        withHandle={true}
      />

      {itemId && (
        <ResizablePanel
          id="evidence-detail"
          minSize="25%"
          maxSize="100%"
          style={{
            overflowY: "auto",
          }}
          defaultSize={`${initialDetailPanelSize.current}%`}
          onResize={(size) => {
            setDetailPanelSize(size.asPercentage);
          }}
          className="my-3 mr-3 rounded-lg border"
        >
          {detail}
        </ResizablePanel>
      )}
    </ResizablePanelGroup>
  );
}
