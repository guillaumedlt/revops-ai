import ConversationSidebar from "@/components/chat/ConversationSidebar";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <ConversationSidebar />
      <main className="flex-1 flex flex-col bg-white">{children}</main>
    </div>
  );
}
