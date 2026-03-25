import { useSettingsContext } from "../../../settings/context";
import {
  StateAtomControlProvider,
  StateAtomLabel,
  StateAtomMessage,
  useStateAtomControlContext,
} from "../state-atom-control";
import { InputComponent } from "./components/input-component";
import { InputIcons } from "./components/input-icons";
import { InputResetButton } from "./components/input-reset-button";
import { TextareaComponent } from "./components/textarea-component";
import type { InputProps, TextAreaComponentProps } from "./types";

function isTextArea(props: InputProps): props is TextAreaComponentProps {
  return props.multiline === true;
}

function InnerComponent(props: InputProps) {
  const { invalid } = useStateAtomControlContext();

  if (isTextArea(props)) {
    return <TextareaComponent invalid={invalid} {...props} />;
  }

  return <InputComponent invalid={invalid} {...props} />;
}

function InternalInput(props: InputProps) {
  const { invalid } = useStateAtomControlContext();
  const { form } = useSettingsContext();
  const isResetEnabled = !!form?.fields?.enableReset;

  const {
    inputChild,
    iconRight,
    disabled = false,
    readOnly,
    size = "s",
    multiline = false,
    variant = "secondary",
    onReset,
  } = props;

  const canRenderReset = isResetEnabled && onReset && !disabled && !readOnly;

  const showInputIcons = iconRight || (!multiline && invalid) || canRenderReset;

  return (
    <InnerComponent {...props}>
      <>
        {inputChild}

        {showInputIcons && (
          <InputIcons
            iconRight={iconRight}
            size={size}
            variant={variant}
            showStateIcon={!multiline}
            className={multiline ? "self-start" : undefined}
          >
            {
              // invisible dummy element to keep correct height of the icons container
              // icon container is aligned correctly with first line of the textarea
              multiline && <div className="invisible w-0">.</div>
            }
            {canRenderReset && (
              <InputResetButton
                onClick={onReset}
                size={size}
                variant={variant}
              />
            )}
          </InputIcons>
        )}
      </>
    </InnerComponent>
  );
}

export function Input({
  required,
  ...props
}: InputProps & { required?: boolean }) {
  const { label, message, state, size = "s", allowDisplayState = true } = props;

  return (
    <StateAtomControlProvider state={!allowDisplayState ? "default" : state}>
      {label && (
        <div className="mb-1">
          <StateAtomLabel
            required={required}
            size={size}
            htmlFor={props.id ?? "UNDEFINED_ID"}
            disabled={props.disabled}
          >
            {label}
          </StateAtomLabel>
        </div>
      )}

      <InternalInput {...props} />

      <StateAtomMessage {...message} disabled={props.disabled} size={size} />
    </StateAtomControlProvider>
  );
}
