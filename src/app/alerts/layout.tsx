import ConversationSidebar from "@/components/chat/ConversationSidebar";

export default function AlertsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:block">
        <ConversationSidebar />
      </div>
      <main className="flex-1 flex flex-col bg-[#FAFAFA] min-w-0">{children}</main>
    </div>
  );
}
