import { useRef } from "react";

import { composeRefs } from "../../../../utils";
import { cn } from "../../../../utils/cn";
import { omit } from "../../../../utils/omit";
import { Icon } from "../../icon";
import { inputVariants } from "../const";
import { type InputComponentProps } from "../types";
import { iconVariants } from "./input-icons";

export function InputComponent({
  type = "text",
  size = "s",
  variant = "secondary",
  disabled = false,
  autoComplete,
  autoCorrect,
  className,
  iconLeft,
  invalid,
  children,
  ref,
  ...props
}: InputComponentProps) {
  // omit props that are not for input element
  // (unused rest of CommonInputProps)
  const restProps = omit(props, [
    "inputChild",
    "allowDisplayState",
    "multiline",
    "iconRight",
    "message",
  ] as const);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={cn(
        inputVariants({
          size,
          variant,
          disabled,
          invalid,
          multiline: false,
        }),
        "input-wrapper",
      )}
      onClick={() => {
        if (!disabled) {
          inputRef.current?.focus();
        }
      }}
    >
      {iconLeft && (
        <Icon
          Icon={iconLeft.Icon}
          className={cn(
            iconVariants({ size, variant }),
            "mr-2",
            iconLeft.className,
          )}
        />
      )}

      <input
        ref={composeRefs(ref, inputRef)}
        aria-invalid={!!invalid}
        disabled={disabled}
        type={type}
        className={cn(
          "min-h-fit w-full bg-transparent outline-none",
          className,
        )}
        autoComplete={autoComplete ? "on" : "off"}
        autoCorrect={autoCorrect ? "on" : "off"}
        {...restProps}
      />

      {children}
    </div>
  );
}
