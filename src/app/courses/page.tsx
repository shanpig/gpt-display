import parse from "html-react-parser";
import { getCourses } from "@/api/data";
import { Suspense } from "react";
import Link from "next/link";

async function Courses() {
  const data = await getCourses();

  return (
    <div style={{ width: "600px" }}>{parse(data.message.content ?? "")}</div>
  );
}

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>loading ...</div>}>
        <Courses />
      </Suspense>
      <Link href="/">back</Link>
    </>
  );
}
