import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E5E5] py-12">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-[#0A0A0A] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">K</span>
          </div>
          <span className="text-sm font-medium text-[#525252]">Kairo</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-[#A3A3A3]">
          <Link href="/login" className="hover:text-[#0A0A0A]">Log in</Link>
          <Link href="/signup" className="hover:text-[#0A0A0A]">Sign up</Link>
          <Link href="#pricing" className="hover:text-[#0A0A0A]">Pricing</Link>
        </div>
      </div>
    </footer>
  );
}
