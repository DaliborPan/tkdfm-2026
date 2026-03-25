import { type ComponentProps } from "react";

import { AtomMessage } from "../atom-message";
import { useStateAtomControlContext } from "../state-atom-control/state-atom-control";

/**
 * `StateAtomMessage` must be used within `StateAtomControlProvider`.
 *
 * It gets the state from the context and applies it to the message.
 */
export function StateAtomMessage(props: ComponentProps<typeof AtomMessage>) {
  const { state } = useStateAtomControlContext();

  return <AtomMessage {...props} state={state} />;
}
