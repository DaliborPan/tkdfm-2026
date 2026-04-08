import { type NextRequest } from "next/server";

import { studentCandidateCaller } from "@/modules/student-candidate/server/caller";

export const POST = async (_req: NextRequest) => {
  try {
    await studentCandidateCaller.importTeamMembers();

    return Response.json(null);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json(
      { error: "Error while importing candidates" },
      { status: 400 },
    );
  }
};
