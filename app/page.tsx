import Link from "next/link";

export default function IndexPage() {
  return (
    <main style={{ padding: "4rem", fontFamily: "sans-serif" }}>
      <meta httpEquiv="refresh" content="0;url=/en/" />
      <p>Redirecting to <Link href="/en/">LyoPro</Link>…</p>
    </main>
  );
}
