import { useLocation } from "react-router";

import { cn } from "../../../utils/cn";
import { Button } from "../../atoms/button";
import { type PrimaryNavigationItemType } from "./types";

export function GovHeaderNavigationButton({
  href,
  Icon,
  ...props
}: PrimaryNavigationItemType) {
  const { pathname } = useLocation();

  const isActive = pathname.startsWith(href);

  return (
    <Button
      size="m"
      iconLeft={{ Icon }}
      className={cn(isActive && "bg-primary-700")}
      href={href}
      {...props}
    />
  );
}
