import { type PropsWithChildren } from "react";

import { useFormContext } from "../context";
import {
  LayoutGroupItem,
  type LayoutGroupItemProps,
} from "./layout-group-item";

export function LayoutGroupFieldItem({
  name,
  ...props
}: PropsWithChildren<Omit<LayoutGroupItemProps, "id"> & { name: string }>) {
  const { isRequired, editing } = useFormContext();

  const required =
    editing &&
    (props.required !== undefined ? props.required : isRequired(name));

  return <LayoutGroupItem {...props} id={name} required={required} />;
}
