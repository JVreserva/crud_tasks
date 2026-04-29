import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TableTasks from './TableTasks';
import BtnLogout from './BtnLogout';
import taskService from '../services/taskService';
import { Task } from '../types/task';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const tasksFromApi = await taskService.listMyTasks();
      setTasks(tasksFromApi);
    } catch (err) {
      setError('Erro ao carregar tarefas.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleView = (task: Task) => {
    alert(`Visualizar tarefa: ${task.nom_tarefa}`);
  };

  const handleEdit = (task: Task) => {
    alert(`Editar tarefa: ${task.nom_tarefa}`);
  };

  const handleDelete = async (task: Task) => {
    try {
      await taskService.deleteTask(task.idt_tarefa);
      // Recarregar a lista após deletar
      await fetchTasks();
      alert('Tarefa deletada com sucesso!');
    } catch (error) {
      alert('Erro ao deletar tarefa.');
    }
  };

  return (
    <View style={styles.container}>
      <BtnLogout />
      <Text style={styles.title}>Minhas Tarefas</Text>
      <TouchableOpacity style={styles.newTaskButton} onPress={() => navigation.navigate('NewTask' as never)}>
        <Text style={styles.newTaskButtonText}>+ Nova Tarefa</Text>
      </TouchableOpacity>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <TableTasks data={tasks} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
      )}
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
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;