import { type Dispatch, type SetStateAction } from "react";

import { usePreferences } from "../../../settings/preferences/preferences";
import { cn } from "../../../utils/cn";
import { Button } from "../../atoms/button";
import { type IconProps } from "../../atoms/icon/types";

export type SwitchAction<T extends string> = {
  id: T;
  Icon: IconProps["Icon"];
  label?: string;
  tooltip?: string;
  "aria-label"?: string;
};

export type SwitchProps<T extends string> = {
  defaultValue?: T;
  preferenceGroupKey?: string;
  preferenceVersion?: number;
  actions: SwitchAction<T>[];
  value?: string;
  setValue?: Dispatch<SetStateAction<T>>;
};

export type SwitchStateProps<T extends string> = {
  defaultValue: T;
  preferenceGroupKey: string;
  preferenceVersion: number;
};

export function useSwitch<T extends string>({
  defaultValue,
  preferenceGroupKey,
  preferenceVersion,
}: SwitchStateProps<T>) {
  const [value, setValue] = usePreferences<T>({
    preferenceGroupKey,
    version: preferenceVersion,
    preferenceKey: "viewMode",
    defaultValue,
  });

  return {
    value,
    setValue,
  };
}

export function Switch<T extends string>(props: SwitchProps<T>) {
  const {
    defaultValue,
    actions,
    value,
    setValue,
    preferenceGroupKey,
    preferenceVersion,
  } = props;

  const uncontrolled = useSwitch<T>({
    defaultValue: defaultValue as T,
    preferenceGroupKey: preferenceGroupKey || "switch",
    preferenceVersion: preferenceVersion || 1,
  });

  return (
    <div className="flex">
      {actions.map((action, index) => (
        <Button
          aria-label={action["aria-label"]}
          id={action.id}
          key={action.id}
          variant={
            (value || uncontrolled.value) === action.id ? "solid" : "outlined"
          }
          iconLeft={{
            Icon: action.Icon,
          }}
          tooltip={action.tooltip}
          className={cn({
            ["!rounded-r-none"]: index === 0,
            ["!rounded-none !border-l-0"]:
              index !== 0 && index !== actions.length - 1,
            ["!rounded-l-none !border-l-0"]: index === actions.length - 1,
          })}
          onClick={() => (setValue || uncontrolled.setValue)(action.id)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
