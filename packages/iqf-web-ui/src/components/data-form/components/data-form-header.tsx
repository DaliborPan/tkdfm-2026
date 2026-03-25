import { type BaseObject } from "../../../evidence/base";
import { DataFormCloseButton } from "./data-form-close-button";
import { DataFormHeaderLayout } from "./data-form-header-layout";
import { DataFormTitle } from "./data-form-title";
import { DataFormDefaultToolbar } from "./toolbar";

export function DataFormHeader<TData extends BaseObject>({
  toolbar,
  titleMapper,
}: {
  toolbar?: React.ReactNode;
  titleMapper: (data: TData) => string;
}) {
  return (
    <DataFormHeaderLayout>
      <div className="contents grow">
        <div className="mr-2">
          <DataFormCloseButton />
        </div>

        <DataFormTitle titleMapper={titleMapper} />
      </div>

      {toolbar !== undefined ? toolbar : <DataFormDefaultToolbar />}
    </DataFormHeaderLayout>
  );
}
