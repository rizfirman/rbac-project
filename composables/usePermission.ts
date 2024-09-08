const { $roles } = useNuxtApp();
const roles = $roles as any;

export const usePermission = () => {
  const isPermission = (roleParams: String[]): boolean => {
    return roleParams.some((item) => roles.includes(item));
  };
  return { isPermission };
};
