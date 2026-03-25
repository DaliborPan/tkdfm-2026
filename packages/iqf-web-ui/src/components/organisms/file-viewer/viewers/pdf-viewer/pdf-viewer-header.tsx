import { PanelLeft } from "lucide-react";
import {
  type ComponentProps,
  type PropsWithChildren,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import { PdfActionButton } from "./components/pdf-action-button";
import { PdfActions } from "./components/pdf-actions";
import { PdfDownload } from "./components/pdf-download";
import { PdfPagination } from "./components/pdf-pagination";
import { PdfRotate } from "./components/pdf-rotate";
import { PdfZoom } from "./components/pdf-zoom";

export type PdfViewerHeaderProps = PropsWithChildren<
  {
    file: File;
    paginationComponent?: ReactNode;
    rotationComponent?: ReactNode;
    onToggleThumbnail?: () => void;
    renderDownloadComponent?: (
      props: ComponentProps<typeof PdfDownload>,
    ) => ReactNode;
    renderThumbnailTrigger?: (
      props: ComponentProps<typeof PdfThumbnailTrigger>,
    ) => ReactNode;
  } & (
    | {
        zoomComponent?: ReactNode;
        scaleSteps?: never;
      }
    | {
        zoomComponent?: never;
        scaleSteps?: number[];
      }
  ) &
    (
      | {
          actionsComponent?: ReactNode;
          actionsChildren?: never;
        }
      | {
          actionsComponent?: never;
          actionsChildren?: (props: { headerWidth?: number }) => ReactNode;
        }
    )
>;

export function PdfViewerHeader({
  file,
  paginationComponent,
  zoomComponent,
  scaleSteps,
  rotationComponent,
  renderDownloadComponent,
  actionsComponent,
  actionsChildren,
  onToggleThumbnail,
  renderThumbnailTrigger,
  children,
}: PdfViewerHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  const headerWidth = useHeaderWidth(headerRef);

  return (
    <div
      ref={headerRef}
      className="flex shrink-0 items-center gap-4 border-b p-2 @container"
    >
      {onToggleThumbnail &&
        (renderThumbnailTrigger?.({ onToggleThumbnail }) || (
          <PdfThumbnailTrigger onToggleThumbnail={onToggleThumbnail} />
        ))}

      <div className="hidden font-bold @3xl:block">{file.name}</div>

      {paginationComponent || <PdfPagination />}

      {zoomComponent || <PdfZoom scaleSteps={scaleSteps} />}

      {rotationComponent || <PdfRotate />}

      {renderDownloadComponent?.({ file }) || <PdfDownload file={file} />}

      {children}

      {actionsComponent || (
        <PdfActions headerWidth={headerWidth}>
          {actionsChildren?.({ headerWidth })}
        </PdfActions>
      )}
    </div>
  );
}

function PdfThumbnailTrigger({
  onToggleThumbnail,
}: {
  onToggleThumbnail: PdfViewerHeaderProps["onToggleThumbnail"];
}) {
  return (
    <PdfActionButton
      iconLeft={{ Icon: PanelLeft }}
      onClick={() => {
        onToggleThumbnail?.();
      }}
    />
  );
}

function useHeaderWidth(ref: RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(() => {
      const styles = getComputedStyle(el);
      const px =
        parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      setWidth(el.clientWidth - px);
    });
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [ref]);

  return width;
}
