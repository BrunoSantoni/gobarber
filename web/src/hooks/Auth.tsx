import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface IAuthData {
  token: string;
  user: IUser;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: IUser;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<IAuthData>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as IAuthData;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`; /* Toda requisição vai colocar esse token no headers */

    setAuthData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setAuthData({} as IAuthData);
  }, []);

  const updateUser = useCallback(
    (user: IUser) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));

      setAuthData({
        token: authData.token,
        user,
      });
    },
    [setAuthData, authData.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: authData.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
