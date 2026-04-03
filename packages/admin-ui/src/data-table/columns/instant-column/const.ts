import {
  DateInRangeFilterField,
  createRangeFilterCallback,
  getISOStringWithCorrectTimezone,
} from "../date";

export const createInstantRangeFilter = createRangeFilterCallback({
  valueMapper: (value) => getISOStringWithCorrectTimezone(value),
});

export const instantInRangeFilterDefaults = {
  FilterComponent: DateInRangeFilterField,
  createFilter: createInstantRangeFilter,
};
