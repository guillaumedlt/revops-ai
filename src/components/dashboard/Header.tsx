interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="h-12 border-b border-border px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center">
        <span className="text-sm text-muted-foreground">{title}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">Notifications</span>
        <span className="text-xs text-muted-foreground">Account</span>
      </div>
    </header>
  );
}
