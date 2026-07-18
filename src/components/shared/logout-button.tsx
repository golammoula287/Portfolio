"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LogoutButton({ secretSlug }: { secretSlug: string }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleLogout() {
    setIsPending(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(`/${secretSlug}/login`);
    router.refresh();
  }

  return (
    <Button variant="outline" size="sm" disabled={isPending} onClick={handleLogout}>
      {isPending ? "Signing out…" : "Sign out"}
    </Button>
  );
}
