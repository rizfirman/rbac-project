// roles decode jwt
const { $roles } = useNuxtApp();
const roles = $roles as any;

export const usePermission = () => {
  const isPermission = (roleParams: String[]): boolean => {
    return roleParams.some((item) => roles.includes(item));
  };

  // roles menggunakan atribut dari keycloak
  // const { $keycloak } = useNuxtApp();
  // const keycloak = $keycloak as any;
  // const { roles } = keycloak.realmAccess;
  // const checkRoles = (roleParams: String[]): boolean => {
  //   return roleParams.some((item) => roles.includes(item));
  // };

  // role menggunakan function hasRealmRole dari keycloak
  // const { $keycloak } = useNuxtApp();
  // const keycloak = $keycloak as any;
  // const checkRoles = (roleParams: String[]): boolean => {
  //   return roleParams.some((item) => keycloak.hasRealmRole(item));
  // };
  return { isPermission };
};
