import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { Field, GoldButton } from "../../../components/layout/AccessLayout";

type LoginFormProps = {
  onSubmit?: (email: string, password: string) => void;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = email.includes("@") && password.length > 0;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!canSubmit) return;

    onSubmit?.(email, password);

    setMessage("Connexion simulée — votre espace est prêt.");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-9 space-y-5">
        <Field
          label="Email professionnel"
          type="email"
          placeholder="vous@cabinet.fr"
          value={email}
          onChange={setEmail}
        />

        <Field
          label="Mot de passe"
          type="password"
          placeholder="Votre mot de passe"
          value={password}
          onChange={setPassword}
        />

        <GoldButton type="submit" disabled={!canSubmit}>
          Se connecter
          <ArrowRight className="ml-2 inline" size={16} strokeWidth={1.8} />
        </GoldButton>
      </form>

      {message && (
        <p className="mt-4 text-center text-[12px] font-medium text-ch2ma-dark">
          {message}
        </p>
      )}
    </>
  );
}
