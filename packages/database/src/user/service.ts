import { mapUserToSchema } from "./mapper";
import { userRepository } from "./repository";
import type { UserSchemaType } from "./schema";

export const userService = {
  async findAll(): Promise<UserSchemaType[]> {
    const rows = await userRepository.findAll();
    return rows.map(mapUserToSchema);
  },
};
