import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {
    // čia galėtum pridėti papildomas taisykles vėliau
  },
  {
    pages: {
      signIn: "/auth/sign-in",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
