import { type NextRequest } from "next/server";

import { trainingCaller } from "@/modules/training/server/caller";

export const POST = async (_req: NextRequest) => {
  try {
    await trainingCaller.generateTrainings();

    return Response.json(null);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json(
      { error: "Error while generating trainings" },
      { status: 400 },
    );
  }
};
