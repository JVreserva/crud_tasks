import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TableTasks, { Task } from './TableTasks';
import BtnLogout from './BtnLogout';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<Task[]>([
    {
      idt_tarefa: 1,
      nom_tarefa: 'Comprar leite',
      dat_criacao: '2024-06-01',
      des_descricao: 'Ir ao supermercado e comprar leite integral.',
    },
    {
      idt_tarefa: 2,
      nom_tarefa: 'Estudar React Native',
      dat_criacao: '2024-06-02',
      des_descricao: 'Assistir aulas e praticar exercícios de React Native.',
    },
  ]);   

    const handleView = (task: Task) => {
        alert(`Visualizar tarefa: ${task.nom_tarefa}`);
    }

    const handleEdit = (task: Task) => {
        alert(`Editar tarefa: ${task.nom_tarefa}`);
    }

    const handleDelete = (task: Task) => {
        alert(`Deletar tarefa: ${task.nom_tarefa}`);
    }

  return (
    <View style={styles.container}>
      <BtnLogout />
      <Text style={styles.title}>Minhas Tarefas</Text>
      <TouchableOpacity style={styles.newTaskButton} onPress={() => navigation.navigate('NewTask' as never)}>
        <Text style={styles.newTaskButtonText}>+ Nova Tarefa</Text>
      </TouchableOpacity>
      <TableTasks data={tasks} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  newTaskButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  newTaskButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;