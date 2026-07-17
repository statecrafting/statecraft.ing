import type { ReactNode } from "react";

// Sign-in hand-off (spec 004 section 3.2). The static apex runs no auth flow:
// it links out to the control plane's Rauthy OIDC kickoff at the same
// /auth/rauthy path the app used before the apex cutover, now on the app host.
// A plain absolute URL so it renders identically in prerendered HTML with no
// client JavaScript, and so middle-click / cmd-click behave.
export const SIGN_IN_URL = "https://app.statecraft.ing/auth/rauthy";

export function SignInLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={SIGN_IN_URL} className={className}>
      {children}
    </a>
  );
}
