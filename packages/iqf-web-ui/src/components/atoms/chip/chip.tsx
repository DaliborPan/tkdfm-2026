"use client";

import { useSettingsContext } from "../../../settings/context";
import { cn } from "../../../utils/cn";
import { omit } from "../../../utils/omit";
import { Icon } from "../icon";
import { Tooltip } from "../tooltip";
import { chipVariants as defaultChipVariants } from "./const";
import {
  type AnchorComponentProps,
  type ButtonComponentProps,
  type ChipProps,
  type InnerComponentProps,
} from "./types";

function isButtonComponent(props: ChipProps): props is ButtonComponentProps {
  return props.as === "button" && props.href === undefined;
}

function isNotDisabledAnchor(props: ChipProps): props is AnchorComponentProps {
  return props.href !== undefined && !props.disabled;
}

function InnerComponent({
  iconLeft,
  iconRight,
  children,
}: InnerComponentProps) {
  return (
    <>
      {iconLeft && <Icon {...iconLeft} />}
      {children}
      {iconRight && <Icon {...iconRight} />}
    </>
  );
}

export function Chip(props: ChipProps) {
  const {
    iconLeft,
    iconRight,
    children,
    className,
    href,
    as = "span",
    variant = "primary",
    inverse = false,
    size = "s",
    disabled = false,
    focusable = true,
    tooltip,
    tooltipPosition,
    ...restProps
  } = props;

  const {
    components,
    router: { Link },
  } = useSettingsContext();

  const chipVariants = components?.chipVariants ?? defaultChipVariants;

  const tabIndex = (props.tabIndex ?? focusable) ? 0 : -1;

  const chipClassName = cn(
    chipVariants({
      variant,
      inverse,
      size,
      disabled,
      as,
    }),
    className,
  );

  const chip = (() => {
    if (isButtonComponent(props)) {
      const { onClick, ...rest } = props;

      const buttonProps = omit(
        rest,
        Object.keys(rest).filter(
          (key) => !Object.keys(restProps).includes(key),
        ),
      );

      return (
        <button
          className={chipClassName}
          tabIndex={tabIndex}
          disabled={!!disabled}
          aria-disabled={!!disabled}
          onClick={onClick}
          type="button"
          {...buttonProps}
        >
          <InnerComponent iconLeft={iconLeft} iconRight={iconRight}>
            {children}
          </InnerComponent>
        </button>
      );
    }

    if (isNotDisabledAnchor(props)) {
      const { href, ...rest } = props;

      const anchorProps = omit(
        rest,
        Object.keys(rest).filter(
          (key) => !Object.keys(restProps).includes(key),
        ),
      );

      const Component = href.startsWith("http") ? "a" : Link;

      return (
        <Component
          href={href}
          className={chipClassName}
          tabIndex={tabIndex}
          {...anchorProps}
        >
          <InnerComponent iconLeft={iconLeft} iconRight={iconRight}>
            {children}
          </InnerComponent>
        </Component>
      );
    }

    const spanProps = omit(
      props,
      Object.keys(props).filter((key) => !Object.keys(restProps).includes(key)),
    );

    return (
      <span className={chipClassName} aria-disabled={!!disabled} {...spanProps}>
        <InnerComponent iconLeft={iconLeft} iconRight={iconRight}>
          {children}
        </InnerComponent>
      </span>
    );
  })();

  if (tooltip) {
    return (
      <Tooltip
        Trigger={chip}
        Content={tooltip}
        position={tooltipPosition}
        showArrow={true}
      />
    );
  }

  return chip;
}
