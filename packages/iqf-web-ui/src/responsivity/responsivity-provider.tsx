import { useMeasure } from "@uidotdev/usehooks";
import { type PropsWithChildren, createContext, useContext } from "react";

import { breakpoints } from "./breakpoints";

type ResponsivityContextType = {
  height: number;
  width: number;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isXLarge?: boolean;
  is2XLarge?: boolean;
  is3XLarge?: boolean;
};

export const ResponsivityContext = createContext<ResponsivityContextType>({
  height: 0,
  width: 0,
  isSmall: false,
  isMedium: false,
  isLarge: false,
  isXLarge: false,
  is2XLarge: false,
  is3XLarge: false,
});

export const useResponsivity = (
  resolutions: "small" | "medium" | "large" | "xlarge" | "2xlarge" | "3xlarge",
) => {
  const value = useContext(ResponsivityContext);

  switch (resolutions) {
    case "small":
      return value.isSmall;
    case "medium":
      return value.isMedium;
    case "large":
      return value.isLarge;
    case "xlarge":
      return value.isXLarge;
    case "2xlarge":
      return value.is2XLarge;
    case "3xlarge":
      return value.is3XLarge;
  }

  return value;
};

export function ResponsivityProvider({ children }: PropsWithChildren) {
  const [ref, { height, width }] = useMeasure();

  if (typeof window === "undefined") {
    return <div>Cannot measure responsivity on the server.</div>;
  }

  const isSmall = width! <= breakpoints.sm;
  const isMedium = width! <= breakpoints.md;
  const isLarge = width! <= breakpoints.lg;
  const isXLarge = width! <= breakpoints.xl;
  const is2XLarge = width! <= breakpoints["2xl"];
  const is3XLarge = width! > breakpoints["2xl"];

  return (
    <ResponsivityContext.Provider
      value={{
        height: height ?? 0,
        width: width ?? 0,
        isSmall,
        isMedium,
        isLarge,
        isXLarge,
        is2XLarge,
        is3XLarge,
      }}
    >
      <div ref={ref}>{children}</div>
    </ResponsivityContext.Provider>
  );
}
