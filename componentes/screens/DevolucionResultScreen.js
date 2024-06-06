import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Alert, Text, Linking, TouchableOpacity } from 'react-native';
import ResultDisplay from '../ResultDisplay';
import Aviso from '../Avisos/Aviso';
import { useNavigation } from '@react-navigation/native';
//import Anuncio from '../Avisos/Anuncio';

export default function DevolucionResultScreen({ route }) {
  const { importe, parteExenta } = route.params;
  const [edad, setEdad] = useState('0');
  const [minusvalia, setMinusvalia] = useState('0');
  const [devolucion, setDevolucion] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const calcularDevolucion = () => {
    const parteExentaValue = parseFloat(parteExenta.match(/(\d+(\.\d+)?)/)[0]);

    if (isNaN(parteExentaValue)) {
      Alert.alert('Error', 'El valor de parte exenta no es un número válido');
      return;
    }

    let pensionConsiderada = parseFloat(importe) - 2000;
    let pensionConExenta = pensionConsiderada - parteExentaValue;

    if (isNaN(pensionConsiderada) || pensionConsiderada <= 0 || isNaN(pensionConExenta) || pensionConExenta <= 0) {
      Alert.alert('Error', 'El valor de la pensión considerada no es válido');
      return;
    }

    const calcularImpuesto = (ingreso) => {
      let impuestoTotal = 0;
      const escalasGravamen = [
        { limiteInf: 0, limiteSup: 12450, tipo: 19 },
        { limiteInf: 12450, limiteSup: 20200, tipo: 24 },
        { limiteInf: 20200, limiteSup: 35200, tipo: 30 },
        { limiteInf: 35200, limiteSup: 60000, tipo: 37 },
        { limiteInf: 60000, limiteSup: Infinity, tipo: 45 },
      ];

      for (let escala of escalasGravamen) {
        const tramoInferior = escala.limiteInf;
        const tramoSuperior = escala.limiteSup;
        const tipo = escala.tipo;

        if (ingreso <= 0) break;

        let ingresosEnTramo = Math.min(ingreso, tramoSuperior - tramoInferior);
        let impuestoEnTramo = ingresosEnTramo * (tipo / 100);

        impuestoTotal += impuestoEnTramo;
        ingreso -= ingresosEnTramo;
      }
      return impuestoTotal;
    };

    const impuestoTotal = calcularImpuesto(pensionConsiderada);
    const impuestoConExenta = calcularImpuesto(pensionConExenta);

    let cuotaDelMinimo = 0;
    const edadValue = parseInt(edad);
    const minusvaliaValue = parseInt(minusvalia);

    if (isNaN(edadValue) || isNaN(minusvaliaValue)) {
      Alert.alert('Error', 'Por favor, asegúrate de que la edad y el grado de minusvalía sean números válidos.');
      return;
    }

    if (edadValue >= 65 && edadValue < 75 && minusvaliaValue < 33) { cuotaDelMinimo = 1330; }
    else if (edadValue >= 75 && minusvaliaValue < 33) { cuotaDelMinimo = 1600; }
    else if (edadValue >= 65 && edadValue < 75 && minusvaliaValue >= 33 && minusvaliaValue < 65) { cuotaDelMinimo = 1850; }
    else if (edadValue >= 65 && edadValue < 75 && minusvaliaValue >= 65) { cuotaDelMinimo = 4000; }
    else if (edadValue > 75 && minusvaliaValue >= 33 && minusvaliaValue < 65) { cuotaDelMinimo = 2100; }
    else if (edadValue > 75 && minusvaliaValue >= 65) { cuotaDelMinimo = 4592; }
    else if (edadValue < 65 && minusvaliaValue >= 33 && minusvaliaValue < 65) { cuotaDelMinimo = 1660; }
    else if (edadValue < 65 && minusvaliaValue >= 65) { cuotaDelMinimo = 3500; }
    else { cuotaDelMinimo = 1077; }

    let impuestoFinal = impuestoTotal - cuotaDelMinimo > 0 ? impuestoTotal - cuotaDelMinimo : 0;
    let impuestoConExentaFinal = impuestoConExenta - cuotaDelMinimo > 0 ? impuestoConExenta - cuotaDelMinimo : 0;

    const tipoGravamenUno = (impuestoFinal / pensionConsiderada) * 100;
    const tipoGravamenDos = (impuestoConExentaFinal / pensionConExenta) * 100;

    const devolucionTotal = (pensionConsiderada * tipoGravamenUno / 100) - (pensionConExenta * tipoGravamenDos / 100);

    setDevolucion(`El tipo de gravamen inicial es del ${tipoGravamenUno.toFixed(2)}%. Restando la cantidad exenta de pensión, correspondería un tipo de gravamen del ${tipoGravamenDos.toFixed(2)}%. La devolución resultante sería aproximadamente de ${devolucionTotal.toFixed(2)}.`);
  };

  const handleCalcular = () => {
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    calcularDevolucion();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const volver = () => { navigation.navigate("Main") };

  return (
    <View style={styles.container}>
     {/*<Anuncio/>*/}
      <Text style={styles.textos}>Edad en el ejercicio de comprobación</Text>
      <TextInput
        style={styles.input}
        placeholder="Su edad en el ejercicio de cálculo"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />
      <Text style={styles.textos}>Grado de minusvalía</Text>
      <TextInput
        style={styles.input}
        placeholder="Grado de minusvalía"
        value={minusvalia}
        onChangeText={setMinusvalia}
        keyboardType="numeric"
      />
      <Button title="CALCULAR DEVOLUCIÓN" onPress={handleCalcular} />
      {devolucion ? <ResultDisplay result={devolucion} /> : null}
      <Aviso
        visible={modalVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <TouchableOpacity onPress={volver}>
        <Text style={styles.link}>VOLVER</Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => Linking.openURL('https://sede.agenciatributaria.gob.es/Sede/irpf/mutualistas-solicitudes-devolucion.html')}>
        Presentación de solicitud ante la AEAT
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    backgroundColor: '#fffdf1',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
    width: '80%',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  textos: {
    fontWeight: 'bold',
    color: 'green',
    fontSize: 16,
  },
  link: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 30,
  },
  touchableOpacity: {
    backgroundColor: 'olive',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 20,
    fontWeight: 'bold',
  },
});
