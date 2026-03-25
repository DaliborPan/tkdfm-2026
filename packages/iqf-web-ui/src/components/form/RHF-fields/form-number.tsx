"use client";

import { FormInput, type FormInputProps } from "./form-input";

export type FormNumberProps = FormInputProps & { multiline?: false };

export function FormNumber(props: FormNumberProps) {
  return <FormInput {...props} type="number" />;
}
