"use client";

import { type ComponentType, type PropsWithChildren } from "react";
import { type UrlObject } from "url";

export type LinkComponentType = ComponentType<
  PropsWithChildren<{
    href: string | UrlObject;
    className?: string;
    tabIndex?: number;
  }>
>;
