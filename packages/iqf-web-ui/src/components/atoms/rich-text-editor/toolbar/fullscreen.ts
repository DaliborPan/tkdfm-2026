import { Maximize2, Minimize2 } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";
import { useIntl } from "react-intl";

import { type ButtonProps } from "../../button/types";

export function useFullscreenButtons(
  fullscreen: boolean,
  setFullscreen: Dispatch<SetStateAction<boolean>>,
  hideButtons: string[] = [],
) {
  const intl = useIntl();

  const buttons: ButtonProps[] = [
    {
      onClick: () => {
        setFullscreen((f) => !f);
      },
      tooltip: intl.formatMessage({
        id: "atoms.rich-text-editor.fullscreen",
        defaultMessage: "Režim celé obrazovky",
      }),
      iconLeft: { Icon: fullscreen ? Minimize2 : Maximize2 },
      inverse: !fullscreen,
      key: "fullscreen",
    },
  ].filter((button) => !hideButtons.includes(button.key));

  return { buttons };
}
