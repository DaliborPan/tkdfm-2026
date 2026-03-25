import { Eye } from "lucide-react";
import { type PropsWithChildren } from "react";
import { useIntl } from "react-intl";

import { Button } from "../../components/atoms/button";
import { Alert } from "../../components/molecules/alert";
import { FileViewer } from "../../components/organisms/file-viewer";
import { useContentBlobQuery } from "../hooks";
import { type ContentType } from "../schema";

function ViewContentActionContent({ content }: { content: ContentType }) {
  const { data } = useContentBlobQuery(content);

  return !data?.file ? null : <FileViewer file={data.file} content={content} />;
}

export function ViewContentAction({
  content,
  children,
}: PropsWithChildren<{ content: ContentType }>) {
  const intl = useIntl();

  return (
    <Alert
      dialogProps={{ className: "max-w-[80vw]" }}
      title={intl.formatMessage({
        id: "content-layout-group.view-action.title",
        defaultMessage: "Detail souboru",
      })}
      content={<ViewContentActionContent content={content} />}
    >
      {children ?? (
        <Button iconLeft={{ Icon: Eye }}>
          {intl.formatMessage({
            id: "content-layout-group.view",
            defaultMessage: "Zobrazit",
          })}
        </Button>
      )}
    </Alert>
  );
}
