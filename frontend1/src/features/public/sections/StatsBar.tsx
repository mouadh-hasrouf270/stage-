const stats = [
  {
    value: "25+",
    label: "Années d’expérience",
  },
  {
    value: "600+",
    label: "Dossiers traités",
  },
  {
    value: "98%",
    label: "Clients satisfaits",
  },
  {
    value: "12",
    label: "Juristes associés",
  },
];

export default function StatsBar() {
  return (
    <section className="relative z-20 -mt-1 bg-[var(--ch2ma-dark)]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 divide-x divide-[var(--ch2ma-dark-2)] px-6 lg:grid-cols-4 lg:px-10">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="group flex flex-col items-center py-8 text-center transition-colors duration-300 hover:bg-[var(--ch2ma-dark-2)] lg:py-10"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <span className="font-display text-[clamp(32px,4vw,52px)] leading-none text-[var(--ch2ma-gold)] transition-transform duration-300 group-hover:scale-105">
              {stat.value}
            </span>

            <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--ch2ma-green)]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
