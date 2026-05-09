"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ArrowRight, Globe, Shield, Zap, Activity } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-panel/50">
        <div className="flex items-center gap-2">
          <Globe className="w-8 h-8 text-accent" />
          <span className="font-serif text-2xl font-bold tracking-tight text-text">Setu<span className="text-accent">X</span></span>
        </div>
        <div className="flex gap-6 items-center">
          <Link href="/exporter" className="text-text/80 hover:text-accent transition-colors text-sm font-medium">Exporter Portal</Link>
          <Link href="/lp" className="text-text/80 hover:text-accent transition-colors text-sm font-medium">LP Marketplace</Link>
          <WalletMultiButton className="!bg-panel !hover:bg-panel/80 !transition-colors !rounded-md" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <h1 className="font-serif text-6xl md:text-7xl font-bold leading-tight">
            Bridging <span className="text-accent italic">Global Capital</span> to South Asian Trade.
          </h1>
          <p className="text-xl text-text/70 max-w-xl font-sans font-light leading-relaxed">
            SetuX tokenizes verified export invoices, giving emerging market suppliers instant USDC liquidity while offering global LPs real yield backed by real-world trade.
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="/exporter" className="bg-accent text-background px-8 py-4 rounded-md font-bold hover:bg-accent/90 transition-all flex items-center gap-2">
              Get Financed <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/lp" className="bg-panel border border-accent/20 text-text px-8 py-4 rounded-md font-bold hover:border-accent/50 transition-all">
              Supply Liquidity
            </Link>
          </div>
        </div>
        
        {/* Clean Financial Data Module */}
        <div className="flex-1 w-full bg-panel rounded-xl border border-panel/50 overflow-hidden shadow-lg">
          <div className="bg-background/80 border-b border-panel/50 px-6 py-4 flex justify-between items-center">
            <h3 className="font-mono text-sm uppercase tracking-widest text-text/60 font-semibold">Live Network Activity</h3>
            <span className="flex items-center gap-2 text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Online
            </span>
          </div>
          <div className="p-0">
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-background font-mono text-sm">
                <tr className="hover:bg-background/40 transition-colors">
                  <td className="px-6 py-4 text-text/50">14:02:11</td>
                  <td className="px-6 py-4 text-text/80">KTM → NYC</td>
                  <td className="px-6 py-4 text-right text-text">$45,000</td>
                  <td className="px-6 py-4 text-right text-accent">Funded</td>
                </tr>
                <tr className="hover:bg-background/40 transition-colors">
                  <td className="px-6 py-4 text-text/50">13:45:09</td>
                  <td className="px-6 py-4 text-text/80">KTM → LDN</td>
                  <td className="px-6 py-4 text-right text-text">$12,500</td>
                  <td className="px-6 py-4 text-right text-text/60">Pending</td>
                </tr>
                <tr className="hover:bg-background/40 transition-colors">
                  <td className="px-6 py-4 text-text/50">12:11:04</td>
                  <td className="px-6 py-4 text-text/80">PKR → BER</td>
                  <td className="px-6 py-4 text-right text-text">$8,200</td>
                  <td className="px-6 py-4 text-right text-accent">Funded</td>
                </tr>
                <tr className="hover:bg-background/40 transition-colors">
                  <td className="px-6 py-4 text-text/50">10:30:55</td>
                  <td className="px-6 py-4 text-text/80">KTM → DBX</td>
                  <td className="px-6 py-4 text-right text-text">$115,000</td>
                  <td className="px-6 py-4 text-right text-accent">Repaid</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Analytics Portal (Live Counters) */}
      <section className="w-full bg-panel/20 border-y border-panel/50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-text/60">
              <Activity className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Total Financed</span>
            </div>
            <span className="font-mono text-4xl font-bold text-text">$1,240,500</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-text/60">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Active Invoices</span>
            </div>
            <span className="font-mono text-4xl font-bold text-text">34</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-text/60">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Destinations</span>
            </div>
            <span className="font-mono text-4xl font-bold text-text">8</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-text/60">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Default Rate</span>
            </div>
            <span className="font-mono text-4xl font-bold text-accent">0.00%</span>
          </div>
        </div>
      </section>

      {/* Protocol Health */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-serif text-4xl font-bold">Protocol Health</h2>
          <span className="px-3 py-1 bg-green-500/10 text-green-400 font-mono text-sm border border-green-500/20 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Systems Operational
          </span>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-panel/30 border border-panel p-8 rounded-xl">
            <h3 className="text-text/60 uppercase tracking-wider text-sm font-medium mb-6">Senior Pool (Tier A)</h3>
            <div className="flex justify-between items-end mb-4">
              <span className="font-mono text-5xl font-bold text-text">8.0% <span className="text-xl text-text/50">APY</span></span>
              <span className="font-mono text-text/70">88% Advance</span>
            </div>
            <div className="w-full h-2 bg-background rounded-full overflow-hidden mb-2">
              <div className="w-[75%] h-full bg-accent" />
            </div>
            <div className="flex justify-between text-xs text-text/50 font-mono">
              <span>$75k Deployed</span>
              <span>$100k Cap</span>
            </div>
          </div>

          <div className="bg-panel/30 border border-panel p-8 rounded-xl">
            <h3 className="text-text/60 uppercase tracking-wider text-sm font-medium mb-6">Junior Pool (Tier B/C)</h3>
            <div className="flex justify-between items-end mb-4">
              <span className="font-mono text-5xl font-bold text-text">18.0% <span className="text-xl text-text/50">APY</span></span>
              <span className="font-mono text-text/70">75-83% Advance</span>
            </div>
            <div className="w-full h-2 bg-background rounded-full overflow-hidden mb-2">
              <div className="w-[45%] h-full bg-red-400" />
            </div>
            <div className="flex justify-between text-xs text-text/50 font-mono">
              <span>$45k Deployed</span>
              <span>$100k Cap</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
