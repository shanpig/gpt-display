import parse from "html-react-parser";
import { getUsers } from "@/api/data";
import { Suspense } from "react";
import Link from "next/link";

async function Users() {
  const data = await getUsers();

  return (
    <div style={{ width: "600px" }}>{parse(data.message.content ?? "")}</div>
  );
}

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>loading ...</div>}>
        <Users />
      </Suspense>
      <Link href="/">back</Link>
    </>
  );
}
