import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebtStore } from "../store/useDebtStore";

const debtTypeLabels: Record<string, string> = {
  BIREYSEL_KREDI: "Bireysel Kredi",
  KONUT_KREDISI: "Konut Kredisi",
  TASIT_KREDISI: "Taşıt Kredisi",
  KREDI_KARTI_TAKSIDI: "Kredi Kartı Taksidi",
  DIGER: "Diğer Kredi/Taksit",
};

type FilterType = "ALL" | "ACTIVE" | "COMPLETED";

export const DebtsPage: React.FC = () => {
  const navigate = useNavigate();
  const { debts, isLoading, error, fetchUserDebts, deleteDebt } = useDebtStore();
  const [filter, setFilter] = useState<FilterType>("ACTIVE");

  useEffect(() => {
    fetchUserDebts();
  }, []);

  const handleDelete = async (debtId: number, title: string) => {
    if (window.confirm(`"${title}" kaydını silmek istediğinize emin misiniz?`)) {
      await deleteDebt(debtId);
    }
  };

  const filteredDebts = debts.filter((d) => {
    if (filter === "ACTIVE") return !d.isCompleted;
    if (filter === "COMPLETED") return d.isCompleted;
    return true;
  });

  const totalRemaining = debts
    .filter((d) => !d.isCompleted)
    .reduce((sum, d) => sum + d.remainingAmount, 0);

  const totalMonthly = debts
    .filter((d) => !d.isCompleted)
    .reduce((sum, d) => sum + (d.monthlyInstallment || 0), 0);

  if (isLoading && debts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="text-emerald-400 text-sm font-medium">Borçlar yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="border-b border-emerald-950/40 pb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-xs text-emerald-400 hover:text-emerald-300 font-bold transition-colors mb-2 block cursor-pointer w-fit"
        >
          ← Dashboard'a Dön
        </button>
        <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">Borçlar & Alacaklar</h1>
        <p className="text-xs text-slate-500 mt-1">Taksitli kredi ve borçlarınızı buradan takip edebilirsiniz.</p>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs text-rose-400 font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#04110d]/60 border border-emerald-950/50">
          <span className="text-xs text-slate-500 uppercase font-bold">Toplam Kalan Borç</span>
          <div className="text-2xl font-black text-rose-400 mt-1">
            {totalRemaining.toLocaleString('tr-TR')} ₺
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#04110d]/60 border border-emerald-950/50">
          <span className="text-xs text-slate-500 uppercase font-bold">Aylık Toplam Taksit</span>
          <div className="text-2xl font-black text-amber-400 mt-1">
            {totalMonthly.toLocaleString('tr-TR')} ₺
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-950/60 rounded-xl border border-emerald-950/40 max-w-md">
        <button
          onClick={() => setFilter("ACTIVE")}
          className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            filter === "ACTIVE" ? "bg-emerald-500/20 text-emerald-400" : "text-slate-400"
          }`}
        >
          Aktif
        </button>
        <button
          onClick={() => setFilter("COMPLETED")}
          className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            filter === "COMPLETED" ? "bg-emerald-500/20 text-emerald-400" : "text-slate-400"
          }`}
        >
          Tamamlanan
        </button>
        <button
          onClick={() => setFilter("ALL")}
          className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            filter === "ALL" ? "bg-emerald-500/20 text-emerald-400" : "text-slate-400"
          }`}
        >
          Tümü
        </button>
      </div>

      {filteredDebts.length === 0 ? (
        <div className="border-dashed border-2 border-emerald-500/10 p-8 rounded-3xl text-center min-h-[200px] flex flex-col items-center justify-center bg-[#04110d]/20">
          <p className="text-emerald-400/60 font-medium text-sm">
            {filter === "ACTIVE" ? "Aktif bir borcunuz bulunmuyor." : filter === "COMPLETED" ? "Tamamlanmış bir borcunuz bulunmuyor." : "Henüz kayıtlı bir borcunuz bulunmuyor."}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Kredi kartı ile taksitli işlem eklediğinizde burada görünecek.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDebts.map((debt) => {
            const progress = debt.totalInstallments
              ? ((debt.paidInstallments || 0) / debt.totalInstallments) * 100
              : 0;

            return (
              <div
                key={debt.id}
                className="p-5 rounded-2xl bg-[#04110d]/40 border border-emerald-950/40 hover:border-emerald-800/30 transition-all space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-200">{debt.title}</span>
                      <span className="text-[10px] bg-zinc-900 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-950/40">
                        {debtTypeLabels[debt.debtType] || debt.debtType}
                      </span>
                      {debt.isCompleted && (
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          Tamamlandı
                        </span>
                      )}
                    </div>
                    {debt.dueDate && (
                      <span className="text-[10px] text-slate-500">Vade: {new Date(debt.dueDate).toLocaleDateString('tr-TR')}</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(debt.id, debt.title)}
                    className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer text-xs p-1"
                    title="Kaydı Sil"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Toplam Tutar</span>
                    <span className="text-white font-bold">{debt.totalAmount.toLocaleString('tr-TR')} ₺</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Kalan Tutar</span>
                    <span className="text-rose-400 font-bold">{debt.remainingAmount.toLocaleString('tr-TR')} ₺</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Aylık Taksit</span>
                    <span className="text-amber-400 font-bold">
                      {debt.monthlyInstallment ? debt.monthlyInstallment.toLocaleString('tr-TR') : '-'} ₺
                    </span>
                  </div>
                </div>

                {debt.totalInstallments && debt.totalInstallments > 1 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold">
                      <span className="text-slate-400">
                        Taksit: {debt.paidInstallments || 0} / {debt.totalInstallments}
                      </span>
                      <span className="text-slate-400">%{progress.toFixed(0)}</span>
                    </div>
                    <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-emerald-950/30">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};