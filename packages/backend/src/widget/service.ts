import { widgetMapper } from "./mapper";
import { widgetRepository } from "./repository";

export const widgetService = {
  async findAll() {
    const rows = await widgetRepository.findAll();
    return rows.map(widgetMapper.toWidgetDetail);
  },
};
