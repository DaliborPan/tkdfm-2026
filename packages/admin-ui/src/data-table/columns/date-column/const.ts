import {
  DateInRangeFilterField,
  SingleDateFilterField,
  createDateFilterCallback,
  createRangeFilterCallback,
  getISOStringWithCorrectTimezone,
} from "../date";

const createDateEqFilter = createDateFilterCallback({
  filterOperation: "EQ",
  valueMapper: (value) => getISOStringWithCorrectTimezone(value).slice(0, 10),
});

export const dateEqFilterDefaults = {
  FilterComponent: SingleDateFilterField,
  createFilter: createDateEqFilter,
};

const createDateLteFilter = createDateFilterCallback({
  filterOperation: "LTE",
  valueMapper: (value) => getISOStringWithCorrectTimezone(value).slice(0, 10),
});

export const dateLteFilterDefaults = {
  FilterComponent: SingleDateFilterField,
  createFilter: createDateLteFilter,
};

const createDateGteFilter = createDateFilterCallback({
  filterOperation: "GTE",
  valueMapper: (value) => getISOStringWithCorrectTimezone(value).slice(0, 10),
});

export const dateGteFilterDefaults = {
  FilterComponent: SingleDateFilterField,
  createFilter: createDateGteFilter,
};

export const createDateInRangeFilter = createRangeFilterCallback({
  valueMapper: (value) => getISOStringWithCorrectTimezone(value).slice(0, 10),
});

export const dateInRageFilterDefaults = {
  FilterComponent: DateInRangeFilterField,
  createFilter: createDateInRangeFilter,
};
