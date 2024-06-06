import React, { useState } from 'react';
import { View, Button, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import InputField from '../InputField';
import DateInput from '../FechaInput';
import AvisoVida from '../Avisos/AvisoVida';
import AvisoDiasCotizados from '../Avisos/AvisoDiasCotizados';
import { useNavigation } from '@react-navigation/native';
//import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

export default function MainScreen({ navigation }) {
  const [importe, setImporte] = useState('');
  const [fechaInicioLaboral, setFechaInicioLaboral] = useState('');
  const [fechaJubilacion, setFechaJubilacion] = useState('');
  const [dias, setDias] = useState('');
  const [suspension1, setSuspension1] = useState('');
  const [suspension2, setSuspension2] = useState('');
  const [showAvisoVida, setShowAvisoVida] = useState(false);
  const [showAvisoDias, setShowAvisoDias] = useState(false);
  //const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-6921150380725872/8959961143';
  const handleCalcularExenta = () => {
    // Reemplazar comas por puntos en el importe
    const importeConPunto = importe.replace(',', '.');
    navigation.navigate('ExentaResult', {
      importe: importeConPunto,
      fechaInicioLaboral,
      fechaJubilacion,
      dias,
      suspension1,
      suspension2,
    });
  };

  const handleImporteChange = (text) => {
    // Reemplazar comas por puntos en tiempo real
    const textConPunto = text.replace(',', '.');
    setImporte(textConPunto);
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
        <InputField
          label="IMPORTE ANUAL DE LA PENSIÓN "
          value={importe}
          onChangeText={handleImporteChange}
          keyboardType='numeric'
          style={styles.highlightedInput}
        />
        <DateInput 
          label="FECHA INICIO VIDA LABORAL" 
          value={fechaInicioLaboral} 
          onChangeText={setFechaInicioLaboral} 
          style={styles.highlightedInput}
        />
        <DateInput 
          label="FECHA DE JUBILACION" 
          value={fechaJubilacion} 
          onChangeText={setFechaJubilacion} 
          style={styles.highlightedInput}
        />
        <View style={styles.inputContainer}>
          <InputField label="Dias de cotización " value={dias} onChangeText={setDias} keyboardType='numeric' />
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
      {/*<BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
  />*/}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fffdf1',
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
    marginTop: 30,
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
  highlightedInput: {
    backgroundColor: '#eeffd1', // Color de fondo más fuerte
    borderRadius: 5,
    padding: 10,
  },
});
