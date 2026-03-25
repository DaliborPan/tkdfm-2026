import { TextValue } from "./text-value";

export type NumberValueProps = {
  value?: number;
  className?: string;
};

export function NumberValue({ value, className = "" }: NumberValueProps) {
  return <TextValue value={value?.toString()} className={className} />;
}
