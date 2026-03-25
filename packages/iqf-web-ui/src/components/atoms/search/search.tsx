"use client";

import { Search as SearchIcon } from "lucide-react";

import { Button } from "../button";
import { Input } from "../input";
import { type InputComponentProps } from "../input/types";

export type SearchProps = InputComponentProps;

// TODO: Rework
export function Search({
  placeholder,
  id,
  name,
  size = "s",
  ...props
}: SearchProps) {
  return (
    <Input
      {...props}
      size={size}
      inputChild={
        <div className="absolute right-1 top-[3px]">
          <Button size="xs" iconLeft={{ Icon: SearchIcon }} />
        </div>
      }
    />
  );
}
