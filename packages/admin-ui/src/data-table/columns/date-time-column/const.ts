import {
  DateInRangeFilterField,
  SingleDateFilterField,
  createDateFilterCallback,
  createRangeFilterCallback,
  getISOStringWithCorrectTimezone,
} from "../date";

export const createDateTimeEqFilter = createDateFilterCallback({
  filterOperation: "EQ",
  valueMapper: (value) => getISOStringWithCorrectTimezone(value).slice(0, 16),
});

export const dateTimeEqFilterDefaults = {
  FilterComponent: SingleDateFilterField,
  createFilter: createDateTimeEqFilter,
};

export const createDateTimeLteFilter = createDateFilterCallback({
  filterOperation: "LTE",
  valueMapper: (value) => getISOStringWithCorrectTimezone(value).slice(0, 16),
});

export const dateTimeLteFilterDefaults = {
  FilterComponent: SingleDateFilterField,
  createFilter: createDateTimeLteFilter,
};

export const createDateTimeGteFilter = createDateFilterCallback({
  filterOperation: "GTE",
  valueMapper: (value) => getISOStringWithCorrectTimezone(value).slice(0, 16),
});

export const dateTimeGteFilterDefaults = {
  FilterComponent: SingleDateFilterField,
  createFilter: createDateTimeGteFilter,
};

export const createDateTimeInRangeFilter = createRangeFilterCallback({
  valueMapper: (value) => getISOStringWithCorrectTimezone(value).slice(0, 16),
});

export const dateTimeInRangeFilterDefaults = {
  FilterComponent: DateInRangeFilterField,
  createFilter: createDateTimeInRangeFilter,
};
