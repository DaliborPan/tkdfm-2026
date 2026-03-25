import debounce from "lodash/debounce";
import {
  Activity,
  type PropsWithChildren,
  type ReactNode,
  useEffect,
} from "react";

import { Sidebar } from "../shadcn-sidebar";
import {
  AppSidebarProvider,
  type AppSidebarProviderProps,
  useAppSidebar,
} from "./app-sidebar-provider";
import { DefaultSecondarySidebar } from "./secondary-sidebar";
import { type SidebarSettingsProps, SidebarWrapper } from "./sidebar-wrapper";

type AppSidebarProps = PropsWithChildren<
  {
    /**
     * Primary sidebar component.
     *
     * The component should follow the shadcn/ui Sidebar API and conventions.
     *
     * @see https://ui.shadcn.com/docs/components/sidebar
     */
    primarySidebar: ReactNode;

    /**
     * Optional `header` component, which is positioned at the top of the sidebar and rest of the page.
     */
    header?: ReactNode;

    /**
     * Settings for primary sidebar - width, cookies and keyboard shortcut.
     */
    primarySidebarSettingsProps?: SidebarSettingsProps;
  } & (
    | {
        /**
         * Optional secondary sidebar component.
         *
         * - If not provided, `DefaultSecondarySidebar` is rendered.
         * - To disable the secondary sidebar entirely, pass `null`.
         *
         * @default <DefaultSecondarySidebar />
         *
         * The component should follow the shadcn/ui Sidebar API and conventions.
         *
         * @see https://ui.shadcn.com/docs/components/sidebar
         */
        secondarySidebar: ReactNode;

        /**
         * Settings for secondary sidebar - width, cookies and keyboard shortcut.
         */
        secondarySidebarSettingsProps?: SidebarSettingsProps;
      }
    | {
        secondarySidebar?: never;
        secondarySidebarSettingsProps?: never;
      }
  )
>;

export function AppSidebar({
  defaultPrimaryOpen,
  defaultSecondaryOpen,
  ...props
}: AppSidebarProps & Omit<AppSidebarProviderProps, "children">) {
  return (
    <AppSidebarProvider
      defaultPrimaryOpen={defaultPrimaryOpen}
      defaultSecondaryOpen={defaultSecondaryOpen}
    >
      <InnerAppSidebar {...props} />
    </AppSidebarProvider>
  );
}

function InnerAppSidebar({
  primarySidebar,
  secondarySidebar,
  header,
  children,
  primarySidebarSettingsProps,
  secondarySidebarSettingsProps,
}: AppSidebarProps) {
  const {
    isMobile,
    isPrimaryOpen,
    setIsPrimaryOpen,
    isSecondaryOpen,
    setIsSecondaryOpen,
    setOpenMobile,
  } = useAppSidebar();

  const secondarySidebarComponent =
    secondarySidebar !== undefined ? (
      secondarySidebar
    ) : (
      <DefaultSecondarySidebar />
    );

  useEffect(() => {
    const abortController = new AbortController();

    window.addEventListener(
      "resize",
      debounce(
        () => {
          if (!isMobile) {
            setOpenMobile(false);
          }
        },
        200,
        { leading: true },
      ),
      { signal: abortController.signal },
    );

    return () => {
      abortController.abort();
    };
  }, [isMobile, setOpenMobile]);

  return (
    <>
      {header}

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {isMobile ? (
          <Sidebar>
            {primarySidebar}
            {secondarySidebar}
          </Sidebar>
        ) : (
          <>
            <SidebarWrapper
              {...primarySidebarSettingsProps}
              open={isPrimaryOpen}
              setOpen={setIsPrimaryOpen}
            >
              {primarySidebar}
            </SidebarWrapper>

            <Activity mode={secondarySidebarComponent ? "visible" : "hidden"}>
              <SidebarWrapper
                {...secondarySidebarSettingsProps}
                open={isSecondaryOpen}
                setOpen={setIsSecondaryOpen}
              >
                {secondarySidebarComponent}
              </SidebarWrapper>
            </Activity>
          </>
        )}

        {children}
      </div>
    </>
  );
}
