import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="bg-linen">
      <div className="wrap flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24">
        <span className="font-mono text-[11px] tracking-[3px] text-sage uppercase">Fout 404</span>
        <h1 className="max-w-[16ch] text-[44px] leading-[1.05] font-bold text-forest sm:text-[64px]">
          Deze pagina is onder het gras geraakt.
        </h1>
        <p className="max-w-[48ch] text-[17px] leading-[1.7]">
          De pagina die je zoekt bestaat niet (meer). Via de knoppen hieronder vind je snel je weg
          terug.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn-lime">
            Naar de homepage <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
          <Link href="/realisaties/" className="btn-outline">
            Bekijk realisaties
          </Link>
          <Link href="/contact/" className="btn-outline">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
