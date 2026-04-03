import {
  DateInRangeFilterField,
  SingleDateFilterField,
  createDateFilterCallback,
  createRangeFilterCallback,
} from "../date";

const createTimeEqFilter = createDateFilterCallback({
  filterOperation: "EQ",
  valueMapper: (value) => `${value}:00.000Z`,
});

export const timeEqFilterDefaults = {
  FilterComponent: SingleDateFilterField,
  createFilter: createTimeEqFilter,
};

const createTimeLteFilter = createDateFilterCallback({
  filterOperation: "LTE",
  valueMapper: (value) => `${value}:00.000Z`,
});

export const timeLteFilterDefaults = {
  FilterComponent: SingleDateFilterField,
  createFilter: createTimeLteFilter,
};

const createTimeGteFilter = createDateFilterCallback({
  filterOperation: "GTE",
  valueMapper: (value) => `${value}:00.000Z`,
});

export const timeGteFilterDefaults = {
  FilterComponent: SingleDateFilterField,
  createFilter: createTimeGteFilter,
};

export const createTimeInRangeFilter = createRangeFilterCallback({
  valueMapper: (value) => `${value}:00.000Z`,
});

export const timeInRangeFilterDefaults = {
  FilterComponent: DateInRangeFilterField,
  createFilter: createTimeInRangeFilter,
};
