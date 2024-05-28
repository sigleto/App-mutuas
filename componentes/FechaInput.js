import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const DateInput = ({ label, value, onChangeText }) => {
  const [formattedDate, setFormattedDate] = useState(value);

  const handleChangeText = (text) => {
    // Remover cualquier caracter no numérico
    const cleanedText = text.replace(/[^0-9]/g, '');
    
    // Verificar si el texto tiene 8 caracteres
    if (cleanedText.length === 8) {
      // Formatear el texto al formato DD-MM-YYYY
      const formatted = cleanedText.replace(/(\d{2})(\d{2})(\d{4})/, '$1-$2-$3');
      setFormattedDate(formatted);
      onChangeText(formatted);
    } else {
      // Si no tiene 8 caracteres, establecer el texto como está
      setFormattedDate(cleanedText);
      onChangeText(cleanedText);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={label}
        value={formattedDate}
        onChangeText={handleChangeText}
        keyboardType="numeric"
        maxLength={10} // Longitud máxima para DD-MM-YYYY
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

export default DateInput;
