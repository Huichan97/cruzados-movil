import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Alimentos() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Página de Alimentos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20 },
});
