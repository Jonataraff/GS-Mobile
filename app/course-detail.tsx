import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Dados de exemplo para simular a busca de detalhes do curso
const courseData: { [key: string]: any } = {
  ia: {
    title: 'Introdução à Inteligência Artificial',
    icon: 'robot',
    color: '#2196F3',
    duration: '4 semanas • 12 aulas',
    description:
      'Este curso oferece uma visão abrangente dos fundamentos da Inteligência Artificial, incluindo aprendizado de máquina, redes neurais e aplicações práticas no mercado de trabalho.',
    modules: [
      'Fundamentos de IA',
      'Aprendizado de Máquina Supervisionado',
      'Redes Neurais e Deep Learning',
      'Aplicações Práticas de IA',
    ],
  },
  sustentabilidade: {
    title: 'Desenvolvimento Sustentável no Contexto Corporativo',
    icon: 'leaf',
    color: '#4CAF50',
    duration: '3 semanas • 9 aulas',
    description:
      'Aprenda a integrar práticas de sustentabilidade e responsabilidade social corporativa nas estratégias de negócio, alinhado aos ODS da ONU.',
    modules: [
      'Introdução aos ODS',
      'Economia Circular e ESG',
      'Gestão de Impacto Ambiental',
    ],
  },
  soft_skills: {
    title: 'Soft Skills Essenciais para o Futuro',
    icon: 'brain',
    color: '#FF9800',
    duration: '5 semanas • 15 aulas',
    description:
      'Desenvolva habilidades interpessoais e emocionais cruciais, como comunicação eficaz, liderança, resiliência e pensamento crítico.',
    modules: [
      'Comunicação e Feedback',
      'Liderança e Trabalho em Equipe',
      'Inteligência Emocional',
      'Resolução de Conflitos',
      'Pensamento Crítico e Criatividade',
    ],
  },
  dados: {
    title: 'Análise de Dados',
    icon: 'chart-line',
    color: '#9C27B0',
    duration: '6 semanas • 18 aulas',
    description:
      'Domine as técnicas de análise e visualização de dados para tomar decisões informadas e estratégicas, utilizando ferramentas modernas de Business Intelligence.',
    modules: [
      'Introdução à Análise de Dados',
      'Estatística Aplicada',
      'Visualização de Dados (Power BI/Tableau)',
      'Introdução ao Python para Dados',
    ],
  },
  gestao: {
    title: 'Gestão e Liderança',
    icon: 'briefcase',
    color: '#F44336',
    duration: '4 semanas • 12 aulas',
    description:
      'Desenvolva habilidades de liderança moderna, gestão de equipes e metodologias ágeis para otimizar a performance e o ambiente de trabalho.',
    modules: [
      'Fundamentos de Liderança',
      'Gestão de Equipes Remotas',
      'Metodologias Ágeis (Scrum/Kanban)',
      'Comunicação Estratégica',
    ],
  },
  web: {
    title: 'Desenvolvimento Web',
    icon: 'code-braces',
    color: '#00BCD4',
    duration: '8 semanas • 24 aulas',
    description:
      'Aprenda a criar aplicações web completas, do frontend ao backend, utilizando as tecnologias mais demandadas do mercado.',
    modules: [
      'HTML, CSS e JavaScript Avançado',
      'Frameworks Frontend (React/Vue)',
      'Desenvolvimento Backend (Node.js/Python)',
      'Banco de Dados e APIs REST',
    ],
  },
};

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const course = courseData[id as string];

  if (!course) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Curso não encontrado.</Text>
      </View>
    );
  }

  // Configurar o título da tela dinamicamente
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: course.title }} />
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: course.color }]}>
          <MaterialCommunityIcons
            name={course.icon as any}
            size={48}
            color="white"
          />
        </View>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.courseDuration}>{course.duration}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Sobre o Curso</Text>
        <Text style={styles.description}>{course.description}</Text>

        <Text style={styles.sectionTitle}>Módulos</Text>
        {course.modules.map((module: string, index: number) => (
          <View key={index} style={styles.moduleItem}>
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={20}
              color="#4CAF50"
            />
            <Text style={styles.moduleText}>{module}</Text>
          </View>
        ))}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: course.color }]}
          onPress={() => Alert.alert('Inscrição', `Você se inscreveu em ${course.title}!`)}>
          <Text style={styles.buttonText}>Inscrever-se Agora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  courseDuration: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 15,
  },
  moduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  moduleText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
