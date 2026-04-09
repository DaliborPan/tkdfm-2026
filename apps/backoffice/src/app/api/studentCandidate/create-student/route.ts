import { type NextRequest } from "next/server";

import { studentCandidateCreateStudentSchema } from "@repo/backend/student-candidate/schema";

import { studentCandidateCaller } from "@/modules/student-candidate/server/caller";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const input = studentCandidateCreateStudentSchema.parse(body);
    const result = await studentCandidateCaller.createStudentFromCandidate(input);

    return Response.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ error: "Error while creating student" }, { status: 400 });
  }
};
