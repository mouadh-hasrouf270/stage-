import { useState } from "react";
import type { FormEvent } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import type {
  ConversationMessage,
  MessagingConversation,
} from "../admin-types";

// TODO: remplacer par un fetch réel (GET /api/messaging/conversations)
const conversations: MessagingConversation[] = [
  {
    id: "c1",
    partnerName: "Me. Rachid Amrani",
    matterTitle: "Succession Benali",
    lastMessage: "Je transmets le mémoire demain matin.",
    lastMessageAt: "14:32",
    unreadCount: 2,
  },
  {
    id: "c2",
    partnerName: "Me. Sarah Belkacem",
    matterTitle: "Bail commercial Oran",
    lastMessage: "Bail signé, dossier clôturé de mon côté.",
    lastMessageAt: "Hier",
    unreadCount: 0,
  },
];

// TODO: remplacer par un fetch réel (GET /api/messaging/conversations/:id/messages)
const mockThreads: Record<string, ConversationMessage[]> = {
  c1: [
    {
      id: "m1",
      author: "Maître Chama",
      authorType: "admin",
      content: "Où en est l'audience du 14 ?",
      sentAt: "09:10",
    },
    {
      id: "m2",
      author: "Me. Rachid Amrani",
      authorType: "partner",
      content: "Préparation en cours, je transmets le mémoire demain matin.",
      sentAt: "14:32",
    },
  ],
  c2: [
    {
      id: "m3",
      author: "Me. Sarah Belkacem",
      authorType: "partner",
      content: "Bail signé, dossier clôturé de mon côté.",
      sentAt: "Hier, 17:02",
    },
  ],
};

export default function AdminMessagingPage() {
  const [selectedId, setSelectedId] = useState(conversations[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const [threads, setThreads] = useState(mockThreads);

  const messages = threads[selectedId] ?? [];

  function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    // TODO: POST /api/messaging/conversations/:id/messages
    setThreads((prev) => ({
      ...prev,
      [selectedId]: [
        ...(prev[selectedId] ?? []),
        {
          id: crypto.randomUUID(),
          author: "Maître Chama",
          authorType: "admin",
          content: draft,
          sentAt: "À l'instant",
        },
      ],
    }));
    setDraft("");
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Super-administrateur"
        title="Messagerie"
        subtitle="Échanges entre le cabinet et les avocats partenaires."
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card className="divide-y divide-ch2ma-border p-0">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedId(conversation.id)}
              className={`block w-full px-4 py-3 text-left ${
                conversation.id === selectedId
                  ? "bg-ch2ma-gold/10"
                  : "hover:bg-ch2ma-border/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-ch2ma-text">
                  {conversation.partnerName}
                </p>
                {conversation.unreadCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ch2ma-gold px-1 text-[10px] font-semibold text-ch2ma-dark">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-ch2ma-muted">
                {conversation.matterTitle}
              </p>
              <p className="mt-1 truncate text-xs text-ch2ma-muted">
                {conversation.lastMessage}
              </p>
            </button>
          ))}
        </Card>

        <Card className="flex flex-col p-0">
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-sm ${message.authorType === "admin" ? "ml-auto text-right" : ""}`}
              >
                <p className="text-xs text-ch2ma-muted">
                  {message.author} · {message.sentAt}
                </p>
                <p
                  className={`mt-1 inline-block px-3 py-2 text-sm ${
                    message.authorType === "admin"
                      ? "bg-ch2ma-dark text-ch2ma-cream"
                      : "bg-ch2ma-border/30 text-ch2ma-text"
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSend}
            className="flex gap-3 border-t border-ch2ma-border p-4"
          >
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Écrire un message..."
              className="flex-1 border border-ch2ma-border bg-transparent px-3 py-2 text-sm text-ch2ma-text focus:border-ch2ma-gold focus:outline-none"
            />
            <button
              type="submit"
              className="bg-ch2ma-dark px-4 py-2 text-sm font-semibold text-ch2ma-cream hover:bg-ch2ma-dark/90"
            >
              Envoyer
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
