import { type NextRequest } from "next/server";

import { getEntityCaller } from "./entity-callers";

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

  if (!caller.create) {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const body = await req.json();

  try {
    const input = caller.create.schema.parse(body);
    const created = await caller.create.handler(input);

    return Response.json(created, { status: 201 });
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Error while creating" }, { status: 400 });
  }
};
