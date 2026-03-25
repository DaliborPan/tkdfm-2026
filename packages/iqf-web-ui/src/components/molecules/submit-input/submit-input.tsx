import { CirclePlus } from "lucide-react";
import { useRef } from "react";

import { composeRefs } from "../../../utils";
import { cn } from "../../../utils/cn";
import { omit } from "../../../utils/omit";
import { Input } from "../../atoms/input";
import { submitInputWrapperVariants } from "./const";
import { InputChildButton } from "./input-child-button";
import { type SubmitInputProps } from "./types";

export function SubmitInput({
  Icon = CirclePlus,
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
}: SubmitInputProps) {
  const localRef = useRef<HTMLInputElement | null>(null);

  const onSubmit: SubmitInputProps["onSubmit"] = (value) => {
    props.onSubmit(value);

    if (clearAfterSubmit && localRef.current) {
      localRef.current.value = "";
    }
  };

  return (
    <div className={cn(submitInputWrapperVariants({ size }))}>
      <Input
        ref={composeRefs(localRef, ref)}
        size={size}
        onKeyDown={(e) => {
          onKeyDown?.(e);

          if (e.key === "Enter") {
            // Not to submit form
            e.preventDefault();

            onSubmit(localRef.current?.value);
          }
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
