"use client";

import { AlertCircle, Shield, TrendingUp, Lock } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function LPMarketplace() {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-panel/50 border border-panel p-8 rounded-xl text-center max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold mb-2">Wallet Disconnected</h2>
          <p className="text-text/70 mb-6 font-light">Please connect your wallet containing your KYC credential to access the LP Marketplace.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-serif text-4xl font-bold">Liquidity Provider</h1>
          <p className="text-text/60 mt-2">Fund verified trade invoices and earn sustainable real-world yield.</p>
        </div>
        <div className="bg-panel/30 border border-panel px-6 py-4 rounded-xl flex gap-8">
          <div>
            <p className="text-xs font-mono text-text/60 uppercase">Portfolio APY</p>
            <p className="font-mono text-2xl text-accent font-bold mt-1">11.4%</p>
          </div>
          <div>
            <p className="text-xs font-mono text-text/60 uppercase">Total Deployed</p>
            <p className="font-mono text-2xl text-text font-bold mt-1">$25,000</p>
          </div>
        </div>
      </div>

      {/* Invoice Market */}
      <div className="space-y-4">
        <h2 className="font-serif text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-accent" /> Active Market
        </h2>

        <div className="bg-panel/30 border border-panel rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-panel text-xs font-mono text-text/50 uppercase tracking-wider bg-background/50">
                <th className="p-4 font-normal">Asset / Origin</th>
                <th className="p-4 font-normal">Destination</th>
                <th className="p-4 font-normal text-right">Size (USDC)</th>
                <th className="p-4 font-normal text-center">Risk Tier</th>
                <th className="p-4 font-normal text-right">APY</th>
                <th className="p-4 font-normal text-right">Tenor</th>
                <th className="p-4 font-normal text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-panel">
              {/* Invoice 1 */}
              <tr className="hover:bg-panel/20 transition-colors">
                <td className="p-4">
                  <span className="font-mono text-sm">Pashmina Export</span><br/>
                  <span className="text-xs text-text/50">KTM, Nepal</span>
                </td>
                <td className="p-4">
                  <span className="font-mono text-sm">Acme Retail</span><br/>
                  <span className="text-xs text-text/50">LDN, UK</span>
                </td>
                <td className="p-4 font-mono text-sm text-right">$15,000</td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    TIER A
                  </span>
                </td>
                <td className="p-4 font-mono text-sm text-right text-green-400">8.0%</td>
                <td className="p-4 font-mono text-sm text-right">45 Days</td>
                <td className="p-4 text-right">
                  <button className="text-xs font-bold bg-accent text-background px-4 py-2 rounded hover:bg-accent/90 transition-colors">
                    Fund
                  </button>
                </td>
              </tr>

              {/* Invoice 2 */}
              <tr className="hover:bg-panel/20 transition-colors">
                <td className="p-4">
                  <span className="font-mono text-sm">Handicrafts</span><br/>
                  <span className="text-xs text-text/50">KTM, Nepal</span>
                </td>
                <td className="p-4">
                  <span className="font-mono text-sm">Boutique Store</span><br/>
                  <span className="text-xs text-text/50">BER, DE</span>
                </td>
                <td className="p-4 font-mono text-sm text-right">$8,500</td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                    TIER B
                  </span>
                </td>
                <td className="p-4 font-mono text-sm text-right text-green-400">12.0%</td>
                <td className="p-4 font-mono text-sm text-right">60 Days</td>
                <td className="p-4 text-right">
                  <button className="text-xs font-bold bg-accent text-background px-4 py-2 rounded hover:bg-accent/90 transition-colors">
                    Fund
                  </button>
                </td>
              </tr>
              
              {/* Invoice 3 */}
              <tr className="hover:bg-panel/20 transition-colors">
                <td className="p-4">
                  <span className="font-mono text-sm">Carpets</span><br/>
                  <span className="text-xs text-text/50">PKR, Nepal</span>
                </td>
                <td className="p-4">
                  <span className="font-mono text-sm">Unknown Buyer</span><br/>
                  <span className="text-xs text-text/50">DBX, UAE</span>
                </td>
                <td className="p-4 font-mono text-sm text-right">$45,000</td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                    TIER C
                  </span>
                </td>
                <td className="p-4 font-mono text-sm text-right text-green-400">18.0%</td>
                <td className="p-4 font-mono text-sm text-right">90 Days</td>
                <td className="p-4 text-right">
                  <button className="text-xs font-bold bg-panel border border-panel text-text/50 px-4 py-2 rounded cursor-not-allowed flex items-center justify-end gap-2 ml-auto">
                    <Lock className="w-3 h-3" /> KYC Req.
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
