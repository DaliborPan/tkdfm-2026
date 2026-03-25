import { cn } from "../../../utils/cn";
import { Checkbox, type CheckboxProps } from "../../atoms/checkbox";

export type CheckboxValueProps = {
  value?: boolean | null;
  size?: CheckboxProps["size"];
  className?: string;
};

export function CheckboxValue({
  value = false,
  size = "s",
  className,
}: CheckboxValueProps) {
  return (
    <div className={cn("flex h-8 items-center", className)}>
      <Checkbox checked={!!value} size={size} disabled={true} />
    </div>
  );
}
