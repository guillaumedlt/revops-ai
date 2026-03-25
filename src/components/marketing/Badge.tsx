export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-[#E5E5E5] bg-white text-[12px] font-medium text-[#666]">
      {children}
    </span>
  );
}
