import React from "react";

interface Wallet {
  id: number;
  name: string;
  balance: number;
  currency: string;
}

interface DashboardTasksProps {
  wallets: Wallet[];
  totalNetBalance: number;
  currencySymbols: Record<string, string>;
}

export const DashboardTasks: React.FC<DashboardTasksProps> = ({ wallets, totalNetBalance, currencySymbols }) => {
  return (
    <div className="lg:col-span-2 card-premium p-6 space-y-4">
      <div className="flex justify-between items-center border-b border-emerald-950/40 pb-3">
        <h3 className="text-sm font-bold text-slate-200 tracking-wide">Son İşlemler & Dağılım</h3>
        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md font-semibold">Canlı Veri</span>
      </div>

      <div className="space-y-3">
        {wallets.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-xs text-slate-500">
            Henüz listelenecek bir cüzdan bulunamadı.
          </div>
        ) : (
          wallets.map((wallet) => {
            const ratio = totalNetBalance > 0 ? (wallet.balance / totalNetBalance) * 100 : 0;
            return (
              <div key={wallet.id} className="flex flex-col space-y-1.5 p-3 rounded-xl bg-[#04110d]/40 border border-emerald-950/30 hover:border-emerald-800/20 transition-colors">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-semibold text-slate-200">{wallet.name}</span>
                  </div>
                  <span className="font-bold text-slate-300">
                    {wallet.balance.toLocaleString('tr-TR')} {currencySymbols[wallet.currency] || wallet.currency}
                  </span>
                </div>
                <div className="w-full bg-[#030d0a] h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${ratio}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 px-0.5">
                  <span>Varlık Payı</span>
                  <span>%{ratio.toFixed(1)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};