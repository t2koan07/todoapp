import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import type { Task } from "../App";

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <Pressable onPress={onToggle}>
      <View style={styles.row}>
        <Text style={[styles.text, task.done && styles.doneText]}>
          {task.title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  text: {
    fontSize: 16,
  },
  doneText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});

export default TaskItem;
