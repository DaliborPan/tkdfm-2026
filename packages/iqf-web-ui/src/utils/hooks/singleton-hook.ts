import { useQuery } from "@tanstack/react-query";
import { type DependencyList } from "react";

/**
 * Mimics useMemo with difference that it will always return the same instance (StrictMode compatible).
 * Difference is also that it might and will return undefined on first render.
 * @param factory Factory function that will be called only once.
 * @param deps Dependency list that will be used to invalidate the singleton.
 * @returns Singleton instance or undefined on first render.
 */
export function useSingleton<T>(factory: () => T, deps: DependencyList) {
  return useQuery({
    queryKey: ["singleton", ...deps],
    queryFn: () => factory(),
    staleTime: Infinity,
  }).data;
}
