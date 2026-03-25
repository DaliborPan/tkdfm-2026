import { useDataFormContext } from "../../context/data-form-context";
import {
  DataFormToolbarCancelButton,
  DataFormToolbarDeleteButton,
  DataFormToolbarEditButton,
  DataFormToolbarLocateButton,
  DataFormToolbarRefetchButton,
  DataFormToolbarSaveButton,
} from "./buttons";

type DataFormToolbarDefaultButtonsProps = {
  /**
   * @deprecated will be removed in the future
   */
  showValidate?: boolean;
  showCancel?: boolean;
  showSave?: boolean;

  showRefetch?: boolean;
  showLocate?: boolean;

  showEdit?: boolean;
  showDelete?: boolean;
};

export function DataFormToolbarDefaultButtons({
  showCancel = true,
  showSave = true,

  showRefetch = true,
  showLocate = false,

  showEdit = true,
  showDelete = true,
}: DataFormToolbarDefaultButtonsProps) {
  const { readOnly, isEditing } = useDataFormContext();

  return (
    <>
      {isEditing ? (
        <>
          {/* {showValidate && <DataFormToolbarValidateButton />} */}
          {showCancel && <DataFormToolbarCancelButton />}
          {showSave && <DataFormToolbarSaveButton />}
        </>
      ) : (
        <>
          {showRefetch && <DataFormToolbarRefetchButton />}
          {showLocate && <DataFormToolbarLocateButton />}

          {!readOnly && (
            <>
              {showEdit && <DataFormToolbarEditButton />}
              {showDelete && <DataFormToolbarDeleteButton />}
            </>
          )}
        </>
      )}
    </>
  );
}
