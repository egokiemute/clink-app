import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Clink documentation is launching soon.",
};

export default function DocumentationPage() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
      <div
        className="pointer-events-none absolute left-1/2 -top-40 h-96 w-[24rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(122, 215, 255, 0.35) 0%, rgba(255, 193, 21, 0.35) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-7.5 top-1/2 h-80 w-[20rem] -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(50, 195, 164, 0.35) 0%, rgba(161, 255, 124, 0.35) 100%)",
        }}
      />

      <section className="relative z-10 mx-auto w-full max-w-3xl sm:p-10 lg:p-12">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">
          Documentation
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl tracking-[-0.05em] text-primary sm:text-5xl lg:text-6xl">
          Launching soon.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-primary/78 sm:text-lg">
          We&apos;re putting the finishing touches on the Clink docs. The full
          guides, integration steps, and API references will be available soon.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex min-h-12 items-center justify-center rounded-full bg-primary px-8 py-3 text-center text-[16px] tracking-[-0.01em] text-white!"
          >
            Back home
          </Link>
          <Link
            href="https://calendar.app.google/ag7TuXSwPWTjCwwx9"
            className="flex min-h-12 items-center justify-center rounded-full bg-secondary px-8 py-3 text-center text-[16px] tracking-[-0.01em] text-primary"
          >
            Book a demo
          </Link>
        </div>
      </section>
    </main>
  );
}
