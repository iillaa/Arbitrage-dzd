// src/utils/calculations.js

export const parseNumber = (v) => {
  if (!v) return 0;
  const clean = String(v).replace(/\s/g, '').replace(',', '.');
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
};

export const calculateArbitrage = (inputs) => {
  const usdRate = parseNumber(inputs.pUsdDzd);
  const eurRate = parseNumber(inputs.pEurDzd);
  const offer = parseNumber(inputs.eurOfferAmount);
  const wiseIn = parseNumber(inputs.wiseConvert);
  const wiseOut = parseNumber(inputs.wiseReceive);
  const fee = parseNumber(inputs.fee);

  if (!usdRate || !eurRate || !offer || !wiseIn || !wiseOut) {
    return null; // Données incomplètes
  }

  const wiseRate = wiseOut / wiseIn;
  const totalCostDZD = (offer + fee) * eurRate;
  const totalUSD = offer * wiseRate; // Les frais sont payés à part en EUR
  const costPerUsdIndirect = totalCostDZD / totalUSD;
  const gainPerUsd = usdRate - costPerUsdIndirect;
  const totalGain = gainPerUsd * totalUSD;

  return {
    mode: costPerUsdIndirect < usdRate ? 'INDIRECT_BETTER' : 'DIRECT_BETTER',
    costDirect: usdRate,
    costIndirect: costPerUsdIndirect,
    totalGain: totalGain,
    breakEven: (usdRate * totalUSD) / (offer + fee),
  };
};
