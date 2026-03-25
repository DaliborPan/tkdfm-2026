import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import compact from "lodash/compact";
import { X } from "lucide-react";
import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useIntl } from "react-intl";

import { type BaseObject } from "../../../evidence/base";
import { cn } from "../../../utils/cn";
import { composeRefs } from "../../../utils/helpers/compose-refs";
import { type VirtualizerHandle } from "../../../utils/hooks/virtualizer-hook";
import { Button } from "../../atoms/button";
import { Icon } from "../../atoms/icon";
import { Input } from "../../atoms/input";
import { Popover } from "../../atoms/popover";
import { AutocompleteList } from "./autocomplete-list";
import { useAutocompleteInfiniteQuery } from "./hooks/autocomplete-infinite-query";
import { type AutocompleteProps } from "./types";

const MINIMUM_QUERY_LENGTH = 0;

export function Autocomplete<ItemType extends BaseObject>({
  queryKeyId,
  value,
  size = "s",
  variant = "secondary",
  multiple = false,
  autoFocus = false,
  showSelectedList = true,
  showClearButton = true,
  minQueryLength = MINIMUM_QUERY_LENGTH,
  options: autocompleteOptions,
  state,
  iconRight,
  idMapper = (item) => item?.id ?? "",
  labelMapper,
  onChange,
  onInputChange,
  disabled,
  ref,
  ...props
}: AutocompleteProps<ItemType>) {
  const intl = useIntl();

  const [expanded, setExpanded] = useState(false);

  const clearable = showClearButton && !disabled;

  const singleItem = useMemo(() => value as ItemType | undefined, [value]);
  const multipleItems = useMemo(() => (value || []) as ItemType[], [value]);

  const [focusedIndex, setFocusedIndex] = useState(-1);

  const [query, setQuery] = useState(
    multiple ? "" : singleItem !== undefined ? labelMapper(singleItem) : "",
  );
  const debouncedQuery = useDebounce(query, 500);

  const validQueryOrEmpty =
    (debouncedQuery?.length ?? 0 >= minQueryLength) ? debouncedQuery : "";

  const listRef = useRef<VirtualizerHandle>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { options, infiniteQuery } = useAutocompleteInfiniteQuery({
    id: queryKeyId,
    query: validQueryOrEmpty,
    enableEmptyQuery: minQueryLength === 0,
    autocompleteOptions,
    expanded,
  });

  const resetInfiniteQuery = () => {
    const autocompleteQueryKeyPrefix = ["autocomplete", queryKeyId];

    const [data] = queryClient.getQueriesData({
      predicate: ({ queryKey }) =>
        queryKey.at(0) === autocompleteQueryKeyPrefix[0] &&
        queryKey.at(1) === autocompleteQueryKeyPrefix[1] &&
        queryKey.at(2) === "",
    });

    if (!data) {
      return;
    }

    const [, emptyQueryInfiniteQueryData] = data;

    queryClient.removeQueries({
      queryKey: autocompleteQueryKeyPrefix,
    });

    queryClient.setQueriesData(
      {
        queryKey: autocompleteQueryKeyPrefix,
      },
      emptyQueryInfiniteQueryData,
    );
  };

  /**
   * Remove all infinite queries and set only
   * query with empty string.
   */
  useEffect(() => {
    resetInfiniteQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  /**
   * Value might be reseted in a form,
   * we need to propagate to query as well.
   *
   * `value` might be even set externally via
   * `setValue`, we need to propagate it to
   * as input value.
   */
  useEffect(() => {
    if (query && !value) {
      setQuery("");
    }

    if (value && !multiple) {
      setQuery(labelMapper(value as ItemType));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (autoFocus) {
      const frame = requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Calculate distance from bottom of the input
   * to determine if the popover should be displayed
   * on top or bottom.
   * @returns Distance from bottom of the input
   */
  const calculateDistanceFromBottom = () => {
    const rect = inputRef.current?.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    return rect ? viewportHeight - rect.bottom : 0;
  };

  const distanceFromBottom = calculateDistanceFromBottom();

  const handleClose = () => {
    setExpanded(false);
    setFocusedIndex(-1);

    resetInfiniteQuery();

    if (!multiple && singleItem) {
      setQuery(labelMapper(singleItem));
    }
  };

  const handleSelect = useCallback(
    (option: ItemType) => {
      if (inputRef.current) {
        inputRef.current.value = labelMapper(option);
      }

      if (!multiple) {
        setQuery(labelMapper(option));
        onChange(option);
      } else {
        const isSelected = multipleItems.some(
          (item) => idMapper(item) === idMapper(option),
        );

        if (isSelected) {
          onChange(
            multipleItems.filter((item) => idMapper(item) !== idMapper(option)),
          );
        } else {
          onChange([...multipleItems, option]);
        }
      }

      resetInfiniteQuery();

      inputRef.current?.focus();
      setExpanded(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [idMapper, labelMapper, multiple, multipleItems, onChange],
  );

  const handleClear = useCallback(() => {
    setQuery("");

    setExpanded(false);
    setFocusedIndex(-1);

    resetInfiniteQuery();

    if (!multiple) {
      onChange(null);
    } else {
      onChange([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      let nextIndex = -1;

      if (e.code === "ArrowUp") {
        nextIndex = Math.max(-1, focusedIndex - 1);
      } else if (e.code === "ArrowDown") {
        setExpanded(true);
        nextIndex = focusedIndex + 1;
      } else if (e.code === "Enter") {
        if (focusedIndex !== -1) {
          // not to submit form
          e.preventDefault();

          setFocusedIndex(-1);
          handleSelect(options[focusedIndex]);
        }
      } else if (e.code === "Escape" || e.code === "Tab") {
        setFocusedIndex(-1);
        setExpanded(false);

        resetInfiniteQuery();

        if (!multiple && singleItem) {
          setQuery(labelMapper(singleItem));
        }
      }

      if (options.length > 0) {
        listRef.current?.rowVirtualizer.scrollToIndex(nextIndex, {
          align: "auto",
          behavior: "auto",
        });
      }

      setFocusedIndex(nextIndex);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [focusedIndex, handleSelect, labelMapper, multiple, options, singleItem],
  );

  const input = (
    <Input
      {...props}
      type="text"
      value={query}
      ref={composeRefs(inputRef, ref)}
      size={size}
      state={state}
      variant={variant}
      disabled={disabled}
      onBlur={() => {
        setQuery(multiple ? "" : (singleItem && labelMapper(singleItem)) || "");
      }}
      onKeyDown={(e) => {
        handleKeyDown(e);
      }}
      onPointerDown={() => {
        setExpanded((state) => !state);
      }}
      onInput={(e) => {
        setQuery(e.currentTarget.value);

        onInputChange?.(e.currentTarget.value);

        setExpanded(true);
        setFocusedIndex(-1);
      }}
      iconRight={iconRight}
      className={cn("truncate text-left", clearable && "!pr-14")}
      inputChild={
        clearable &&
        query && (
          <div
            className={cn(
              "absolute inset-y-0 right-0 flex items-center pr-3 opacity-0 transition-opacity group-hover:opacity-100",
              iconRight && "pr-8",
              state !== "default" && "pr-8",
              iconRight && state !== "default" && "pr-14",
            )}
          >
            <Icon
              Icon={X}
              className="pointer-events-auto cursor-pointer text-error-500"
              onClick={handleClear}
              onPointerDown={(e) => e.stopPropagation()}
            />
          </div>
        )
      }
    />
  );

  return (
    <div>
      <Popover
        position={
          distanceFromBottom < 225 /* max height of AutocompleteList */
            ? "top"
            : "bottom"
        }
        open={expanded}
        onClose={handleClose}
        className="bg-white p-0"
        Trigger={input}
        Content={
          (infiniteQuery.isLoading && !query) || options.length === 0 ? (
            <div className="ml-[23px] px-2 py-3 text-secondary-700">
              {infiniteQuery.isLoading && !query
                ? intl.formatMessage({
                    id: "molecules.autocomplete.loading",
                    defaultMessage: "Načítání...",
                  })
                : intl.formatMessage({
                    id: "molecules.autocomplete.no-data",
                    defaultMessage: "Žádná data",
                  })}
            </div>
          ) : (
            <AutocompleteList
              ref={listRef}
              options={options}
              focusedIndex={focusedIndex}
              selectedOptions={multiple ? multipleItems : compact([singleItem])}
              idMapper={idMapper}
              handleSelect={handleSelect}
              labelMapper={labelMapper}
              query={infiniteQuery}
            />
          )
        }
      />

      {multiple && showSelectedList && multipleItems.length > 0 && (
        <ul role="listbox" className="mt-2 flex flex-wrap gap-2 text-xs">
          {multipleItems.map((item) => (
            <li
              key={idMapper(item)}
              className="relative m-0 flex items-center bg-primary-200 pl-2 before:hidden"
            >
              {labelMapper(item)}

              <Button
                variant="base"
                className="ml-2"
                iconRight={{ Icon: X }}
                onClick={() =>
                  onChange(
                    multipleItems.filter((i) => idMapper(i) !== idMapper(item)),
                  )
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
