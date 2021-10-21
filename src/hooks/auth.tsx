import React, { createContext, useContext, useState, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { GITHUB_CLIENT_ID } = process.env;
const USER_STORAGE = '@dowhile:user';
const TOKEN_STORAGE = '@dowhile:token';

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;
  isAuthenticating: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: React.ReactNode;
}

type AuthResponse = {
  token: string;
  user: User;
}

type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  },
  type?: string;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  async function signIn() {
    setIsAuthenticating(true);

    try {
      const authUrl = `https://github.com/login/oauth/authorize?scope=read:user&client_id=${GITHUB_CLIENT_ID}`;
      const authSessionResponse = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

      if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
        const authResponse = await api.post('/authenticate', { code: authSessionResponse.params.code });

        const { user, token } = authResponse.data as AuthResponse;

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify(token));

        setUser(user); 
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsAuthenticating(false);
    }
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem(USER_STORAGE);
    await AsyncStorage.removeItem(TOKEN_STORAGE);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

      if (userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(tokenStorage)}`;
        setUser(JSON.parse(userStorage))
      }

      setIsAuthenticating(false);
    }

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticating,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };