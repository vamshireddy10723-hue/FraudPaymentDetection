import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { FRAUD_DISTRIBUTION, MONTHLY_FRAUD_DATA, FRAUD_BY_CATEGORY, MODEL_STATS } from "@/lib/fraudDetection";

export function AnalyticsCharts() {
  const modelData = Object.entries(MODEL_STATS).map(([name, stats]) => ({
    name: name.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()),
    ...stats,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Fraud Distribution Pie */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-5"
      >
        <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
          Transaction Distribution
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={FRAUD_DISTRIBUTION}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              strokeWidth={0}
            >
              {FRAUD_DISTRIBUTION.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'hsl(220, 18%, 10%)',
                border: '1px solid hsl(220, 14%, 18%)',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'JetBrains Mono',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-2">
          {FRAUD_DISTRIBUTION.map(d => (
            <div key={d.name} className="flex items-center gap-2 text-xs">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.fill }} />
              <span className="text-muted-foreground font-mono">{d.name}: {d.value}%</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Monthly Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-5"
      >
        <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
          Monthly Fraud Trends
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={MONTHLY_FRAUD_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
            <XAxis dataKey="month" tick={{ fill: 'hsl(215, 12%, 55%)', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
            <YAxis tick={{ fill: 'hsl(215, 12%, 55%)', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
            <Tooltip
              contentStyle={{
                background: 'hsl(220, 18%, 10%)',
                border: '1px solid hsl(220, 14%, 18%)',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'JetBrains Mono',
              }}
            />
            <Line type="monotone" dataKey="fraud" stroke="hsl(0, 72%, 55%)" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Fraud by Category */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-5"
      >
        <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
          Fraud by Merchant Category
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={FRAUD_BY_CATEGORY} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
            <XAxis type="number" tick={{ fill: 'hsl(215, 12%, 55%)', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
            <YAxis dataKey="category" type="category" tick={{ fill: 'hsl(215, 12%, 55%)', fontSize: 11, fontFamily: 'JetBrains Mono' }} width={100} />
            <Tooltip
              contentStyle={{
                background: 'hsl(220, 18%, 10%)',
                border: '1px solid hsl(220, 14%, 18%)',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'JetBrains Mono',
              }}
            />
            <Bar dataKey="count" fill="hsl(195, 100%, 50%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Model Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-5"
      >
        <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
          ML Model Comparison
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={modelData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
            <XAxis dataKey="name" tick={{ fill: 'hsl(215, 12%, 55%)', fontSize: 9, fontFamily: 'JetBrains Mono' }} />
            <YAxis domain={[85, 100]} tick={{ fill: 'hsl(215, 12%, 55%)', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
            <Tooltip
              contentStyle={{
                background: 'hsl(220, 18%, 10%)',
                border: '1px solid hsl(220, 14%, 18%)',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'JetBrains Mono',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
            <Bar dataKey="accuracy" fill="hsl(195, 100%, 50%)" radius={[2, 2, 0, 0]} />
            <Bar dataKey="precision" fill="hsl(145, 65%, 42%)" radius={[2, 2, 0, 0]} />
            <Bar dataKey="recall" fill="hsl(38, 92%, 50%)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
