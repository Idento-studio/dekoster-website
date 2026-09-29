import { site } from "@/lib/content";
import { Foto } from "../Foto";
import { Icon } from "../Icon";
import { TiltStage } from "../TiltStage";
import { WaveDivider } from "../WaveDivider";

const layer = "absolute inset-0 transition-transform duration-300 ease-out will-change-transform";

export function About() {
  return (
    <section id="over-ons" className="relative bg-sand">
      <div className="wrap grid items-center gap-14 pt-16 pb-32 sm:pt-20 md:grid-cols-[1.05fr_1fr]">
        <div data-reveal>
          <span className="eyebrow">
            <Icon name="leaf" className="h-4 w-4" />
            Over ons
          </span>
          <h2 className="mt-5 text-[34px] leading-[1.1] font-semibold text-bark sm:text-[40px]">
            Van schets tot tuin
          </h2>
          <div className="mt-6 max-w-[52ch] space-y-4 text-[16px] leading-[1.7]">
            <p>
              Ik ben geen groot bedrijf, en dat is bewust. Bij De Koster werk je rechtstreeks met
              mij samen. Ik luister naar uw wensen, teken uw tuin persoonlijk uit en begeleid het
              volledige project.
            </p>
            <p>
              Geen tuinarchitect, wel een ervaren tuinaannemer die uw ideeën omzet in een concreet
              plan.
            </p>
          </div>
          {/* TODO (OPENSTAAND): naam en functie bevestigen */}
          <p className="mt-8 font-mono text-[11px] tracking-[3px] text-forest uppercase">
            Jaro De Koster · zaakvoerder
          </p>
        </div>

        {/* Portret dat uit het kader springt: organische vlek + tilt */}
        <TiltStage
          data-reveal="1"
          className="relative mx-auto aspect-[1/1.12] w-full max-w-[460px] [perspective:900px]"
        >
          <div className={layer} data-depth="10">
            <svg
              viewBox="0 0 200 180"
              preserveAspectRatio="none"
              className="absolute right-0 bottom-[6%] left-[14%] h-[70%] w-[86%] text-sage opacity-45"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M34 40C58 6 128-6 166 24s38 94 10 126-102 34-140 8S10 74 34 40Z"
              />
            </svg>
          </div>
          <div className={layer} data-depth="18">
            <svg
              viewBox="0 0 200 180"
              preserveAspectRatio="none"
              className="absolute bottom-0 left-[4%] h-[78%] w-[92%] text-lime"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M22 62C36 18 104 0 148 16s56 72 36 110-86 60-132 40S8 106 22 62Z"
              />
            </svg>
          </div>
          <div className={layer} data-depth="30">
            <Foto
              src="jaro-cutout"
              alt="Jaro De Koster met gekruiste armen in een De Koster T-shirt"
              sizes="(min-width: 768px) 300px, 60vw"
              className="absolute bottom-0 left-1/2 w-[66%] -translate-x-1/2 [mask-image:linear-gradient(#000_88%,transparent)]"
            />
          </div>
          <div className={layer} data-depth="46">
            <div className="absolute bottom-[18%] left-0 rounded-card bg-forest px-5 py-4 text-lime shadow-xl">
              <span className="block font-display text-[22px] leading-none font-bold sm:text-[26px]">
                Jaro De Koster
              </span>
            </div>
            <span className="absolute top-[16%] right-[2%] rounded-full bg-linen px-4 py-2.5 font-mono text-[11px] tracking-[3px] text-forest uppercase shadow-[0_10px_24px_-12px_rgba(0,0,0,.4)]">
              {site.region}
            </span>
          </div>
        </TiltStage>
      </div>
      <div className="absolute inset-x-0 -bottom-px">
        <WaveDivider edge="bottom" fill="#F7F5F0" className="h-[60px] sm:h-[100px]" />
      </div>
    </section>
  );
}
