import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ResultDisplay = ({ result }) => {
  // Usamos una expresión regular para encontrar números en el resultado
  const parts = result.split(/(\d+\.?\d*)/);

  return (
    <Text style={styles.result}>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <Text key={index} style={styles.number}>
            {part}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  );
};

const styles = StyleSheet.create({
  result: {
    marginTop: 20,
    fontSize: 25,
    color: 'olive',
    textAlign: 'center',
    marginBottom: 30,
  },
  number: {
    color: 'red',
  },
});

export default ResultDisplay;
