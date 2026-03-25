import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { defineMessages, useIntl } from "react-intl";

import { cn } from "../../../utils/cn";
import { Button } from "../../atoms/button";
import { PaginationContent } from "./pagination-content";
import { PaginationItem } from "./pagination-item";
import { type PaginationProps } from "./types";
import { paginate } from "./utils";

export function Pagination({
  total,
  currentIndex,
  onChange,
  pageSize,
  pagesToShow = 5,
  color = "primary",
}: PaginationProps) {
  const intl = useIntl();
  const messages = defineMessages({
    gotoPage: {
      id: "molecules.pagination.gotoPage",
      defaultMessage: "Jít na stranu: {page}",
    },
  });

  const { pages, currentPage, totalPages } = paginate(
    total,
    currentIndex + 1,
    pageSize,
    pagesToShow,
  );

  return (
    <nav role="navigation" aria-label="pagination">
      <PaginationContent>
        <PaginationItem>
          <Button
            disabled={currentPage <= 1}
            variant="base"
            color={color}
            aria-label={intl.formatMessage(messages.gotoPage, {
              page: 1,
            })}
            onClick={() => onChange(0)}
            className="px-2"
            iconLeft={{
              Icon: ChevronsLeft,
              strokeWidth: 1,
              className: "size-6",
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <Button
            disabled={currentPage <= 1}
            variant="base"
            color={color}
            aria-label={intl.formatMessage(messages.gotoPage, {
              page: currentPage - 1,
            })}
            onClick={() => onChange(currentIndex - 1)}
            className="px-2"
            iconLeft={{
              Icon: ChevronLeft,
              strokeWidth: 1,
              className: "size-6",
            }}
          />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <Button
              variant="base"
              color={color}
              className={cn(
                page === currentPage &&
                  (color === "primary" ? "bg-primary-100" : "bg-neutral-100"),
              )}
              onClick={() => onChange(page - 1)}
              aria-label={intl.formatMessage(messages.gotoPage, {
                page,
              })}
              {...(page === currentPage && { "aria-current": "page" })}
            >
              {page}
            </Button>
          </PaginationItem>
        ))}

        <PaginationItem>
          <Button
            disabled={currentPage >= totalPages}
            variant="base"
            color={color}
            aria-label={intl.formatMessage(messages.gotoPage, {
              page: currentPage + 1,
            })}
            onClick={() => onChange(currentIndex + 1)}
            className="px-2"
            iconLeft={{
              Icon: ChevronRight,
              strokeWidth: 1,
              className: "size-6",
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <Button
            disabled={currentPage >= totalPages}
            variant="base"
            color={color}
            aria-label={intl.formatMessage(messages.gotoPage, {
              page: totalPages,
            })}
            onClick={() => onChange(totalPages - 1)}
            className="px-2"
            iconLeft={{
              Icon: ChevronsRight,
              strokeWidth: 1,
              className: "size-6",
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </nav>
  );
}
