import { useAuthStore } from '~/stores/auth';

import qs from 'qs';

interface AuthResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  not_before_policy: number;
  session_state: string;
  scope: string;
}

interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export const useAuth = () => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  const refreshToken = async (): Promise<RefreshTokenResponse> => {
    const refreshToken = useCookie('refreshToken');
    const payload = qs.stringify({
      refresh_token: refreshToken.value,
      client_id: config.public.clientId,
      client_secret: config.public.clientSecret,
      grant_type: 'refresh_token',
    });

    const { data, error } = await useFetch<AuthResponse>(
      `${config.public.keycloakBaseUrl}/realms/superapps-admin/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload,
      }
    );

    if (error.value) {
      if (error.value?.statusCode === 400) {
        console.error('Token refresh failed:', error.value);
      }
      throw new Error('Token refresh failed');
    }

    const { access_token, refresh_token } = data.value as AuthResponse;

    authStore.setTokens(access_token, refresh_token);
    return { access_token, refresh_token };
  };
  return {
    refreshToken,
  };
};
