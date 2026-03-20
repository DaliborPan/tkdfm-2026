import { prisma } from "@repo/database";

import { Suspense } from "react";

const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const Users = async () => {
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
};

export default async function IndexPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Users />
    </Suspense>
  );
}
