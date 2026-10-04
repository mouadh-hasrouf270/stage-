import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import ApplicationReviewCard from "../components/ApplicationReviewCard";
import type { Partner, PartnerApplication } from "../types";

const initialApplications: PartnerApplication[] = [
  {
    id: "a1",
    name: "Me. Yasmine Haddad",
    specialties: ["Droit immobilier", "Droit civil"],
    submittedAt: "28/09/2026",
    bio: "8 ans d'expérience, cabinet indépendant à Constantine.",
  },
];

const partners: Partner[] = [
  {
    id: "p1",
    name: "Me. Rachid Amrani",
    specialties: ["Droit des affaires"],
    activeMissions: 2,
    retrocessionRate: 30,
    status: "actif",
  },
  {
    id: "p2",
    name: "Me. Sarah Belkacem",
    specialties: ["Droit immobilier", "Droit commercial"],
    activeMissions: 1,
    retrocessionRate: 25,
    status: "actif",
  },
  {
    id: "p3",
    name: "Me. Karim Ouyahia",
    specialties: ["Contentieux et litiges"],
    activeMissions: 0,
    retrocessionRate: 30,
    status: "suspendu",
  },
];

export default function PartnersListPage() {
  const [applications, setApplications] =
    useState<PartnerApplication[]>(initialApplications);

  function handleApprove(id: string) {
    setApplications((prev) =>
      prev.filter((application) => application.id !== id),
    );
  }

  function handleReject(id: string) {
    setApplications((prev) =>
      prev.filter((application) => application.id !== id),
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Administration"
        title="Partenaires"
        subtitle="Candidatures et avocats partenaires actifs."
      />

      {applications.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-ch2ma-text">
            Candidatures en attente
          </h2>

          <div className="mt-3 space-y-3">
            {applications.map((application) => (
              <ApplicationReviewCard
                key={application.id}
                application={application}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        </div>
      )}

      <Card className="overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ch2ma-border text-xs uppercase tracking-wide text-ch2ma-muted">
            <tr>
              <th className="px-6 py-3 font-medium">Nom</th>

              <th className="px-6 py-3 font-medium">Spécialités</th>

              <th className="px-6 py-3 font-medium">Missions en cours</th>

              <th className="px-6 py-3 font-medium">Rétrocession</th>

              <th className="px-6 py-3 font-medium">Statut</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-ch2ma-border">
            {partners.map((partner) => (
              <tr key={partner.id}>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/partenaires/${partner.id}`}
                    className="font-medium text-ch2ma-text hover:text-ch2ma-gold"
                  >
                    {partner.name}
                  </Link>
                </td>

                <td className="px-6 py-4 text-ch2ma-muted">
                  {partner.specialties.join(", ")}
                </td>

                <td className="px-6 py-4 text-ch2ma-text">
                  {partner.activeMissions}
                </td>

                <td className="px-6 py-4 text-ch2ma-text">
                  {partner.retrocessionRate}%
                </td>

                <td className="px-6 py-4">
                  <Badge tone={partner.status === "actif" ? "green" : "alert"}>
                    {partner.status === "actif" ? "Actif" : "Suspendu"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
