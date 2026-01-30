// src/components/ResultCard.js
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function ResultCard({ result }) {
  if (!result) return null;

  const isIndirectBetter = result.mode === 'INDIRECT_BETTER';

  return (
    <View style={[styles.card, isIndirectBetter ? styles.bgGreen : styles.bgBlue]}>
      <Text style={styles.title}>
        {isIndirectBetter ? "PASSEZ PAR L'EURO" : "ACHETEZ DU USD DIRECT"}
      </Text>
      <Text style={styles.gain}>
        {result.totalGain > 0 ? '+' : ''}{result.totalGain.toFixed(0)} DZD
      </Text>

      <View style={styles.divider} />

      <Row label="Coût via EUR:" value={`${result.costIndirect.toFixed(2)} DA`} />
      <Row label="Coût Direct:" value={`${result.costDirect.toFixed(2)} DA`} />

      <Text style={styles.breakEven}>
        Rentable si 1€ {'<'} {result.breakEven.toFixed(2)} DA
      </Text>
    </View>
  );
}

const Row = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { padding: 20, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  bgGreen: { backgroundColor: '#059669' },
  bgBlue: { backgroundColor: '#2563eb' },
  title: { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  gain: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', width: '100%', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 8 },
  rowLabel: { color: 'rgba(255,255,255,0.8)' },
  rowValue: { color: '#fff', fontWeight: 'bold', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  breakEven: { color: 'rgba(255,255,255,0.9)', marginTop: 8, fontStyle: 'italic', fontSize: 12 },
});
