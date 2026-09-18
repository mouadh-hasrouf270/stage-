import {
  Building2,
  FileText,
  Gavel,
  Landmark,
  Scale,
  Users,
} from "lucide-react";

const expertises = [
  {
    icon: Building2,
    title: "Droit des affaires",
    desc: "Structuration, contrats commerciaux et conseil aux entreprises en croissance.",
  },
  {
    icon: Scale,
    title: "Droit des sociétés",
    desc: "Fusions-acquisitions, gouvernance et transformations juridiques.",
  },
  {
    icon: FileText,
    title: "Droit commercial",
    desc: "Négociation de contrats, distribution et relations fournisseurs.",
  },
  {
    icon: Gavel,
    title: "Contentieux & litiges",
    desc: "Représentation devant les juridictions et arbitrage commercial.",
  },
  {
    icon: Landmark,
    title: "Droit immobilier",
    desc: "Acquisitions, baux commerciaux et montages immobiliers complexes.",
  },
  {
    icon: Users,
    title: "Médiation & arbitrage",
    desc: "Résolution alternative des conflits et modes collaboratifs.",
  },
];

export default function ExpertiseSection() {
  return (
    <section
      id="expertises"
      className="bg-[var(--ch2ma-green)] px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* HEADER */}
        <div className="mb-14 max-w-2xl">
          <p className="mb-5 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--ch2ma-gold)]">
            <span className="h-px w-8 bg-[var(--ch2ma-gold)]" />
            Nos expertises
          </p>

          <h2 className="font-display text-[clamp(34px,4.5vw,56px)] leading-[0.95] tracking-[-0.04em] text-[var(--ch2ma-dark)]">
            Une expertise au service
            <br />
            <em className="font-medium text-[var(--ch2ma-gold)]">
              de vos enjeux.
            </em>
          </h2>
        </div>

        {/* CARDS */}
        <div className="grid gap-px overflow-hidden bg-[var(--ch2ma-border)] sm:grid-cols-2 lg:grid-cols-3">
          {expertises.map((expertise) => {
            const Icon = expertise.icon;

            return (
              <div
                key={expertise.title}
                className="group relative bg-[var(--ch2ma-cream)] p-8 transition-all duration-300 hover:bg-[var(--ch2ma-green)]"
              >
                {/* ICON */}
                <div className="mb-7 flex h-11 w-11 items-center justify-center bg-[var(--ch2ma-green)] text-[var(--ch2ma-dark)] transition-all duration-300 group-hover:bg-[var(--ch2ma-gold)] group-hover:text-[var(--ch2ma-cream)]">
                  <Icon size={20} strokeWidth={1.5} />
                </div>

                {/* TITLE */}
                <h3 className="mb-3 font-display text-xl text-[var(--ch2ma-dark)]">
                  {expertise.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-[13px] leading-[1.8] text-[var(--ch2ma-muted)]">
                  {expertise.desc}
                </p>

                {/* DECORATIVE LINE */}
                <div className="mt-7 h-px w-0 bg-[var(--ch2ma-gold)] transition-all duration-500 group-hover:w-10" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
