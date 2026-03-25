import { Check, CircleAlert, TriangleAlert, X } from "lucide-react";
import {
  type ComponentProps,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { useIntl } from "react-intl";
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

import { type PropsWithElementRef } from "../../../types";
import { cn } from "../../../utils/cn";
import { Button } from "../button";
import { Icon } from "../icon";
import { type IconProps } from "../icon/types";
import {
  type ToastVariantsType,
  toastButtonVariants,
  toastIconVariants,
  toastVariants,
} from "./const";

type ToasterProps = ComponentProps<typeof SonnerToaster>;

/**
 * This component must be included somewhere in root component of the app.
 */
export function Toaster({ ...props }: ToasterProps) {
  return <SonnerToaster {...props} expand={true} visibleToasts={1} />;
}

export type ToastProps = PropsWithChildren<ToastVariantsType> & {
  icon?: IconProps;
  closeLabel?: string;
  wcagCloseLabel?: string;
  className?: string;
  message?: ReactNode;
  onClose?: () => void;
};

function Toast({
  color = "primary",
  type = "subtle",
  icon,
  closeLabel,
  wcagCloseLabel,
  className,
  message,
  onClose,
  ref,
}: PropsWithElementRef<ToastProps, HTMLDivElement>) {
  const intl = useIntl();

  return (
    <div className="relative">
      <div
        ref={ref}
        className={cn(
          toastVariants({
            color,
            type,
          }),
          className,
        )}
      >
        {icon && (
          <div
            className={toastIconVariants({
              color,
              type,
            })}
          >
            <Icon {...icon} className="size-[18px]" />
          </div>
        )}

        <div className="w-full overflow-hidden">{message}</div>

        <Button
          onClick={onClose}
          aria-label={
            wcagCloseLabel ||
            intl.formatMessage({
              id: "atoms.toast.close",
              defaultMessage: "Zavřít oznámení",
            })
          }
          {...(!closeLabel && {
            iconLeft: {
              Icon: X,
              className: "size-7 stroke-1",
            },
          })}
          className={cn(
            toastButtonVariants({
              color,
              type,
            }),
            !closeLabel && "max-w-[42px]",
          )}
        >
          {closeLabel}
        </Button>
      </div>
    </div>
  );
}

type ToastFnType = (options?: {
  toastProps?: ToastProps;
  duration?: number;
}) => void;

type ToastFnOptionsType = Parameters<ToastFnType>[0];

/**
 * Toast trigger function.
 * @param content content of the toast
 * @param options.toastProps allows to adjust toast props
 * @param options.duration duration of the toast in ms. Default duration is 3000ms. If set to Infinity, toast won't disappear unless user clicks cross button.
 */
export const toast: ToastFnType = (
  { toastProps, duration } = {
    duration: 3000,
    toastProps: {},
  },
) => {
  sonnerToast.custom(
    () => <Toast {...toastProps} onClose={() => sonnerToast.dismiss()} />,
    { duration },
  );
};

export const successToast = (
  message: ReactNode,
  options?: ToastFnOptionsType,
) =>
  toast({
    duration: 3000,
    ...options,

    toastProps: {
      message,
      color: "success",
      icon: { Icon: Check },
      ...options?.toastProps,
    },
  });

export const errorToast = (message: ReactNode, options?: ToastFnOptionsType) =>
  toast({
    duration: 10000,
    ...options,

    toastProps: {
      message,
      color: "error",
      icon: { Icon: TriangleAlert },
      ...options?.toastProps,
    },
  });

export const warningToast = (
  message: ReactNode,
  options?: ToastFnOptionsType,
) =>
  toast({
    duration: 3000,
    ...options,

    toastProps: {
      message,
      color: "warning",
      icon: { Icon: CircleAlert },
      ...options?.toastProps,
    },
  });
