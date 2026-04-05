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

import { usePreferences } from "iqf-web-ui/settings";

export function useColumnOrder({
  preferenceGroupKey,
  defaultColumnOrder,
}: {
  defaultColumnOrder: ColumnOrderState;
  preferenceGroupKey: string;
}) {
  const [columnOrder, setColumnOrder] = usePreferences<ColumnOrderState>({
    preferenceGroupKey,
    preferenceKey: "columnOrder",
    defaultValue: defaultColumnOrder,
    version: 1,
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
