import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { type PropsWithChildren, type ReactNode, useState } from "react";
import { Document, pdfjs } from "react-pdf";

import { type OmitDiscriminatedUnion } from "../../../../../types";
import { cn } from "../../../../../utils/cn";
import { PdfThumbnail } from "./components/pdf-thumbnail";
import { PdfPages } from "./pdf-pages/pdf-pages";
import {
  PdfViewerHeader,
  type PdfViewerHeaderProps,
} from "./pdf-viewer-header";
import {
  PdfViewerProvider,
  type PdfViewerProviderProps,
  usePdfViewerContext,
} from "./pdf-viewer-provider";

// Use CDN worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type BasePdfViewerProps = {
  file: File;
  className?: string;
  children?: ReactNode;
};

type PdfViewerWithCustomThumbnailHeader = {
  initialOpenThumbnail?: boolean;
  showThumbnail?: true;
  header: (props: PdfViewerHeaderProps["onToggleThumbnail"]) => ReactNode;
  headerChildren?: never;
};

type PdfViewerWithCustomHeader = {
  initialOpenThumbnail?: never;
  showThumbnail: false;
  header: ReactNode;
  headerChildren?: never;
};

type PdfViewerWithDefaultHeader = OmitDiscriminatedUnion<
  PdfViewerHeaderProps,
  "file" | "children" | "onToggleThumbnail" | "renderThumbnailTrigger"
> & {
  header?: never;
  headerChildren?: ReactNode;
} & (
    | {
        showThumbnail?: true;
        initialOpenThumbnail?: boolean;
        renderThumbnailTrigger?: PdfViewerHeaderProps["renderThumbnailTrigger"];
      }
    | {
        showThumbnail: false;
        initialOpenThumbnail?: never;
        renderThumbnailTrigger?: never;
      }
  );

export type PdfViewerProps = PropsWithChildren<
  BasePdfViewerProps &
    (
      | PdfViewerWithCustomThumbnailHeader
      | PdfViewerWithCustomHeader
      | PdfViewerWithDefaultHeader
    )
>;

function InternalPdfViewer({
  file,
  className,
  header,
  children,
  headerChildren,
  showThumbnail = true,
  initialOpenThumbnail,
  ...headerProps
}: PdfViewerProps) {
  const { setNumPages } = usePdfViewerContext();

  const [isOpenThumbnail, setIsOpenThumbnail] = useState(initialOpenThumbnail);

  const [loadedDocument, setLoadedDocument] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoadedDocument(true);
  };

  return (
    <div
      className={cn(
        "flex h-full w-full flex-1 flex-col overflow-hidden border",
        className,
      )}
    >
      {typeof header === "function" ? (
        header(() => setIsOpenThumbnail((prev) => !prev))
      ) : header !== undefined ? (
        header
      ) : (
        <PdfViewerHeader
          file={file}
          {...(showThumbnail && {
            onToggleThumbnail: () => setIsOpenThumbnail((prev) => !prev),
          })}
          {...headerProps}
        >
          {headerChildren}
        </PdfViewerHeader>
      )}

      <Document
        // NOTE: key prop is fix for react-pdf issue https://github.com/wojtekmaj/react-pdf/issues/974
        key={file.name + file.lastModified}
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => console.error("Error loading PDF:", error)}
        className="flex flex-1 overflow-hidden bg-secondary-600"
        loading={null}
      >
        {loadedDocument && (
          <>
            {showThumbnail && <PdfThumbnail hidden={!isOpenThumbnail} />}
            <div className="flex min-w-0 flex-1 flex-col">
              <PdfPages />
            </div>
          </>
        )}
      </Document>

      {children}
    </div>
  );
}

type PdfViewerComponentProps = PdfViewerProps &
  Omit<PdfViewerProviderProps, "children">;

export function PdfViewer({
  initialOpenThumbnail,
  initialPage,
  initialRotation,
  initialScale,
  initialView,
  ...props
}: PdfViewerComponentProps) {
  const viewerProps =
    props.showThumbnail !== false
      ? { ...props, initialOpenThumbnail: initialOpenThumbnail ?? true }
      : props;

  return (
    <PdfViewerProvider
      initialPage={initialPage}
      initialRotation={initialRotation}
      initialScale={initialScale}
      initialView={initialView}
    >
      <InternalPdfViewer {...viewerProps} />
    </PdfViewerProvider>
  );
}
