import ConversationSidebar from "@/components/chat/ConversationSidebar";
import MobileMenu from "@/components/MobileMenu";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:block">
        <ConversationSidebar />
      </div>
      <MobileMenu />
      <main className="flex-1 overflow-y-auto bg-[#FAFAFA]">
        <div className="mx-auto max-w-3xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
