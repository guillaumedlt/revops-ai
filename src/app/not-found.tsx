import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="text-5xl font-bold text-[#111] mb-2">404</p>
        <h1 className="text-lg font-semibold text-[#111] mb-1">Page not found</h1>
        <p className="text-[13px] text-[#999] mb-6">The page you're looking for doesn't exist.</p>
        <Link href="/chat" className="inline-flex h-9 px-4 items-center rounded-lg bg-[#111] text-white text-[13px] font-medium hover:bg-[#333] transition-colors">
          Go to Kairo
        </Link>
      </div>
    </main>
  );
}
