import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../types/task';

interface TableTasksProps {
  data: Task[];
  onView?: (task: Task) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

const TableTasks: React.FC<TableTasksProps> = ({
  data,
  onView,
  onEdit,
  onDelete,
}) => {
  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.nom_tarefa}</Text>
      <Text style={styles.cell}>{item.ind_status ?? '—'}</Text>
      <Text style={styles.cell}>{item.des_tarefa}</Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onView?.(item)}>
          <Text style={styles.icon}>👁️</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onEdit?.(item)}>
          <Text style={styles.icon}>✏️</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete?.(item)}>
          <Text style={styles.icon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER FIXO */}
      <View style={styles.header}>
        <Text style={[styles.cell, styles.headerCell]}>Tarefa</Text>
        <Text style={[styles.cell, styles.headerCell]}>Status</Text>
        <Text style={[styles.cell, styles.headerCell]}>Descrição</Text>
        <Text style={[styles.actions, styles.headerCell]}>Ações</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.idt_tarefa?.toString() ?? index.toString()
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    fontSize: 18,
  },
});

export default TableTasks;