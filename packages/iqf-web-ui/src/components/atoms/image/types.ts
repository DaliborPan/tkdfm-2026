import {
  type DetailedHTMLProps,
  type ImgHTMLAttributes,
  type SVGProps,
} from "react";

export type ImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  src: string;
  fill?: boolean;
};

export type SvgProps = SVGProps<SVGSVGElement> & {
  src: string;
  title?: string;
};
