import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
      <div
        className="pointer-events-none absolute left-1/2 -top-40 h-96 w-[24rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(122, 215, 255, 0.35) 0%, rgba(255, 193, 21, 0.35) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-2xl sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">
          404
        </p>
        <h1 className="mt-4 max-w-lg text-4xl tracking-[-0.05em] text-primary sm:text-5xl">
          That page could not be found.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-primary/78 sm:text-lg">
          The link may be outdated, the page may have moved, or the URL might be
          incorrect.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex min-h-12 items-center justify-center rounded-full bg-brand px-8 py-3 text-center text-[16px] tracking-[-0.01em] text-white!"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
