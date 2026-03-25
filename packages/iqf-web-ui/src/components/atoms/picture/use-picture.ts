import { useCallback, useState } from "react";

import { useIsoImageLoad } from "./use-iso-image-load";

function getWindowSize() {
  return {
    height: window.innerHeight,
    width: document.body.getBoundingClientRect().width,
  };
}

export function usePicture({
  placeholder,
  isAutoSizes,
  providedSizes,
}: {
  placeholder: string | undefined;
  isAutoSizes: boolean;
  providedSizes: string | undefined;
}) {
  const [autoSizes, setAutoSizes] = useState(providedSizes);

  const sizes = isAutoSizes ? autoSizes : providedSizes;

  const imageOnLoadCallback = useCallback((current: HTMLImageElement) => {
    const windowWidth = getWindowSize().width;
    const currentWidth = current.getBoundingClientRect().width || windowWidth;

    setAutoSizes(`${Math.ceil((currentWidth / windowWidth) * 100)}vw`);
  }, []);

  const [imageRef, imageOnLoad] = useIsoImageLoad(imageOnLoadCallback);

  const imageStyle = {
    ...(!!placeholder && {
      backgroundImage: `url(${placeholder})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }),
  };

  return {
    imageRef,
    imageOnLoad,
    sizes,
    imageStyle,
  };
}
