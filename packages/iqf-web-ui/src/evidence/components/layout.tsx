import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import { useIntl } from "react-intl";

import { Button } from "../../components/atoms/button";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableSeparator,
} from "../../components/molecules/layout";
import { SentryErrorBoundary } from "../../sentry";
import { SentryDefaultButtons } from "../../sentry/components/sentry-default-buttons";
import { usePreferences } from "../../settings";
import { cn } from "../../utils/cn";
import { useEvidenceContext } from "../context";
import { useEvidenceParams } from "../hooks/evidence-params";
import { type EvidenceProps } from "../types";

export function EvidenceLayout({
  table,
  detail,
  defaultDetailSize = 50,
}: Pick<EvidenceProps, "table" | "detail" | "defaultDetailSize">) {
  const intl = useIntl();

  const { itemId } = useEvidenceParams();
  const { id, version, url } = useEvidenceContext();

  const [detailPanelSize, setDetailPanelSize] = usePreferences({
    preferenceGroupKey: id,
    version,
    preferenceKey: "detailPanelSize",
    defaultValue: defaultDetailSize,
  });

  /**
   * Panel#defaultSize does not actually work as `default` only.
   * Changing `defaultSize` on resize makes it stop working.
   */
  const initialDetailPanelSize = useRef(detailPanelSize);

  return (
    <ResizablePanelGroup
      className={cn(
        "[&>div[data-panel=true]]:!m-2",
        !itemId && "[&>div[data-panel=true]]:!flex-1",
        itemId &&
          "[&>div[data-panel=true]:first-child]:hidden md:[&>div[data-panel=true]:first-child]:flex",
      )}
    >
      <ResizablePanel
        id="evidence-table"
        className="flex flex-col rounded-lg border @container/table"
      >
        <SentryErrorBoundary
          feature="data-table"
          contexts={{
            evidenceId: id,
            itemId,
          }}
        >
          {table}
        </SentryErrorBoundary>
      </ResizablePanel>

      {itemId && (
        <>
          <ResizableSeparator className="hidden md:flex" withHandle={true} />
          <ResizablePanel
            id="evidence-detail"
            minSize="25%"
            maxSize="100%"
            defaultSize={`${initialDetailPanelSize.current}%`}
            onResize={(size) => {
              setDetailPanelSize(size.asPercentage);
            }}
            className="rounded-lg border"
          >
            <SentryErrorBoundary
              feature="data-form"
              contexts={{
                evidenceId: id,
                itemId,
              }}
              actions={
                <div className="flex w-full flex-col gap-4">
                  <Button href={url} iconLeft={{ Icon: ArrowLeft }}>
                    {intl.formatMessage({
                      id: "evidence.layout.buttons.close-detail.text",
                      defaultMessage: "Zavřít detail",
                    })}
                  </Button>
                  <SentryDefaultButtons />
                </div>
              }
            >
              {detail}
            </SentryErrorBoundary>
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
}
