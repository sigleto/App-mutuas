import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ResultDisplay = ({ result }) => {
  return <Text style={styles.result}>{result}</Text>;
};

const styles = StyleSheet.create({
  result: {
    marginTop: 20,
    fontSize: 25,
    color:'olive',
  },
});

export default ResultDisplay;
