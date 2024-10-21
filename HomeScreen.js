import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Ícones de check e lixeira

export default function HomeScreen() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tasks, setTasks] = useState([]);

  // Adiciona uma nova tarefa com título, descrição e data de criação
  const addTask = () => {
    if (taskTitle.trim() && taskDescription.trim()) {
      const newTask = {
        key: Math.random().toString(),
        title: taskTitle,
        description: taskDescription,
        date: new Date().toLocaleString(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  // Marca a tarefa como concluída
  const toggleCompleteTask = (key) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.key === key ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Remove a tarefa da lista
  const deleteTask = (key) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.key !== key));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas do Consultório</Text>

      {/* Input para título da tarefa */}
      <TextInput
        style={styles.input}
        placeholder="Título da Tarefa"
        value={taskTitle}
        onChangeText={(text) => setTaskTitle(text)}
      />

      {/* Input para descrição da tarefa */}
      <TextInput
        style={styles.input}
        placeholder="Descrição da Tarefa"
        value={taskDescription}
        onChangeText={(text) => setTaskDescription(text)}
      />

      {/* Botão para adicionar tarefa */}
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>

      {/* Lista de tarefas */}
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <View style={styles.taskInfo}>
              {/* Exibe título, descrição e data da tarefa */}
              <Text style={item.completed ? styles.completedTaskTitle : styles.taskTitle}>
                {item.title}
              </Text>
              <Text style={styles.taskDescription}>{item.description}</Text>
              <Text style={styles.taskDate}>Criada em: {item.date}</Text>
            </View>

            {/* Botões de check e apagar */}
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => toggleCompleteTask(item.key)}>
                <AntDesign
                  name={item.completed ? 'checkcircle' : 'checkcircleo'}
                  size={24}
                  color={item.completed ? 'green' : 'gray'}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteTask(item.key)}>
                <AntDesign name="delete" size={24} color="red" style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    marginTop: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskInfo: {
    flex: 1,
    marginRight: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  completedTaskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    textDecorationLine: 'line-through',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  },
  taskDate: {
    fontSize: 12,
    color: '#999',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteIcon: {
    marginLeft: 15, // Espaço entre o botão de check e o de apagar
  },
});
