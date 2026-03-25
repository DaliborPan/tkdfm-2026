import { useFieldArray } from "react-hook-form";

import { useFormContext } from "../context/form-context";

export type FormArrayProps = {
  /**
   * TODO: docs, what name it should be in terms of schema
   */
  name: string;
  children: (index: number) => React.ReactNode;
};

export function FormArray({ name, children }: FormArrayProps) {
  const { control } = useFormContext();
  const { fields } = useFieldArray({
    name,
    control,
  });

  return (
    <>
      {fields.map((field, index) => {
        return <div key={field.id}>{children(index)}</div>;
      })}
    </>
  );
}
