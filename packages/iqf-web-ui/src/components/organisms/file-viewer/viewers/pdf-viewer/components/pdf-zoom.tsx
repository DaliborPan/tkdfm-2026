import { ZoomIn, ZoomOut } from "lucide-react";
import { useIntl } from "react-intl";

import { Select } from "../../../../../atoms/select";
import { usePdfViewerContext } from "../pdf-viewer-provider";
import { PdfActionButton } from "./pdf-action-button";

export function PdfZoom({
  scaleSteps = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 300, 400, 500,
  ],
}: {
  scaleSteps?: number[];
}) {
  const intl = useIntl();

  const { scale, setScale } = usePdfViewerContext();

  const options = createZoomOptions(scaleSteps);

  const getNextScaleStep = (currentScale: number): number => {
    const currentIndex = scaleSteps.indexOf(currentScale);
    if (currentIndex !== -1 && currentIndex < scaleSteps.length - 1) {
      return scaleSteps[currentIndex + 1];
    }

    const nextStep = scaleSteps.find((step) => step > currentScale);

    return nextStep || scaleSteps[scaleSteps.length - 1];
  };

  const getPreviousScaleStep = (currentScale: number): number => {
    const currentIndex = scaleSteps.indexOf(currentScale);
    if (currentIndex !== -1 && currentIndex > 0) {
      return scaleSteps[currentIndex - 1];
    }

    const previousStep = [...scaleSteps]
      .reverse()
      .find((step) => step < currentScale);

    return previousStep || scaleSteps[0];
  };

  const titleZoomIn = intl.formatMessage({
    id: "pdf.zoom-in",
    defaultMessage: "Přiblížit",
  });

  const titleZoomOut = intl.formatMessage({
    id: "pdf.zoom-out",
    defaultMessage: "Oddálit",
  });

  return (
    <div className="flex items-center gap-1">
      <PdfActionButton
        title={titleZoomOut}
        aria-label={titleZoomOut}
        onClick={() => setScale(getPreviousScaleStep(scale))}
        iconLeft={{ Icon: ZoomOut }}
        disabled={scale <= scaleSteps[0]}
      />

      <Select
        className="hidden min-w-24 @3xl:inline-flex"
        options={options}
        value={options.find((o) => o.value === scale)}
        onChange={(value) => {
          const actualValue = value?.value;
          setScale(actualValue || 100);
        }}
        optionLabelMapper={(option) => option.label}
        showClearButton={false}
        enableSearch={false}
      />

      <PdfActionButton
        title={titleZoomIn}
        aria-label={titleZoomIn}
        onClick={() => setScale(getNextScaleStep(scale))}
        iconLeft={{ Icon: ZoomIn }}
        disabled={scale >= scaleSteps[scaleSteps.length - 1]}
      />
    </div>
  );
}

const createZoomOptions = (scaleSteps: number[]) => {
  return scaleSteps.map((step) => ({
    id: step.toString(),
    value: step,
    label: `${step}%`,
  }));
};
