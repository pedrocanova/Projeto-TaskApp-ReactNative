import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editTaskKey, setEditTaskKey] = useState(null);

  // Adiciona ou edita uma tarefa
  const addTask = () => {
    if (task.trim()) {
      if (editTaskKey) {
        // Edita a tarefa existente
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.key === editTaskKey ? { ...t, value: task } : t))
        );
        setEditTaskKey(null);
      } else {
        // Adiciona nova tarefa
        setTasks([...tasks, { key: Math.random().toString(), value: task, completed: false }]);
      }
      setTask(''); // Limpa o campo de texto
    }
  };

  // Remove a tarefa
  const removeTask = (key) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.key !== key));
  };

  // Edita a tarefa
  const editTask = (key, value) => {
    setTask(value);
    setEditTaskKey(key);
  };

  // Marca a tarefa como concluída
  const toggleCompleteTask = (key) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.key === key ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas do Consultório</Text>

      {/* Input para adicionar ou editar tarefa */}
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova tarefa"
        value={task}
        onChangeText={(text) => setTask(text)}
      />

      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>{editTaskKey ? "Editar Tarefa" : "Adicionar Tarefa"}</Text>
      </TouchableOpacity>

      {/* Lista de tarefas */}
      <FlatList
        data={tasks}
        renderItem={(itemData) => (
          <View style={styles.taskCard}>
            {/* Botão para marcar como concluída */}
            <TouchableOpacity onPress={() => toggleCompleteTask(itemData.item.key)}>
              <Text style={itemData.item.completed ? styles.completedTask : styles.taskText}>
                {itemData.item.value}
              </Text>
            </TouchableOpacity>

            <View style={styles.buttonsContainer}>
              {/* Botão para editar tarefa */}
              <TouchableOpacity style={styles.editButton} onPress={() => editTask(itemData.item.key, itemData.item.value)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>

              {/* Botão para remover tarefa */}
              <TouchableOpacity style={styles.deleteButton} onPress={() => removeTask(itemData.item.key)}>
                <Text style={styles.buttonText}>Remover</Text>
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
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskText: {
    fontSize: 18,
    color: '#333',
  },
  completedTask: {
    fontSize: 18,
    color: 'green',
    textDecorationLine: 'line-through',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#ffcc00',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
