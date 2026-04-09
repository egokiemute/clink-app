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
    <>
      <div className="p-2 md:p-5 bg-white! overflow-hidden min-h-screen flex flex-col">
        <main className="relative z-10 mx-auto flex w-full flex-1 flex-col px-4 md:px-6 py-6 lg:px-10 lg:py-8 bg-[#E5F7FF80]">
          <header className="md:mb-12 flex items-center justify-between z-50 bg-white rounded-full py-3 px-4 md:px-6 w-full max-w-7xl mx-auto">
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
                <span className="text-[#252F2C] text-[16px] tracking-[-1%] leading-[25.8px]">
                  View Docs
                </span>
              </Link>
              <Link
                href="/start"
                className="hidden md:inline-block rounded-full bg-primary py-2 px-8 w-fit text-xs text-center my-auto tracking-[0.18em] text-tertiary"
              >
                <span className="text-white text-[17.2px] tracking-[-1%] leading-[25.8px]">
                  Get started
                </span>
              </Link>
            </div>
          </header>

          <section className="mx-auto max-w-5xl pt-20 z-50">
            <div className="max-w-2xl flex items-center flex-col justify-center text-center">
              <h1 className="max-w-1.5xl text-4xl md:text-5xl font-regular tracking-[-0.04em] text-black sm:text-6xl">
                Accept Crypto Payments Like Cards.
              </h1>

              <p className="mt-6 max-w-xl text-md md:text-lg leading-7 tracking-[-1%] text-[#757575] sm:text-xl">
                Integrate a drop-in crypto checkout in minutes. Let your users
                pay with USDC directly from wallets or exchanges while Clink
                manages addresses, networks, and real-time confirmations.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/start"
                  className="rounded-full bg-primary py-3 px-8 w-fit text-xs text-center my-auto tracking-[0.18em] text-tertiary"
                >
                  <span className="text-white text-[17.2px] tracking-[-1%] leading-[25.8px]">
                    Get started
                  </span>
                </Link>
                <Link
                  href="/documentation"
                  className="rounded-full bg-[#E6F1F5] py-3 px-8 w-fit text-xs text-center my-auto tracking-[0.18em] text-tertiary"
                >
                  <span className="text-[#204B73] text-[17.2px] tracking-[-1%] leading-[25.8px]">
                    View Docs
                  </span>
                </Link>
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center gap-2 flex-col pb-2 pt-32 z-50">
            <p className="text-sm text-[#252F2C] tracking-[-1%]">
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
      </div>
    </>
  );
}
