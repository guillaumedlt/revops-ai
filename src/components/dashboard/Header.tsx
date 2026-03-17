interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-12 items-center justify-between border-b border-[#E5E5E5] px-6">
      <span className="text-sm text-[#737373]">{title}</span>
      <div className="flex items-center gap-4">
        <span className="text-xs text-[#A3A3A3]">Notifications</span>
      </div>
    </header>
  );
}
