import { Environment } from '@/shared/environment';

export const auth = {
  getToken: () => {
    return sessionStorage.getItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN);
  },

  setToken: (token: string) => {
    return sessionStorage.setItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN, token);
  },
  
  removeToken: () => {
    return sessionStorage.removeItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN);
  }
};
