import { type ButtonProps } from "../../atoms/button";

export type PaginationProps = {
  total: number;
  currentIndex: number;
  onChange: (pageIndex: number) => void;
  pageSize: number;
  pagesToShow?: number;
  color?: ButtonProps["color"];
};
