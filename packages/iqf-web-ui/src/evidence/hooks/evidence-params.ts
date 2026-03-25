import { useSettingsContext } from "../../settings/context";
import { type EvidenceConf } from "../types";

export function useEvidenceParams<TEvidenceName extends string>() {
  const {
    router: { useParams },
  } = useSettingsContext();

  const params = useParams?.();

  return {
    itemId: params?.id,

    // TODO(iqf) - shouldn't we validate the name??
    name: params?.name as TEvidenceName | undefined,
    tab: params?.tab,
  };
}

/**
 * Used for getting evidence conf for evidence with secondary menu.
 * Conf is selected based on the name parameter in the URL.
 */
export function useEvidenceNameConf<
  TEvidenceName extends string,
  TEvidenceConf extends EvidenceConf,
>(
  evidenceConfs: Record<TEvidenceName, TEvidenceConf>,
  defaultEvidenceName = "all" as TEvidenceName,
) {
  const { name = defaultEvidenceName } = useEvidenceParams<TEvidenceName>();

  return evidenceConfs[name];
}
