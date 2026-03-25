import { DataForm } from "../../components/data-form";
import { cn } from "../../utils/cn";
import { type BaseObject } from "../base";
import { useEvidenceContext } from "../context";
import { useEvidenceParams } from "../hooks/evidence-params";
import { type EvidenceDetailProps } from "../types";

export function EvidenceDetail<
  TData extends TFieldValues,
  TFieldValues extends BaseObject,
>({ className, ...props }: EvidenceDetailProps<TData, TFieldValues>) {
  const { itemId } = useEvidenceParams();
  const { api, url, readOnly } = useEvidenceContext();

  if (!itemId) {
    return null;
  }

  return (
    <DataForm
      {...props}
      key={itemId}
      itemId={itemId}
      api={api}
      url={url}
      readOnly={props.readOnly ?? readOnly}
      className={cn("rounded-lg", className)}
    />
  );
}
