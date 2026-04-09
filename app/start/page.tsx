import type { Metadata } from "next";
import Link from "next/link";
import StartForm from "./start-form";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Apply for a Clink API key to start testing the product.",
};

export default function StartPage() {
  return (
    <main className="relative mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-10">
      <section className="relative z-10 mx-auto w-full max-w-3xl rounded-[0.4rem] border border-border bg-tertiary/90 p-8 backdrop-blur sm:p-10 lg:p-12">
        <div className="flex flex-col gap-3">
          <h1 className="max-w-2xl text-2xl md:text-4xl tracking-[-0.05em] text-black sm:text-5xl lg:text-6xl">
            Apply for your API key.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-black/78 sm:text-lg">
            Fill out the form below and we&apos;ll send your API key to your
            inbox so you can start testing Clink.
          </p>
        </div>

        <StartForm />

        <div className="mt-8 flex flex-row items-center justify-center gap-3 border-t border-border pt-6 sm:flex-row">
          <Link
            href="/"
            className="text-center text-[16px] tracking-[-0.01em] text-primary"
          >
            Back home
          </Link>
          <span>|</span>
          <Link
            href="/documentation"
            className="text-center text-[16px] tracking-[-0.01em] text-secondary"
          >
            View docs
          </Link>
        </div>
      </section>
    </main>
  );
}
