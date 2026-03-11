import { motion } from "framer-motion";
import { SAMPLE_TRANSACTIONS } from "@/lib/fraudDetection";
import { Badge } from "@/components/ui/badge";

export function TransactionTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-5"
    >
      <h3 className="text-lg font-display font-semibold text-foreground mb-4">
        Recent Transactions
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-2 text-muted-foreground font-mono text-xs uppercase tracking-wider">ID</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-mono text-xs uppercase tracking-wider">Amount</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-mono text-xs uppercase tracking-wider">Time</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-mono text-xs uppercase tracking-wider">Merchant</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-mono text-xs uppercase tracking-wider">Risk</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-mono text-xs uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_TRANSACTIONS.map((tx, i) => (
              <motion.tr
                key={tx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="border-b border-border/30 hover:bg-secondary/50 transition-colors"
              >
                <td className="py-3 px-2 font-mono text-muted-foreground">{tx.id}</td>
                <td className="py-3 px-2 font-mono text-foreground">${tx.amount.toLocaleString()}</td>
                <td className="py-3 px-2 font-mono text-muted-foreground">{tx.time}</td>
                <td className="py-3 px-2 text-foreground">{tx.merchant}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${tx.score > 50 ? 'bg-fraud' : 'bg-legitimate'}`}
                        style={{ width: `${tx.score}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{tx.score}%</span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <Badge
                    variant={tx.status === 'fraud' ? 'destructive' : 'default'}
                    className={tx.status === 'legitimate' ? 'bg-legitimate/20 text-legitimate border-legitimate/30' : ''}
                  >
                    {tx.status === 'fraud' ? '⚠ Fraud' : '✓ Safe'}
                  </Badge>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
