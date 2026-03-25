import { Download, Eye } from "lucide-react";
import { useIntl } from "react-intl";

import { DownloadContentAction } from "../../../../../content/actions/download-content-action";
import { ViewContentAction } from "../../../../../content/actions/view-content-action";
import { type ContentType } from "../../../../../content/schema";
import { Button } from "../../../../atoms/button";
import { useFormContext } from "../../../context";

export function ViewAction({ content }: { content: ContentType }) {
  const intl = useIntl();
  const { editing } = useFormContext();

  const label = intl.formatMessage({
    id: "content-layout-group.view",
    defaultMessage: "Zobrazit",
  });

  return (
    <ViewContentAction content={content}>
      <Button
        variant="outlined"
        iconLeft={{ Icon: Eye }}
        tooltip={editing ? label : undefined}
      >
        {!editing && label}
      </Button>
    </ViewContentAction>
  );
}

export function DownloadAction({ content }: { content: ContentType }) {
  const intl = useIntl();
  const { editing } = useFormContext();

  const label = intl.formatMessage({
    id: "content-layout-group.download",
    defaultMessage: "Stáhnout",
  });

  return (
    <DownloadContentAction
      content={content}
      variant="outlined"
      iconLeft={{ Icon: Download }}
      tooltip={editing ? label : undefined}
    >
      {editing ? null : label}
    </DownloadContentAction>
  );
}
