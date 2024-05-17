import parse from "html-react-parser";
import { getCourse } from "@/api/data";
import Link from "next/link";
import { Suspense } from "react";
import { COURSES } from "@/api/database";

export function generateStaticParams() {
  return COURSES.map(({ id }) => ({ params: { id } }));
}

async function Course({ params }: { params: { id: string } }) {
  const data = await getCourse(params.id);

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
        <Course params={params} />
      </Suspense>
      <Link href="/courses">back</Link>
    </>
  );
}
