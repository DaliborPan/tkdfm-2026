import { useSentryContext } from "../sentry-context";

const ANONYMOUS_FUNCTION = "<anonymous>";
const NODE_MODULES = "node_modules";

const APPS_PATH = "apps";
const PACKAGES_PATH = "packages";

export const useEditorLinkBuilder = () => {
  const ctx = useSentryContext();

  return (rawPath: string) => {
    if (!ctx) {
      return null;
    }

    const { editor, rootPath } = ctx.dev;

    if (rawPath === ANONYMOUS_FUNCTION) {
      return null;
    }

    if (rawPath.includes(NODE_MODULES)) {
      return null;
    }

    const locationMatch = rawPath.match(/(:\d+(:\d+)?)$/);
    const location = locationMatch ? locationMatch[1] : "";

    const pathWithoutLocation = rawPath.replace(/(:\d+(:\d+)?)$/, "");

    const pathWithoutQuery = pathWithoutLocation.split("?")[0];

    let cleanPath = pathWithoutQuery
      .replace(/^https?:\/\/localhost:\d+\//, "")
      .replace(/^@fs\//, "");

    const packagesMatch = cleanPath.match(`(?:^|\\/)${PACKAGES_PATH}\\/(.*)`);
    if (packagesMatch) {
      cleanPath = `../../${PACKAGES_PATH}/${packagesMatch[1]}`;
    } else {
      const appsMatch = cleanPath.match(
        `(?:^|\\/)${APPS_PATH}\\/[^\\/]+\\/(.*)`,
      );
      if (appsMatch) {
        cleanPath = appsMatch[1];
      }
    }

    if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.substring(1);
    }

    const formattedRootPath = rootPath.replace(/\/+$/, "");

    return `${editor}://${formattedRootPath}/${cleanPath}${location}`;
  };
};
