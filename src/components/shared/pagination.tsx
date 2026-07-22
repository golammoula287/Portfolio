import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

function pageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-1.5 pt-4">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        render={<Link href={pageHref(basePath, currentPage - 1)} aria-disabled={currentPage <= 1} />}
      >
        <ChevronLeft />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          aria-current={page === currentPage ? "page" : undefined}
          render={<Link href={pageHref(basePath, page)} />}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage >= totalPages}
        render={<Link href={pageHref(basePath, currentPage + 1)} aria-disabled={currentPage >= totalPages} />}
      >
        <ChevronRight />
      </Button>
    </nav>
  );
}
