import { type FieldError } from "react-hook-form";

import { type AtomMessageProps } from "../../../atoms/atom-message";

/**
 * Creates a form-field bottom message from a message or an error.
 */
export const createFieldMessage = (
  message?: AtomMessageProps,
  error?: FieldError,
): AtomMessageProps | undefined =>
  message || error
    ? {
        text: error?.message ?? message?.text ?? "",
        icon: !error ? message?.icon : undefined,
        className: message?.className,
      }
    : undefined;
