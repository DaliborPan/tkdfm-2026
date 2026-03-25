import {
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { type ColumnOrderState } from "@tanstack/react-table";

import {
  type PreferenceProps,
  usePreferences,
} from "../../../../settings/preferences/preferences";

export function useColumnOrder({
  preferenceGroupKey,
  version,
  defaultColumnOrder,
}: PreferenceProps & { defaultColumnOrder: ColumnOrderState }) {
  const [columnOrder, setColumnOrder] = usePreferences<ColumnOrderState>({
    preferenceGroupKey,
    version,
    preferenceKey: "columnOrder",
    defaultValue: defaultColumnOrder,
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
      });
    }
  }

  return {
    columnOrder,
    setColumnOrder,
    sensors,
    handleDragEnd,
  };
}
