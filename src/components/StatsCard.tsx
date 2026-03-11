import { Shield, Activity, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  type: 'primary' | 'success' | 'warning' | 'danger';
  icon: 'shield' | 'activity' | 'alert' | 'check';
}

const icons = {
  shield: Shield,
  activity: Activity,
  alert: AlertTriangle,
  check: CheckCircle,
};

const typeStyles = {
  primary: 'border-primary/30 glow-primary',
  success: 'border-legitimate/30 glow-safe',
  warning: 'border-warning/30',
  danger: 'border-fraud/30 glow-fraud',
};

const iconStyles = {
  primary: 'text-primary',
  success: 'text-legitimate',
  warning: 'text-warning',
  danger: 'text-fraud',
};

export function StatsCard({ title, value, subtitle, type, icon }: StatsCardProps) {
  const Icon = icons[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-5 ${typeStyles[type]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-mono uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold font-display mt-1 text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <div className={`p-2.5 rounded-lg bg-secondary ${iconStyles[type]}`}>
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  );
}
