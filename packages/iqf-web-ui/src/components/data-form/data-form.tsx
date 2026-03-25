import { type BaseObject } from "../../evidence/base";
import { useSettingsContext } from "../../settings/context";
import { cn } from "../../utils/cn";
import { createId } from "../../utils/create-id";
import { DataFormAutoUpdate } from "./components/data-form-auto-update";
import { DataFormHeader } from "./components/data-form-header";
import { DataFormProvider } from "./components/data-form-provider";
import { DataFormContextProvider } from "./context/data-form-context-provider";
import { useDataSource } from "./hooks/data-source";
import { type DataFormProps } from "./types";

export function DataForm<
  TData extends TFieldValues,
  TFieldValues extends BaseObject,
>({
  itemId,

  header,
  toolbar,

  children,

  api,
  url,
  detailUrlMapper = (entity, url) => `${url}/${entity.id}`,

  detailSchema,
  formSchema,

  readOnly = false,

  titleMapper = () => "Bez názvu",

  fetchData,
  onMutationSuccess,

  className,
  enableWebsocketUpdate,
  ...props
}: DataFormProps<TData, TFieldValues>) {
  const { form } = useSettingsContext();

  const enableAutoUpdate =
    enableWebsocketUpdate === true || form?.enableWebsocketUpdate === true;

  const defaultValues = {
    id: createId(),
    ...props.defaultValues,
  };

  const {
    mutation,
    query,
    formSchema: builtFormSchema,
  } = useDataSource({
    api,
    itemId,
    detailSchema,
    buildFormSchema: formSchema,
    defaultValues,
    fetchData,
    onMutationSuccess,
    mutation: props.mutation,
  });

  return (
    <DataFormContextProvider
      mutation={mutation}
      query={query}
      defaultValues={defaultValues}
      url={url}
      api={api}
      readOnly={
        typeof readOnly === "function"
          ? !!query.data && readOnly(query.data)
          : readOnly
      }
      itemId={itemId}
      detailUrlMapper={detailUrlMapper}
    >
      <DataFormProvider
        formSchema={builtFormSchema}
        className={cn(
          "flex h-full flex-col overflow-x-hidden bg-white",
          className,
        )}
      >
        {header !== undefined ? (
          header
        ) : (
          <DataFormHeader titleMapper={titleMapper} toolbar={toolbar} />
        )}

        <div className="relative grow overflow-y-auto">{children}</div>

        {enableAutoUpdate && <DataFormAutoUpdate />}
      </DataFormProvider>
    </DataFormContextProvider>
  );
}
