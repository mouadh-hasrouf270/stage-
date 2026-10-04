export interface MessagingConversation {
  id: string;
  partnerName: string;
  matterTitle: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface ConversationMessage {
  id: string;
  author: string;
  authorType: "admin" | "partner";
  content: string;
  sentAt: string;
}
