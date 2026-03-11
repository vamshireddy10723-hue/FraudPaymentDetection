import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { PredictionResult } from "@/lib/fraudDetection";

interface ResultDisplayProps {
  result: PredictionResult | null;
  isAnalyzing: boolean;
}

export function ResultDisplay({ result, isAnalyzing }: ResultDisplayProps) {
  if (isAnalyzing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-8 text-center glow-primary"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-4"
        >
          <Shield size={48} className="text-primary" />
        </motion.div>
        <p className="text-lg font-display font-semibold text-foreground">Analyzing Transaction...</p>
        <p className="text-sm text-muted-foreground mt-1 font-mono">Running ML fraud detection models</p>
        <div className="mt-4 flex justify-center gap-1">
          {[0, 1, 2, 3, 4].map(i => (
            <motion.div
              key={i}
              animate={{ scaleY: [1, 2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              className="w-1 h-4 bg-primary rounded-full"
            />
          ))}
        </div>
      </motion.div>
    );
  }

  if (!result) return null;

  const isFraud = result.isFraud;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isFraud ? 'fraud' : 'safe'}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`glass-card p-6 ${isFraud ? 'glow-fraud border-fraud/40' : 'glow-safe border-legitimate/40'}`}
      >
        <div className="flex items-center gap-3 mb-4">
          {isFraud ? (
            <div className="p-3 rounded-full bg-fraud/20">
              <XCircle size={32} className="text-fraud" />
            </div>
          ) : (
            <div className="p-3 rounded-full bg-legitimate/20">
              <CheckCircle size={32} className="text-legitimate" />
            </div>
          )}
          <div>
            <h3 className={`text-xl font-display font-bold ${isFraud ? 'text-fraud' : 'text-legitimate'}`}>
              {isFraud ? '🚫 Payment Blocked — Fraud Detected' : '✅ Payment Approved — Legitimate'}
            </h3>
            <p className="text-sm text-muted-foreground font-mono">
              Model: {result.modelUsed} | Confidence: {result.confidence}%
            </p>
          </div>
        </div>

        {/* Probability meter */}
        <div className="mb-4">
          <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1">
            <span>Fraud Probability</span>
            <span>{result.probability}%</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.probability}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${
                result.probability > 70 ? 'bg-fraud' :
                result.probability > 40 ? 'bg-warning' : 'bg-legitimate'
              }`}
            />
          </div>
        </div>

        {/* Risk factors */}
        <div>
          <h4 className="text-sm font-display font-semibold text-foreground mb-2 flex items-center gap-2">
            <AlertTriangle size={14} className="text-warning" />
            Risk Analysis
          </h4>
          <ul className="space-y-1">
            {result.riskFactors.map((factor, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-sm text-muted-foreground font-mono flex items-center gap-2"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isFraud ? 'bg-fraud' : 'bg-legitimate'}`} />
                {factor}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
