import storage from 'local-storage-fallback'
import jwtDecode, { JwtPayload } from "jwt-decode";

const TOKEN = 'nevernote-token';
export const saveToken = (token: string) => storage.setItem(TOKEN, token);
export const getToken = (): string | null => storage.getItem(TOKEN);

export const isAuth = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
      const { exp }: JwtPayload = jwtDecode(token);
      return Date.now() < exp! * 1000;
  } catch (e) {
      return false;
  }
};