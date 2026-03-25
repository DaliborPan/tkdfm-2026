import { cn } from "../../../../../utils";
import { Chip } from "../../../../atoms/chip";
import { type ChipProps } from "../../../../atoms/chip/types";
import { type IconProps } from "../../../../atoms/icon/types";
import { TextValue } from "./text-value";

export type ChipValueProps = ChipProps & {
  value?: string;
  icon?: IconProps;
  href?: string;
  className?: string;
  textClassName?: string;
};

export function ChipValue({
  value,
  icon,
  textClassName,
  className,
  ...props
}: ChipValueProps) {
  return value ? (
    <div className={cn("flex min-h-8 items-center", className)}>
      <Chip
        inverse={true}
        variant="secondary"
        iconLeft={icon}
        size="xs"
        {...props}
      >
        <span title={value} className={cn("!block truncate", textClassName)}>
          {value}
        </span>
      </Chip>
    </div>
  ) : (
    <TextValue value="" />
  );
}
