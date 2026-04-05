"use client";

import { type PropsWithChildren, Suspense, useMemo } from "react";

import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { IqfAxiosError, type IqfAxiosErrorHandler } from "iqf-web-ui/api-fetch";
import { SettingsProvider } from "iqf-web-ui/settings";
import { Toaster, errorToast } from "iqf-web-ui/toast";
import { setZodErrorMap } from "iqf-web-ui/utils";
import { useIntl } from "react-intl";

const DEFAULT_ERROR_MESSAGE = "Chyba při komunikaci se serverem.";

const defaultErrorHandler: IqfAxiosErrorHandler = (error) => {
  errorToast(
    error.codeErrorMessage ?? error.customErrorMessage ?? DEFAULT_ERROR_MESSAGE,
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    // onError: (error) => errorResolver(error),
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const isAxiosError = error instanceof IqfAxiosError;

      if (!isAxiosError) {
        return;
      }

      const {
        // code,
        isZodError,
        message,
        config,
        errorHandler = defaultErrorHandler,
      } = error;

      if (isZodError) {
        console.error(config?.url, message);

        errorToast("Chyba při validaci dat ze serveru.");
        return;
      }

      console.error(error);

      errorHandler({
        ...error,
        codeErrorMessage: DEFAULT_ERROR_MESSAGE, // TODO
      });
    },
  }),
});

type ProviderProps = PropsWithChildren<{
  router?: ReturnType<typeof useRouter>;
  pathname?: ReturnType<typeof usePathname>;
  searchParams?: URLSearchParams;
}>;

/**
 * If component uses "dynamic" hooks (e.g. useRouter, usePathname),
 * it must be wrapped in <Suspense> to avoid errors during prerendering.
 */
function ProvidersDynamic(props: Omit<ProviderProps, "router" | "pathname">) {
  const router = useRouter();
  const pathname = usePathname();
  const nextSearchParams = useSearchParams();
  const searchParams = useMemo(
    () => new URLSearchParams(nextSearchParams.toString()),
    [nextSearchParams],
  );

  return (
    <Providers
      {...props}
      router={router}
      pathname={pathname}
      searchParams={searchParams}
    />
  );
}

function ZodLocale() {
  const intl = useIntl();

  setZodErrorMap(intl);

  return null;
}

export function Providers({
  children,
  router,
  pathname,
  searchParams,
}: ProviderProps) {
  if (!router || !pathname || !searchParams) {
    return (
      <Suspense fallback={null}>
        <ProvidersDynamic>{children}</ProvidersDynamic>
      </Suspense>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ZodLocale />

      <SettingsProvider
        enableSyncPreferences={false}
        router={{
          navigate: (href) => {
            if (href) {
              router.push(href);
            }
          },
          pathname,
          useParams,
          searchParams,
          Link: (props) => <Link {...props} />,
        }}
      >
        {children}

        <Toaster />
      </SettingsProvider>
    </QueryClientProvider>
  );
}
