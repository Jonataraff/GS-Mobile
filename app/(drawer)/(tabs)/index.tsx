import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../hooks/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  // Extrai o nome de usuário do email para exibição
  const userName = user ? user.split('@')[0] : 'Usuário';

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Bem-vindo,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <MaterialCommunityIcons name="logout" size={24} color="#FF5252" />
        </TouchableOpacity>
      </View>

      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>SkillUpPlus 2030+</Text>
          <Text style={styles.bannerSubtitle}>
            Requalificação Digital para o Futuro do Trabalho
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seu Progresso</Text>
        <View style={styles.progressCard}>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Cursos Iniciados</Text>
            <Text style={styles.progressValue}>3</Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Concluídos</Text>
            <Text style={styles.progressValue}>1</Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Em Progresso</Text>
            <Text style={styles.progressValue}>2</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cursos Recomendados</Text>
        <TouchableOpacity
          style={styles.courseCard}
          onPress={() => router.push({ pathname: '/course-detail', params: { id: 'ia' } })}>
          <View style={styles.courseIcon}>
            <MaterialCommunityIcons name="robot" size={32} color="#2196F3" />
          </View>
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>Introdução à IA</Text>
            <Text style={styles.courseDescription}>
              Aprenda os fundamentos da Inteligência Artificial
            </Text>
            <Text style={styles.courseDuration}>4 semanas • 12 aulas</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.courseCard}
          onPress={() => router.push({ pathname: '/course-detail', params: { id: 'sustentabilidade' } })}>
          <View style={styles.courseIcon}>
            <MaterialCommunityIcons name="leaf" size={32} color="#4CAF50" />
          </View>
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>Sustentabilidade</Text>
            <Text style={styles.courseDescription}>
              Desenvolvimento sustentável no contexto corporativo
            </Text>
            <Text style={styles.courseDuration}>3 semanas • 9 aulas</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.courseCard}
          onPress={() => router.push({ pathname: '/course-detail', params: { id: 'soft_skills' } })}>
          <View style={styles.courseIcon}>
            <MaterialCommunityIcons name="brain" size={32} color="#FF9800" />
          </View>
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>Soft Skills</Text>
            <Text style={styles.courseDescription}>
              Desenvolva habilidades essenciais para o futuro
            </Text>
            <Text style={styles.courseDuration}>5 semanas • 15 aulas</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre o Projeto</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            O SkillUpPlus 2030+ é uma plataforma de requalificação digital que
            conecta profissionais a trilhas de aprendizado personalizadas,
            alinhadas aos Objetivos de Desenvolvimento Sustentável (ODS 4, 8, 9
            e 10) da ONU.
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
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    padding: 8,
  },
  banner: {
    backgroundColor: '#FF9800',
    margin: 16,
    borderRadius: 12,
    padding: 20,
  },
  bannerContent: {
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  bannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressItem: {
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  courseDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  courseDuration: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
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
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
