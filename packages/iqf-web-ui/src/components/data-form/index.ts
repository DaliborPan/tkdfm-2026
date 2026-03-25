export * from "./components";

export {
  DataFormContextProvider,
  DataFormContext,
  useDataFormContext,
  type DataFormContextType,
  type DataFormMode,
  type UseDataFormContextResult,
} from "./context";

export {
  useEntityDetailQuery,
  useDataSource,
  useDataFormMutation,
  type UseDataSourceParams,
  type UseDataSourceResult,
  useOnFormSubmit,
  useUrlHref,
} from "./hooks";

export { buildNewEntityUrl } from "./utils/build-new-entity-url";
export { checkIsNew } from "./utils/check-is-new";

export { DataForm } from "./data-form";

export type { DataFormProps, DataFormMutationVariables } from "./types";
