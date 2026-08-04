interface FinancialSummaryProps {
  totalNetBalance: number;
}

export const FinancialSummary = ({ totalNetBalance }: FinancialSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="card-premium border-l-4 border-l-emerald-500 bg-gradient-to-br from-[#0b3324]/30 to-transparent">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400/50">
          Aylık Toplam Gelir
        </div>
        <div className="text-xl font-black mt-2 text-white">0.00 ₺</div>
      </div>

      <div className="card-premium border-l-4 border-l-rose-500">
        <div className="text-xs font-semibold uppercase tracking-wider text-rose-400/50">
          Aylık Toplam Gider
        </div>
        <div className="text-xl font-black mt-2 text-white">0.00 ₺</div>
      </div>

      <div className="card-premium border-l-4 border-l-sky-500">
        <div className="text-xs font-semibold uppercase tracking-wider text-sky-400/50">
          Net Toplam Varlık
        </div>
        <div className="text-xl font-black mt-2 text-emerald-400">
          {totalNetBalance.toLocaleString("tr-TR")} ₺
        </div>
      </div>
    </div>
  );
};