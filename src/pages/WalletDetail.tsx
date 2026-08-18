import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWalletStore } from "../store/useWalletStore";
import { useTransactionStore } from "../store/useTransactionStore";
import { useInvestmentStore } from "../store/useInvestmentStore";
import { useAuthStore } from "../store/useAuthStore";
import { useAnalyticsStore } from "../store/useAnalyticsStore";
import { TransactionModal } from "../components/TransactionModal";
import { InvestmentPage } from "./InvestmentPage";
import { MonthlyCard } from "../components/MonthlyCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { TransactionRequest } from "../services/transactionService";

const currencySymbols: Record<string, string> = {
  TRY: '₺',
  USD: '$',
  EUR: '€',
  GBP: '£'
};

export const WalletDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const walletId = Number(id);

  const user = useAuthStore((state) => state.user);
  const currentUserId = user?.id || 0;

  const { wallets, fetchWallets } = useWalletStore();
  const { transactions, isLoading, error, fetchTransactions, addTransaction, deleteTransaction } = useTransactionStore();
  const { simulations, fetchSimulations } = useInvestmentStore();
  
  // Analytics Store
  const { monthlyBreakdownList, fetchWalletMonthlyBreakdown } = useAnalyticsStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);

  useEffect(() => {
    if (walletId && currentUserId) {
      fetchWallets();
      fetchTransactions(walletId);
      fetchSimulations(currentUserId);
      fetchWalletMonthlyBreakdown(walletId);
    }
  }, [walletId, currentUserId, fetchWallets, fetchTransactions, fetchSimulations, fetchWalletMonthlyBreakdown]);

  const wallet = wallets.find((w) => w.id === walletId);
  const walletSimulations = simulations.filter((s) => s.walletId === walletId);

  const totalIncome = transactions
    .filter((t) => t.transactionType === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.transactionType === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const chartData = [
    { name: "Gelir", value: totalIncome },
    { name: "Gider", value: totalExpense },
  ];

  const COLORS = ["#10b981", "#f43f5e"];

  const handleSaveTransaction = async (data: TransactionRequest) => {
    await addTransaction(data);
    fetchWallets(); 
    fetchWalletMonthlyBreakdown(walletId);
  };

  const handleDeleteTransaction = async (transactionId: number) => {
    if (window.confirm("Bu işlemi silmek istediğinize emin misiniz?")) {
      await deleteTransaction(transactionId, walletId);
      fetchWallets();
      fetchWalletMonthlyBreakdown(walletId);
    }
  };

  if (isLoading && transactions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="text-emerald-400 text-sm font-medium">Cüzdan ve işlemler yükleniyor...</span>
      </div>
    );
  }

  if (error || !wallet) {
    return (
      <div className="p-6 bg-[#04110d]/80 border border-rose-500/20 rounded-2xl text-center max-w-md mx-auto mt-12">
        <span className="text-xs text-rose-400 font-medium block mb-4">
          {error || "Cüzdan bulunamadı veya bu cüzdana erişim yetkiniz yok!"}
        </span>
        <button 
          onClick={() => navigate("/dashboard")} 
          className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-xl text-xs font-bold cursor-pointer transition-all"
        >
          Dashboard'a Dön
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-emerald-950/40 pb-6">
        <div>
          <button 
            onClick={() => navigate("/dashboard")} 
            className="text-xs text-emerald-400 hover:text-emerald-300 font-bold transition-colors mb-2 block cursor-pointer"
          >
            ← Hesaplarıma Geri Dön
          </button>
          <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">{wallet.name}</h1>
          <p className="text-xs text-slate-500 mt-1">Hesap Türü: {wallet.currency} Cüzdanı</p>
        </div>

        <div className="bg-[#0b3324]/30 border border-emerald-500/20 rounded-2xl p-4 min-w-[200px] text-right">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400/50">Güncel Bakiye</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            {wallet.balance.toLocaleString('tr-TR')} {currencySymbols[wallet.currency] || wallet.currency}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Kolon */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Aktif Yatırımlar */}
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-lg font-bold text-slate-200 tracking-wide">Aktif Yatırımlar</h2>
              <span className="text-xs text-emerald-400 font-semibold">{walletSimulations.length} Yatırım</span>
            </div>

            {walletSimulations.length === 0 ? (
              <div className="p-4 rounded-2xl bg-[#04110d]/20 border border-emerald-950/30 text-xs text-slate-500">
                Bu cüzdana bağlı henüz aktif bir yatırım simülasyonu yok.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {walletSimulations.map((sim) => (
                  <div key={sim.id} className="p-4 rounded-2xl bg-[#04110d]/60 border border-emerald-950/50 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {sim.investmentType}
                      </span>
                      <div className="text-base font-black text-white mt-2">
                        {sim.amount.toLocaleString('tr-TR')} {currencySymbols[wallet.currency] || wallet.currency}
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Giriş: {sim.entryValue}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsInvestmentModalOpen(true)}
                      className="px-3 py-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-xl transition cursor-pointer"
                    >
                      Yönet / Boz
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Aylık Bütçe Dökümü */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-200 tracking-wide px-1">Aylık Bütçe Dökümü</h2>
            
            {monthlyBreakdownList.length === 0 ? (
              <div className="p-4 rounded-2xl bg-[#04110d]/20 border border-emerald-950/30 text-xs text-slate-500">
                Aylık özet verisi bulunamadı.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {monthlyBreakdownList.map((item, idx) => (
                  <MonthlyCard
                    key={idx}
                    year={item.year}
                    month={item.month}
                    totalIncome={item.totalIncome}
                    totalExpense={item.totalExpense}
                    currencySymbol={currencySymbols[wallet.currency] || wallet.currency}
                    onClick={() => navigate(`/wallets/${walletId}/month/${item.year}/${item.month}`)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Son Hesap Hareketleri */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-200 tracking-wide px-1">Son Hesap Hareketleri</h2>
            
            {transactions.length === 0 ? (
              <div className="border-dashed border-2 border-emerald-500/10 p-8 rounded-3xl text-center min-h-[200px] flex flex-col items-center justify-center bg-[#04110d]/20">
                <p className="text-emerald-400/60 font-medium text-sm">Bu cüzdana ait henüz bir harcama veya gelir kaydı bulunmuyor.</p>
                <p className="text-xs text-slate-600 mt-1">İşlem eklemek için sağ paneli kullanabilirsiniz.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {transactions.map((tx) => (
                  <div key={tx.id} className="group flex justify-between items-center p-4 rounded-2xl bg-[#04110d]/40 border border-emerald-950/40 hover:border-emerald-800/20 transition-all">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">{tx.description || "Açıklama Belirtilmemiş"}</span>
                        {tx.categoryName && (
                          <span className="text-[10px] bg-zinc-900 text-slate-400 px-2 py-0.5 rounded-md border border-emerald-950/40">{tx.categoryName}</span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 block">{new Date(tx.transactionDate).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-black ${tx.transactionType === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {tx.transactionType === 'INCOME' ? '+' : '-'} {tx.amount.toLocaleString('tr-TR')} {currencySymbols[wallet.currency] || wallet.currency}
                      </span>
                      <button
                        onClick={() => handleDeleteTransaction(tx.id)}
                        className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer text-xs p-1"
                        title="İşlemi Sil"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sağ Kolon (Eylemler & Grafikler) */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-200 tracking-wide px-1">İşlemler</h2>
            <div className="bg-gradient-to-br from-[#0b3324]/20 to-transparent p-6 space-y-3 rounded-3xl border border-emerald-950/40">
              <p className="text-xs text-slate-400 leading-relaxed">
                Bu cüzdana anlık olarak yeni gelir/gider ekleyin veya simüle edilmiş yatırım başlatın.
              </p>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
              >
                + Yeni İşlem Ekle
              </button>

              <button 
                onClick={() => setIsInvestmentModalOpen(true)}
                className="w-full py-3 bg-emerald-950/50 hover:bg-emerald-900/40 text-emerald-400 border border-emerald-500/20 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                📈 Yatırım Simülasyonu
              </button>
            </div>
          </div>

          {(totalIncome > 0 || totalExpense > 0) && (
            <div className="p-6 bg-[#04110d]/40 border border-emerald-950/40 rounded-3xl space-y-4">
              <h3 className="text-xs font-bold text-slate-400 tracking-wide uppercase">Varlık Dağılımı</h3>
              <div className="h-44 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.filter(d => d.value > 0)}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {chartData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#03140f", borderColor: "#064e3b", borderRadius: "12px" }}
                      itemStyle={{ color: "#fff", fontSize: "12px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute text-center pointer-events-none mb-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Net Durum</span>
                  <span className={`text-sm font-black ${(totalIncome - totalExpense) >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {(totalIncome - totalExpense).toLocaleString("tr-TR")} {currencySymbols[wallet.currency] || wallet.currency}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 text-xs border-t border-emerald-950/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-slate-400 font-medium">Gelir</span>
                  </div>
                  <strong className="text-white">{totalIncome.toLocaleString("tr-TR")} {currencySymbols[wallet.currency] || wallet.currency}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="text-slate-400 font-medium">Gider</span>
                  </div>
                  <strong className="text-white">{totalExpense.toLocaleString("tr-TR")} {currencySymbols[wallet.currency] || wallet.currency}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        walletId={walletId}
        onSave={handleSaveTransaction}
      />

      {isInvestmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-[#03140f] border border-emerald-950/60 rounded-3xl p-6 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsInvestmentModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold p-2 cursor-pointer z-10"
            >
              ✕
            </button>
            <InvestmentPage initialWalletId={walletId} />
          </div>
        </div>
      )}
    </div>
  );
};