import { Checkbox } from "../../../../atoms/checkbox";

export type CheckboxValueProps = {
  value?: boolean;
};

export function CheckboxValue({ value = false }: CheckboxValueProps) {
  return (
    <div className="flex h-8 items-center">
      <Checkbox checked={value} disabled={true} />
    </div>
  );
}
