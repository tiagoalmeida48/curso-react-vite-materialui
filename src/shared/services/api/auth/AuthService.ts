import { api } from "../axios-config";

interface IAuthService {
  token: string;
}

const auth = async (email: string, password: string): Promise<IAuthService | Error> => {
  try {
    const { data } = await api.get('auth', {data: {email, password}});

    if (data) {
      return data;
    }

    return new Error('Erro no login');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro no login');
  }
};


export const AuthService = {
  auth
}