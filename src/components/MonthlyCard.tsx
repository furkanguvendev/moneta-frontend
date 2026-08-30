import React from "react";

interface MonthlyCardProps {
  year: number;
  month: number;
  totalIncome: number;
  totalExpense: number;
  currencySymbol: string;
  onClick: () => void;
}

const monthNames = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylul", "Ekim", "Kasım", "Aralık"
];

export const MonthlyCard: React.FC<MonthlyCardProps> = ({
  year,
  month,
  totalIncome,
  totalExpense,
  currencySymbol,
  onClick
}) => {
  const net = totalIncome - totalExpense;

  return (
    <div
      onClick={onClick}
      className="p-4 rounded-2xl bg-[#04110d]/50 border border-emerald-950/50 flex flex-col justify-between gap-3 hover:border-emerald-600/40 hover:bg-[#04110d]/80 transition-all cursor-pointer group shadow-lg"
    >
      <div className="flex justify-between items-center border-b border-emerald-950/40 pb-2">
        <span className="text-xs font-bold text-slate-300 group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
          📅 {monthNames[month - 1]} {year}
        </span>
        <span className={`text-xs font-black px-2 py-0.5 rounded ${
          net >= 0 
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
        }`}>
          Net: {net >= 0 ? '+' : ''}{net.toLocaleString('tr-TR')} {currencySymbol}
        </span>
      </div>

      <div className="flex justify-between text-xs pt-1">
        <div>
          <span className="text-[10px] text-slate-500 block uppercase font-medium">Gelir</span>
          <span className="font-bold text-emerald-400">+{totalIncome.toLocaleString('tr-TR')} {currencySymbol}</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-500 block uppercase font-medium">Gider</span>
          <span className="font-bold text-rose-400">-{totalExpense.toLocaleString('tr-TR')} {currencySymbol}</span>
        </div>
      </div>
    </div>
  );
};