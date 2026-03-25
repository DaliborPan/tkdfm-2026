import { type ImageProps } from "./types";

export function Image({
  alt,
  style,
  fill,
  fetchPriority,
  ...props
}: ImageProps) {
  return (
    <img
      alt={alt || ""}
      {...(!alt && {
        role: "presentation",
      })}
      style={{
        fontSize: 0,
        ...(fill && {
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }),

        ...style,
      }}
      // @ts-expect-error - unknown property fetchpriority
      // eslint-disable-next-line react/no-unknown-property
      fetchpriority={fetchPriority}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}
