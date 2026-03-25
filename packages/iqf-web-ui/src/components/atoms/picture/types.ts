import { type ComponentProps } from "react";

import { type Image } from "../image";

export type PictureType = {
  img: {
    src: string;
    w: number;
    h: number;
  };
  sources: Partial<Record<string, string>>;
};

export type PictureProps = Omit<
  ComponentProps<typeof Image>,
  "src" | "srcSet"
> & {
  picture: PictureType;
  placeholder?: string;
  mimeTypeOrder?: string[];
  autoSizes?: boolean;
  keepAspectRatio?: boolean;
};
