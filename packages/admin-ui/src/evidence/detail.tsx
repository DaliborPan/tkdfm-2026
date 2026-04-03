import { type BaseObject } from "iqf-web-ui/base";
import {
  DataForm,
  DataFormToolbarDefaultButtons,
  DataFormToolbarLayout,
} from "iqf-web-ui/data-form";
import { useEvidenceParams } from "iqf-web-ui/evidence";

import { useEvidenceContext } from "./context";
import { type EvidenceDetailProps } from "./types";

export function EvidenceDetail<
  TData extends TFieldValues,
  TFieldValues extends BaseObject,
>({
  toolbar,
  children,
  ...dataFormProps
}: EvidenceDetailProps<TData, TFieldValues>) {
  const { itemId } = useEvidenceParams();
  const { api, url, readOnly } = useEvidenceContext();

  if (!itemId) {
    return null;
  }

  return (
    <DataForm
      {...dataFormProps}
      key={itemId}
      itemId={itemId}
      api={api}
      url={url}
      readOnly={readOnly}
      toolbar={
        toolbar ?? (
          <DataFormToolbarLayout>
            <DataFormToolbarDefaultButtons showLocate={false} />
          </DataFormToolbarLayout>
        )
      }
    >
      {children}
    </DataForm>
  );
}
