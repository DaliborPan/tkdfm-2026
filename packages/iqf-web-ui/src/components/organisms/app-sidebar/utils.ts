export function isActive(paths: string[], href?: string) {
  if (!href) {
    return false;
  }

  return paths.some((path) => {
    const segments = path.split("/");
    const locationSegments = href.split("/");

    return segments.every(
      (segment, index) =>
        segment.startsWith(":") || segment === locationSegments[index],
    );
  });
}
