import { useState } from "react";

export function useSelection() {
  const [rowSelection, setRowSelection] = useState({});

  return {
    rowSelection,
    setRowSelection,
  };
}
