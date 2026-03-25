import { User } from "lucide-react";

import { ChipValue } from "./chip-value";

export type UserSingleValueProps = {
  value?: { id: string; displayName?: string };
  multiple?: false;
};

export type UserMultipleValueProps = {
  value?: Array<{ id: string; displayName?: string }>;
  multiple: true;
};

export type UserValueProps = UserSingleValueProps | UserMultipleValueProps;

export function UserValue({ value, multiple }: UserValueProps) {
  return (
    <>
      {multiple ? (
        <div className="flex flex-wrap gap-x-2">
          {value?.map((val) => (
            <ChipValue
              key={val.id}
              icon={{ Icon: User }}
              value={val.displayName}
            />
          ))}
        </div>
      ) : (
        <ChipValue icon={{ Icon: User }} value={value?.displayName} />
      )}
    </>
  );
}
