// src/components/AppInput.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function AppInput({ label, value, onChangeText, placeholder, fullWidth = false }) {
  return (
    <View style={[styles.container, fullWidth ? styles.full : styles.half]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  half: { width: '48%' },
  full: { width: '100%' },
  label: { color: '#94a3b8', fontSize: 12, marginBottom: 6, fontWeight: '600' },
  input: {
    backgroundColor: '#334155',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#475569',
  },
});
