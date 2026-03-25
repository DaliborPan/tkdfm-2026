"use client";

import { Image } from "../image";
import { type PictureProps } from "./types";
import { usePicture } from "./use-picture";

/**
 * IMPORTANT: If you want to use this component, you need to
 * install `vite-thumbhash` and `vite-imagetools` packages and
 * add plugins in your vite config. Then, add this line to your vite-env.d.ts file:
 *
 * ```
 * /// <reference types="vite-thumbhash/types/images" />
 * ```
 *
 * You can import images like this:
 *
 * ```
 * import placeholder from "@/img/image1.jpg?thumb";
 * import picture from "@/img/image1.jpg?w=500;900;1200&format=avif;webp&as=picture";
 * ```
 *
 * And use them like this:
 *
 * <Picture picture={picture} placeholder={placeholder} />
 */
export function Picture({
  picture,
  placeholder,
  mimeTypeOrder = ["avif", "webp"],
  autoSizes = true,
  keepAspectRatio = false,
  ...props
}: PictureProps) {
  const {
    img: { src, w, h },
    sources,
  } = picture;

  const { imageRef, imageOnLoad, sizes, imageStyle } = usePicture({
    placeholder,
    isAutoSizes: autoSizes,
    providedSizes: props.sizes,
  });

  const style = {
    ...props.style,

    ...(!!keepAspectRatio && {
      aspectRatio: w / h,
    }),

    ...imageStyle,
  };

  return (
    <picture>
      {mimeTypeOrder.map((type) => {
        const srcSet = sources[type];
        const mime = `image/${type}`;

        return srcSet ? (
          <source key={mime} type={mime} srcSet={srcSet} sizes={sizes} />
        ) : null;
      })}
      <Image
        {...props}
        ref={imageRef}
        onLoad={imageOnLoad}
        src={src}
        sizes={sizes}
        style={style}
      />
    </picture>
  );
}
