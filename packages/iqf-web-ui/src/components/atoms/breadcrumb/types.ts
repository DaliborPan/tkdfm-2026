import { type ReactNode } from "react";

export type BreadcrumbItemType =
  | {
      /**
       * Label of the breadcrumb item. `undefined` when loading.
       */
      label: ReactNode | undefined;
      loadingClassName?: string;
      href?: string;
    }
  | {
      items: BreadcrumbItemType[];
    };

export type BreadcrumbProps = {
  items: BreadcrumbItemType[];
};
