import { type SvgProps } from "./types";

export function Svg({
  src,
  title,
  height = 24,
  width = 24,
  fill = "currentColor",
  ...props
}: SvgProps) {
  return (
    <svg
      role={title ? "img" : "presentation"}
      height={height}
      width={width}
      fill={fill}
      {...props}
    >
      {!!title && <title>{title}</title>}
      <use href={src} />
    </svg>
  );
}
