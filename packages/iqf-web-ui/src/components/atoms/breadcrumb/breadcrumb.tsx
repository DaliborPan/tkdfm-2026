import { type ComponentPropsWithRef, Fragment, type ReactNode } from "react";

import { useSettingsContext } from "../../../settings/context";
import { cn } from "../../../utils/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../molecules/dropdown-menu";
import { BreadcrumbEllipsis } from "./breadcrumb-ellipsis";
import { BreadcrumbItem } from "./breadcrumb-item";
import { BreadcrumbLink } from "./breadcrumb-link";
import { BreadcrumbList } from "./breadcrumb-list";
import { BreadcrumbPage } from "./breadcrumb-page";
import { BreadcrumbSeparator } from "./breadcrumb-separator";
import { type BreadcrumbItemType, type BreadcrumbProps } from "./types";

function normalizeBreadcrumbItem(item: BreadcrumbItemType) {
  return {
    label: "label" in item ? item.label : undefined,
    href: "href" in item ? item.href : undefined,
    items: "items" in item ? item.items : undefined,
  };
}

type BreadcrumbContentProps = {
  label?: ReactNode;
  href?: string;
  items?: BreadcrumbItemType[];
  className?: string;
  loadingClassName?: string;
  isLastItem?: boolean;
};

function BreadcrumbLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-4 w-[100px] animate-pulse rounded-full bg-neutral-100",
        className,
      )}
    />
  );
}

function BreadcrumbContent({
  label,
  href,
  items,
  className,
  loadingClassName,
  isLastItem = false,
}: BreadcrumbContentProps) {
  const {
    router: { navigate },
  } = useSettingsContext();

  if (items) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <BreadcrumbEllipsis className="transition-all hover:text-text-primary-color" />
          <span className="sr-only">Toggle menu</span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          {items.map((item, index) => {
            const {
              label,
              href,
              items: nestedItems,
            } = normalizeBreadcrumbItem(item);

            return (
              <DropdownMenuItem
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="group cursor-pointer uppercase data-[disabled]:opacity-100"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();

                    if (href) {
                      navigate(href);
                    }
                  }
                }}
                onClick={() => {
                  if (href) {
                    navigate(href);
                  }
                }}
                disabled={!href}
              >
                {/**
                 * pointer-events-none is used to prevent double navigation
                 * navigation is handled by onClick and onKeyDown in DropdownMenuItem
                 */}
                <BreadcrumbContent
                  className="pointer-events-none w-full transition-all group-hover:text-text-primary-color group-hover:underline group-focus:text-text-primary-color group-focus:underline"
                  label={label}
                  href={href}
                  items={nestedItems}
                />
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (!label) return <BreadcrumbLoader className={loadingClassName} />;

  return href && !isLastItem ? (
    <BreadcrumbLink href={href} className={cn("hover:underline", className)}>
      {label}
    </BreadcrumbLink>
  ) : (
    <BreadcrumbPage className={className}>{label}</BreadcrumbPage>
  );
}

export function Breadcrumb({
  items,
  className,
  ...props
}: ComponentPropsWithRef<"nav"> & BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav
      {...props}
      aria-label="breadcrumb"
      className={cn("mb-8 uppercase", className)}
    >
      <BreadcrumbList>
        {items.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbContent
                {...normalizeBreadcrumbItem(item)}
                isLastItem={index === items.length - 1}
              />
            </BreadcrumbItem>

            {index < items.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </nav>
  );
}
