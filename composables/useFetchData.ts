import type { UseFetchOptions } from '#app';
import { formatInTimeZone } from 'date-fns-tz';
import { useAuth } from '~/composables/useAuth';

interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export const useFetchData = () => {
  const accessToken = useCookie('accessToken');
  const config = useRuntimeConfig();
  const { refreshToken } = useAuth();

  const useIFetch = async <T>(url: string, options: UseFetchOptions<T> = {}) => {
    const defaults: UseFetchOptions<T> = {
      baseURL: `${config.public.baseUrl}`,
      key: url,
      headers: accessToken.value
        ? {
            Authorization: `Bearer ${accessToken.value}`,
            'Api-Key': config.public.apiKey as string,
            'X-Timestamp': formatInTimeZone(new Date(), 'Asia/Jakarta', "yyyy-MM-dd'T'HH:mm:ssXXX"),
          }
        : {},
      server: false,
      onResponseError: async ({ response, options }) => {
        if (response.status === 401) {
          try {
            const newToken: RefreshTokenResponse = await refreshToken();

            options.headers = {
              Authorization: `Bearer ${newToken.access_token}`,
              'Api-Key': config.public.apiKey as string,
              'X-Timestamp': formatInTimeZone(new Date(), 'Asia/Jakarta', "yyyy-MM-dd'T'HH:mm:ssXXX"),
            };

            const res: any = await useFetch(url, options as UseFetchOptions<T>);

            response = res;
          } catch (error) {
            console.error('Token refresh failed:', error);
          }
        }
      },
    };

    return useFetch(url, { ...defaults, ...options });
  };

  return {
    useIFetch,
  };
};
