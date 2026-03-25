import { cn } from "../../../utils/cn";
import { Pictogram } from "../../atoms/pictogram";
import { type PictogramProps } from "../../atoms/pictogram/pictogram";

export type LogoProps = {
  sitename: React.ReactNode;
  href?: string;
  size?: "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  linkProps?: {
    className?: string;
  };
  pictogramProps: PictogramProps;
};

/**
 * @deprecated will be removed in the future
 */
export function Logo({
  sitename,
  href = "/",
  size = "m",
  linkProps,
  pictogramProps,
}: LogoProps) {
  return (
    <a
      href={href}
      className={cn("flex items-center no-underline", linkProps?.className)}
    >
      <Pictogram {...pictogramProps} size={size} />
      <span className={cn("ml-3 truncate text-white", `iqf-text--${size}`)}>
        {sitename}
      </span>
    </a>
  );
}
