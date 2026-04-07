import Image from "next/image";
import Link from "next/link";

const partners = [
  {
    name: "Choppadi",
    src: "/assets/partners/choppadi.svg",
    width: 103,
    height: 32,
  },
  {
    name: "Spick",
    src: "/assets/partners/spick.svg",
    width: 85,
    height: 33,
  },
];

export default function Home() {
  return (
    <main className="relative z-0 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 lg:px-10 lg:py-8">
      <div
        className="pointer-events-none absolute left-1/2 -top-40 z-10 h-128 w-lg -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(122, 215, 255, 0.5) 0%, rgba(255, 193, 21, 0.5) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/2 z-10 h-120 w-120 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          right: "30px",
          background:
            "linear-gradient(180deg, rgba(50, 195, 164, 0.5) 0%, rgba(161, 255, 124, 0.5) 100%)",
        }}
      />
      <div className="absolute inset-8 rounded-full bg-secondary/60 blur-3xl z-10" />
      <header className="mb-12 flex items-center justify-between z-50">
        <Image
          src="/assets/logo.svg"
          alt="Clink"
          width={90}
          height={36}
          priority
        />
        <div className="flex items-center gap-4">
          <Link
            href="/documentation"
            className="px-4 w-fit text-xs text-center my-auto tracking-[0.18em] text-tertiary"
          >
            <span className="text-primary text-[16px] tracking-[-1%] leading-[25.8px]">
              View Docs
            </span>
          </Link>
          <Link
            href="/demo"
            className="hidden md:inline-block rounded-full bg-primary py-2 px-8 w-fit text-xs text-center my-auto tracking-[0.18em] text-tertiary"
          >
            <span className="text-white text-[17.2px] tracking-[-1%] leading-[25.8px]">
              Book a demo
            </span>
          </Link>
        </div>
      </header>

      <section className="-mt-18 md:mt-0 grid flex-1 items-center gap-12 pb-10 lg:grid-cols-[1.1fr_0.9fr] z-50">
        <div className="max-w-2xl">
          <h1 className="max-w-1.5xl text-4xl md:text-5xl font-regular tracking-[-0.04em] text-primary sm:text-6xl">
            Integrate Clink and accept USDC on Stellar in minutes.
          </h1>

          <p className="mt-6 max-w-xl text-md md:text-lg leading-7 tracking-[-1%] text-primary sm:text-xl">
            Accept stablecoin payments and settle locally with Clink, Clink
            gives you everything you need to build global payments.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/demo"
              className="rounded-full bg-primary py-3 px-8 w-fit text-xs text-center my-auto tracking-[0.18em] text-tertiary"
            >
              <span className="text-white text-[17.2px] tracking-[-1%] leading-[25.8px]">
                Book a demo
              </span>
            </Link>
            <Link
              href="/documentation"
              className="rounded-full bg-secondary py-3 px-8 w-fit text-xs text-center my-auto tracking-[0.18em] text-tertiary"
            >
              <span className="text-primary text-[17.2px] tracking-[-1%] leading-[25.8px]">
                View Docs
              </span>
            </Link>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="right-10 top-30 absolute">
            <div className="overflow-hidden">
              <Image
                src="/assets/checkout-img-one.png"
                alt="Clink checkout light preview"
                width={910}
                height={879}
                className="max-w-sm"
                priority
              />
            </div>

            <div className="overflow-hidden absolute -right-16 top-1/2">
              <Image
                src="/assets/checkout-img-two.png"
                alt="Clink checkout dark preview"
                width={1410}
                height={1515}
                className="max-w-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex items-start gap-4 flex-col pb-2 z-50">
        <p className="text-sm text-primary">
          Our list of trusted startups using Clink.
        </p>
        <div className="flex items-center gap-4 flex-wrap sm:gap-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-14 items-center sm:h-16 sm:px-6"
            >
              <Image
                src={partner.src}
                alt={`${partner.name} logo`}
                width={partner.width}
                height={partner.height}
                className="h-auto w-auto max-h-7 sm:max-h-8"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
