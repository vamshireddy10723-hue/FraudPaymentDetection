import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { detectFraud, TransactionInput, PredictionResult } from "@/lib/fraudDetection";
import { ResultDisplay } from "@/components/ResultDisplay";

export function PaymentForm() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("12");
  const [category, setCategory] = useState("retail");
  const [device, setDevice] = useState("mobile");
  const [location, setLocation] = useState("domestic");
  const [cardType, setCardType] = useState("visa");
  const [isInternational, setIsInternational] = useState(false);
  const [previousFrauds, setPreviousFrauds] = useState("0");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setResult(null);

    const input: TransactionInput = {
      amount: parseFloat(amount) || 0,
      time: parseInt(time),
      merchantCategory: category,
      deviceType: device,
      location,
      cardType,
      isInternational,
      previousFrauds: parseInt(previousFrauds) || 0,
    };

    // Simulate processing delay
    setTimeout(() => {
      const prediction = detectFraud(input);
      setResult(prediction);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <CreditCard size={22} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-display font-semibold text-foreground">Payment Simulation</h3>
            <p className="text-sm text-muted-foreground">Enter transaction details to check for fraud</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground font-mono text-xs uppercase">Amount ($)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
                min="0.01"
                step="0.01"
                className="bg-secondary border-border font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground font-mono text-xs uppercase">Time (Hour)</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger className="bg-secondary border-border font-mono">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => (
                    <SelectItem key={i} value={String(i)}>{`${i.toString().padStart(2, '0')}:00`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground font-mono text-xs uppercase">Merchant Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-secondary border-border font-mono">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="food">Food & Dining</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="jewelry">Jewelry</SelectItem>
                  <SelectItem value="cryptocurrency">Cryptocurrency</SelectItem>
                  <SelectItem value="wire_transfer">Wire Transfer</SelectItem>
                  <SelectItem value="gambling">Gambling</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground font-mono text-xs uppercase">Device Type</Label>
              <Select value={device} onValueChange={setDevice}>
                <SelectTrigger className="bg-secondary border-border font-mono">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mobile">Mobile Phone</SelectItem>
                  <SelectItem value="desktop">Desktop</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                  <SelectItem value="unknown">Unknown Device</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground font-mono text-xs uppercase">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="bg-secondary border-border font-mono">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                  <SelectItem value="vpn">VPN Detected</SelectItem>
                  <SelectItem value="tor">TOR Network</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground font-mono text-xs uppercase">Card Type</Label>
              <Select value={cardType} onValueChange={setCardType}>
                <SelectTrigger className="bg-secondary border-border font-mono">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visa">Visa</SelectItem>
                  <SelectItem value="mastercard">Mastercard</SelectItem>
                  <SelectItem value="amex">American Express</SelectItem>
                  <SelectItem value="discover">Discover</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Switch checked={isInternational} onCheckedChange={setIsInternational} />
              <Label className="text-sm text-muted-foreground">International Transaction</Label>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-muted-foreground font-mono text-xs">Past Frauds:</Label>
              <Input
                type="number"
                min="0"
                max="10"
                value={previousFrauds}
                onChange={e => setPreviousFrauds(e.target.value)}
                className="w-16 bg-secondary border-border font-mono text-center"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isAnalyzing || !amount}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold text-base py-6"
          >
            <Send size={18} className="mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'Make Payment — Run Fraud Check'}
          </Button>
        </form>
      </motion.div>

      <ResultDisplay result={result} isAnalyzing={isAnalyzing} />
    </div>
  );
}
