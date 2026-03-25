"use client";

import { Loader } from "lucide-react";
import { useIntl } from "react-intl";

import { useSettingsContext } from "../../../settings/context";
import { cn } from "../../../utils/cn";
import { omit } from "../../../utils/omit";
import { Icon } from "../icon";
import { Tooltip } from "../tooltip";
import {
  buttonIconVariants,
  buttonVariants as defaultButtonVariants,
} from "./const";
import {
  type AnchorElementProps,
  type ButtonProps,
  type InnerComponentProps,
} from "./types";

function isNotDisabledAnchor(props: ButtonProps): props is AnchorElementProps {
  return props.href !== undefined && !props.disabled;
}

function Button({ tooltip, tooltipPosition, ...props }: ButtonProps) {
  if (!tooltip) {
    return <ButtonComponent {...props} />;
  }

  return (
    <Tooltip
      Trigger={
        <ButtonComponent
          {...props}
          aria-label={props["aria-label"] ?? tooltip}
        />
      }
      Content={tooltip}
      position={tooltipPosition}
      showArrow={true}
    />
  );
}

function ButtonComponent(props: ButtonProps) {
  const intl = useIntl();
  const {
    router: { navigate, Link },
    components,
  } = useSettingsContext();

  const buttonVariants = components?.buttonVariants ?? defaultButtonVariants;

  const {
    variant = "solid",
    color = "primary",
    size = "s",
    inverse = false,
    accessible = false,
  } = props;
  const ariaLabel = props["aria-label"];

  if (isNotDisabledAnchor(props)) {
    const { className, href, onClick, ...rest } = props;

    const anchorProps = omit(rest, [
      "iconLeft",
      "iconRight",
      "inverse",
      "isLoading",
      "accessible",
    ] as const);

    const anchorButtonRedirect = (
      e:
        | React.MouseEvent<HTMLAnchorElement, MouseEvent>
        | React.KeyboardEvent<HTMLAnchorElement>,
    ) => {
      e.preventDefault();

      if (props.target === "_blank") {
        window.open(props.href, "_blank");

        return;
      }

      if (props.href.startsWith("http")) {
        window.location.href = props.href;
        return;
      }

      navigate(props.href);
    };

    const Component = href.startsWith("http") ? "a" : Link;

    return (
      <Component
        {...anchorProps}
        href={href}
        onClick={(e) => {
          anchorButtonRedirect(e);

          onClick?.(e);
        }}
        onKeyUp={(e) => {
          // Handle keypress for accessibility
          if (e.key === "Enter" || e.key === " ") {
            anchorButtonRedirect(e);
          }
        }}
        role="button"
        tabIndex={0}
        className={
          !accessible
            ? cn(buttonVariants({ variant, color, size, inverse }), className)
            : "absolute"
        }
      >
        <InnerComponent srOnly={ariaLabel} size={size} {...props} />
      </Component>
    );
  }

  const { className, disabled, onClick, type = "button", ...rest } = props;

  const buttonProps = omit(rest, [
    "iconLeft",
    "iconRight",
    "inverse",
    "isLoading",
    "accessible",
  ] as const);

  return (
    <button
      {...buttonProps}
      type={type}
      className={
        !accessible
          ? cn(buttonVariants({ variant, color, size, inverse }), className)
          : "absolute"
      }
      onClick={(e) => {
        if (props.isLoading || disabled) {
          e.preventDefault();

          return;
        }

        onClick?.(e);
      }}
      disabled={props.isLoading || disabled}
      aria-disabled={props.isLoading || disabled}
      aria-label={
        props.isLoading
          ? intl.formatMessage({
              id: "atoms.button.loading",
              defaultMessage: "Načítá se",
            })
          : ariaLabel
      }
    >
      <InnerComponent srOnly={ariaLabel} size={size} {...props} />
    </button>
  );
}

function InnerComponent({
  children,
  iconLeft,
  iconRight,
  srOnly,
  isLoading,
  size,
}: InnerComponentProps & { srOnly?: string }) {
  return (
    <>
      {srOnly && <span className="sr-only">{srOnly}</span>}

      {iconLeft && (
        <Icon
          Icon={isLoading ? Loader : iconLeft.Icon}
          className={cn(
            buttonIconVariants({ size }),
            isLoading && "animate-spin",
            iconLeft.className,
          )}
        />
      )}

      {typeof children === "string" ? <span>{children}</span> : children}

      {iconRight && (
        <Icon
          Icon={isLoading && !iconLeft ? Loader : iconRight.Icon}
          className={cn(
            buttonIconVariants({ size }),
            isLoading && !iconLeft && "animate-spin",
            iconRight.className,
          )}
        />
      )}

      {isLoading && !iconLeft && !iconRight && (
        <Icon
          Icon={Loader}
          className={cn(buttonIconVariants({ size }), "animate-spin")}
        />
      )}
    </>
  );
}

export { Button };
