import { Eye } from "lucide-react";
import { useIntl } from "react-intl";

import { Button } from "../../../atoms/button";
import { Alert } from "../../../molecules/alert";
import { FileInputTrigger } from "../../../molecules/file-input";
import { FileViewer } from "../../../organisms/file-viewer";
import {
  FormFileInput,
  type FormFileInputProps,
} from "../../RHF-fields/form-file-input";
import { useFormContext } from "../../context/form-context";
import { FormValue } from "../../form-value";
import { LayoutGroup } from "../layout-group";
import { RemoveFileAction } from "./file-upload-layout-group/actions";
import {
  FileLayoutRow,
  ZeroFilesLayoutRow,
} from "./file-upload-layout-group/components";

export type FileInputLayoutGroupProps = Omit<
  FormFileInputProps<File>,
  "selectedFiles" | "children"
>;

function ViewAction({ file }: { file: File }) {
  const intl = useIntl();

  return (
    <Alert
      dialogProps={{ className: "max-w-[80vw]" }}
      title={intl.formatMessage({
        id: "file-input-layout-group.view-action.title",
        defaultMessage: "Detail souboru",
      })}
      content={<FileViewer file={file} />}
    >
      <Button variant="outlined" iconLeft={{ Icon: Eye }}>
        {intl.formatMessage({
          id: "file-input-layout-group.view",
          defaultMessage: "Zobrazit",
        })}
      </Button>
    </Alert>
  );
}

export function FileInputLayoutGroup({
  label,
  name,

  readOnly = false,
  multiple = false,

  ...props
}: FileInputLayoutGroupProps) {
  const { editing } = useFormContext();

  return (
    <FormFileInput
      name={name}
      selectedFiles={null}
      multiple={multiple}
      {...props}
    >
      <LayoutGroup
        title={label}
        actions={
          editing && !readOnly && <FileInputTrigger className="min-h-0 py-1" />
        }
      >
        <FormValue name={name}>
          {(value?: File | File[] | null) => {
            const items = !value ? [] : Array.isArray(value) ? value : [value];

            return (
              <>
                {items.length === 0 && <ZeroFilesLayoutRow />}

                {items.map((item) => (
                  <FileLayoutRow
                    key={item.name}
                    file={{
                      size: item.size,
                      title: item.name,
                      type: item.type,
                    }}
                    actions={
                      <div className="flex items-center gap-x-1">
                        <ViewAction file={item} />

                        <RemoveFileAction name={name} removedFile={item} />
                      </div>
                    }
                  />
                ))}
              </>
            );
          }}
        </FormValue>
      </LayoutGroup>
    </FormFileInput>
  );
}
