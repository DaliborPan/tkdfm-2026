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
    <ResizablePanelGroup
      className={cn(
        "flex grow flex-col items-stretch",
        "[&>div[data-panel=true]]:!m-2",
        !itemId && "[&>div[data-panel=true]]:!flex-1",
        itemId &&
          "[&>div[data-panel=true]:first-child]:hidden md:[&>div[data-panel=true]:first-child]:flex",
      )}
    >
      <ResizablePanel
        id="evidence-table"
        className="@container/table flex flex-col rounded-lg border"
      >
        {table}
      </ResizablePanel>

      {itemId && (
        <>
          <ResizableSeparator className="hidden md:flex" withHandle={true} />
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
            className="rounded-lg border"
          >
            {detail}
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
}
