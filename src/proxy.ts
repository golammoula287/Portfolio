import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Optimistic pre-filter for the hidden admin route: rejects before the
// admin route tree even renders. This is not the real auth check — that
// happens server-side, close to the data (see the admin layout / Phase 5's
// verifySession DAL). Renamed from `middleware` per Next.js 16 (this always
// runs on the Node.js runtime now, not Edge).
const ADMIN_SUBPATHS = ["dashboard", "login", "projects", "achievements", "experience", "messages", "blog", "research", "media", "settings", "users", "activity-log"];

export function proxy(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  const [firstSegment, secondSegment] = segments;

  const looksLikeAdminPath = secondSegment !== undefined && ADMIN_SUBPATHS.includes(secondSegment);
  if (!looksLikeAdminPath) {
    return NextResponse.next();
  }

  if (firstSegment !== process.env.ADMIN_ROUTE_SLUG) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
