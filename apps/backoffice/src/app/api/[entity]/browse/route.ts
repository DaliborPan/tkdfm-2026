import { type NextRequest } from "next/server";

import { getEntityCaller } from "../entity-callers";

type EntityParams = {
  params: Promise<{
    entity: string;
  }>;
};

export const POST = async (req: NextRequest, { params }: EntityParams) => {
  const { entity } = await params;
  const caller = getEntityCaller(entity);

  if (!caller) {
    return Response.json({ error: "Entity not found" }, { status: 404 });
  }

  if (!caller.browse) {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const body = await req.json();
  const input = caller.browse.schema.parse(body);
  const response = await caller.browse.handler(input);

  return Response.json(response);
};
