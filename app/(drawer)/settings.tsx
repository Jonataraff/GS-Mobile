import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [offlineModeEnabled, setOfflineModeEnabled] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('isLoggedIn');
            await AsyncStorage.removeItem('userEmail');
            await AsyncStorage.removeItem('userName');
            router.replace('/login');
          },
        },
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Limpar Cache',
      'Isso removerá dados em cache do aplicativo. Continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Sucesso', 'Cache limpo com sucesso!');
          },
        },
      ]
    );
  };

  const SettingItem = ({ icon, title, description, onPress, rightComponent }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}>
      <View style={styles.settingContent}>
        <MaterialCommunityIcons name={icon} size={24} color="#2196F3" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {description && (
            <Text style={styles.settingDescription}>{description}</Text>
          )}
        </View>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="bell"
              title="Notificações"
              description="Receba alertas sobre novos cursos e progresso"
              rightComponent={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                />
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aparência</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="moon"
              title="Modo Escuro"
              description="Ativa o tema escuro do aplicativo"
              rightComponent={
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                />
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="wifi-off"
              title="Modo Offline"
              description="Permite usar o app sem conexão"
              rightComponent={
                <Switch
                  value={offlineModeEnabled}
                  onValueChange={setOfflineModeEnabled}
                />
              }
            />
            <View style={styles.divider} />
            <SettingItem
              icon="trash-can"
              title="Limpar Cache"
              description="Remove dados em cache do aplicativo"
              onPress={handleClearCache}
              rightComponent={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#999"
                />
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="information"
              title="Sobre o App"
              description="SkillUpPlus 2030+ v1.0.0"
              rightComponent={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#999"
                />
              }
            />
            <View style={styles.divider} />
            <SettingItem
              icon="file-document"
              title="Termos de Serviço"
              description="Leia nossos termos"
              onPress={() => Alert.alert('Termos de Serviço', 'Conteúdo dos termos...')}
              rightComponent={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#999"
                />
              }
            />
            <View style={styles.divider} />
            <SettingItem
              icon="shield-account"
              title="Política de Privacidade"
              description="Conheça nossa política"
              onPress={() => Alert.alert('Política de Privacidade', 'Conteúdo da política...')}
              rightComponent={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#999"
                />
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionContent}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}>
              <MaterialCommunityIcons
                name="logout"
                size={20}
                color="#FF5252"
              />
              <Text style={styles.logoutButtonText}>Sair da Conta</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            SkillUpPlus 2030+ © 2025
          </Text>
          <Text style={styles.footerSubtext}>
            Requalificação Digital para o Futuro do Trabalho
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingDescription: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF5252',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});
