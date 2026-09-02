import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWalletStore } from "../store/useWalletStore";
import { useAnalyticsStore } from "../store/useAnalyticsStore";
import { useTransactionStore } from "../store/useTransactionStore";
import { useDebtStore } from "../store/useDebtStore";
import { TransactionModal } from "../components/TransactionModal";
import type { TransactionRequest } from "../services/transactionService";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const syncedKeyRef = useRef<string | null>(null);

  const { wallets, fetchWallets } = useWalletStore();
  const { monthlyBreakdownList, fetchWalletMonthlyBreakdown } = useAnalyticsStore();
  const { 
    transactions, 
    statistics, 
    fetchTransactions, 
    fetchStatistics, 
    addTransaction, 
    deleteTransaction 
  } = useTransactionStore();
  const { createDebt, syncInstallments } = useDebtStore();

  useEffect(() => {
    const key = `${walletId}-${parsedYear}-${parsedMonth}`;
    if (syncedKeyRef.current === key) return;
    syncedKeyRef.current = key;

    const loadMonthData = async () => {
      if (walletId && parsedYear && parsedMonth) {
        await syncInstallments(walletId, parsedYear, parsedMonth);
        fetchWallets();
        fetchWalletMonthlyBreakdown(walletId);
        fetchTransactions(walletId);
        fetchStatistics(walletId);
      }
    };
    loadMonthData();
  }, [walletId, parsedYear, parsedMonth]);

  const wallet = wallets.find((w) => w.id === walletId);
  const currentBreakdown = monthlyBreakdownList.find(
    (b) => b.year === parsedYear && b.month === parsedMonth
  );

  const filteredTransactions = transactions.filter((tx) => {
    if (!tx.transactionDate) return false;
    const date = new Date(tx.transactionDate);
    return date.getFullYear() === parsedYear && date.getMonth() + 1 === parsedMonth;
  });

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

  const handleAddTransaction = async (
    data: TransactionRequest & { paymentMethod: string; installmentCount?: number; transactionDate?: string }
  ) => {
    const isInstallment = data.paymentMethod === "CREDIT_CARD" && (data.installmentCount ?? 1) > 1;

    let success: boolean;

    if (isInstallment) {
      success = await createDebt({
        title: data.description || "Taksitli Harcama",
        totalAmount: data.amount,
        debtType: "KREDI_KARTI_TAKSIDI",
        totalInstallments: data.installmentCount!,
        walletId: walletId,
        categoryId: data.categoryId,
        startDate: data.transactionDate,
      });
    } else {
      success = await addTransaction(data);
    }

    if (success) {
      fetchWallets();
      fetchWalletMonthlyBreakdown(walletId);
      fetchTransactions(walletId);
      fetchStatistics(walletId);
    }
  };

  const handleDeleteTransaction = async (txId: number) => {
    if (window.confirm("Bu işlemi silmek istediğinize emin misiniz?")) {
      const success = await deleteTransaction(txId, walletId);
      if (success) {
        fetchWalletMonthlyBreakdown(walletId);
      }
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-950/40 pb-6">
        <div className="space-y-2">
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

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-950/20 transition-all cursor-pointer w-fit"
        >
          + Yeni İşlem Ekle
        </button>
      </div>

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

      <div className="p-6 rounded-3xl bg-[#04110d]/50 border border-emerald-950/40 space-y-4">
        <h2 className="text-sm font-bold text-white tracking-wide uppercase">Kategori Bazlı Gider Dağılımı</h2>
        {statistics.length === 0 ? (
          <p className="text-xs text-slate-500">Bu cüzdana ait henüz kategori verisi bulunmuyor.</p>
        ) : (
          <div className="space-y-3">
            {statistics.map((stat) => (
              <div key={stat.categoryId} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{stat.categoryName}</span>
                  <span className="text-slate-400">
                    {stat.totalAmount.toLocaleString('tr-TR')} {symbol} (%{stat.percentage.toFixed(1)})
                  </span>
                </div>
                <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-emerald-950/30">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(stat.percentage, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-md font-bold text-white">{monthName} {parsedYear} İşlem Detayları</h2>
        
        {filteredTransactions.length === 0 ? (
          <div className="border border-emerald-950/40 p-8 text-center rounded-3xl bg-[#04110d]/40">
            <p className="text-sm text-slate-400">
              {monthName} {parsedYear} dönemine ait henüz kayıtlı bir işlem bulunmuyor.
            </p>
          </div>
        ) : (
          <div className="bg-[#04110d]/60 border border-emerald-950/50 rounded-2xl overflow-hidden">
            <div className="divide-y divide-emerald-950/40">
              {filteredTransactions.map((tx) => (
                <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-emerald-950/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${tx.transactionType === "INCOME" ? "bg-emerald-400" : "bg-rose-400"}`} />
                    <div>
                      <p className="text-sm font-bold text-white">{tx.description || tx.categoryName}</p>
                      <p className="text-[10px] text-slate-500">
                        {tx.categoryName} • {tx.transactionDate ? new Date(tx.transactionDate).toLocaleDateString('tr-TR') : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-black ${tx.transactionType === "INCOME" ? "text-emerald-400" : "text-rose-400"}`}>
                      {tx.transactionType === "INCOME" ? "+" : "-"}{tx.amount.toLocaleString('tr-TR')} {symbol}
                    </span>
                    <button
                      onClick={() => handleDeleteTransaction(tx.id)}
                      className="text-slate-500 hover:text-rose-400 text-xs transition-colors cursor-pointer px-2 py-1"
                      title="İşlemi Sil"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        walletId={walletId}
        onSave={handleAddTransaction}
      />
    </div>
  );
};