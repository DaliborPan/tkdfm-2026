import {
  type ComponentType,
  type PropsWithChildren,
  createContext,
  useContext,
} from "react";

import { type ButtonCVAType } from "../components/atoms/button/const";
import { type ChipCVAType } from "../components/atoms/chip/const";
import { type DeriveSortingFn } from "../components/data-table/utils/derive-sorting";

export type PreferenceObject = {
  version: number;
  [key: string]: any;
};

export type Preferences = Record<string, PreferenceObject>;

export type SettingsContext = {
  /**
   * Since we can use both Vite and Next.js, we need to use a common type for the router.
   *
   * @default react-router for Vite is applied.
   */
  router: {
    navigate: (href: string | null) => void;
    pathname: string;
    searchParams?: URLSearchParams;
    useParams: () => Record<string, string | undefined>;
    Link: ComponentType<
      PropsWithChildren<{
        href: string;
        className?: string;
        tabIndex?: number;
        // TODO :) `Event` does not help. It can be MouseEvent, KeyboardEvent, etc.
        onClick?: (e: any) => void;
      }>
    >;
  };
  zod?: {
    enableQueryLogging?: boolean;
  };
  preferences: {
    get: (values: { key: string; version: number }) => Preferences | undefined;
    getAll: () => Preferences | undefined;
    set: (values: {
      key: string;
      preferences: PreferenceObject;
    }) => Promise<void>;
    refresh: () => Promise<void>;
    remove: (key: string) => Promise<void>;
    clear: (values?: any) => Promise<void>;
  };
  table?: {
    deriveSorting?: DeriveSortingFn;
  };
  form?: {
    enableWebsocketUpdate?: boolean;
    fields?: {
      enableReset?: boolean;
    };
  };
  pdfViewer?: {
    workerUrl?: string;
  };
  components?: {
    buttonVariants?: ButtonCVAType;
    chipVariants?: ChipCVAType;
  };
};

export const SettingsContext = createContext<SettingsContext | null>(null);

export function useSettingsContext() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsProvider",
    );
  }

  return context;
}
