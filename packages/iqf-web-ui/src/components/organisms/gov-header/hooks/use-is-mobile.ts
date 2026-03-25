"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { breakpoints } from "../../../../responsivity/breakpoints";

export function useIsMobile() {
  const isMobileQuery = useMediaQuery(
    `only screen and (max-width : ${breakpoints.md}px)`,
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  return isMobile;
}
