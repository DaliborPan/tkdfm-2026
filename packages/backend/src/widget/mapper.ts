import type { Widget } from "../../generated/client";
import { widgetDetailSchema } from "./schema";

export const widgetMapper = {
  toWidgetDetail(widget: Widget) {
    return widgetDetailSchema.parse({
      id: widget.id,
      createdAt: widget.createdAt.toISOString(),
      updatedAt: widget.updatedAt.toISOString(),
      text: widget.text,
    });
  },
};
