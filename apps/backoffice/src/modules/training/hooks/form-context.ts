import { type TrainingDetailType } from "@repo/backend/training/schema";
import { useDataFormContext } from "iqf-web-ui/data-form";

export const useTrainingFormContext = useDataFormContext<
  TrainingDetailType,
  TrainingDetailType
>;
