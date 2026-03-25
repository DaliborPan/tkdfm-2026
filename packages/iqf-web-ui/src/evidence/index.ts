export { Evidence, EvidenceLayout } from "./components";

export {
  EvidenceContext,
  type EvidenceContextType,
  useEvidenceContext,
} from "./context";

export {
  createEvidenceRoutes,
  createSimpleEvidenceRoutes,
  createEvidencePath,
  createSimpleEvidencePath,
} from "./evidence-routes";
export { getPathsFromConfig, getEvidencePaths } from "./evidence-utils";
export { PermissionGuard } from "./permission-guard";

export type {
  CreateEvidenceRoutesParams,
  CreateSimpleEvidenceRoutesParams,
  EvidenceConf,
  EvidenceProps,
  EvidenceDetailProps,
  EvidenceTableProps,
  EvidenceConfIdType,
} from "./types";

export {
  useEvidenceParams,
  useEvidenceNameConf,
} from "./hooks/evidence-params";
