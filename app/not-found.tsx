import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-site flex-col justify-center px-6 lg:px-8">
      <p className="eyebrow">404</p>
      <h1 className="display-md mt-3">This page doesn’t exist.</h1>
      <p className="mt-4 max-w-[48ch] text-ink-subtle">The link may be old, or the address was typed by hand.</p>
      <Link href="/" className="btn-secondary mt-8 w-fit">
        Back to the homepage
      </Link>
    </main>
  );
}
