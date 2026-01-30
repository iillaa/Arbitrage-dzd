// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, 
  KeyboardAvoidingView, Platform, Alert, StatusBar 
} from 'react-native';
import AppInput from '../components/AppInput';
import ResultCard from '../components/ResultCard';
import { calculateArbitrage } from '../utils/calculations';
import { saveSettings, loadSettings } from '../utils/storage';

export default function HomeScreen() {
  const [inputs, setInputs] = useState({
    pUsdDzd: '', pEurDzd: '', eurOfferAmount: '100',
    wiseConvert: '100', wiseReceive: '115.34', fee: '0'
  });
  const [result, setResult] = useState(null);

  // Charger les données au démarrage
  useEffect(() => {
    loadSettings().then(data => {
      if (data) setInputs(prev => ({ ...prev, ...data }));
    });
  }, []);

  const handleChange = (name, value) => {
    setInputs(prev => {
      const next = { ...prev, [name]: value };
      // Sauvegarde automatique des réglages 'constants' (pas les prix du marché)
      if (['wiseConvert', 'wiseReceive', 'fee'].includes(name)) {
         saveSettings({ wiseConvert: next.wiseConvert, wiseReceive: next.wiseReceive, fee: next.fee });
      }
      return next;
    });
    if (result) setResult(null);
  };

  const handlePressCalculate = () => {
    const res = calculateArbitrage(inputs);
    if (!res) {
      Alert.alert("Données manquantes", "Veuillez remplir tous les champs.");
      return;
    }
    setResult(res);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>Arbitrage DZD</Text>

        <Section title="MARCHÉ PARALLÈLE">
          <View style={styles.row}>
            <AppInput label="1 USD (DZD)" value={inputs.pUsdDzd} onChangeText={t => handleChange('pUsdDzd', t)} placeholder="245" />
            <AppInput label="1 EUR (DZD)" value={inputs.pEurDzd} onChangeText={t => handleChange('pEurDzd', t)} placeholder="282" />
          </View>
          <AppInput label="Montant Achat (EUR)" value={inputs.eurOfferAmount} onChangeText={t => handleChange('eurOfferAmount', t)} fullWidth />
        </Section>

        <Section title="SIMULATION WISE">
          <View style={styles.row}>
            <AppInput label="Envoi (EUR)" value={inputs.wiseConvert} onChangeText={t => handleChange('wiseConvert', t)} />
            <AppInput label="Reçu (USD)" value={inputs.wiseReceive} onChangeText={t => handleChange('wiseReceive', t)} />
          </View>
          <AppInput label="Frais Fixes (EUR)" value={inputs.fee} onChangeText={t => handleChange('fee', t)} fullWidth />
        </Section>

        <TouchableOpacity style={styles.btn} onPress={handlePressCalculate}>
          <Text style={styles.btnText}>CALCULER</Text>
        </TouchableOpacity>

        <ResultCard result={result} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Petit composant interne pour le style des sections
const Section = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  scroll: { padding: 20, paddingBottom: 40 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginVertical: 20 },
  card: { backgroundColor: '#1e293b', borderRadius: 12, padding: 16, marginBottom: 16 },
  cardTitle: { color: '#64748b', fontSize: 12, fontWeight: 'bold', marginBottom: 12, letterSpacing: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  btn: { backgroundColor: '#3b82f6', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
