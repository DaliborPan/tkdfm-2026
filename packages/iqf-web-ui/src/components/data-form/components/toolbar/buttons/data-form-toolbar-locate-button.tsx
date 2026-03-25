/**
 * TODO(dalibor): not working with evidence2
 */
export function DataFormToolbarLocateButton() {
  return null;
}

// export function DataFormToolbarLocateButton({
//   asChild = false,
//   ...props
// }: DataFormToolbarLocaleButtonProps) {
//   const intl = useIntl();

//   // const { tableRef } = useEvidenceContext();
//   const { isEditing, entity, api } = useDataFormContext();

//   const { refetch } = useLocateQuery({
//     id: entity?.id,
//     path: api,
//     data: tableRef.current?.fetchDataOptions,
//   });

//   const scrollToIndex = useCallback((index: number) => {
//     const row = tableRef.current?.tableBodyRef.current?.querySelector(
//       `tr[data-index="${index}"]`,
//     );

//     if (row) {
//       row.scrollIntoView({ behavior: "smooth", block: "end" });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <Slot
//       onClick={async () => {
//         const response = await refetch();

//         if (!response.data) {
//           return;
//         }

//         const pageSize = tableRef.current?.state.pagination.pageSize ?? 50;
//         const pageIndex = Math.floor(response.data / pageSize);
//         const itemIndex = response.data % pageSize;

//         tableRef.current?.stateHandlers.onPaginationChange({
//           pageIndex,
//           pageSize,
//         });

//         setTimeout(() => {
//           scrollToIndex(itemIndex);
//         }, 500);
//       }}
//     >
//       {asChild ? (
//         props.children
//       ) : (
//         <Button
//           {...props}
//           size="m"
//           variant="base"
//           disabled={isEditing}
//           iconRight={{ Icon: Locate }}
//           tooltip={intl.formatMessage({
//             id: "data-form.locate",
//             defaultMessage: "Najít v tabulce",
//           })}
//         >
//           {props.children}
//         </Button>
//       )}
//     </Slot>
//   );
// }
