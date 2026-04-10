import { type NextRequest } from "next/server";

import { trainingCancelSchema } from "@repo/backend/training/schema";

import { trainingCaller } from "@/modules/training/server/caller";

type TrainingCancelParams = {
  params: Promise<{
    id: string;
  }>;
};

export const POST = async (req: NextRequest, { params }: TrainingCancelParams) => {
  try {
    const { id } = await params;
    const body = await req.json();
    const input = trainingCancelSchema.parse(body);
    const result = await trainingCaller.cancel(id, input);

    return Response.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ error: "Error while cancelling training" }, { status: 400 });
  }
};
