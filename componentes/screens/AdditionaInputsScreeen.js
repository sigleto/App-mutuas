import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import InputField from '../InputField';

export default function AdditionalInputsScreen({ route, navigation }) {
  const { importe, parteExenta } = route.params;
  const [edad, setEdad] = useState('');
  const [minusvalia, setMinusvalia] = useState('');

  const handleCalcularDevolucion = () => {
    navigation.navigate('DevolucionResult', { importe, parteExenta, edad, minusvalia });
  };

  return (
    <View style={styles.container}>
      <InputField label="Edad actual" value={edad} onChangeText={setEdad} keyboardType='numeric' />
      <InputField label="Grado de minusvalía" value={minusvalia} onChangeText={setMinusvalia} keyboardType='numeric' />
      <Button title="CALCULAR2" onPress={handleCalcularDevolucion} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
