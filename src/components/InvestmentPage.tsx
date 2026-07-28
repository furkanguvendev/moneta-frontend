import React, { useEffect, useState } from 'react';
import { useInvestmentStore } from '../store/useInvestmentStore';
import { useWalletStore } from '../store/useWalletStore';
import { useTransactionStore } from '../store/useTransactionStore';
import { useAuthStore } from '../store/useAuthStore';
import type { InvestmentType, InvestmentSimulation } from '../types/investment'; 

interface InvestmentPageProps {
  initialWalletId?: number;
}

export const InvestmentPage: React.FC<InvestmentPageProps> = ({ initialWalletId }) => {
  const user = useAuthStore((state) => state.user);
  const currentUserId = user?.id || 0;

  const { wallets, fetchWallets } = useWalletStore();
  const { addTransaction, fetchTransactions } = useTransactionStore();
  const { simulations, isLoading, error, fetchSimulations, createSimulation, closeSimulation } =
    useInvestmentStore();

  const [selectedWalletId, setSelectedWalletId] = useState<number>(initialWalletId || 0);
  const [amount, setAmount] = useState<string>('');
  const [investmentType, setInvestmentType] = useState<InvestmentType>('FAIZ');
  const [entryValue, setEntryValue] = useState<string>('');

  const [selectedSimId, setSelectedSimId] = useState<number | null>(null);
  const [currentEvValue, setCurrentEvValue] = useState<string>('');

  useEffect(() => {
    if (currentUserId) {
      fetchSimulations(currentUserId);
      if (wallets.length === 0) fetchWallets();
    }
  }, [fetchSimulations, fetchWallets, currentUserId, wallets.length]);

  const activeWalletId = selectedWalletId || initialWalletId || (wallets.length > 0 ? wallets[0].id : 0);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !entryValue || !activeWalletId) return;

    const numericAmount = parseFloat(amount);

    const success = await createSimulation(currentUserId, {
      walletId: activeWalletId,
      amount: numericAmount,
      investmentType,
      entryValue: parseFloat(entryValue),
    });

    if (success) {
      await addTransaction({
        walletId: activeWalletId,
        amount: numericAmount,
        description: `${investmentType} Yatırım Simülasyonu Başlatıldı`,
        transactionType: 'EXPENSE',
        categoryId: 1,
      });

      setAmount('');
      setEntryValue('');
      
      fetchWallets();
      fetchTransactions(activeWalletId);
    }
  };

  const handleClose = async (sim: InvestmentSimulation) => {
    const success = await closeSimulation(sim.id, currentUserId, {
      currentEvValue: currentEvValue ? parseFloat(currentEvValue) : undefined,
    });

    if (success) {
      const returnAmount = sim.amount; 

      await addTransaction({
        walletId: sim.walletId || activeWalletId,
        amount: returnAmount,
        description: `${sim.investmentType} Simülasyonu Kapatıldı`,
        transactionType: 'INCOME',
        categoryId: 1,
      });

      setSelectedSimId(null);
      setCurrentEvValue('');
      
      fetchWallets();
      fetchTransactions(sim.walletId || activeWalletId);
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-emerald-950/40 pb-4">
        <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">Yatırım Simülatörü</h1>
        <p className="text-xs text-slate-500 mt-1">Varlıklarınızı simüle ederek potansiyel getirileri takip edin.</p>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs text-rose-400 font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="card-premium bg-gradient-to-br from-[#0b3324]/20 to-transparent p-6 rounded-3xl border border-emerald-950/40 space-y-4 h-fit">
          <h2 className="text-lg font-bold text-slate-200 tracking-wide">Yeni Simülasyon Başlat</h2>
          
          <form onSubmit={handleCreate} className="space-y-4">
            {!initialWalletId && (
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Kaynak Cüzdan</label>
                <select
                  value={activeWalletId}
                  onChange={(e) => setSelectedWalletId(Number(e.target.value))}
                  className="w-full bg-[#04110d] border border-emerald-950/60 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                >
                  {wallets.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({w.balance.toLocaleString('tr-TR')} {w.currency})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Yatırım Türü</label>
              <select
                value={investmentType}
                onChange={(e) => setInvestmentType(e.target.value as InvestmentType)}
                className="w-full bg-[#04110d] border border-emerald-950/60 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
              >
                <option value="FAIZ">Mevduat Faizi (%)</option>
                <option value="DOLAR">Dolar ($)</option>
                <option value="ALTIN">Altın (Gram)</option>
                <option value="BORSA">Borsa / Hisse</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Yatırılacak Tutar (TL)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Örn: 5000"
                className="w-full bg-[#04110d] border border-emerald-950/60 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                {investmentType === 'FAIZ' ? 'Yıllık Faiz Oranı (%)' : 'Giriş Kuru / Fiyatı (TL)'}
              </label>
              <input
                type="number"
                step="any"
                value={entryValue}
                onChange={(e) => setEntryValue(e.target.value)}
                placeholder={investmentType === 'FAIZ' ? 'Örn: 45' : 'Örn: 32.50'}
                className="w-full bg-[#04110d] border border-emerald-950/60 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/10 disabled:opacity-50"
            >
              {isLoading ? 'İşleniyor...' : 'Simülasyonu Başlat'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-200 tracking-wide px-1">Aktif Simülasyonlar</h2>

          {isLoading && simulations.length === 0 && (
            <div className="text-xs text-emerald-400 font-medium">Yükleniyor...</div>
          )}

          {!isLoading && simulations.length === 0 && (
            <div className="card-premium border-dashed border-2 border-emerald-500/10 p-8 text-center rounded-3xl">
              <p className="text-emerald-400/60 font-medium text-sm">Henüz aktif bir yatırım simülasyonunuz bulunmuyor.</p>
              <p className="text-xs text-slate-600 mt-1">Sol paneli kullanarak yeni bir yatırıma başlayabilirsiniz.</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {simulations.map((sim) => (
              <div
                key={sim.id}
                className="p-5 rounded-2xl bg-[#04110d]/40 border border-emerald-950/40 hover:border-emerald-800/20 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
                      {sim.investmentType}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(sim.startDate).toLocaleDateString('tr-TR')}
                    </span>
                  </div>

                  <div className="pt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Anapara:</span>
                      <strong className="text-slate-200">{sim.amount.toLocaleString('tr-TR')} TL</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Giriş Değeri:</span>
                      <strong className="text-slate-200">{sim.entryValue}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-950/30">
                  {selectedSimId === sim.id ? (
                    <div className="space-y-2">
                      {sim.investmentType !== 'FAIZ' && (
                        <input
                          type="number"
                          step="any"
                          placeholder="Güncel Kur/Fiyat"
                          value={currentEvValue}
                          onChange={(e) => setCurrentEvValue(e.target.value)}
                          className="w-full bg-[#04110d] border border-emerald-950/60 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
                        />
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleClose(sim)}
                          className="flex-1 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Onayla
                        </button>
                        <button
                          onClick={() => setSelectedSimId(null)}
                          className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-slate-300 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          İptal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedSimId(sim.id)}
                      className="w-full py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Simülasyonu Kapat / Boz
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};