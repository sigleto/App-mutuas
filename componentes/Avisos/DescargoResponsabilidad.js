import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from "react-navigation-shared-element";

const DescargoResponsabilidad = () => {
  const navegacion = useNavigation();

  const salto = () => {
    navegacion.navigate('Main');
  };

  return (
    <ScrollView style={styles.container}>
      <SharedElement id="elementId">
        <Text style={styles.titulo}>Aviso de Descargo de Responsabilidad:</Text>
        <Text style={styles.parrafo}>
          {`Esta aplicación es una aplicación informativa y de cálculo no oficial.

No representamos ni estamos afiliados a ninguna entidad gubernamental.

La información proporcionada se basa en fuentes públicas y nuestra interpretación de las normativas vigentes.
Fuentes de información:

-  Sentencia 707/2023 de 28 de febrero del Tribunas Supremo.
-  Disposición Transitoria 2ª de la Ley 35/2006 de 28 de    noviembre, del Impuesto sobre la Renta de las Personas Físicas

Bajo ninguna circunstancia, los desarrolladores de esta aplicación se responsabilizan de las consecuencias derivadas del uso de la misma.

Por favor, verifique toda la información con las entidades gubernamentales correspondientes.
Gracias por utilizar nuestra aplicación.`}
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

export default DescargoResponsabilidad