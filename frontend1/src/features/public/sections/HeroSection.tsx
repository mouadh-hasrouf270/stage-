import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TypewriterHeading } from "../../../components/ui/TypewriterHeading";
import HeroVideo from "../../../assets/heroVideo.mp4";

export default function HeroSection() {
  return (
    <section
      className="
        relative
        isolate
        min-h-[720px]
        overflow-hidden
        bg-[#092B34]
        text-[#F6F5EF]
        md:min-h-screen
      "
    >
      {/* =====================================================
          IMAGE DE BACKGROUND
      ===================================================== */}

      <video
        src={HeroVideo}
        autoPlay
        muted
        loop
        playsInline
        className="
    absolute
    inset-0
    -z-10
    h-full
    w-full
    object-cover
    object-center
    brightness-[0.78]
    contrast-[1.05]
    saturate-[0.85]
  "
      />
      {/* <img
        src={justiceHero}
        alt="Balance de justice dans un cabinet d'avocats"
        className="
          absolute
          inset-0
          -z-60
          h-full
          w-full
          object-cover
          object-[52%_32%]
          brightness-[0.78]
          contrast-[1.05]
          saturate-[0.85]
          motion-safe:animate-hero-kenburns
        "
      /> */}

      {/* =====================================================
          DÉGRADÉ SOMBRE À GAUCHE
      ===================================================== */}
      <div
        className="
          absolute
          inset-0
          -z-20
          bg-gradient-to-r
          from-[#092B34]/95
          via-[#092B34]/70
          to-[#092B34]/20
        "
      />

      {/* =====================================================
          DÉGRADÉ VERTICAL
      ===================================================== */}
      <div
        className="
          absolute
          inset-0
          -z-10
          bg-gradient-to-t
          from-[#092B34]/70
          via-transparent
          to-[#092B34]/20
        "
      />

      {/* =====================================================
          CONTENU PRINCIPAL
      ===================================================== */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[640px]
          container-ch2ma
          items-center
          px-5
          py-20
          md:px-8
        "
      >
        <div className="max-w-[650px]">
          {/* =================================================
              PETIT TITRE
          ================================================= */}
          <p
            className="
              mb-6
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-[#DEC78F]
              md:text-xs
            "
          >
            Cabinet d’avocats
          </p>

          {/* =================================================
              TITRE PRINCIPAL
          ================================================= */}
          {/* <h1
            className="
    font-serif
    text-[48px]
    font-normal
    leading-[0.9]
    sm:text-[40px]
    lg:text-[80px]
  "
          >
            Votre expertise
            <br />
            juridique,
            <br />
            <span className="text-[#C79C57]">au service</span>
            <br />
            de vos intérêts.
          </h1> */}

          <TypewriterHeading />

          {/* =================================================
              DESCRIPTION
          ================================================= */}
          <p
            className="
              mt-8
              mb-20
              max-w-[430px]
              text-sm
              font-semibold
              leading-7
              text-white/70
            "
          >
            Nous accompagnons celles et ceux qui entreprennent, décident et
            s’engagent avec exigence.
          </p>

          {/* =================================================
              BOUTONS
          ================================================= */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {/* Bouton rendez-vous */}
            <Link
              to="/rendez-vous"
              className="
                inline-flex
                min-h-[48px]
                items-center
                justify-center
                gap-3
                bg-[#DEC78F]
                px-6
                text-xs
                font-semibold
                text-[#092B34]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#C79C57]
              "
            >
              Prendre rendez-vous
              <ArrowUpRight size={16} />
            </Link>

            {/* Bouton cabinet */}
            <a
              href="#cabinet"
              className="
                inline-flex
                min-h-[48px]
                items-center
                justify-center
                gap-3
                border
                border-white/35
                px-6
                text-xs
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#DEC78F]
                hover:text-[#DEC78F]
              "
            >
              Découvrir le cabinet
              <ArrowDownRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* =====================================================
          CARTE "NOTRE MANIÈRE"
          AJOUTÉE POUR CORRESPONDRE À LA PHOTO
      ===================================================== */}
      <div
        className="
          absolute
          bottom-[92px]
          right-[5%]
          z-20
          hidden
          w-[360px]
          border
          border-white/20
          bg-[#092B34]/20
          lg:block
        "
      >
        {/* Header de la carte */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/10
            px-5
            py-4
          "
        >
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.22em]
              text-white/50
            "
          >
            Notre manière
          </span>

          <span
            className="
              text-[8px]
              tracking-[0.18em]
              text-white/45
            "
          >
            01 — 04
          </span>
        </div>

        {/* Contenu de la carte */}
        <div className="relative px-6 py-7">
          {/* Ligne verticale dorée */}
          <div
            className="
              absolute
              left-[22px]
              top-[22px]
              bottom-[22px]
              w-px
              bg-[#DEC78F]
            "
          />

          <div className="pl-5">
            <h2
              className="
                max-w-[300px]
                font-serif
                text-[25px]
                font-normal
                leading-[1.05]
                text-[#F6F5EF]
              "
            >
              Rigueur, confidentialité,
              <br />
              engagement.
            </h2>

            <p
              className="
                mt-5
                text-[10px]
                leading-5
                text-white/55
              "
            >
              Une approche personnalisée pour chaque situation.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          LIGNE DU BAS
          AJOUTÉE POUR CORRESPONDRE À LA PHOTO
      ===================================================== */}
      <div
        className="
          absolute
          bottom-0
          left-5
          right-5
          z-20
          flex
          items-center
          justify-between
          border-t
          border-white/10
          px-0
          py-4
          md:left-8
          md:right-8
        "
      >
        {/* Partie gauche */}
        <div className="flex items-center gap-3">
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-white/50
            "
          >
            CH2MA
          </span>

          <span className="text-white/20">•</span>

          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-white/50
            "
          >
            Cabinet d’avocats
          </span>
        </div>

        {/* Partie droite */}
        <div className="flex items-center gap-2">
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-[#DEC78F]
            "
          />

          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-white/50
            "
          >
            Confidentiel par nature
          </span>
        </div>
      </div>
    </section>
  );
}
