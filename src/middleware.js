import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

/** @param {import('next/server').NextRequest} request */
export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("accessToken")?.value || "";
  const publicPaths = ["/login", "/sign-up", "/reset-password", "/start"];
  const adminPaths = ["/admin", "/admin/dashboard", "/admin/users", "/admin*"];

  const isPublicPath = publicPaths.includes(path);

  const isAdminPath = adminPaths.some((adminPath) =>
    path.startsWith(adminPath)
  );

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/start", request.nextUrl));
  }

  if (isAdminPath && token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);

      const { payload } = await jwtVerify(token, secret);

      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      }
    } catch (error) {
      // Agar token invalid ya expired hai, toh login page par bhej do
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  // 5. Agar sab theek hai, toh request ko aage badhne do
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
