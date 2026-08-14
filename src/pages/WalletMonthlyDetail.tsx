import { useEffect } from "react";
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

export const WalletMonthlyDetail = () => {
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
      <div className="p-6 text-center text-slate-400">
        Cüzdan bilgisi bulunamadı.
      </div>
    );
  }

  const net = currentBreakdown ? currentBreakdown.totalIncome - currentBreakdown.totalExpense : 0;

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
          {monthNames[parsedMonth - 1]} {parsedYear} Özeti
        </h1>
        <p className="text-xs text-slate-500">{wallet.name} ({wallet.currency})</p>
      </div>

      {/* Özet Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#04110d]/60 border border-emerald-950/50">
          <span className="text-xs text-slate-500 uppercase font-bold">Toplam Gelir</span>
          <div className="text-xl font-black text-emerald-400 mt-1">
            +{currentBreakdown?.totalIncome.toLocaleString('tr-TR') || 0} {currencySymbols[wallet.currency]}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#04110d]/60 border border-emerald-950/50">
          <span className="text-xs text-slate-500 uppercase font-bold">Toplam Gider</span>
          <div className="text-xl font-black text-rose-400 mt-1">
            -{currentBreakdown?.totalExpense.toLocaleString('tr-TR') || 0} {currencySymbols[wallet.currency]}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#04110d]/60 border border-emerald-950/50">
          <span className="text-xs text-slate-500 uppercase font-bold">Aylık Net Durum</span>
          <div className={`text-xl font-black mt-1 ${net >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {net >= 0 ? '+' : ''}{net.toLocaleString('tr-TR')} {currencySymbols[wallet.currency]}
          </div>
        </div>
      </div>

      {/* İlerleyen aşamalarda bu aya ait işlemler buraya eklenebilir */}
      <div className="card-premium border border-emerald-950/40 p-8 text-center rounded-3xl bg-[#04110d]/40">
        <p className="text-sm text-slate-400">
          {monthNames[parsedMonth - 1]} {parsedYear} dönemine ait detaylı işlem listesi yakında burada listelenecektir.
        </p>
      </div>
    </div>
  );
};