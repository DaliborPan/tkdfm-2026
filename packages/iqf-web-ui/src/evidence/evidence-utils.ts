import { type EvidenceConf } from "./types";

export function getEvidencePaths(
  config: { url: string } | { url: string }[],
): string[] {
  if (Array.isArray(config)) {
    return config.map(getEvidencePaths).flat();
  }

  return [config.url, `${config.url}/+`, `${config.url}/:id`];
}

export function getPathsFromConfig(config: Record<string, EvidenceConf>) {
  return Object.values(config).map(getEvidencePaths).flat();
}
