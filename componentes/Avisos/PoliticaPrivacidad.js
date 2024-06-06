import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from "react-navigation-shared-element";

const PoliticaPrivacidad = () => {
  const navegacion = useNavigation();

  const salto = () => {
    navegacion.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <SharedElement id="elementId">
        <Text style={styles.titulo}>Política de privacidad:</Text>
        <Text style={styles.parrafo}>
          {`Se ha construido la aplicación Mutualidad Exenta como una aplicación gratuita. Este SERVICIO es proporcionado sin costo alguno y está destinado a ser utilizado tal cual. Esta página se utiliza para informar a los visitantes sobre nuestras políticas con respecto a la recopilación, el uso y la divulgación de Información personal si alguien decide utilizar nuestro Servicio.
          
No se recopila ningún tipo de información personal. No se usará ni compartirá su información con nadie. 

Recopilación y uso de información

No recopilamos la información que tú proporcionas directamente, así como datos generados automáticamente cuando utilizas nuestra Aplicación.

Enlace a la política de privacidad de los proveedores de servicios de terceros utilizados por la aplicación

Proveedores de servicio

Podemos emplear empresas e individuos de terceros debido a las siguientes razones: Para facilitar nuestro Servicio; Para proporcionar el Servicio en nuestro nombre; Para realizar servicios relacionados con el Servicio; o Para ayudarnos a analizar cómo se utiliza nuestro Servicio.

Seguridad

Valoramos tu confianza al proporcionarnos su información personal, por lo que nos esforzamos por utilizar medios comercialmente aceptables para protegerla. Pero recuerda que ningún método de transmisión por Internet, o método de almacenamiento electrónico es 100% seguro y confiable, y no podemos garantizar tu seguridad absoluta.

Enlaces a otros sitios

Este Servicio puede contener enlaces a otros sitios. Si haces clic en un enlace de un tercero, serás dirigido a ese sitio. Ten en cuenta que estos sitios externos no son operados por nosotros. Por lo tanto, te recomendamos encarecidamente que revises la Política de privacidad de estos sitios web. No tenemos control ni asumimos ninguna responsabilidad por el contenido, las políticas de privacidad o las prácticas de los sitios o servicios de terceros.

Privacidad de los niños

Estos Servicios no están dirigidos a personas menores de 13 años. No recopilamos a sabiendas información de identificación personal de niños menores de 13 años. En caso de que descubra que un niño menor de 13 años nos ha proporcionado información personal, la eliminaremos inmediatamente de nuestros servidores. Si usted es padre o tutor y sabe que su hijo nos ha proporcionado información personal, comuníquese con nosotros para que podamos tomar las medidas necesarias.

Cambios a esta Política de privacidad

Podemos actualizar nuestra Política de privacidad de vez en cuando. Por lo tanto, se le recomienda revisar esta página periódicamente para ver si hay cambios. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página. Esta política es efectiva a partir del 2024-02-06

Contáctanos

Si tienes alguna pregunta o sugerencia sobre nuestra Política de Privacidad, no dudes en ponerte en contacto con nosotros en trianabaresapp@gmail.com.`}
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

export default PoliticaPrivacidad;
