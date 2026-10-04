import { useState } from "react";
import type { FormEvent } from "react";
import type { DelegationFormValues } from "../types";

interface DelegationFormProps {
  matters: { id: string; title: string }[];
  partners: { id: string; name: string }[];
  onSubmit: (values: DelegationFormValues) => void;
  onCancel: () => void;
}

export default function DelegationForm({
  matters,
  partners,
  onSubmit,
  onCancel,
}: DelegationFormProps) {
  const [values, setValues] = useState<DelegationFormValues>({
    matterId: "",
    partnerId: "",
    scope: "",
    retrocessionRate: 30,
    deadline: "",
  });

  function update<K extends keyof DelegationFormValues>(
    key: K,
    value: DelegationFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 border border-ch2ma-border bg-white p-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ch2ma-text">Dossier</span>
          <select
            value={values.matterId}
            onChange={(e) => update("matterId", e.target.value)}
            required
            className="mt-2 w-full border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
          >
            <option value="">Sélectionner un dossier</option>
            {matters.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ch2ma-text">
            Avocat partenaire
          </span>
          <select
            value={values.partnerId}
            onChange={(e) => update("partnerId", e.target.value)}
            required
            className="mt-2 w-full border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
          >
            <option value="">Sélectionner un partenaire</option>
            {partners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-ch2ma-text">
          Périmètre de la mission
        </span>
        <textarea
          value={values.scope}
          onChange={(e) => update("scope", e.target.value)}
          rows={3}
          required
          placeholder="Ce qui est confié au partenaire, précisément..."
          className="mt-2 w-full border border-ch2ma-border bg-transparent p-3 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ch2ma-text">
            Taux de rétrocession (%)
          </span>
          <input
            type="number"
            min={0}
            max={100}
            value={values.retrocessionRate}
            onChange={(e) => update("retrocessionRate", Number(e.target.value))}
            required
            className="mt-2 w-full border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ch2ma-text">Échéance</span>
          <input
            type="date"
            value={values.deadline}
            onChange={(e) => update("deadline", e.target.value)}
            required
            className="mt-2 w-full border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
          />
        </label>
      </div>

      <div className="flex justify-end gap-3 border-t border-ch2ma-border pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 text-sm font-medium text-ch2ma-muted hover:text-ch2ma-text"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="bg-ch2ma-dark px-5 py-2.5 text-sm font-semibold text-ch2ma-cream hover:bg-ch2ma-dark/90"
        >
          Créer la délégation
        </button>
      </div>
    </form>
  );
}
