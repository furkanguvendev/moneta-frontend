import React, { useEffect, useState } from "react";
import { useDebtStore } from "../store/useDebtStore";
import { useWalletStore } from "../store/useWalletStore";
import type { DebtRequest, DebtPaymentRequest, DebtType } from "../types/debt";

export const Debts = () => {
  const { debts, isLoading, error, fetchUserDebts, createDebt, makePayment, deleteDebt } =
    useDebtStore();
  const { wallets, fetchWallets } = useWalletStore();

  const [selectedWalletId, setSelectedWalletId] = useState<number | "">("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [debtType, setDebtType] = useState<DebtType>("PERSONAL_DEBT");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [payingDebtId, setPayingDebtId] = useState<number | null>(null);
  const [payAmount, setPayAmount] = useState("");

  useEffect(() => {
    fetchUserDebts();
    fetchWallets();
  }, [fetchUserDebts, fetchWallets]);

  const handleCreateDebt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWalletId || !title || !amount || !dueDate) return;

    setIsSubmitting(true);

    const request: DebtRequest = {
      walletId: Number(selectedWalletId),
      title,
      totalAmount: Number(amount),
      debtType,
      dueDate,
    };

    const success = await createDebt(request);
    if (success) {
      setTitle("");
      setAmount("");
      setDueDate("");
    }
    setIsSubmitting(false);
  };

  const handleMakePayment = async (debtId: number) => {
    if (!payAmount || Number(payAmount) <= 0) return;

    const request: DebtPaymentRequest = {
      paymentAmount: Number(payAmount),
    };

    const success = await makePayment(debtId, request);
    if (success) {
      setPayingDebtId(null);
      setPayAmount("");
    }
  };

  const handleDelete = async (debtId: number) => {
    if (window.confirm("Bu borç kaydını silmek istediğinize emin misiniz?")) {
      await deleteDebt(debtId);
    }
  };

  const getDebtTypeLabel = (type: DebtType) => {
    switch (type) {
      case "CREDIT_CARD":
        return "Kredi Kartı";
      case "LOAN":
        return "Kredi";
      case "PERSONAL_DEBT":
        return "Şahıs Borcu";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-emerald-950/40 pb-6">
        <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">
          Borç ve Alacak Takibi
        </h1>
        <p className="text-xs text-slate-500">
          Borçlarınızı ve ödemelerinizi buradan takip edebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Yeni Borç Kaydı Formu */}
        <div className="card-premium bg-[#04110d]/60 border border-emerald-950/50 p-6 rounded-3xl space-y-4">
          <h2 className="text-base font-bold text-slate-200">Yeni Borç Kaydı</h2>

          <form onSubmit={handleCreateDebt} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 pl-1">İlişkili Cüzdan</label>
              <select
                value={selectedWalletId}
                onChange={(e) => setSelectedWalletId(Number(e.target.value))}
                className="form-input-dark text-sm w-full bg-[#03140e] border border-emerald-950/60 text-slate-200 rounded-xl p-2.5"
                required
              >
                <option value="">Cüzdan Seçiniz</option>
                {wallets.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 pl-1">Borç Başlığı</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: Ev Kredisi veya Ahmet Borç"
                className="form-input-dark text-sm w-full"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 pl-1">Toplam Tutar</label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="form-input-dark text-sm w-full"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 pl-1">Son Ödeme Tarihi</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input-dark text-sm w-full"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 pl-1">Borç Türü</label>
              <select
                value={debtType}
                onChange={(e) => setDebtType(e.target.value as DebtType)}
                className="form-input-dark text-sm w-full bg-[#03140e] border border-emerald-950/60 text-slate-200 rounded-xl p-2.5"
              >
                <option value="PERSONAL_DEBT">Şahıs Borcu</option>
                <option value="CREDIT_CARD">Kredi Kartı</option>
                <option value="LOAN">Kredi</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 mt-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
            >
              {isSubmitting ? "Kaydediliyor..." : "+ Borç Kaydet"}
            </button>
          </form>
        </div>

        {/* Borç Listesi */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-lg font-bold text-slate-200 tracking-wide">
              Aktif Borçlar
            </h2>
            <span className="text-xs text-emerald-400 font-semibold">
              {debts.length} Kayıt
            </span>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs text-red-400">
              {error}
            </div>
          )}

          {isLoading && debts.length === 0 ? (
            <div className="p-8 text-center text-xs text-emerald-400 font-medium">
              Borçlar yükleniyor...
            </div>
          ) : debts.length === 0 ? (
            <div className="card-premium border-dashed border-2 border-emerald-500/10 p-8 text-center flex flex-col items-center justify-center">
              <p className="text-emerald-400/60 font-medium text-sm">
                Henüz kayıtlı bir borç bulunmuyor.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {debts.map((debt) => (
                <div
                  key={debt.id}
                  className="flex flex-col space-y-3 p-4 rounded-2xl bg-[#04110d]/40 border border-emerald-950/40"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                          {getDebtTypeLabel(debt.debtType)}
                        </span>
                        <h3 className="text-sm font-bold text-slate-200">{debt.title}</h3>
                        <span className="text-xs text-slate-500">({debt.walletName})</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Vade Tarihi: {new Date(debt.dueDate).toLocaleDateString("tr-TR")}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right">
                        <p className="text-sm font-black text-slate-100">
                          Kalan: {debt.remainingAmount} TL
                        </p>
                        {debt.remainingAmount < debt.totalAmount && (
                          <p className="text-[10px] text-slate-500 line-through">
                            Toplam: {debt.totalAmount} TL
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {!debt.isPaid && (
                          <button
                            onClick={() =>
                              setPayingDebtId(payingDebtId === debt.id ? null : debt.id)
                            }
                            className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold transition-all cursor-pointer"
                          >
                            Ödeme Yap
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(debt.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 transition-all cursor-pointer text-xs"
                          title="Kaydı Sil"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>

                  {payingDebtId === debt.id && (
                    <div className="w-full pt-3 border-t border-emerald-950/40 flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Ödeme Tutarı"
                        value={payAmount}
                        onChange={(e) => setPayAmount(e.target.value)}
                        className="form-input-dark text-xs flex-1"
                      />
                      <button
                        onClick={() => handleMakePayment(debt.id)}
                        className="px-3 py-2 bg-emerald-500 text-zinc-950 font-bold text-xs rounded-xl cursor-pointer"
                      >
                        Onayla
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};