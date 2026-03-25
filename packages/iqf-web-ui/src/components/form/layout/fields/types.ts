import { type ReactNode } from "react";

export type CommonLayoutFieldProps = {
  required?: boolean;

  layoutClassName?: string;
  labelClassName?: string;
  tooltip?: ReactNode;
};
