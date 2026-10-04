import { useState } from "react";
import type { FormEvent } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";

export default function SettingsPage() {
  const [firmName, setFirmName] = useState("CH2MA");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("contact@ch2ma.dz");

  const [defaultRetrocession, setDefaultRetrocession] = useState(30);

  const [notifyNewBooking, setNotifyNewBooking] = useState(true);

  const [notifyNewApplication, setNotifyNewApplication] = useState(true);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Administration"
        title="Paramètres du cabinet"
        subtitle="Informations générales et règles par défaut."
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations du cabinet */}
        <Card className="space-y-5 p-6">
          <h2 className="text-sm font-semibold text-ch2ma-text">
            Informations du cabinet
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Nom */}
            <label className="block">
              <span className="text-sm font-medium text-ch2ma-text">
                Nom du cabinet
              </span>

              <input
                type="text"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                className="mt-2 w-full border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
              />
            </label>

            {/* Email */}
            <label className="block">
              <span className="text-sm font-medium text-ch2ma-text">Email</span>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
              />
            </label>

            {/* Téléphone */}
            <label className="block">
              <span className="text-sm font-medium text-ch2ma-text">
                Téléphone
              </span>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
              />
            </label>

            {/* Adresse */}
            <label className="block">
              <span className="text-sm font-medium text-ch2ma-text">
                Adresse
              </span>

              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-2 w-full border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
              />
            </label>
          </div>
        </Card>

        {/* Règles de sous-traitance */}
        <Card className="space-y-5 p-6">
          <h2 className="text-sm font-semibold text-ch2ma-text">
            Règles de sous-traitance
          </h2>

          <label className="block max-w-xs">
            <span className="text-sm font-medium text-ch2ma-text">
              Taux de rétrocession par défaut (%)
            </span>

            <input
              type="number"
              min={0}
              max={100}
              value={defaultRetrocession}
              onChange={(e) => setDefaultRetrocession(Number(e.target.value))}
              className="mt-2 w-full border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
            />
          </label>

          <p className="text-xs text-ch2ma-muted">
            Valeur pré-remplie à la création d'une délégation — modifiable au
            cas par cas.
          </p>
        </Card>

        {/* Notifications */}
        <Card className="space-y-4 p-6">
          <h2 className="text-sm font-semibold text-ch2ma-text">
            Notifications admin
          </h2>

          <label className="flex items-center gap-3 text-sm text-ch2ma-text">
            <input
              type="checkbox"
              checked={notifyNewBooking}
              onChange={(e) => setNotifyNewBooking(e.target.checked)}
              className="h-4 w-4 border-ch2ma-border text-ch2ma-gold focus:ring-ch2ma-gold"
            />
            Nouvelle demande de rendez-vous publique
          </label>

          <label className="flex items-center gap-3 text-sm text-ch2ma-text">
            <input
              type="checkbox"
              checked={notifyNewApplication}
              onChange={(e) => setNotifyNewApplication(e.target.checked)}
              className="h-4 w-4 border-ch2ma-border text-ch2ma-gold focus:ring-ch2ma-gold"
            />
            Nouvelle candidature d'avocat partenaire
          </label>
        </Card>

        {/* Bouton enregistrer */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-ch2ma-dark px-6 py-3 text-sm font-semibold text-ch2ma-cream hover:bg-ch2ma-dark/90"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
