import { type ContentType } from "../../../../../content";
import {
  FormFileUpload,
  type FormFileUploadProps,
} from "../../../RHF-fields/form-file-upload";
import { useFormContext } from "../../../context/form-context";
import { FormValue } from "../../../form-value";
import { LayoutGroup } from "../../layout-group";
import { RemoveFileAction } from "./actions";
import {
  ContentsInProgress,
  FileLayoutRow,
  FileUploadTrigger,
  ZeroContentsRow,
} from "./components";

export type FileUploadLayoutGroupProps<
  TContentType extends ContentType = ContentType,
> = Omit<FormFileUploadProps<TContentType>, "selectedFiles" | "children"> & {
  /**
   * Actions, that will be displayed in the row actions.
   */
  rowActions?: ((item: TContentType) => React.ReactNode) | null;
};

function FileUploadLayoutGroup<TContentType extends ContentType = ContentType>({
  readOnly = false,

  name,
  label,

  rowActions,

  ...props
}: FileUploadLayoutGroupProps<TContentType>) {
  const { editing } = useFormContext();

  return (
    <FormFileUpload name={name} selectedFiles={null} {...props}>
      <LayoutGroup
        title={label}
        actions={editing && !readOnly && <FileUploadTrigger />}
      >
        <FormValue name={name}>
          {(value?: TContentType | TContentType[] | null) => {
            const items = !value ? [] : Array.isArray(value) ? value : [value];

            return (
              <>
                {items.length === 0 && <ZeroContentsRow />}

                {items.map((item) => (
                  <FileLayoutRow
                    key={item.id}
                    file={{
                      ...item,
                      type: item.contentType,
                    }}
                    actions={
                      rowActions !== undefined ? (
                        rowActions?.(item)
                      ) : (
                        <RemoveFileAction name={name} removedFile={item} />
                      )
                    }
                  />
                ))}

                <ContentsInProgress />
              </>
            );
          }}
        </FormValue>
      </LayoutGroup>
    </FormFileUpload>
  );
}

FileUploadLayoutGroup.FileLayoutRow = FileLayoutRow;
FileUploadLayoutGroup.ContentsInProgress = ContentsInProgress;
FileUploadLayoutGroup.ZeroContentsRow = ZeroContentsRow;
FileUploadLayoutGroup.FileUploadTrigger = FileUploadTrigger;

FileUploadLayoutGroup.RemoveFileAction = RemoveFileAction;

export { FileUploadLayoutGroup };
