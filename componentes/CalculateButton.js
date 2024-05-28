import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const CalculateButton = ({ title, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title={title} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
  },
});

export default CalculateButton;
