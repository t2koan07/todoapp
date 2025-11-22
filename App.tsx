import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TaskItem from "./components/TaskItem";
import TaskInput from "./components/TaskInput";

export interface Task {
  id: string;
  title: string;
  done: boolean;
}

const STORAGE_KEY = "TODOAPP_TASKS";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const savedTasks: Task[] = JSON.parse(json);
          setTasks(savedTasks);
        }
      } catch (error) {
        console.error("Failed to load tasks", error);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        const json = JSON.stringify(tasks);
        await AsyncStorage.setItem(STORAGE_KEY, json);
      } catch (error) {
        console.error("Failed to save tasks", error);
      }
    };

    saveTasks();
  }, [tasks]);

  const addTask = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: trimmed,
      done: false,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Todo list</Text>
          </View>

          <TaskInput onAddTask={addTask} />

          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskItem task={item} onToggle={() => toggleTask(item.id)} />
            )}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "600",
  },
});
