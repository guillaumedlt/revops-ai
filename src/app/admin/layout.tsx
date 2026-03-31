import ConversationSidebar from "@/components/chat/ConversationSidebar";
import MobileMenu from "@/components/MobileMenu";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:block"><ConversationSidebar /></div>
      <MobileMenu />
      <main className="flex-1 overflow-y-auto bg-white">{children}</main>
    </div>
  );
}
