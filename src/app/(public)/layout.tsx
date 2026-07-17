export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b px-6 py-4">{/* nav placeholder — Phase 7 */}</header>
      <div className="flex flex-1 flex-col">{children}</div>
      <footer className="border-t px-6 py-4 text-sm text-muted-foreground">
        {/* footer placeholder — Phase 7. Never link the admin route here. */}
      </footer>
    </div>
  );
}
