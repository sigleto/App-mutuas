import React, { useState } from 'react';
import { View, Button, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import InputField from '../InputField';
import DateInput from '../FechaInput';
import AvisoVida from '../Avisos/AvisoVida';
import AvisoDiasCotizados from '../Avisos/AvisoDiasCotizados';
import { useNavigation } from '@react-navigation/native';

export default function MainScreen({ navigation }) {
  const [importe, setImporte] = useState('');
  const [fechaInicioLaboral, setFechaInicioLaboral] = useState('');
  const [fechaJubilacion, setFechaJubilacion] = useState('');
  const [dias, setDias] = useState('');
  const [suspension1, setSuspension1] = useState('');
  const [suspension2, setSuspension2] = useState('');
  const [showAvisoVida, setShowAvisoVida] = useState(false);
  const [showAvisoDias, setShowAvisoDias] = useState(false);

  const handleCalcularExenta = () => {
    navigation.navigate('ExentaResult', {
      importe,
      fechaInicioLaboral,
      fechaJubilacion,
      dias,
      suspension1,
      suspension2,
    });
  };

  const nav = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => nav.toggleDrawer()}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <InputField label="IMPORTE DE LA PENSIÓN" value={importe} onChangeText={setImporte} keyboardType='numeric' />
        <DateInput label="FECHA INICIO VIDA LABORAL" value={fechaInicioLaboral} onChangeText={setFechaInicioLaboral} />
        <DateInput label="FECHA DE JUBILACION" value={fechaJubilacion} onChangeText={setFechaJubilacion} />
        <View style={styles.inputContainer}>
          <InputField label="DIAS DE COTIZACIÓN " value={dias} onChangeText={setDias} keyboardType='numeric' />
          <TouchableOpacity onPress={() => setShowAvisoVida(true)}>
            <Text style={styles.asterisk}>?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <InputField label="Dias no cotizados hasta 31/12/1966" value={suspension1} onChangeText={setSuspension1} keyboardType='numeric' />
          <TouchableOpacity onPress={() => setShowAvisoDias(true)}>
            <Text style={styles.asterisk}>?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <InputField label="Dias no cotizados desde 01/01/1967 a 31/12/1978 " value={suspension2} onChangeText={setSuspension2} keyboardType='numeric' />
          <TouchableOpacity onPress={() => setShowAvisoDias(true)}>
            <Text style={styles.asterisk}>?</Text>
          </TouchableOpacity>
        </View>
        <Button title="CALCULAR" onPress={handleCalcularExenta} />
        <AvisoVida
          visible={showAvisoVida}
          onConfirm={() => setShowAvisoVida(false)}
          onCancel={() => setShowAvisoVida(false)}
        />
        <AvisoDiasCotizados
          visible={showAvisoDias}
          onConfirm={() => setShowAvisoDias(false)}
          onCancel={() => setShowAvisoDias(false)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuIcon: {
    fontSize: 25,
    marginRight: 10,
    marginTop:30,
  },
  formContainer: {
    marginTop: 50,
    paddingBottom: 20,
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    textAlign: 'center'
  },
  asterisk: {
    fontSize: 15,
    color: 'red',
    marginLeft: 20,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#c4f8f9',
    borderRadius: 8,
  },
});
