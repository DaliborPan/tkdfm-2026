"use client";

import { type PropsWithChildren } from "react";

import { useSettingsContext } from "../../../settings/context";
import { cn } from "../../../utils/cn";
import { type SecondaryNavigationItemType } from "./types";

export function GovNavigationLink({
  href,
  children,
  activeIndicatorClassName,
}: PropsWithChildren<{
  href: string;
  activeIndicatorClassName?: string;
}>) {
  const {
    router: { pathname, useParams, Link },
  } = useSettingsContext();

  const params = useParams();
  const detailPageParams = ["id", "slug"] as const;

  const hasDetailParams = detailPageParams.some((key) => params[key]);
  const isActiveDetailPage = detailPageParams.some((key) =>
    pathname.startsWith(`${href}/${params[key]}`),
  );

  const isActive = hasDetailParams
    ? isActiveDetailPage
    : pathname.endsWith(href);

  return (
    <li className="group relative list-none">
      <div
        className={cn(
          "absolute left-0 top-[-1px] h-[2px] w-full scale-0 bg-white px-5 transition-all duration-300 group-hover:scale-100",
          isActive && "scale-100",
          activeIndicatorClassName,
        )}
      />

      <Link
        href={href}
        className="block px-10 py-6 text-sm font-medium uppercase"
      >
        {children}
      </Link>
    </li>
  );
}

export function GovNavigationItem({
  item: { useShouldShowQuery, ...item },
}: {
  item: SecondaryNavigationItemType;
}) {
  const query = useShouldShowQuery?.();

  if (query && !query.isLoading && !query.data) {
    return null;
  }

  return (
    <GovNavigationLink href={item.href}>
      {query?.isLoading ? (
        <div className="w-20 animate-pulse rounded-full bg-primary-700">
          <div className="invisible">.</div>
        </div>
      ) : (
        item.label
      )}
    </GovNavigationLink>
  );
}

export function GovNavigation({
  items,
}: {
  items: SecondaryNavigationItemType[];
}) {
  return (
    <nav className="border-t border-primary-500 bg-primary text-white">
      <ul className="container flex gap-x-8">
        {items.map((item) => (
          <GovNavigationItem key={item.href} item={item} />
        ))}
      </ul>
    </nav>
  );
}
