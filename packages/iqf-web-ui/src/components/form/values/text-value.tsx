"use client";

import { useMeasure } from "@uidotdev/usehooks";
import { useLayoutEffect, useRef, useState } from "react";

import { cn } from "../../../utils/cn";
import { Button } from "../../atoms/button";

export type TextValueProps = {
  value?: string | null;
  multiline?: boolean;

  className?: string;
};

export function TextValue({
  value = "",
  multiline,
  className = "",
}: TextValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [wrapperRef, { width }] = useMeasure<HTMLSpanElement>();

  const [isTruncated, setIsTruncated] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useLayoutEffect(() => {
    if (ref.current && multiline && !showMore) {
      setIsTruncated(
        ref.current.scrollWidth > ref.current.clientWidth ||
          ref.current.scrollHeight > ref.current.clientHeight,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, width]);

  return (
    <span
      ref={wrapperRef}
      className="flex w-full flex-col items-start overflow-hidden"
    >
      <span
        ref={ref}
        title={value ?? ""}
        className={cn(
          "h-8 w-full truncate text-sm leading-8",
          {
            ["h-auto min-h-8 whitespace-pre text-wrap leading-6"]: multiline,
            ["line-clamp-5"]: multiline && !showMore,
          },
          className,
        )}
      >
        {value}
      </span>

      {isTruncated && multiline && (
        <Button
          type="button"
          variant="link"
          className="text-blue-500 underline"
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? "Zobrazit méně" : "Zobrazit více"}
        </Button>
      )}
    </span>
  );
}
