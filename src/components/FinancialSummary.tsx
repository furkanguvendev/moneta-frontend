import { useEffect } from "react";
import { useAnalyticsStore } from "../store/useAnalyticsStore";

interface FinancialSummaryProps {
  totalNetBalance: number;
}

export const FinancialSummary = ({ totalNetBalance }: FinancialSummaryProps) => {
  const { monthlySummary, fetchMonthlySummary, isLoading } = useAnalyticsStore();

  useEffect(() => {
    fetchMonthlySummary();
  }, [fetchMonthlySummary]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="card-premium border-l-4 border-l-emerald-500 bg-gradient-to-br from-[#0b3324]/30 to-transparent min-w-0">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400/50">
          Aylık Toplam Gelir
        </div>
        <div className="text-xl font-black mt-2 text-white truncate">
          {isLoading ? (
            <span className="text-xs text-emerald-400/50 font-normal">Yükleniyor...</span>
          ) : (
            `${monthlySummary?.totalIncome?.toLocaleString("tr-TR", { minimumFractionDigits: 2 }) ?? "0.00"} ₺`
          )}
        </div>
      </div>

      <div className="card-premium border-l-4 border-l-rose-500 min-w-0">
        <div className="text-xs font-semibold uppercase tracking-wider text-rose-400/50">
          Aylık Toplam Gider
        </div>
        <div className="text-xl font-black mt-2 text-white truncate">
          {isLoading ? (
            <span className="text-xs text-rose-400/50 font-normal">Yükleniyor...</span>
          ) : (
            `${monthlySummary?.totalExpense?.toLocaleString("tr-TR", { minimumFractionDigits: 2 }) ?? "0.00"} ₺`
          )}
        </div>
      </div>

      <div className="card-premium border-l-4 border-l-sky-500 min-w-0">
        <div className="text-xs font-semibold uppercase tracking-wider text-sky-400/50">
          Net Toplam Varlık
        </div>
        <div className="text-xl font-black mt-2 text-emerald-400 truncate">
          {totalNetBalance.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ₺
        </div>
      </div>
    </div>
  );
};