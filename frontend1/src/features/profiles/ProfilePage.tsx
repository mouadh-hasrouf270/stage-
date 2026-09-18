import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { PageHeader, Card } from "../../components/ui/InternalUI";

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  return (
    <div>
      <PageHeader eyebrow="Mon profil" title="Informations du compte" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
        {/* Informations du compte */}
        <Card className="p-6">
          {/* Photo de profil */}
          <div className="mb-7 flex items-center gap-5 border-b border-ch2ma-border pb-6">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-ch2ma-border bg-ch2ma-green">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Photo de profil"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-semibold text-ch2ma-dark">
                    SB
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-ch2ma-cream bg-ch2ma-gold text-ch2ma-dark shadow-sm transition hover:brightness-95 cursor-pointer"
                title="Modifier la photo"
              >
                <Camera size={15} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div>
              <h3 className="text-[15px] font-semibold text-ch2ma-dark">
                Photo de profil
              </h3>

              <p className="mt-1 text-[12px] leading-5 text-ch2ma-muted">
                Ajoutez une photo pour personnaliser votre profil.
              </p>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 text-[12px] font-semibold text-ch2ma-gold transition hover:underline cursor-pointer"
              >
                Modifier la photo
              </button>
            </div>
          </div>

          {/* Prénom + Nom */}
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-ch2ma-muted">
                Prénom
              </label>

              <input
                defaultValue="Sami"
                className="h-11 w-full border border-ch2ma-border bg-ch2ma-cream px-4 text-[13px] outline-none focus:border-ch2ma-gold"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-ch2ma-muted">
                Nom
              </label>

              <input
                defaultValue="Benali"
                className="h-11 w-full border border-ch2ma-border bg-ch2ma-cream px-4 text-[13px] outline-none focus:border-ch2ma-gold"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="mb-1.5 block text-[12px] font-medium text-ch2ma-muted">
              Email
            </label>

            <input
              defaultValue="s.benali@ch2ma.fr"
              className="h-11 w-full border border-ch2ma-border bg-ch2ma-cream px-4 text-[13px] outline-none focus:border-ch2ma-gold"
            />
          </div>

          {/* Spécialité */}
          <div className="mb-6">
            <label className="mb-1.5 block text-[12px] font-medium text-ch2ma-muted">
              Spécialité
            </label>

            <input
              defaultValue="Droit commercial"
              className="h-11 w-full border border-ch2ma-border bg-ch2ma-cream px-4 text-[13px] outline-none focus:border-ch2ma-gold"
            />
          </div>

          <button className="border border-ch2ma-dark bg-ch2ma-dark px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-ch2ma-dark-2 cursor-pointer">
            Enregistrer
          </button>
        </Card>

        {/* Changer le mot de passe */}
        <Card className="p-6">
          <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ch2ma-muted">
            Changer le mot de passe
          </h3>

          <div className="mb-4">
            <label className="mb-1.5 block text-[12px] font-medium text-ch2ma-muted">
              Mot de passe actuel
            </label>

            <input
              type="password"
              className="h-10 w-full border border-ch2ma-border bg-ch2ma-cream px-3 text-[13px] outline-none focus:border-ch2ma-gold"
            />
          </div>

          <div className="mb-5">
            <label className="mb-1.5 block text-[12px] font-medium text-ch2ma-muted">
              Nouveau mot de passe
            </label>

            <input
              type="password"
              className="h-10 w-full border border-ch2ma-border bg-ch2ma-cream px-3 text-[13px] outline-none focus:border-ch2ma-gold"
            />
          </div>

          <button className="w-full border border-ch2ma-dark px-4 py-2 text-[12.5px] font-semibold text-ch2ma-dark transition hover:bg-ch2ma-dark hover:text-white cursor-pointer">
            Mettre à jour
          </button>
        </Card>
      </div>
    </div>
  );
}
