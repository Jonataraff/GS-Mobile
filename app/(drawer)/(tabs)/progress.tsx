import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PROGRESS_DATA = [
  {
    id: '1',
    title: 'Introdução à IA',
    progress: 75,
    status: 'em_progresso',
    completedLessons: 9,
    totalLessons: 12,
  },
  {
    id: '2',
    title: 'Soft Skills Essenciais',
    progress: 100,
    status: 'concluido',
    completedLessons: 15,
    totalLessons: 15,
  },
  {
    id: '3',
    title: 'Sustentabilidade Corporativa',
    progress: 45,
    status: 'em_progresso',
    completedLessons: 4,
    totalLessons: 9,
  },
];

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBarContainer}>
      <View
        style={[
          styles.progressBarFill,
          { width: `${progress}%` },
        ]}
      />
    </View>
  );
};

export default function ProgressScreen() {
  const [expandedId, setExpandedId] = useState(null);

  const totalProgress =
    PROGRESS_DATA.reduce((sum, item) => sum + item.progress, 0) /
    PROGRESS_DATA.length;

  const completedCourses = PROGRESS_DATA.filter(
    (item) => item.status === 'concluido'
  ).length;

  const renderProgressCard = (item) => {
    const isExpanded = expandedId === item.id;
    const statusLabel =
      item.status === 'concluido' ? 'Concluído' : 'Em Progresso';
    const statusColor = item.status === 'concluido' ? '#4CAF50' : '#FF9800';

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.progressCard}
        onPress={() => setExpandedId(isExpanded ? null : item.id)}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: statusColor },
              ]}
            />
            <View style={styles.titleContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.statusText}>{statusLabel}</Text>
            </View>
          </View>
          <Text style={styles.progressPercentage}>{item.progress}%</Text>
        </View>

        <ProgressBar progress={item.progress} />

        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="book-open" size={16} color="#2196F3" />
              <Text style={styles.detailText}>
                {item.completedLessons} de {item.totalLessons} aulas concluídas
              </Text>
            </View>
            <TouchableOpacity style={styles.continueButton}>
              <Text style={styles.continueButtonText}>
                {item.status === 'concluido'
                  ? 'Ver Certificado'
                  : 'Continuar Aprendendo'}
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={16}
                color="white"
              />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Progresso</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Progresso Geral</Text>
            <View style={styles.summaryProgressContainer}>
              <View style={styles.summaryProgressBarContainer}>
                <View
                  style={[
                    styles.summaryProgressBarFill,
                    { width: `${totalProgress}%` },
                  ]}
                />
              </View>
              <Text style={styles.summaryPercentage}>
                {Math.round(totalProgress)}%
              </Text>
            </View>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <View style={styles.summaryStatContainer}>
              <View style={styles.summaryStatItem}>
                <MaterialCommunityIcons
                  name="book"
                  size={24}
                  color="#2196F3"
                />
                <Text style={styles.summaryStatValue}>
                  {PROGRESS_DATA.length}
                </Text>
                <Text style={styles.summaryStatLabel}>Cursos</Text>
              </View>
              <View style={styles.summaryStatItem}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={24}
                  color="#4CAF50"
                />
                <Text style={styles.summaryStatValue}>{completedCourses}</Text>
                <Text style={styles.summaryStatLabel}>Concluídos</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Detalhes dos Cursos</Text>

        {PROGRESS_DATA.map((item) => renderProgressCard(item))}

        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Conquistas</Text>
          <View style={styles.achievementGrid}>
            <View style={styles.achievementBadge}>
              <MaterialCommunityIcons
                name="star"
                size={32}
                color="#FFD700"
              />
              <Text style={styles.achievementText}>Iniciante</Text>
            </View>
            <View style={styles.achievementBadge}>
              <MaterialCommunityIcons
                name="trophy"
                size={32}
                color="#C0C0C0"
              />
              <Text style={styles.achievementText}>Persistente</Text>
            </View>
            <View style={styles.achievementBadge}>
              <MaterialCommunityIcons
                name="medal"
                size={32}
                color="#CD7F32"
              />
              <Text style={styles.achievementText}>Dedicado</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  summaryProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryProgressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  summaryProgressBarFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  summaryPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
    minWidth: 40,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  summaryStatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryStatItem: {
    alignItems: 'center',
  },
  summaryStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  summaryStatLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
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
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  titleContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusText: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  expandedContent: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  continueButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  achievementsSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  achievementGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  achievementBadge: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementText: {
    fontSize: 12,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
});
