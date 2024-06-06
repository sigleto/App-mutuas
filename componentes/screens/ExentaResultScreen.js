import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import ResultDisplay from '../ResultDisplay';

//import Anuncio from '../Avisos/Anuncio';

export default function ExentaResultScreen({ route, navigation }) {
  const { importe, fechaInicioLaboral, fechaJubilacion, dias, suspension1, suspension2 } = route.params;
  const [parteExenta, setParteExenta] = useState('');
  const [isNegativeResult, setIsNegativeResult] = useState(false);
 

  useEffect(() => {
    const calcularParteExenta = () => {
      const importeValue = parseFloat(importe);
      const [diaInicio, mesInicio, añoInicio] = fechaInicioLaboral.split('-').map(Number);
      const [diaJubilacion, mesJubilacion, añoJubilacion] = fechaJubilacion.split('-').map(Number);
      const fechaInicioT = new Date(añoInicio, mesInicio - 1, diaInicio);
      const fechaJubilacionT = new Date(añoJubilacion, mesJubilacion - 1, diaJubilacion);
      const diasValue = parseInt(dias);

      if (isNaN(importeValue) || isNaN(fechaInicioT.getTime())) {
        Alert.alert('Por favor, asegúrate de que todos los campos estén llenos.');
        navigation.navigate('Main');
      }

      let diferenciaDiasTotal;
      if (diasValue === 0 || isNaN(diasValue)) {
        const diferenciaMilisegundos = fechaJubilacionT - fechaInicioT;
        diferenciaDiasTotal = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
      } else {
        diferenciaDiasTotal = diasValue;
      }

      let totalDias = diferenciaDiasTotal > 12775 ? 12775 : diferenciaDiasTotal;
      let parteHasta1966 = 0;
      const sesentaysiete = new Date(1967, 0, 1);
      if (fechaInicioT < sesentaysiete) {
        const diferenciaDias1 = Math.ceil((sesentaysiete - fechaInicioT) / (1000 * 60 * 60 * 24));
        const suspension1Value = parseInt(suspension1) || 0;
        parteHasta1966 = importeValue * ((diferenciaDias1 - suspension1Value) / totalDias);
      }

      let parteEntre1967y1978 = 0;
      const setentayocho = new Date(1979, 0, 1);
      let diferenciaDias2;
      if (fechaInicioT > sesentaysiete) {
        diferenciaDias2 = Math.ceil((setentayocho - fechaInicioT) / (1000 * 60 * 60 * 24));
      } else {
        diferenciaDias2 = 4384;
      }
      const suspension2Value = parseInt(suspension2) || 0;
      parteEntre1967y1978 = importeValue * ((diferenciaDias2 - suspension2Value) / totalDias) * 0.25;

      const parteExentaTotal = parteHasta1966 + parteEntre1967y1978;

      if (parteExentaTotal < 0) {
        setParteExenta('El resultado es incongruente. Por favor, revise los datos introducidos.');
        setIsNegativeResult(true);
      } else {
        const cantidadExenta = parteExentaTotal.toFixed(2);
        setParteExenta(`En función de los datos aportados por el usuario, la parte exenta de la pensión para este ejercicio es de ${cantidadExenta} euros`);
        setIsNegativeResult(false);
      }
    };

    calcularParteExenta();
  }, [importe, fechaInicioLaboral, fechaJubilacion, dias, suspension1, suspension2]);

  const handleNext = () => {
    navigation.navigate('DevolucionResultScreen', { importe, parteExenta });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ResultDisplay result={parteExenta} />
      {isNegativeResult ? (
        <Button title="VOLVER" onPress={handleBack} />
      ) : (
        <Button title="SIGUIENTE" onPress={handleNext} />
      )}
    </View>
  );
}
{/*<Anuncio/>*/}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fffdf1'
  },
});

