import React from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from "react-navigation-shared-element";

const Normativa = () => {
  const navegacion = useNavigation();

  const salto = () => {
    navegacion.goBack();
  };

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <SharedElement id="elementId">
        <Text style={styles.titulo}>Normativa aplicable:</Text>
        <Text style={styles.parrafo}>
          {`Disposición Transitoria Segunda (DT 2ª):
          Esta disposición permite reducir la cantidad a incluir como rendimiento del trabajo en la declaración de la renta cuando se perciben pensiones de jubilación o invalidez por aquellos mutualistas cuyas aportaciones no pudieron ser objeto de reducción o minoración en la base imponible en su momento. La DT 2ª se aplica según las sentencias del Tribunal Supremo, especialmente las de febrero de 2023 y enero de 2024.`}
        </Text>
        <Text style={styles.parrafo}>
          {`Sentencia del Tribunal Supremo (2023): La sentencia 707/2023 del Tribunal Supremo ha reconocido el derecho de pensionistas que cotizaron en antiguas mutuas laborales a recuperar parte de las cuotas declaradas en la tributación al IRPF entre el 1 de enero de 1967 y el 31 de diciembre de 1978.`}
        </Text>
        <Text style={styles.enlace} onPress={() => openLink('https://www.muface.es/muface_Home/muface_comunicacion/hemeroteca-noticias/2024/Febrero-2024/Reclamaciones-ante-la-AEAT--pensionistas-de-antiguas-mutualidades.html')}>
          https://www.muface.es/muface_Home/muface_comunicacion/hemeroteca-noticias/2024/Febrero-2024/Reclamaciones-ante-la-AEAT--pensionistas-de-antiguas-mutualidades.html
        </Text>
        <Text style={styles.parrafo}>
          {`Aportaciones a mutualidades laborales: Las aportaciones a mutualidades laborales realizadas antes de 1978 pueden ser objeto de reducción en la base imponible del IRPF. La reducción varía según la fecha en la que se realizaron las aportaciones. Por ejemplo, las aportaciones anteriores a 1967 no tributan, mientras que las realizadas entre 1967 y 1978 tributan solo el 75%.`}
        </Text>
        <Text style={styles.enlace} onPress={() => openLink('https://sede.agenciatributaria.gob.es/Sede/irpf/mutualistas-solicitudes-devolucion/preguntas-frecuentes.html')}>
          https://sede.agenciatributaria.gob.es/Sede/irpf/mutualistas-solicitudes-devolucion/preguntas-frecuentes.html
        </Text>
      </SharedElement>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={salto}>
          <Text style={styles.buttonText}>SALTAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Color de fondo
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 40,
    color: '#007BFF', // Color del título
  },
  parrafo: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 16,
    color: '#333', // Color del texto
  },
  enlace: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 16,
    color: '#007BFF', // Color del texto de enlace
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
  skipButton: {
    backgroundColor: '#007BFF', // Color del botón
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff', // Color del texto del botón
    fontSize: 16,
  },
});

export default Normativa;
