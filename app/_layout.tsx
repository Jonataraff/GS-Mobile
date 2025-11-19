import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from '../hooks/AuthContext';
import * as SplashScreen from 'expo-splash-screen';

// Manter a splash screen visível enquanto buscamos os recursos
SplashScreen.preventAutoHideAsync();

// Componente de navegação principal com a lógica de autenticação
function RootLayoutNav() {
  const { user, isLoading } = useAuth();

  // Mostrar tela de carregamento ou splash screen enquanto o estado é carregado
  if (isLoading) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        {/* Telas de Autenticação (sempre disponíveis) */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />

        {/* Telas de Aplicação (apenas se logado) */}
        {user && (
          <Stack.Group>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            {/* Outras telas acessíveis apenas quando logado */}
          </Stack.Group>
        )}
        {/* A tela de detalhes do curso deve ser acessível apenas se o usuário estiver logado */}
        {user && (
          <Stack.Screen name="course-detail" options={{ title: 'Detalhes do Curso' }} />
        )}

        {/* Redirecionamento para Login se não estiver logado e tentando acessar uma tela restrita */}
        {!user && <Redirect href="/login" />}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

// Componente principal que envolve tudo com o AuthProvider
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
