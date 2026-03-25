import { useMeasure } from "@uidotdev/usehooks";
import { EllipsisVertical } from "lucide-react";
import { Fragment, type ReactNode, useEffect, useRef, useState } from "react";

import { type PropsWithElementRef } from "../../../types";
import { cn } from "../../../utils/cn";
import { type ButtonProps } from "../button/types";
import { Popover } from "../popover";
import { Button } from "./../button";
import { ButtonGroupSeparator } from "./button-group-separator";

const SEPARATOR_SIZE = 21;
const GAP_SIZE = 4;

export type ButtonGroup = {
  buttons: (ButtonProps & {
    renderCustom?: () => ReactNode;
  })[];
  size?: ButtonProps["size"];
};

function useWrapperWidth() {
  const [ref, { width }] = useMeasure();

  const [, forceUpdate] = useState(0);

  // rerender after width is changed
  useEffect(() => {
     
    forceUpdate((prev) => prev + 1);
  }, [width]);

  return {
    wrapperRef: ref,
    wrapperWidth: width ?? 0,
  };
}

function useButtonGroupWidth(
  groupSizes: number[],
  wrapperWidth: number,
  hideSeparators: boolean,
) {
  const separatorSize = hideSeparators ? GAP_SIZE : SEPARATOR_SIZE;

  // calculate index from which the buttons should be hidden
  const { width: buttonGroupWidth, index } = groupSizes.reduce(
    (acc, size, index) => {
      if (acc.stop) {
        return acc;
      }

      if (acc.width + size + separatorSize > wrapperWidth) {
        return {
          width: acc.width,
          index,
          stop: true,
        };
      }

      return {
        width: acc.width + size + separatorSize,
        index: index + 1,
        stop: false,
      };
    },
    {
      width: 0,
      index: 0,
      stop: false,
    },
  );

  return {
    buttonGroupWidth: Math.max(buttonGroupWidth - separatorSize, 0),
    lastRenderedIndex: index - 1,
  };
}

export function Group({
  buttons,
  size = "xs",
  ref,
}: PropsWithElementRef<ButtonGroup, HTMLDivElement>) {
  return (
    <div
      className={cn("flex gap-x-1")}
      ref={ref}
      role="group"
      aria-label="Button group"
    >
      {buttons.map((button, index) => {
        if (button.renderCustom) {
          return (
            <Fragment key={button.key || index}>
              {button.renderCustom()}
            </Fragment>
          );
        }

        return <Button {...button} key={button.key || index} size={size} />;
      })}
    </div>
  );
}

export type ButtonGroupProps = {
  groups: ButtonGroup[];
  size?: ButtonProps["size"];
  collapsible?: boolean;
  orientation?: "ltr" | "rtl";
  hideSeparators?: boolean;
  className?: string;
};

export function ButtonGroup({
  groups,
  size = "xs",
  collapsible = true,
  orientation = "ltr",
  hideSeparators = false,
  className,
}: ButtonGroupProps) {
  const groupSizes = useRef<number[]>([]);
  const { wrapperRef, wrapperWidth } = useWrapperWidth();
  const { buttonGroupWidth, lastRenderedIndex } = useButtonGroupWidth(
    groupSizes.current,
    wrapperWidth,
    hideSeparators,
  );

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [lastRenderedIndex]);

  const showMenuButton = lastRenderedIndex < groups.length - 1;
  const collapsedGroups = groups.slice(lastRenderedIndex + 1);

  return (
    <>
      <div
        ref={wrapperRef}
        className={cn(
          "flex w-full",
          {
            "justify-end": orientation === "rtl",
            "justify-start": orientation === "ltr",
          },
          className,
        )}
        aria-label="Button groups container"
      >
        <div
          className={cn(
            "flex flex-shrink-0 items-center gap-1 overflow-hidden",
            {
              "!w-full flex-wrap": !collapsible,
            },
          )}
          style={{
            width: buttonGroupWidth,
          }}
        >
          {groups.map((group, index) => {
            const getGroupSize = (element: HTMLDivElement) => {
              if (element) {
                groupSizes.current[index] =
                  element.getBoundingClientRect().width;
              }
            };

            return (
              <Fragment
                // eslint-disable-next-line react/no-array-index-key
                key={`${index}-${group.buttons
                  .map((button, index) => String(button.key ?? index))
                  .join("-")}`}
              >
                <Group ref={getGroupSize} {...group} size={size} />
                {!hideSeparators && index !== groups.length - 1 && (
                  <ButtonGroupSeparator />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
      {showMenuButton && collapsible && (
        <Popover
          open={expanded}
          className="bg-white p-0"
          onClose={() => setExpanded(false)}
          modal={true}
          Trigger={
            <Button
              size={size}
              color="primary"
              iconLeft={{ Icon: EllipsisVertical }}
              variant="base"
              className="ml-2"
              onClick={() => {
                setExpanded((prev) => !prev);
              }}
              aria-label="More options"
            />
          }
          Content={
            <div className="flex flex-wrap items-center gap-1 p-2" role="menu">
              {collapsedGroups.map((group, index) => (
                <Fragment
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${index}-${group.buttons
                    .map((button, index) => String(button.key ?? index))
                    .join("-")}`}
                >
                  <Group {...group} size={size} />
                  {!hideSeparators && index !== collapsedGroups.length - 1 && (
                    <ButtonGroupSeparator />
                  )}
                </Fragment>
              ))}
            </div>
          }
        />
      )}
    </>
  );
}
