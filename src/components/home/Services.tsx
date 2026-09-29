import Link from "next/link";
import { homeServices } from "@/lib/content";
import { Foto } from "../Foto";
import { Icon } from "../Icon";
import { SectionHead } from "../PageParts";
import { PhotoStack } from "./PhotoStack";

export function Services() {
  return (
    <section id="diensten" className="bg-linen py-20 sm:py-24">
      <div className="wrap">
        <SectionHead eyebrow="Diensten" title="Wat ik voor u doe." />

        {/* Uitgelichte dienst */}
        <article
          data-reveal
          className="group stack-card mt-12 grid overflow-hidden rounded-card bg-forest text-sand md:grid-cols-2"
        >
          <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
            <span className="font-mono text-[11px] tracking-[3px] text-lime uppercase">
              Kernactiviteit
            </span>
            <h3 className="text-[28px] leading-[1.15] font-bold text-white sm:text-[34px]">
              Tuinaanleg en onderhoud
            </h3>
            <p className="max-w-[46ch] text-[16px] leading-[1.7] text-sand/85">
              Ik teken uw tuin persoonlijk uit en begeleid de volledige aanleg. Terrassen,
              beplanting, waterpartijen: alles in één hand.
            </p>
            <Link href="/tuinaanleg/" className="mt-2 btn-lime self-start">
              Meer info{" "}
              <Icon name="arrowRight" className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
          <PhotoStack />
        </article>

        {/* Kleine diensten */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((s, i) => (
            <Link
              key={s.key}
              href={s.href}
              data-reveal={i}
              className="group relative overflow-hidden rounded-card bg-stone p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(77,90,43,.5)]"
            >
              <Foto
                src={s.img}
                alt=""
                sizes="(min-width: 1024px) 380px, 50vw"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-forest/80 opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-forest text-forest transition group-hover:border-lime group-hover:text-lime">
                    <Icon name={s.icon} />
                  </span>
                  <Icon
                    name="arrow"
                    className="h-6 w-6 text-sage transition duration-300 group-hover:rotate-45 group-hover:text-lime"
                  />
                </div>
                <h3 className="mt-8 text-[22px] font-bold text-forest transition group-hover:text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.6] transition group-hover:text-sand">
                  {s.text}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
