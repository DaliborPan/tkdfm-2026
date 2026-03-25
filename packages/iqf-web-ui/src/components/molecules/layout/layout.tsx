import { type ReactNode } from "react";

import { cn } from "../../../utils/cn";

export function Layout({
  children,
  spread = 1,
}: {
  children: ReactNode[];
  spread?: 1 | 2 | 3;
}) {
  if (children.length !== 2) throw new Error("Layout must have 2 children");

  return (
    <div className="flex flex-col gap-[0.9375rem] md:flex-row">
      <div className="min-w-[280px] flex-1 md:pr-2.5">{children[0]}</div>
      <div
        className={cn("-mx-4 min-w-[280px] md:-mx-0", {
          "flex-[1]": spread === 1,
          "flex-[2]": spread === 2,
          "flex-[3]": spread === 3,
        })}
      >
        {children[1]}
      </div>
    </div>
  );
}
