import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from 'expo-router';

// 1. Definir o tipo do contexto
interface AuthContextType {
  user: string | null;
  isLoading: boolean;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// 2. Criar o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Provedor do Contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar o estado de autenticação ao iniciar
  useEffect(() => {
    async function loadUser() {
      try {
        const storedUser = await AsyncStorage.getItem('userEmail');
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (e) {
        console.error('Failed to load user from storage', e);
      } finally {
        // Esconder a splash screen assim que o estado for carregado
        SplashScreen.hideAsync();
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  // Função de login
  const signIn = async (email: string) => {
    try {
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setUser(email);
    } catch (e) {
      console.error('Failed to sign in', e);
      throw new Error('Falha ao salvar dados de login.');
    }
  };

  // Função de logout
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('isLoggedIn');
      setUser(null);
    } catch (e) {
      console.error('Failed to sign out', e);
      throw new Error('Falha ao remover dados de login.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. Hook customizado para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
