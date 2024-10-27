import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.log('Erro ao carregar tarefas', error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.log('Erro ao salvar tarefas', error);
    }
  };

  const addTask = () => {
    if (taskTitle.trim() && taskDescription.trim()) {
      const newTask = {
        key: Math.random().toString(),
        title: taskTitle,
        description: taskDescription,
        date: new Date().toLocaleString(),
        completed: false,
        completedDate: null,
      };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  const toggleCompleteTask = (key) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.key === key
          ? {
              ...task,
              completed: !task.completed,
              completedDate: !task.completed ? new Date().toLocaleString() : null,
            }
          : task
      )
    );
  };

  const deleteTask = (key) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.key !== key));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Clínica Canova</Text>

        <TextInput
          style={styles.inputLarge}
          placeholder="Título da Tarefa"
          value={taskTitle}
          onChangeText={(text) => setTaskTitle(text)}
          multiline={false}
        />

        <TextInput
          style={styles.inputLarge}
          placeholder="Descrição da Tarefa"
          value={taskDescription}
          onChangeText={(text) => setTaskDescription(text)}
          multiline={true}
        />

        <TouchableOpacity style={styles.addButtonLarge} onPress={addTask}>
          <Text style={styles.addButtonText}>Adicionar Tarefa</Text>
        </TouchableOpacity>

        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <View style={styles.taskInfo}>
                <Text style={item.completed ? styles.completedTaskTitle : styles.taskTitle}>
                  {item.title}
                </Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
                <Text style={styles.taskDate}>Criada em: {item.date}</Text>
                {item.completed && item.completedDate && (
                  <Text style={styles.completedDate}>Concluída em: {item.completedDate}</Text>
                )}
              </View>

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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLarge: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    width: '100%',
  },
  addButtonLarge: {
    backgroundColor: '#5cb85c',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
  taskCard: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    width: '100%',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
  },
  completedTaskTitle: {
    fontSize: 18,
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
  completedDate: {
    fontSize: 12,
    color: '#009900',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteIcon: {
    marginLeft: 20,
  },
});
