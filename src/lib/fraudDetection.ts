// Simulated ML fraud detection engine
// In a real system, this would call a Python ML model API

export interface TransactionInput {
  amount: number;
  time: number; // hour of day 0-23
  merchantCategory: string;
  deviceType: string;
  location: string;
  cardType: string;
  isInternational: boolean;
  previousFrauds: number;
}

export interface PredictionResult {
  isFraud: boolean;
  probability: number;
  riskFactors: string[];
  modelUsed: string;
  confidence: number;
}

// Simulated feature weights (mimicking a trained model)
const RISK_WEIGHTS = {
  highAmount: 0.3,
  unusualTime: 0.15,
  riskyCategory: 0.15,
  unknownDevice: 0.1,
  international: 0.12,
  previousFrauds: 0.18,
};

const RISKY_CATEGORIES = ['electronics', 'jewelry', 'cryptocurrency', 'wire_transfer', 'gambling'];
const RISKY_LOCATIONS = ['unknown', 'vpn', 'tor'];

export function detectFraud(input: TransactionInput): PredictionResult {
  const riskFactors: string[] = [];
  let riskScore = 0;

  // High amount check
  if (input.amount > 5000) {
    riskScore += RISK_WEIGHTS.highAmount * Math.min(input.amount / 10000, 1);
    riskFactors.push(`High transaction amount: $${input.amount.toLocaleString()}`);
  }

  // Unusual time (2am-5am)
  if (input.time >= 2 && input.time <= 5) {
    riskScore += RISK_WEIGHTS.unusualTime;
    riskFactors.push(`Unusual transaction time: ${input.time}:00`);
  }

  // Risky category
  if (RISKY_CATEGORIES.includes(input.merchantCategory)) {
    riskScore += RISK_WEIGHTS.riskyCategory;
    riskFactors.push(`High-risk merchant category: ${input.merchantCategory}`);
  }

  // Unknown device
  if (input.deviceType === 'unknown') {
    riskScore += RISK_WEIGHTS.unknownDevice;
    riskFactors.push('Transaction from unrecognized device');
  }

  // International
  if (input.isInternational) {
    riskScore += RISK_WEIGHTS.international;
    riskFactors.push('International transaction detected');
  }

  // Risky location
  if (RISKY_LOCATIONS.includes(input.location.toLowerCase())) {
    riskScore += 0.15;
    riskFactors.push(`Suspicious location: ${input.location}`);
  }

  // Previous frauds
  if (input.previousFrauds > 0) {
    riskScore += RISK_WEIGHTS.previousFrauds * Math.min(input.previousFrauds / 3, 1);
    riskFactors.push(`${input.previousFrauds} previous fraud(s) on account`);
  }

  // Add some randomness to simulate ML model variance
  const noise = (Math.random() - 0.5) * 0.1;
  const finalScore = Math.max(0, Math.min(1, riskScore + noise));

  const isFraud = finalScore > 0.45;

  return {
    isFraud,
    probability: Math.round(finalScore * 100),
    riskFactors: riskFactors.length > 0 ? riskFactors : ['No significant risk factors detected'],
    modelUsed: 'Random Forest Ensemble',
    confidence: Math.round((isFraud ? finalScore : 1 - finalScore) * 100),
  };
}

// Model performance stats (simulated)
export const MODEL_STATS = {
  logisticRegression: { accuracy: 94.2, precision: 91.8, recall: 89.5, f1: 90.6 },
  randomForest: { accuracy: 97.8, precision: 96.3, recall: 95.1, f1: 95.7 },
  decisionTree: { accuracy: 93.1, precision: 90.2, recall: 88.7, f1: 89.4 },
  svm: { accuracy: 95.6, precision: 93.4, recall: 91.2, f1: 92.3 },
};

// Sample transaction history
export const SAMPLE_TRANSACTIONS = [
  { id: 'TXN001', amount: 45.99, time: '14:23', merchant: 'Amazon', status: 'legitimate', score: 8 },
  { id: 'TXN002', amount: 8750.00, time: '03:15', merchant: 'Wire Transfer', status: 'fraud', score: 89 },
  { id: 'TXN003', amount: 120.50, time: '10:45', merchant: 'Walmart', status: 'legitimate', score: 5 },
  { id: 'TXN004', amount: 3200.00, time: '02:30', merchant: 'Crypto Exchange', status: 'fraud', score: 78 },
  { id: 'TXN005', amount: 67.25, time: '16:10', merchant: 'Starbucks', status: 'legitimate', score: 3 },
  { id: 'TXN006', amount: 15000.00, time: '04:00', merchant: 'Jewelry Store', status: 'fraud', score: 95 },
  { id: 'TXN007', amount: 89.99, time: '12:30', merchant: 'Netflix', status: 'legitimate', score: 2 },
  { id: 'TXN008', amount: 4500.00, time: '23:45', merchant: 'Electronics', status: 'fraud', score: 72 },
];

// Chart data
export const FRAUD_DISTRIBUTION = [
  { name: 'Legitimate', value: 98.83, fill: 'hsl(145, 65%, 42%)' },
  { name: 'Fraudulent', value: 1.17, fill: 'hsl(0, 72%, 55%)' },
];

export const MONTHLY_FRAUD_DATA = [
  { month: 'Jan', legitimate: 12450, fraud: 145 },
  { month: 'Feb', legitimate: 11890, fraud: 132 },
  { month: 'Mar', legitimate: 13200, fraud: 178 },
  { month: 'Apr', legitimate: 12800, fraud: 156 },
  { month: 'May', legitimate: 14100, fraud: 189 },
  { month: 'Jun', legitimate: 13500, fraud: 167 },
  { month: 'Jul', legitimate: 15200, fraud: 201 },
  { month: 'Aug', legitimate: 14800, fraud: 195 },
  { month: 'Sep', legitimate: 13900, fraud: 172 },
  { month: 'Oct', legitimate: 14500, fraud: 184 },
  { month: 'Nov', legitimate: 16200, fraud: 223 },
  { month: 'Dec', legitimate: 18900, fraud: 267 },
];

export const FRAUD_BY_CATEGORY = [
  { category: 'Electronics', count: 342 },
  { category: 'Wire Transfer', count: 289 },
  { category: 'Jewelry', count: 234 },
  { category: 'Crypto', count: 198 },
  { category: 'Gambling', count: 156 },
  { category: 'Travel', count: 89 },
  { category: 'Retail', count: 45 },
];
