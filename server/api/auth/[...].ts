import KeycloakProvider from "next-auth/providers/keycloak";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: "your-secret-here",
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    KeycloakProvider.default({
      clientId: "web-admin",
      issuer: "https://keycloak.digitalservice.id/realms/superapps-admin",
    }),
  ],
});
