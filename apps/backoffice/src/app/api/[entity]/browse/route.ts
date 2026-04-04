import { type NextRequest } from "next/server";

import { getEntityService } from "../entity-services";

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
  const response = await service.browse(body);

  return Response.json(response);
};
