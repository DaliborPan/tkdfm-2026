"use client";

import { Calendar, Clock } from "lucide-react";

import { type DateInputProps } from "../../molecules/date-input";
import { ChipValue } from "./chip-value";

export type DateValueProps = {
  // Expects a string in the format of a date returned from BE
  value?: string | null;

  type?: DateInputProps["type"];
};

export function DateValue({ value, type = "datetime-local" }: DateValueProps) {
  const date = formatDateValue({ value, type });

  return (
    <ChipValue
      icon={{ Icon: type === "time" ? Clock : Calendar }}
      value={date}
    />
  );
}

export function formatDateValue({ value, type }: DateValueProps) {
  if (!value) return undefined;

  if (type === "time") {
    return value.slice(0, 5);
  }

  if (type === "datetime-local") {
    return new Date(value).toLocaleDateString("cs-CZ", {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }

  return new Date(value).toLocaleDateString("cs-CZ", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}
