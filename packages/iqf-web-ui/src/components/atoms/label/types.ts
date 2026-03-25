import type * as LabelPrimitive from "@radix-ui/react-label";

import { type StateAtomControlContextType } from "../state-atom-control/types";

export type LabelProps = React.ComponentPropsWithRef<
  typeof LabelPrimitive.Root
> & {
  size?: "xxs" | "xs" | "s" | "m" | "l" | "xl";
} & Partial<Pick<StateAtomControlContextType, "state">>;
