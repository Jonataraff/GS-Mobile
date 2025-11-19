import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COURSES = [
  {
    id: '1',
    title: 'Introdução à IA',
    category: 'ia',
    description: 'Fundamentos de Inteligência Artificial',
    duration: '4 semanas',
    lessons: 12,
    icon: 'robot',
    color: '#2196F3',
  },
  {
    id: '2',
    title: 'Sustentabilidade Corporativa',
    category: 'sustentabilidade',
    description: 'Desenvolvimento sustentável nas empresas',
    duration: '3 semanas',
    lessons: 9,
    icon: 'leaf',
    color: '#4CAF50',
  },
  {
    id: '3',
    title: 'Soft Skills Essenciais',
    category: 'soft_skills',
    description: 'Habilidades para o futuro do trabalho',
    duration: '5 semanas',
    lessons: 15,
    icon: 'brain',
    color: '#FF9800',
  },
  {
    id: '4',
    title: 'Análise de Dados',
    category: 'dados',
    description: 'Análise e visualização de dados',
    duration: '6 semanas',
    lessons: 18,
    icon: 'chart-line',
    color: '#9C27B0',
  },
  {
    id: '5',
    title: 'Gestão e Liderança',
    category: 'gestao',
    description: 'Liderança moderna e gestão de equipes',
    duration: '4 semanas',
    lessons: 12,
    icon: 'briefcase',
    color: '#F44336',
  },
  {
    id: '6',
    title: 'Desenvolvimento Web',
    category: 'web',
    description: 'Criar aplicações web modernas',
    duration: '8 semanas',
    lessons: 24,
    icon: 'code-braces',
    color: '#00BCD4',
  },
];

export default function CoursesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredCourses = COURSES.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderCourseCard = ({ item }) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() => router.push({ pathname: '/course-detail', params: { id: item.category } })}>
      <View style={[styles.courseIconContainer, { backgroundColor: item.color }]}>
        <MaterialCommunityIcons name={item.icon} size={32} color="white" />
      </View>
      <View style={styles.courseContent}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseDescription}>{item.description}</Text>
        <View style={styles.courseMetadata}>
          <View style={styles.metadataItem}>
            <MaterialCommunityIcons name="clock" size={14} color="#999" />
            <Text style={styles.metadataText}>{item.duration}</Text>
          </View>
          <View style={styles.metadataItem}>
            <MaterialCommunityIcons name="book" size={14} color="#999" />
            <Text style={styles.metadataText}>{item.lessons} aulas</Text>
          </View>
        </View>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cursos Disponíveis</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons
            name="magnify"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cursos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Filtrar por categoria:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={setSelectedCategory}
              style={styles.picker}>
              <Picker.Item label="Todas as categorias" value="" />
              <Picker.Item label="Inteligência Artificial" value="ia" />
              <Picker.Item label="Gestão e Liderança" value="gestao" />
              <Picker.Item label="Sustentabilidade" value="sustentabilidade" />
              <Picker.Item label="Análise de Dados" value="dados" />
              <Picker.Item label="Soft Skills" value="soft_skills" />
              <Picker.Item label="Desenvolvimento Web" value="web" />
            </Picker>
          </View>
        </View>

        <Text style={styles.resultsText}>
          {filteredCourses.length} curso(s) encontrado(s)
        </Text>

        <FlatList
          data={filteredCourses}
          renderItem={renderCourseCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.coursesList}
        />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  resultsText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  coursesList: {
    paddingBottom: 20,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  courseContent: {
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
  courseMetadata: {
    flexDirection: 'row',
    marginTop: 8,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metadataText: {
    fontSize: 11,
    color: '#999',
    marginLeft: 4,
  },
});
