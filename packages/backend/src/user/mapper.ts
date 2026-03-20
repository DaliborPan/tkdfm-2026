import type { User } from "../../generated/client";
import { userSchema, type UserSchemaType } from "./schema";

export function mapUserToSchema(user: User): UserSchemaType {
  return userSchema.parse({
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified?.toISOString() ?? null,
  });
}
