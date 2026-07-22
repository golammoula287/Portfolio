import { SiteSidebar } from "@/components/public/site-sidebar";
import { SiteFooter } from "@/components/public/site-footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <SiteSidebar />
      <div className="flex flex-1 flex-col lg:pl-64">
        {children}
        <SiteFooter />
      </div>
    </div>
  );
}
