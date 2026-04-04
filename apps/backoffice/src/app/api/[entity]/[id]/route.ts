import { type NextRequest } from "next/server";

import { getEntityService } from "../entity-services";

type EntityIdParams = {
  params: Promise<{
    entity: string;
    id: string;
  }>;
};

export const GET = async (_req: NextRequest, { params }: EntityIdParams) => {
  const { entity, id } = await params;
  const service = getEntityService(entity);

  if (!service) {
    return Response.json({ error: "Entity not found" }, { status: 404 });
  }

  const obj = await service.get(id);

  if (!obj) {
    return Response.json(null, { status: 404 });
  }

  return Response.json(obj);
};

export const PUT = async (req: NextRequest, { params }: EntityIdParams) => {
  const { entity, id } = await params;
  const service = getEntityService(entity);

  if (!service) {
    return Response.json({ error: "Entity not found" }, { status: 404 });
  }

  const body = await req.json();

  try {
    const obj = await service.update(id, body);

    return Response.json(obj);
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
