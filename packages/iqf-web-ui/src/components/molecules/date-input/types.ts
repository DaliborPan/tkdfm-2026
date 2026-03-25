import { type InputComponentProps } from "../../atoms/input/types";

export type DateInputProps = Omit<InputComponentProps, "type" | "onChange"> & {
  type?: "date" | "time" | "datetime-local";

  /**
   * @param value - `null` if input does not have a full correct date value, string otherwise
   * - date: YYYY-MM-DD
   * - time: HH:mm
   * - datetime-local, instant: YYYY-MM-DDTHH:mm
   */
  onChange?: (value: string | null) => void;
};
