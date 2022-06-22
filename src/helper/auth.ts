import storage from 'local-storage-fallback'
import jwtDecode, { JwtPayload } from "jwt-decode";
import {useEffect, useState} from "react";
import {EXPRESS_URL} from "../index";
import {useApolloClient} from "@apollo/client";

const TOKEN = 'nevernote-token';
export const saveToken = (token: string) => storage.setItem(TOKEN, token);
export const getToken = (): string | null => storage.getItem(TOKEN);
export const clearToken = () => storage.removeItem(TOKEN);

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

export const usePrepareApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { resetStore } = useApolloClient()

  useEffect(() => {
      fetch(`${EXPRESS_URL}/refresh-token`, {
          method: 'POST',
          credentials: 'include'
      })
          .then(res => res.json())
          .then(data => {
              if (data?.success && data?.access_token) {
                  saveToken(data?.access_token)
                  setIsLoading(false);
              } else {
                  clearToken();
                  resetStore();
              }
          })
  },[]);

  return { isLoading };
}
