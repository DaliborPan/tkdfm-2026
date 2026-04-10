import { groupRegularTrainingRepository } from "../group-regular-training/repository";
import {
  type EntityServiceBrowseType,
  type EntityServiceGetType,
} from "../types";
import { validateTrainer } from "../utils/validation";
import { trainingMapper } from "./mapper";
import { trainingRepository } from "./repository";
import {
  type TrainingBrowseType,
  type TrainingCancelType,
  type TrainingDetailType,
} from "./schema";

const DAY_OF_WEEK_INDEX_MAP: Record<number, string> = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY",
};

const browse: EntityServiceBrowseType<{
  items: TrainingBrowseType[];
  totalCount: number;
}> = async ({ input, currentUser }) => {
  validateTrainer(currentUser);

  const result = await trainingRepository.browse(input);

  return {
    items: result.items.map(trainingMapper.toTrainingBrowse),
    totalCount: result.totalCount,
  };
};

const get: EntityServiceGetType<TrainingDetailType> = async ({
  id,
  currentUser,
}) => {
  validateTrainer(currentUser);

  const row = await trainingRepository.get(id);
  return row ? trainingMapper.toTrainingDetail(row) : null;
};

const createGroupedRegularTrainings = async () => {
  const rows = await groupRegularTrainingRepository.findAll();

  return rows.reduce(
    (acc, row) => {
      if (!acc[row.dayOfWeek]) {
        acc[row.dayOfWeek] = [];
      }

      acc[row.dayOfWeek].push(row);

      return acc;
    },
    {} as Record<string, typeof rows>,
  );
};

export const trainingService = {
  browse,
  get,

  async cancel({
    id,
    input,
    currentUser,
  }: {
    id: string;
    input: TrainingCancelType;
    currentUser: Parameters<typeof browse>[0]["currentUser"];
  }) {
    validateTrainer(currentUser);

    const row = await trainingRepository.updateCancelled(id, input.cancelled);
    return trainingMapper.toTrainingDetail(row);
  },

  async generateTrainings({
    currentUser,
  }: {
    currentUser: Parameters<typeof browse>[0]["currentUser"];
  }) {
    validateTrainer(currentUser);

    const lastTraining = await trainingRepository.getLastTraining();

    const lastTrainingDate = lastTraining
      ? new Date(lastTraining.startsAt)
      : new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);

    const nextMonthDate = new Date(
      lastTrainingDate.getFullYear(),
      lastTrainingDate.getMonth(),
      1,
      10,
    );
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

    const untilDate = new Date(
      nextMonthDate.getFullYear(),
      nextMonthDate.getMonth() + 1,
      1,
      10,
    );

    const currentDate = nextMonthDate;
    const groupedRegularTrainings = await createGroupedRegularTrainings();

    while (currentDate < untilDate) {
      const dayOfWeek = currentDate.getDay();
      const dayRegularTrainings =
        groupedRegularTrainings[DAY_OF_WEEK_INDEX_MAP[dayOfWeek]] ?? [];

      for (const regularTraining of dayRegularTrainings) {
        // Here is the problem - time in regular training is not in UTC,
        // but in local time.
        const TIMEZONE_OFFSET = process.env.VERCEL === "1" ? 2 : 0;

        const startsAt = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          Number(regularTraining.startsAt.split(":")[0]) - TIMEZONE_OFFSET,
          Number(regularTraining.startsAt.split(":")[1]),
          0,
          0,
        );

        const endsAt = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          Number(regularTraining.endsAt.split(":")[0]) - TIMEZONE_OFFSET,
          Number(regularTraining.endsAt.split(":")[1]),
          0,
          0,
        );

        await trainingRepository.create({
          startsAt: startsAt.toISOString(),
          endsAt: endsAt.toISOString(),
          regular: true,
          group: {
            connect: {
              id: regularTraining.groupId,
            },
          },
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }
  },
};
