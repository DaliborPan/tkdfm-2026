import type { User } from "../../generated/client";
import { prisma } from "../client";

export const userRepository = {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  },
};
