import { Message } from "../../atoms/message";
import { Alert } from "../../molecules/alert";
import { useAutoUpdate } from "../hooks/auto-update";

export function DataFormAutoUpdate() {
  const { alertState, resetAlertState } = useAutoUpdate();

  return (
    <Alert
      dialogProps={{ size: "xl" }}
      title="Upozornění"
      open={alertState.open}
      content={
        <Message variant="warning">
          <div>{alertState.message}</div>
        </Message>
      }
      onOpenChange={() => {
        alertState.callback();

        resetAlertState();
      }}
    />
  );
}
