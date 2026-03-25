import { Terminal } from "lucide-react";

import { Icon } from "../../components/atoms/icon";
import { Tag } from "../../components/atoms/tag";
import { useEditorLinkBuilder } from "../utils/editor";

export function SentryErrorDevPage({
  error,
  componentStack,
}: {
  error: unknown;
  componentStack?: string | null;
  resetError: () => void;
}) {
  const buildEditorLink = useEditorLinkBuilder();

  const errorMessage = error instanceof Error ? error.message : String(error);

  const stackLines = componentStack
    ?.trim()
    .split("\n")
    .map((line) => line.trim().replace(/^at\s+/, ""));

  return (
    <div className="flex h-full w-full flex-col gap-4 py-4">
      <div className="flex items-center gap-4 px-4 text-xl font-bold">
        <Icon Icon={Terminal} className="size-6 text-gray-600" />
        <Tag variant="warning">Dev Mode</Tag>
        Zachycená chyba (Sentry Fallback)
      </div>
      <div className="bg-error p-4 text-white">{errorMessage}</div>
      <div className="h-full divide-y divide-gray-100 overflow-auto whitespace-pre font-mono text-xs">
        {(stackLines ?? []).map((line) => {
          const match = line.match(/^(.*?) \((.*?)\)$/) || [null, line, ""];
          const [_, componentName, location] = match;
          const vscodeLink = buildEditorLink(location);

          if (!vscodeLink) {
            return null;
          }

          const displayLocation = vscodeLink.split("/").pop();

          return (
            <div
              key={line}
              className="flex gap-4 whitespace-nowrap px-4 py-1 hover:bg-blue-50"
            >
              <span className="font-semibold">at {componentName}</span>
              {vscodeLink && (
                <a href={vscodeLink} className="text-blue-500">
                  {displayLocation}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
