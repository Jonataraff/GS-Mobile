import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../hooks/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [userName, setUserName] = useState(user ? user.split('@')[0] : '');
  const [userEmail, setUserEmail] = useState(user || '');
  const [userInterests, setUserInterests] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user ? user.split('@')[0] : '');

  useEffect(() => {
    // Apenas carrega os interesses, pois nome e email já vêm do AuthContext
    const loadInterests = async () => {
      try {
        const interests = await AsyncStorage.getItem('userInterests');
        if (interests) setUserInterests(interests);
      } catch (error) {
        console.error('Erro ao carregar interesses:', error);
      }
    };
    loadInterests();
  }, []);

  const handleLogout = () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => {
          signOut();
        },
      },
    ]);
  };

  const handleSaveProfile = async () => {
    if (!tempName.trim()) {
      Alert.alert('Erro', 'O nome não pode estar vazio');
      return;
    }

    try {
      // Apenas atualiza o nome no AsyncStorage, o email vem do AuthContext
      await AsyncStorage.setItem('userName', tempName);
      setUserName(tempName);
      setIsEditing(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar perfil');
    }
  };

  const getInterestLabel = (interest: string) => {
    const labels: { [key: string]: string } = {
      ia: 'Inteligência Artificial',
      gestao: 'Gestão e Liderança',
      sustentabilidade: 'Sustentabilidade',
      dados: 'Análise de Dados',
      soft_skills: 'Soft Skills',
      web: 'Desenvolvimento Web',
    };
    return labels[interest] || interest;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <MaterialCommunityIcons name="account" size={48} color="white" />
            </View>
          </View>
          <Text style={styles.headerTitle}>Meu Perfil</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <MaterialCommunityIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            {!isEditing && (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <MaterialCommunityIcons name="pencil" size={20} color="#2196F3" />
              </TouchableOpacity>
            )}
          </View>

          {isEditing ? (
            <View style={styles.editForm}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={tempName}
                onChangeText={setTempName}
                placeholder="Seu nome"
              />

              <View style={styles.editButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setIsEditing(false);
                    setTempName(userName);
                  }}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveProfile}>
                  <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.infoCard}>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="account"
                  size={20}
                  color="#2196F3"
                />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Nome</Text>
                  <Text style={styles.infoValue}>{userName || 'Não definido'}</Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="email"
                  size={20}
                  color="#2196F3"
                />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{userEmail || 'Não definido'}</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Áreas de Interesse</Text>
          <View style={styles.interestCard}>
            <MaterialCommunityIcons
              name="lightbulb"
              size={20}
              color="#FF9800"
            />
            <Text style={styles.interestValue}>
              {userInterests
                ? getInterestLabel(userInterests)
                : 'Não definido'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <MaterialCommunityIcons
                name="book"
                size={24}
                color="#2196F3"
              />
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Cursos</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons
                name="check-circle"
                size={24}
                color="#4CAF50"
              />
              <Text style={styles.statValue}>1</Text>
              <Text style={styles.statLabel}>Concluído</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons
                name="fire"
                size={24}
                color="#FF5722"
              />
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statLabel}>Dias Seguidos</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o App</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>SkillUpPlus 2030+</Text>
            <Text style={styles.aboutVersion}>Versão 1.0.0</Text>
            <Text style={styles.aboutDescription}>
              Plataforma de requalificação digital conectando profissionais a
              trilhas de aprendizado personalizadas, alinhadas aos Objetivos de
              Desenvolvimento Sustentável (ODS) da ONU.
            </Text>
            <View style={styles.odsContainer}>
              <Text style={styles.odsLabel}>ODS Relacionados:</Text>
              <Text style={styles.odsText}>ODS 4, 8, 9 e 10</Text>
            </View>
          </View>
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
    paddingVertical: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
    flex: 1,
  },
  logoutButton: {
    padding: 8,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  editForm: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 14,
    backgroundColor: '#FAFAFA',
  },
  editButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  interestCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  interestValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '31%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  aboutCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  aboutVersion: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  aboutDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    lineHeight: 20,
  },
  odsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  odsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  odsText: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '600',
    marginTop: 4,
  },
});
