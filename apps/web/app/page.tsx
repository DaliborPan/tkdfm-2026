import { studentService } from "@repo/backend/student";
import { connection } from "next/server";
import { Suspense } from "react";

const getStudents = async () => {
  await connection();
  return studentService.findAll();
};

const Students = async () => {
  const students = await getStudents();

  return (
    <div>
      <h1>Students</h1>
      <pre>{JSON.stringify(students, null, 2)}</pre>
    </div>
  );
};

export default async function IndexPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Students />
    </Suspense>
  );
}
