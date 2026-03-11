import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, BarChart3, CreditCard, Zap } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { PaymentForm } from "@/components/PaymentForm";
import { TransactionTable } from "@/components/TransactionTable";
import { AnalyticsCharts } from "@/components/AnalyticsCharts";

type Tab = 'dashboard' | 'payment' | 'analytics';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: BarChart3 },
    { id: 'payment' as Tab, label: 'Payment Check', icon: CreditCard },
    { id: 'analytics' as Tab, label: 'Model Analytics', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 glow-primary">
              <Shield size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">FraudGuard AI</h1>
              <p className="text-xs font-mono text-muted-foreground">Real-Time Payment Fraud Detection</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-display font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Transactions"
                value="184,293"
                subtitle="+12.5% from last month"
                type="primary"
                icon="activity"
              />
              <StatsCard
                title="Fraud Detected"
                value="2,147"
                subtitle="1.17% fraud rate"
                type="danger"
                icon="alert"
              />
              <StatsCard
                title="Blocked Amount"
                value="$3.2M"
                subtitle="Saved from fraud"
                type="warning"
                icon="shield"
              />
              <StatsCard
                title="Model Accuracy"
                value="97.8%"
                subtitle="Random Forest model"
                type="success"
                icon="check"
              />
            </div>

            {/* Transaction Table */}
            <TransactionTable />
          </motion.div>
        )}

        {activeTab === 'payment' && (
          <motion.div
            key="payment"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto"
          >
            <PaymentForm />
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AnalyticsCharts />
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Index;
