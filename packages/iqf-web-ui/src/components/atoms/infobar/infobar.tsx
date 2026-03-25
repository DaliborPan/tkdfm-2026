"use client";

import { ChevronDown, ChevronUp, X } from "lucide-react";
import { type PropsWithChildren, type ReactNode, useState } from "react";
import { useIntl } from "react-intl";

import { type PropsWithElementRef } from "../../../types";
import { cn } from "../../../utils/cn";
import { Button } from "../button";
import { Icon } from "../icon";
import { type IconProps } from "../icon/types";
import {
  type InfobarVariantsType,
  infobarButtonVariants,
  infobarVariants,
} from "./const";

export type InfobarProps = PropsWithChildren<InfobarVariantsType> & {
  icon?: IconProps;
  closable?: boolean;
  headline?: ReactNode;
  wcagCloseLabel?: string;
  wcagToggleLabel?: string;
  defaultCollapsed?: boolean;
};

export function Infobar({
  headline,
  closable,
  icon,
  children,
  variant = "primary",
  inverse = false,
  wcagCloseLabel,
  wcagToggleLabel,
  defaultCollapsed = true,
  ref,
}: PropsWithElementRef<InfobarProps, HTMLDivElement>) {
  const intl = useIntl();

  const [closed, setClosed] = useState(false);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return closed ? null : (
    <div
      ref={ref}
      className={infobarVariants({
        variant,
        inverse,
      })}
    >
      <div className={cn(closable && "pr-14", "flex flex-col gap-2")}>
        {headline && (
          <div className="flex gap-4">
            {headline}

            <Button
              onClick={() => setCollapsed((prev) => !prev)}
              aria-label={
                wcagToggleLabel ||
                intl.formatMessage({
                  id: "atoms.infobar.toggle",
                  defaultMessage: "Zobrazit více informací",
                })
              }
              iconLeft={{
                Icon: collapsed ? ChevronDown : ChevronUp,
                className: "size-8 stroke-1",
              }}
              className={infobarButtonVariants({
                variant,
                inverse,
              })}
            />
          </div>
        )}

        <div className={cn(headline && collapsed && "hidden")}>
          {icon && <Icon {...icon} />}
          {children}
        </div>
      </div>

      {closable && (
        <Button
          onClick={() => setClosed(true)}
          aria-label={
            wcagCloseLabel ||
            intl.formatMessage({
              id: "atoms.infobar.close",
              defaultMessage: "Zavřít informační lištu",
            })
          }
          iconLeft={{
            Icon: X,
            className: "size-8 stroke-1",
          }}
          className={cn(
            infobarButtonVariants({
              variant,
              inverse,
            }),
            "absolute right-4 top-4",
          )}
        />
      )}
    </div>
  );
}
