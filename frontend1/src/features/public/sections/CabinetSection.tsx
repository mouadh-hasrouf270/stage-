export default function CabinetSection() {
  return (
    <section
      id="cabinet"
      className="bg-[var(--ch2ma-cream)] px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-2 lg:gap-20">
        {/* LEFT */}
        <div>
          <p className="mb-5 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--ch2ma-gold)]">
            <span className="h-px w-8 bg-[var(--ch2ma-gold)]" />
            Le cabinet
          </p>

          <h2 className="font-display text-[clamp(34px,4.5vw,56px)] leading-[0.95] tracking-[-0.04em] text-[var(--ch2ma-dark)]">
            Une vision stratégique
            <br />
            <em className="font-medium text-[var(--ch2ma-gold)]">
              de chaque dossier.
            </em>
          </h2>
          {/* MINI STATS */}
          <div className="flex flex-wrap gap-10 pt-10">
            <div>
              <div className="font-display text-3xl text-[var(--ch2ma-dark)]">
                25+
              </div>

              <div className="mt-1 text-[10px] uppercase tracking-wider text-[var(--ch2ma-muted)]">
                Années de pratique
              </div>
            </div>

            <div>
              <div className="font-display text-3xl text-[var(--ch2ma-dark)]">
                6
              </div>

              <div className="mt-1 text-[10px] uppercase tracking-wider text-[var(--ch2ma-muted)]">
                Domaines d’expertise
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center gap-6">
          <p className="text-[15px] leading-[1.85] text-[var(--ch2ma-muted)]">
            Fondé par Maître Chama, CH2MA est un cabinet d'avocats spécialisé en
            droit des affaires et en droit civil. Nous accompagnons entreprises
            et particuliers à chaque étape de leurs enjeux : conseil, rédaction
            et négociation de contrats, contentieux, représentation devant les
            juridictions.
          </p>
          <p className="text-[15px] leading-[1.85] text-[var(--ch2ma-muted)]">
            Une équipe d'avocats internes assure le suivi de chaque dossier,
            appuyée par un réseau d'avocats partenaires mobilisé selon les
            besoins — pour une expertise adaptée et une continuité garantie, en
            toute confidentialité.
          </p>
          <p className="text-[15px] leading-[1.85] text-[var(--ch2ma-muted)]">
            {" "}
            Nous croyons que le meilleur conseil est celui qui transforme la
            complexité en décision claire : délais maîtrisés, communication
            transparente, confidentialité absolue.
          </p>
        </div>
      </div>
    </section>
  );
}
