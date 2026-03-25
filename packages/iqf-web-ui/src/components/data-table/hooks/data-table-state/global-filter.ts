import { useState } from "react";

export function useGlobalFilter({
  defaultGlobalFilter,
}: {
  defaultGlobalFilter: string;
}) {
  const [globalFilter, setGlobalFilter] = useState<string>(defaultGlobalFilter);

  return {
    globalFilter,
    setGlobalFilter,
  };
}
