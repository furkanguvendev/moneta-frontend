import React from "react";
import type { Wallet } from "../types/wallet";

interface DashboardChartProps {
  wallets: Wallet[];
  totalNetBalance: number;
}

export const DashboardChart: React.FC<DashboardChartProps> = ({
  wallets,
  totalNetBalance,
}) => {
  return (
    <div className="card-premium p-6 flex flex-col justify-between min-h-[280px]">
      <div className="border-b border-emerald-950/40 pb-3">
        <h3 className="text-sm font-bold text-slate-200 tracking-wide">
          Varlık Dağılım Grafiği
        </h3>
      </div>

      {wallets.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-xs text-slate-500">
          Grafik için veri bulunamadı.
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 space-y-6 py-4">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 32 32"
            >
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="transparent"
                stroke="#04110d"
                strokeWidth="4"
              />
              {
                wallets.reduce<{
                  strokeDashoffset: number;
                  elements: React.ReactNode[];
                }>(
                  (acc, wallet, index) => {
                    const percentage =
                      totalNetBalance > 0
                        ? (wallet.balance / totalNetBalance) * 100
                        : 0;
                    if (percentage === 0) return acc;

                    const strokeDasharray = `${percentage} ${100 - percentage}`;
                    const currentOffset = acc.strokeDashoffset;

                    const colors = [
                      "stroke-emerald-500",
                      "stroke-emerald-400",
                      "stroke-teal-600",
                      "stroke-emerald-600",
                      "stroke-green-500",
                    ];
                    const strokeColor = colors[index % colors.length];

                    acc.elements.push(
                      <circle
                        key={wallet.id}
                        cx="16"
                        cy="16"
                        r="14"
                        fill="transparent"
                        className={`${strokeColor} transition-all duration-500`}
                        strokeWidth="4"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={currentOffset}
                      />
                    );

                    acc.strokeDashoffset = currentOffset - percentage;
                    return acc;
                  },
                  { strokeDashoffset: 0, elements: [] }
                ).elements
              }
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                Toplam
              </span>
              <span className="text-xs font-black text-emerald-400 mt-0.5">
                {wallets.length} Hesap
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 w-full px-2">
            {wallets.slice(0, 3).map((wallet, index) => {
              const colors = [
                "bg-emerald-500",
                "bg-emerald-400",
                "bg-teal-600",
                "bg-emerald-600",
                "bg-green-500",
              ];
              const ratio =
                totalNetBalance > 0
                  ? (wallet.balance / totalNetBalance) * 100
                  : 0;
              return (
                <div
                  key={wallet.id}
                  className="flex items-center gap-1.5 text-[11px]"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      colors[index % colors.length]
                    }`}
                  />
                  <span className="text-slate-400 font-medium">
                    {wallet.name}
                  </span>
                  <span className="text-slate-500">%{ratio.toFixed(0)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};