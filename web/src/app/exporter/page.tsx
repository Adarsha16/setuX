"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function ExporterPortal() {
  const { connected } = useWallet();
  const [amount, setAmount] = useState("");
  const [buyer, setBuyer] = useState("");
  const [country, setCountry] = useState("US");
  const [days, setDays] = useState("60");

  if (!connected) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-panel/50 border border-panel p-8 rounded-xl text-center max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold mb-2">Wallet Disconnected</h2>
          <p className="text-text/70 mb-6 font-light">Please connect your wallet containing your KYC credential to access the Exporter Dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-12">
      {/* Sidebar - Submit Invoice */}
      <div className="md:col-span-1 space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-bold">Submit Invoice</h1>
          <p className="text-text/60 text-sm mt-2">Tokenize your trade document for instant USDC financing.</p>
        </div>

        <form className="bg-panel/30 border border-panel p-6 rounded-xl space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-text/60 uppercase tracking-wide">Invoice Amount (USD)</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-background border border-panel rounded-md px-4 py-3 font-mono text-text focus:outline-none focus:border-accent"
              placeholder="e.g. 50000"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-text/60 uppercase tracking-wide">Buyer Name</label>
            <input 
              type="text" 
              value={buyer}
              onChange={(e) => setBuyer(e.target.value)}
              className="w-full bg-background border border-panel rounded-md px-4 py-3 font-mono text-text focus:outline-none focus:border-accent"
              placeholder="e.g. Acme Retail UK"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-text/60 uppercase tracking-wide">Country</label>
              <select 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-background border border-panel rounded-md px-4 py-3 font-mono text-text focus:outline-none focus:border-accent appearance-none"
              >
                <option value="US">USA (US)</option>
                <option value="UK">UK (GB)</option>
                <option value="DE">Germany (DE)</option>
                <option value="IN">India (IN)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-text/60 uppercase tracking-wide">Due In (Days)</label>
              <select 
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full bg-background border border-panel rounded-md px-4 py-3 font-mono text-text focus:outline-none focus:border-accent appearance-none"
              >
                <option value="30">30 Days</option>
                <option value="60">60 Days</option>
                <option value="90">90 Days</option>
              </select>
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <label className="text-xs font-mono text-text/60 uppercase tracking-wide">Upload Document</label>
            <div className="border-2 border-dashed border-panel hover:border-accent/50 transition-colors rounded-md p-6 flex flex-col items-center justify-center cursor-pointer bg-background">
              <Upload className="w-6 h-6 text-text/40 mb-2" />
              <span className="text-sm text-text/60 text-center">PDF or JPEG<br/>Max 5MB</span>
            </div>
          </div>

          <button type="button" className="w-full bg-accent text-background font-bold py-4 rounded-md hover:bg-accent/90 transition-colors mt-4">
            Tokenize & Submit
          </button>
        </form>
      </div>

      {/* Main Content - Active Invoices */}
      <div className="md:col-span-2 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-serif text-2xl font-bold">My Invoices</h2>
            <p className="text-text/60 text-sm mt-1">Track your active and historical financings.</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-mono text-text/60 uppercase">Available USDC</p>
            <p className="font-mono text-2xl text-accent font-bold">$45,200.00</p>
          </div>
        </div>

        <div className="bg-panel/30 border border-panel rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-panel text-xs font-mono text-text/50 uppercase tracking-wider">
                <th className="p-4 font-normal">Invoice ID</th>
                <th className="p-4 font-normal">Buyer</th>
                <th className="p-4 font-normal text-right">Amount</th>
                <th className="p-4 font-normal text-center">Status</th>
                <th className="p-4 font-normal text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-panel">
              {/* Funded Invoice */}
              <tr className="hover:bg-panel/20 transition-colors group">
                <td className="p-4 font-mono text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-text/40" />
                  INV-7829
                </td>
                <td className="p-4 text-sm">
                  Acme Retail UK<br/>
                  <span className="text-xs text-text/50 font-mono">Due: 12 Nov 2026</span>
                </td>
                <td className="p-4 font-mono text-sm text-right">$50,000</td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-green-500/10 text-green-400 border border-green-500/20">
                    <CheckCircle2 className="w-3 h-3" /> Funded
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-xs font-mono bg-panel border border-panel px-3 py-1.5 rounded hover:border-accent text-text transition-colors">
                    Repay
                  </button>
                </td>
              </tr>

              {/* Pending Invoice */}
              <tr className="hover:bg-panel/20 transition-colors group">
                <td className="p-4 font-mono text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-text/40" />
                  INV-7830
                </td>
                <td className="p-4 text-sm">
                  Global Trade GmbH<br/>
                  <span className="text-xs text-text/50 font-mono">Due: 25 Dec 2026</span>
                </td>
                <td className="p-4 font-mono text-sm text-right">$15,500</td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                    <Clock className="w-3 h-3" /> Verifying
                  </span>
                </td>
                <td className="p-4 text-right">
                  <span className="text-xs text-text/40 font-mono">-</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
