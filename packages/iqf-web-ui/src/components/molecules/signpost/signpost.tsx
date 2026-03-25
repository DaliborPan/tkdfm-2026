import { type PropsWithChildren } from "react";

import { cn } from "../../../utils/cn";
import { SignpostContent } from "./signpost-content";
import { SignpostItem } from "./signpost-item";
import { SignpostText } from "./signpost-text";

type SignpostProps = PropsWithChildren<{
  className?: string;
  columns?: number;
}>;

function Signpost({ children, className }: SignpostProps) {
  return <div className={cn("grid gap-8", className)}>{children}</div>;
}

Signpost.Item = SignpostItem;
Signpost.Content = SignpostContent;
Signpost.Text = SignpostText;

export { Signpost };
