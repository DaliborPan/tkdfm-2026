import { type NextRequest } from "next/server";

import { getEntityService } from "./entity-services";

type EntityParams = {
  params: Promise<{
    entity: string;
  }>;
};

export const POST = async (req: NextRequest, { params }: EntityParams) => {
  const { entity } = await params;
  const service = getEntityService(entity);

  if (!service) {
    return Response.json({ error: "Entity not found" }, { status: 404 });
  }

  const body = await req.json();

  try {
    const created = await service.create(body);

    return Response.json(created, { status: 201 });
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Error while creating" }, { status: 400 });
  }
};
