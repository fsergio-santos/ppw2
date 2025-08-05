import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import useGetLogin from '../service/connection/login/GetLogin';
import useLogout from '../service/connection/logout/PostLogout';
import useGetProfile from '../service/connection/profile/GetProfile';
import { PROFILE_STORAGE } from '../service/storage/constants';
import { getStorageContent, removeStorageContent, setStorageContent } from '../service/storage/SessionStorage';
import type { Login } from '../type/Login';
import type { Profile } from '../type/Profile';

type AuthContextProps = {
  children: ReactNode;
};

interface AuthContextType {
  profile: Profile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  profile: null,
  isAuthenticated: false,
  login: async () => Promise.resolve(),
  logout: async () => Promise.resolve(),
});

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const { getLogin, errorGetLogin } = useGetLogin();
  const { getUserProfile, errorGetProfile } = useGetProfile();
  const { getLogout } = useLogout();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const profileStorage = getStorageContent(PROFILE_STORAGE);
      if (profileStorage) {
        setProfile(JSON.parse(profileStorage));
      }
      const data = await getUserProfile();
      if (data?.dados) {
        setProfile(data.dados as Profile);
        setStorageContent(PROFILE_STORAGE, JSON.stringify(data?.dados));
        setIsAuthenticated(true);
      }
      if (errorGetProfile) {
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);

  const login = async (email: string, senha: string) => {
    const dados: Login = { email: email, senha: senha };

    await getLogin(dados);
    if (errorGetLogin) {
      setIsAuthenticated(false);
    }

    const data = await getUserProfile();
    if (errorGetProfile) {
      setIsAuthenticated(false);
    }

    if (data?.dados) {
      setProfile(data?.dados as Profile);
      setStorageContent(PROFILE_STORAGE, JSON.stringify(data?.dados));
      setIsAuthenticated(true);
    }
  };

  const logout = async () => {
    await getLogout();
    removeStorageContent(PROFILE_STORAGE);
    setProfile(null);
    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ profile, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
