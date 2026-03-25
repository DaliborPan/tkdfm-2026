import { TextValue } from "./text-value";

export type PeriodValueProps = {
  value?: string;
  className?: string;
};

export function PeriodValue({ value, className = "" }: PeriodValueProps) {
  return <TextValue value={parseValue(value)} className={className} />;
}

function parseValue(value?: string) {
  return value?.replace(/[^0-9]/g, "");
}
