export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t px-6 py-4 text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <p>&copy; {year} Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}
