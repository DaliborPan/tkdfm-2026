import { usePdfViewerContext } from "../pdf-viewer-provider";
import { OnePageView } from "./one-page-view";
import { ScrollView } from "./scroll-view";

export function PdfPages() {
  const { view } = usePdfViewerContext();

  return view === "one-page" ? <OnePageView /> : <ScrollView />;
}
