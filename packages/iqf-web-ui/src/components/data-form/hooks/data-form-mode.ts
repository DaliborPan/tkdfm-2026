import { useState } from "react";

import { type DataFormMode } from "../context/types";
import { checkIsNew } from "../utils/check-is-new";

export function useDataFormMode({ itemId }: { itemId: string }) {
  const isNew = checkIsNew(itemId);

  const [mode, setMode] = useState<DataFormMode>(isNew ? "NEW" : "VIEW");

  return {
    mode: (isNew ? "NEW" : mode) as DataFormMode,
    /**
     * @deprecated use `isEditing` instead
     */
    editing: mode === "NEW" || mode === "EDIT",
    isEditing: mode === "NEW" || mode === "EDIT",
    isNew,
    setMode,
  };
}
