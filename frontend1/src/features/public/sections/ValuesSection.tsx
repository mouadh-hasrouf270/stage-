import { Award, Clock, ShieldCheck } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Confidentialité",
    desc: "Chaque échange est protégé par le secret professionnel.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Une exigence de rigueur sur chaque dossier, sans compromis.",
  },
  {
    icon: Clock,
    title: "Réactivité",
    desc: "Des délais maîtrisés et un suivi transparent à chaque étape.",
  },
];

export default function ValuesSection() {
  return (
    <section
      id="valeurs"
      className="bg-[var(--ch2ma-cream)] px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* HEADER */}
        <div className="mb-14 max-w-2xl">
          <p className="mb-5 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--ch2ma-gold)]">
            <span className="h-px w-8 bg-[var(--ch2ma-gold)]" />
            Nos valeurs
          </p>

          <h2 className="font-display text-[clamp(34px,4.5vw,56px)] leading-[0.95] tracking-[-0.04em] text-[var(--ch2ma-dark)]">
            Une relation fondée sur
            <br />
            <em className="font-medium text-[var(--ch2ma-gold)]">
              la confiance.
            </em>
          </h2>
        </div>

        {/* VALUES */}
        <div className="grid gap-5 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className="group border border-[var(--ch2ma-border)] bg-[var(--ch2ma-green)] p-8 transition-all duration-300 hover:border-[var(--ch2ma-gold)] hover:bg-[var(--ch2ma-cream)]"
              >
                {/* ICON */}
                <div className="mb-8 flex h-12 w-12 items-center justify-center border border-[var(--ch2ma-gold)] text-[var(--ch2ma-gold)] transition-all duration-300 group-hover:bg-[var(--ch2ma-gold)] group-hover:text-[var(--ch2ma-cream)]">
                  <Icon size={21} strokeWidth={1.5} />
                </div>

                {/* TITLE */}
                <h3 className="mb-3 font-display text-2xl text-[var(--ch2ma-dark)]">
                  {value.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-[13px] leading-[1.8] text-[var(--ch2ma-muted)]">
                  {value.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
