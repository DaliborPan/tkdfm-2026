import { cva } from "class-variance-authority";
import { useRef } from "react";

import { cn, composeRefs } from "../../../../utils";
import { omit } from "../../../../utils/omit";
import { inputVariants } from "../const";
import { useResizeTextarea } from "../hooks/use-resize-textarea";
import { type TextAreaComponentProps } from "../types";
import { type ResizeType, determineResize, omitResizeClasses } from "../utils";

export function TextareaComponent({
  rows = 3,
  size = "s",
  variant = "secondary",
  disabled = false,
  autoComplete,
  autoCorrect,
  className,
  invalid,
  children,
  ref,
  ...props
}: TextAreaComponentProps) {
  // omit props that are not for textarea element
  // (unused rest of CommonInputProps)
  const restProps = omit(props, [
    "inputChild",
    "allowDisplayState",
    "multiline",
    "iconLeft",
    "iconRight",
    "message",
  ] as const);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resize = determineResize(className || "");

  const { ref: wrapperRef, onPointerDown } = useResizeTextarea(rows, resize);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      ref={wrapperRef}
      className={cn(
        inputVariants({
          size,
          variant,
          disabled,
          invalid,
          multiline: true,
        }),
        "input-wrapper",
      )}
      onClick={() => {
        if (!disabled) {
          textareaRef.current?.focus();
        }
      }}
    >
      <textarea
        ref={composeRefs(ref, textareaRef)}
        aria-invalid={!!invalid}
        disabled={disabled}
        rows={rows}
        className={cn(
          "h-full min-h-fit w-full resize-none bg-transparent outline-none",
          omitResizeClasses(className || ""),
        )}
        autoComplete={autoComplete ? "on" : "off"}
        autoCorrect={autoCorrect ? "on" : "off"}
        {...restProps}
      />
      {resize !== "resize-none" && (
        <TextAreaResizeButton resize={resize} onPointerDown={onPointerDown} />
      )}

      {children}
    </div>
  );
}

function TextAreaResizeButton({
  resize,
  onPointerDown,
}: {
  resize?: ResizeType;
  onPointerDown: (e: React.PointerEvent) => void;
}) {
  const variants = cva(
    ["absolute bottom-0 right-0 cursor-ns-resize touch-none p-0.5"],
    {
      variants: {
        resize: {
          resize: "cursor-nw-resize",
          "resize-x": "cursor-ew-resize",
          "resize-y": "cursor-ns-resize",
          "resize-none": "",
        },
      },
    },
  );

  return (
    <div
      role="button"
      tabIndex={-1}
      onPointerDown={onPointerDown}
      className={cn(variants({ resize }))}
    >
      <div className="relative size-4 overflow-hidden">
        <div className="absolute -right-0.5 bottom-2 h-[1px] w-full origin-bottom-right -rotate-45 bg-secondary-700" />
        <div className="absolute -right-0.5 bottom-1 h-[1px] w-full origin-bottom-right -rotate-45 bg-secondary-700" />
      </div>
    </div>
  );
}
