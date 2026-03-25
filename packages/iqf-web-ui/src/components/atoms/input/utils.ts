export type ResizeType = "resize" | "resize-x" | "resize-y" | "resize-none";

function isResizeType(value: string): value is ResizeType {
  return ["resize-none", "resize-y", "resize-x", "resize"].includes(value);
}

/**
 * Extracts the resize type (class) from a string of class names.
 *
 * @param className - A string containing multiple class names.
 * @returns The resize type if found, otherwise undefined.
 */
export function determineResize(className: string): ResizeType | undefined {
  return className.split(/\s+/).findLast(isResizeType);
}

/**
 * Removes any resize-related classes from a string of class names.
 *
 * @param className - A string containing multiple class names.
 * @returns A new string with resize-related classes removed.
 */
export function omitResizeClasses(className: string): string {
  const resizeClasses = ["resize-none", "resize-y", "resize-x", "resize"];
  const classes = className.split(/\s+/);
  const filteredClasses = classes.filter(
    (c) => !resizeClasses.includes(c.trim()),
  );
  return filteredClasses.join(" ").trim();
}
