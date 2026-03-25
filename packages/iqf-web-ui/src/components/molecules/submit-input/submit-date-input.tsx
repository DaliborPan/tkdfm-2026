import { Plus } from "lucide-react";
import { useRef } from "react";

import { composeRefs } from "../../../utils";
import { cn } from "../../../utils/cn";
import { omit } from "../../../utils/omit";
import { DateInput } from "../date-input";
import { submitInputWrapperVariants } from "./const";
import { InputChildButton } from "./input-child-button";
import { type SubmitDateInputProps } from "./types";

export function SubmitDateInput({
  Icon = Plus,
  submitButtonProps: {
    className: submitButtonClassName,
    ...submitButtonProps
  } = {},
  onKeyDown,
  size = "s",
  inputChild,
  clearAfterSubmit,
  ref,
  ...props
}: SubmitDateInputProps) {
  const localRef = useRef<HTMLInputElement | null>(null);

  const onSubmit: SubmitDateInputProps["onSubmit"] = (value) => {
    props.onSubmit(value);

    if (clearAfterSubmit && localRef.current) {
      localRef.current.value = "";
    }
  };

  return (
    <div className={cn(submitInputWrapperVariants({ size }))}>
      <DateInput
        ref={composeRefs(localRef, ref)}
        size={size}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            // Not to submit form
            e.preventDefault();

            onSubmit(localRef.current?.value);
          }

          onKeyDown?.(e);
        }}
        inputChild={
          <>
            {inputChild}

            <InputChildButton
              {...submitButtonProps}
              size={size}
              Icon={Icon}
              className={submitButtonClassName}
              onClick={() => onSubmit(localRef.current?.value)}
            />
          </>
        }
        {...omit(props, ["onSubmit"])}
      />
    </div>
  );
}
