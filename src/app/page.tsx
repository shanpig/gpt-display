import Link from "next/link";

export default async function Home() {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Link href="/users">Users</Link>
      <Link href="/courses">Courses</Link>
    </div>
  );
}
