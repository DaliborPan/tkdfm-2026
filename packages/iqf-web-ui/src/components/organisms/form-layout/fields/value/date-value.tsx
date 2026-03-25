import { Calendar } from "lucide-react";

import { type DateInputProps } from "../../../../molecules/date-input/types";
import { ChipValue } from "./chip-value";

export type DateValueProps = {
  // Expects a string in the format of a date returned from BE
  value?: string | null;

  type?: DateInputProps["type"];
};

export function DateValue({ value, type = "datetime-local" }: DateValueProps) {
  const date = formatDateValue({ value, type });

  return <ChipValue icon={{ Icon: Calendar }} value={date} />;
}

export function formatDateValue({ value, type }: DateValueProps) {
  if (!value) return undefined;

  if (type === "datetime-local") {
    return new Date(value).toLocaleDateString("cs-CZ", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return new Date(value).toLocaleDateString("cs-CZ");
}
