import type { Metadata } from "next";
import Link from "next/link";
import StartForm from "./start-form";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Apply for a Clink API key to start testing the product.",
};

export default function StartPage() {
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

      <section className="relative z-10 mx-auto w-full max-w-3xl rounded-[0.4rem] border border-border bg-tertiary/90 p-8 backdrop-blur sm:p-10 lg:p-12">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium tracking-[0.18em] text-muted">
            Get started
          </p>
          <h1 className="max-w-2xl text-4xl tracking-[-0.05em] text-primary sm:text-5xl lg:text-6xl">
            Apply for your API key.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-primary/78 sm:text-lg">
            Fill out the form below and we&apos;ll send your API key to your
            inbox so you can start testing Clink.
          </p>
        </div>

        <StartForm />

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
          <Link
            href="/"
            className="flex min-h-12 items-center justify-center rounded-full bg-secondary px-8 py-3 text-center text-[16px] tracking-[-0.01em] text-primary"
          >
            Back home
          </Link>
          <Link
            href="/documentation"
            className="flex min-h-12 items-center justify-center rounded-full border border-border px-8 py-3 text-center text-[16px] tracking-[-0.01em] text-primary"
          >
            View docs
          </Link>
        </div>
      </section>
    </main>
  );
}
