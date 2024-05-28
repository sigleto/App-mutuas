import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import InputField from './componentes/InputField';
import DateInput from './componentes/FechaInput';
import ResultDisplay from './componentes/ResultDisplay';
import ExentaCalculator from './componentes/ExentaCalculator';
import DevolucionCalculator from './componentes/DevolucionCalculator';
import AvisoVida from './componentes/Avisos/AvisoVida';
import AvisoDiasCotizados from './componentes/Avisos/AvisoDiasCotizados';

export default function App() {
  const [importe, setImporte] = useState('');
  const [fechaInicioLaboral, setFechaInicioLaboral] = useState('');
  const [fechaJubilacion, setFechaJubilacion] = useState('');
  const [dias, setDias] = useState('');
  const [suspension1, setSuspension1] = useState('');
  const [suspension2, setSuspension2] = useState('');
  const [edad, setEdad] = useState('');
  const [minusvalia, setMinusvalia] = useState('0');
  const [parteExenta, setParteExenta] = useState('');
  const [devolucion, setDevolucion] = useState('');
  const [mostrarCamposAdicionales, setMostrarCamposAdicionales] = useState(false);
  const [showAvisoVida, setShowAvisoVida] = useState(false);
  const [showAvisoDias, setShowAvisoDias] = useState(false);

  const handleCalcularExenta = () => {
    setMostrarCamposAdicionales(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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
        

        <ExentaCalculator
          importe={importe}
          fechaInicioLaboral={fechaInicioLaboral}
          fechaJubilacion={fechaJubilacion}
          dias={dias}
          suspension1={suspension1}
          suspension2={suspension2}
          setParteExenta={setParteExenta}
          onCalcular={handleCalcularExenta}
        />

        {mostrarCamposAdicionales && (
          <>
            <InputField label="Edad actual" value={edad} onChangeText={setEdad} keyboardType='numeric' />
            <InputField label="Grado de minusvalía" value={minusvalia} onChangeText={setMinusvalia} keyboardType='numeric' />

            <DevolucionCalculator
              importe={importe}
              parteExenta={parteExenta}
              edad={edad}
              minusvalia={minusvalia}
              setDevolucion={setDevolucion}
            />

            <ResultDisplay label="Parte exenta" result={parteExenta} />
            <ResultDisplay label="Devolución" result={devolucion} />
          </>
        )}

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
  formContainer: {
    marginTop: 50,
    paddingBottom: 20,
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  asterisk: {
    fontSize: 15,
    color: 'red',
    marginLeft: 20,
    fontWeight: 'bold',
    padding:20,
  },
});
