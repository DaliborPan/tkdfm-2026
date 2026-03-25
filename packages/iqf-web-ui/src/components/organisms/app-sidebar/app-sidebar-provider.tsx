import isEqualWith from "lodash/isEqualWith";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

import { SidebarProvider, useSidebar } from "../shadcn-sidebar";
import { type SecondaryMenuPropsType } from "./types";

type AppSidebarContextType = {
  /**
   * Open state of primary sidebar.
   */
  isPrimaryOpen: boolean;

  /**
   * React useState setter for primary sidebar open state.
   */
  setIsPrimaryOpen: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Default value of primary sidebar open state.
   */
  defaultPrimaryOpen: boolean;

  /**
   * Open state of secondary sidebar.
   */
  isSecondaryOpen: boolean;

  /**
   * React useState setter for secondary sidebar open state.
   */
  setIsSecondaryOpen: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Default value of secondary sidebar open state.
   */
  defaultSecondaryOpen: boolean;

  /**
   * Function to toggle the primary sidebar open state.
   */
  togglePrimary: () => void;

  /**
   * Function to toggle the secondary sidebar open state.
   */
  toggleSecondary: () => void;

  /**
   * Toggles both primary and secondary sidebar open state.
   * If primary sidebar is open, sets secondary sidebar open state to true.
   * If primary sidebar is closed, sets secondary sidebar open state to false.
   */
  toggleSidebars: () => void;

  /**
   * Secondary sidebar items.
   */
  secondaryItems?: SecondaryMenuPropsType;

  /**
   * React useState setter for secondary sidebar items.
   */
  setSecondaryItems: React.Dispatch<
    React.SetStateAction<SecondaryMenuPropsType | undefined>
  >;

  /**
   * flag indicating mobile view
   */
  isMobile: boolean;

  /**
   * Open state of mobile sidebar.
   */
  openMobile: boolean;

  /**
   * Function to set open state of mobile sidebar.
   */
  setOpenMobile: (open: boolean) => void;
};

const AppSidebarContext = createContext<AppSidebarContextType | null>(null);

export function useAppSidebar() {
  const context = useContext(AppSidebarContext);

  if (!context) {
    throw new Error("useAppSidebar must be used within a AppSidebarProvider.");
  }

  return context;
}

export function useSecondarySidebarItems(props: SecondaryMenuPropsType) {
  const { setSecondaryItems } = useAppSidebar();

  useLayoutEffect(() => {
    setSecondaryItems((prev) => {
      if (
        isEqualWith(prev, props, (objValue, othValue) => {
          if (
            typeof objValue === "function" &&
            typeof othValue === "function"
          ) {
            return true;
          }
          return undefined;
        })
      ) {
        return prev;
      }

      return props;
    });
  }, [props, setSecondaryItems]);

  useLayoutEffect(() => {
    return () => {
      setSecondaryItems(undefined);
    };
  }, [setSecondaryItems]);
}

export type AppSidebarProviderProps = PropsWithChildren<{
  /**
   * Default value of primary sidebar open state.
   *
   * @default true
   */
  defaultPrimaryOpen?: boolean;

  /**
   * Default value of secondary sidebar open state.
   *
   * @default true
   */
  defaultSecondaryOpen?: boolean;
}>;

function InnerAppSidebarProvider({
  defaultPrimaryOpen = true,
  defaultSecondaryOpen = true,
  children,
}: AppSidebarProviderProps) {
  const { isMobile, toggleSidebar, openMobile, setOpenMobile } = useSidebar();

  const [isPrimaryOpen, setIsPrimaryOpen] = useState(defaultPrimaryOpen);
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(defaultSecondaryOpen);

  const [secondaryItems, setSecondaryItems] = useState<
    SecondaryMenuPropsType | undefined
  >(undefined);

  const togglePrimary = () =>
    isMobile ? toggleSidebar() : setIsPrimaryOpen((prev) => !prev);

  const toggleSecondary = () =>
    isMobile ? toggleSidebar() : setIsSecondaryOpen((prev) => !prev);

  const toggleSidebars = () => {
    if (isMobile) {
      toggleSidebar();
    } else {
      const next = !isPrimaryOpen;
      setIsPrimaryOpen(next);
      setIsSecondaryOpen(next);
    }
  };

  return (
    <AppSidebarContext.Provider
      value={{
        isPrimaryOpen,
        setIsPrimaryOpen,
        defaultPrimaryOpen,
        isSecondaryOpen,
        setIsSecondaryOpen,
        defaultSecondaryOpen,
        togglePrimary,
        toggleSecondary,
        toggleSidebars,
        secondaryItems,
        setSecondaryItems,
        isMobile,
        openMobile,
        setOpenMobile,
      }}
    >
      {children}
    </AppSidebarContext.Provider>
  );
}

export function AppSidebarProvider(props: AppSidebarProviderProps) {
  return (
    <SidebarProvider className="max-w-none">
      <InnerAppSidebarProvider {...props} />
    </SidebarProvider>
  );
}
