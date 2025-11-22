import React, { useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface TaskInputProps {
  onAddTask: (title: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }

    onAddTask(trimmed);
    setTitle("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        placeholderTextColor="#cccccc"
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={handleAdd}
        returnKeyType="done"
      />
      <Pressable onPress={handleAdd}>
        <Text style={styles.saveText}>Save</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#000",
  },
  saveText: {
    fontSize: 18,
    color: "#007AFF",
    marginLeft: 16,
  },
});

export default TaskInput;
