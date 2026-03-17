import ConversationSidebar from "@/components/chat/ConversationSidebar";

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <ConversationSidebar />
      <main className="flex-1 flex flex-col bg-white overflow-hidden">{children}</main>
    </div>
  );
}
