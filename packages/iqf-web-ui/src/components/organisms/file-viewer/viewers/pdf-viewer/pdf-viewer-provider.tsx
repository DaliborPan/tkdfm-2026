import {
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
  createContext,
  useContext,
  useId,
  useRef,
  useState,
} from "react";

import { createPageId, scrollToPage } from "./utils";

export type PdfViewType = "scroll" | "one-page";

type PdfViewerState = {
  /**
   * The current scale (zoom level) of the PDF viewer, represented as a percentage.
   */
  scale: number;

  /**
   * The current rotation angle of the PDF viewer in degrees.
   */
  rotation: number;

  /**
   * The current page number being viewed (1-based index).
   */
  pageNumber: number;

  /**
   * The total number of pages in the PDF document.
   */
  numPages: number;

  /**
   * The current view mode of the PDF viewer, either "scroll" or "one-page".
   */
  view: PdfViewType;

  /**
   * Indicates if the viewer is currently performing a programmatic (code-initiated) scroll action.
   * This helps differentiate between user-initiated and code-initiated scrolling.
   */
  isProgrammaticallyScrolling: boolean;

  /**
   * Indicates if the user has scrolled to the bottom of the PDF document.
   */
  isScrolledToBottom: boolean;
};

type PdfViewerActions = {
  /**
   * Set the scale (zoom level) of the PDF viewer.
   *
   * @param scale - The new scale value (e.g., 100 for 100%).
   */
  setScale: Dispatch<SetStateAction<number>>;

  /**
   * Set the current page number being viewed.
   *
   * @param pageNumber - The new page number (1-based index).
   */
  setPageNumber: Dispatch<SetStateAction<number>>;

  /**
   * Set the total number of pages in the PDF document.
   *
   * @param numPages - The total number of pages.
   */
  setNumPages: Dispatch<SetStateAction<number>>;

  /**
   * Set the current view mode of the PDF viewer.
   *
   * @param view - The new view mode, either "scroll" or "one-page".
   */
  setView: Dispatch<SetStateAction<PdfViewType>>;

  /**
   * Set whether the viewer is currently performing a programmatic scroll action.
   *
   * @param isProgrammaticallyScrolling - true if a programmatic scroll is in progress, false otherwise.
   */
  setIsProgrammaticallyScrolling: Dispatch<SetStateAction<boolean>>;

  /**
   * Set whether the user has scrolled to the bottom of the PDF document.
   *
   * @param isScrolledToBottom - true if the user is at the bottom, false otherwise.
   */
  setIsScrolledToBottom: Dispatch<SetStateAction<boolean>>;

  /**
   * Change to a specific page in the PDF document.
   *
   * @param page - The page number to navigate to (1-based index).
   */
  changePage: (page: number) => void;

  /**
   * Rotates the PDF view 90 degrees clockwise.
   */
  rotateClockwise: () => void;

  /**
   * Rotates the PDF view 90 degrees counter-clockwise.
   */
  rotateCounterClockwise: () => void;
};

type PdfViewerContextType = PdfViewerState &
  PdfViewerActions & {
    /**
     * Reference to the scrollable container element of the PDF viewer.
     */
    scrollContainerRef: RefObject<HTMLDivElement | null>;

    /**
     * Unique identifier for this PDF viewer instance.
     */
    id: string;
  };

const PdfViewerContext = createContext<PdfViewerContextType | undefined>(
  undefined,
);

export const usePdfViewerContext = (): PdfViewerContextType => {
  const context = useContext(PdfViewerContext);
  if (!context) {
    throw new Error(
      "usePdfViewerContext must be used within a PdfViewerProvider",
    );
  }
  return context;
};

export type PdfViewerProviderProps = {
  children: ReactNode;
  initialScale?: number;
  initialRotation?: number;
  initialPage?: number;
  initialView?: PdfViewType;
};

export function PdfViewerProvider({
  children,
  initialScale = 100,
  initialRotation = 0,
  initialPage = 1,
  initialView = "scroll",
}: PdfViewerProviderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const id = useId();

  const [scale, setScale] = useState(initialScale);

  const [rotation, setRotation] = useState(initialRotation);

  const [pageNumber, setPageNumber] = useState(initialPage);

  const [numPages, setNumPages] = useState(0);

  const [view, setView] = useState<PdfViewType>(initialView);

  const [isProgrammaticallyScrolling, setIsProgrammaticallyScrolling] =
    useState(true);

  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const changePage: PdfViewerActions["changePage"] = (page) => {
    if (view === "one-page") {
      setPageNumber(page);
    } else if (view === "scroll") {
      setIsProgrammaticallyScrolling(true);
      setPageNumber(page);

      const pageId = createPageId(id, page);
      scrollToPage(scrollContainerRef, pageId);
    }
  };

  const rotateClockwise: PdfViewerActions["rotateClockwise"] = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const rotateCounterClockwise: PdfViewerActions["rotateCounterClockwise"] =
    () => {
      setRotation((prev) => (prev - 90 + 360) % 360);
    };

  return (
    <PdfViewerContext
      value={{
        scale,
        setScale,
        pageNumber,
        setPageNumber,
        numPages,
        setNumPages,
        view,
        setView,
        isProgrammaticallyScrolling,
        setIsProgrammaticallyScrolling,
        isScrolledToBottom,
        setIsScrolledToBottom,
        scrollContainerRef,
        changePage,
        rotation,
        rotateClockwise,
        rotateCounterClockwise,
        id,
      }}
    >
      {children}
    </PdfViewerContext>
  );
}
