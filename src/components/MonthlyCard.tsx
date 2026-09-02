import React from "react";

interface MonthlyCardProps {
  year: number;
  month: number;
  totalIncome: number;
  totalExpense: number;
  currencySymbol: string;
  onClick: () => void;
  onDelete: () => void;
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
  onClick,
  onDelete
}) => {
  const net = totalIncome - totalExpense;

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      onClick={onClick}
      className="relative p-4 rounded-2xl bg-[#04110d]/50 border border-emerald-950/50 flex flex-col justify-between gap-3 hover:border-emerald-600/40 hover:bg-[#04110d]/80 transition-all cursor-pointer group shadow-lg"
    >
      <button
        onClick={handleDeleteClick}
        className="absolute top-3 right-3 text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer text-xs p-1 z-10"
        title="Bu ayı sil"
      >
        ✕
      </button>

      <div className="flex justify-between items-center border-b border-emerald-950/40 pb-2 pr-4">
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