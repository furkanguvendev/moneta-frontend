import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWalletStore } from "../store/useWalletStore";
import { useAnalyticsStore } from "../store/useAnalyticsStore";

const currencySymbols: Record<string, string> = {
  TRY: '₺',
  USD: '$',
  EUR: '€',
  GBP: '£'
};

const monthNames = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

export const WalletMonthlyDetail: React.FC = () => {
  const { id, year, month } = useParams<{ id: string; year: string; month: string }>();
  const navigate = useNavigate();
  
  const walletId = Number(id);
  const parsedYear = Number(year);
  const parsedMonth = Number(month);

  const { wallets, fetchWallets } = useWalletStore();
  const { monthlyBreakdownList, fetchWalletMonthlyBreakdown } = useAnalyticsStore();

  useEffect(() => {
    if (walletId) {
      fetchWallets();
      fetchWalletMonthlyBreakdown(walletId);
    }
  }, [walletId, fetchWallets, fetchWalletMonthlyBreakdown]);

  const wallet = wallets.find((w) => w.id === walletId);
  const currentBreakdown = monthlyBreakdownList.find(
    (b) => b.year === parsedYear && b.month === parsedMonth
  );

  if (!wallet) {
    return (
      <div className="p-8 bg-[#04110d]/80 border border-emerald-950/40 rounded-2xl text-center max-w-md mx-auto mt-12 space-y-4">
        <p className="text-sm text-slate-400">Cüzdan bilgisi bulunamadı veya erişim yetkiniz yok.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold hover:bg-emerald-500/20 transition-all cursor-pointer"
        >
          Dashboard'a Dön
        </button>
      </div>
    );
  }

  const symbol = currencySymbols[wallet.currency] || wallet.currency;
  const income = currentBreakdown?.totalIncome || 0;
  const expense = currentBreakdown?.totalExpense || 0;
  const net = income - expense;
  const monthName = monthNames[parsedMonth - 1] || `${parsedMonth}. Ay`;

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-emerald-950/40 pb-6">
        <button
          onClick={() => navigate(`/wallets/${walletId}`)}
          className="text-xs text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer w-fit"
        >
          ← Cüzdan Detayına Geri Dön
        </button>
        <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">
          {monthName} {parsedYear} Özeti
        </h1>
        <p className="text-xs text-slate-500">{wallet.name} ({wallet.currency})</p>
      </div>

      {/* Özet Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#04110d]/60 border border-emerald-950/50">
          <span className="text-xs text-slate-500 uppercase font-bold">Toplam Gelir</span>
          <div className="text-xl font-black text-emerald-400 mt-1">
            +{income.toLocaleString('tr-TR')} {symbol}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#04110d]/60 border border-emerald-950/50">
          <span className="text-xs text-slate-500 uppercase font-bold">Toplam Gider</span>
          <div className="text-xl font-black text-rose-400 mt-1">
            -{expense.toLocaleString('tr-TR')} {symbol}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#04110d]/60 border border-emerald-950/50">
          <span className="text-xs text-slate-500 uppercase font-bold">Aylık Net Durum</span>
          <div className={`text-xl font-black mt-1 ${net >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {net >= 0 ? '+' : ''}{net.toLocaleString('tr-TR')} {symbol}
          </div>
        </div>
      </div>

      {/* Gelecek Geliştirmeler İçin Bilgi Alanı */}
      <div className="border border-emerald-950/40 p-8 text-center rounded-3xl bg-[#04110d]/40">
        <p className="text-sm text-slate-400">
          {monthName} {parsedYear} dönemine ait detaylı işlem listesi yakında burada listelenecektir.
        </p>
      </div>
    </div>
  );
};