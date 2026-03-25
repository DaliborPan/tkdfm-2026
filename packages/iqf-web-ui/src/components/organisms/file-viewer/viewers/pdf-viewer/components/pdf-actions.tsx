import { Menu } from "lucide-react";
import { Activity } from "react";
import { useIntl } from "react-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../molecules/dropdown-menu";
import { type PdfViewType, usePdfViewerContext } from "../pdf-viewer-provider";
import { PdfActionButton } from "./pdf-action-button";

function isPdfViewType(value: string): value is PdfViewType {
  return value === "scroll" || value === "one-page";
}

export function PdfActions({
  children,
  headerWidth,
}: {
  children?: React.ReactNode;
  headerWidth?: number;
}) {
  const { view, setView, rotateClockwise, rotateCounterClockwise } =
    usePdfViewerContext();

  const intl = useIntl();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <PdfActionButton className="ml-auto" iconLeft={{ Icon: Menu }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {intl.formatMessage({
            id: "pdf.view",
            defaultMessage: "Zobrazení",
          })}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup
          value={view}
          onValueChange={(value) => {
            if (isPdfViewType(value)) setView(value);
          }}
        >
          <DropdownMenuRadioItem value="scroll">
            {intl.formatMessage({
              id: "pdf.view-vertical-scroll",
              defaultMessage: "Vertikální posouvání",
            })}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="one-page">
            {intl.formatMessage({
              id: "pdf.view-one-page",
              defaultMessage: "Jedna stránka",
            })}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <Activity
          mode={
            headerWidth && headerWidth < 448 /* 28rem - equivalent to @md */
              ? "visible"
              : "hidden"
          }
        >
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={rotateClockwise}>
            {intl.formatMessage({
              id: "pdf.rotate-cw",
              defaultMessage: "Otočit ve směru hodinových ručiček",
            })}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={rotateCounterClockwise}>
            {intl.formatMessage({
              id: "pdf.rotate-ccw",
              defaultMessage: "Otočit proti směru hodinových ručiček",
            })}
          </DropdownMenuItem>
        </Activity>

        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
