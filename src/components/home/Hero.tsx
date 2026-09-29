import Link from "next/link";
import { OFFERTE } from "@/lib/content";
import { Foto } from "../Foto";
import { WaveDivider } from "../WaveDivider";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-forest">
      <Foto
        src="duo-tuin"
        alt="Jaro en zijn collega met gekruiste armen in een tuin"
        priority
        className="absolute inset-0 -z-10 h-full w-full animate-kenburns object-cover object-[62%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/75 via-ink/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink/40 to-transparent" />

      <div className="wrap pt-28 pb-40 sm:pt-36 sm:pb-52">
        <h1 className="max-w-[640px] animate-rise text-[40px] leading-[1.05] font-semibold tracking-[-1px] text-white sm:text-[52px] lg:text-[60px]">
          Uw tuin,
          <br />
          persoonlijk verzorgd.
        </h1>
        <p className="mt-6 max-w-[400px] animate-rise text-[16px] leading-[1.7] text-white/90 [animation-delay:.15s]">
          Van eerste gesprek tot seizoensgebonden onderhoud met één aanspreekpunt voor uw volledige
          buitenruimte.
        </p>
        <div className="mt-10 flex animate-rise flex-wrap gap-4 [animation-delay:.3s]">
          <Link href={OFFERTE} className="btn-lime">
            Gratis offerte aanvragen
          </Link>
          <Link href="/contact/" className="btn-ghost">
            Contacteer ons
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 -bottom-px">
        <WaveDivider edge="bottom" fill="#F4E8CC" className="h-[70px] sm:h-[110px]" />
      </div>
    </section>
  );
}
