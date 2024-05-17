import parse from "html-react-parser";
import { getUser } from "@/api/data";
import Link from "next/link";
import { Suspense } from "react";
import { USERS } from "@/api/database";

export function generateStaticParams() {
  return USERS.map(({ id }) => ({ params: { id } }));
}

async function Users({ params }: { params: { id: string } }) {
  const data = await getUser(params.id);

  return (
    <>
      <div style={{ width: "600px" }}>{parse(data.message.content ?? "")}</div>
    </>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Suspense fallback={<div>loading ...</div>}>
        <Users params={params} />
      </Suspense>
      <Link href="/users">back</Link>
    </>
  );
}
