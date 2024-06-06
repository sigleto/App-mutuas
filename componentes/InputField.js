import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const InputField = ({ label, value, onChangeText, style, keyboardType }) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <TextInput
        style={[styles.input, style]} // Aplica el estilo personalizado aquí
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default InputField;
