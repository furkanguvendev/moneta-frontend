import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface BudgetPlan {
  id: string;
  planName: string;
  categories: { yemek: number; diger: number };
}

interface Wallet {
  id: string;
  name: string;
  totalBalance: number;
  activePlanId: string;
  plans: BudgetPlan[];
}

export const Dashboard = () => {
  const navigate = useNavigate();
  
  const [wallets] = useState<Wallet[]>([
    {
      id: "w1",
      name: "Maaş Hesabı (Nakit)",
      totalBalance: 20000,
      activePlanId: "p1",
      plans: [
        { id: "p1", planName: "Sosyal Ay Modu", categories: { yemek: 15000, diger: 5000 } },
        { id: "p2", planName: "Tasarruf Modu", categories: { yemek: 5000, diger: 15000 } }
      ]
    },
    {
      id: "w2",
      name: "Kripto Sepetim",
      totalBalance: 45000,
      activePlanId: "p3",
      plans: [
        { id: "p3", planName: "HODL Stratejisi", categories: { yemek: 0, diger: 45000 } },
        { id: "p4", planName: "Al-Sat Modu", categories: { yemek: 10000, diger: 35000 } }
      ]
    }
  ]);

  const totalNetBalance = wallets.reduce((sum, w) => sum + w.totalBalance, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">Finansal Rapor</h1>
        <p className="text-xs text-emerald-400/60 mt-1">Moneta anlık cüzdan ve bütçe analizleri</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-premium border-l-4 border-l-emerald-500 bg-gradient-to-br from-[#0b3324]/30 to-transparent">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400/50">Aylık Toplam Gelir</div>
          <div className="text-xl font-black mt-2 text-white">25.000,00 ₺</div>
        </div>
        
        <div className="card-premium border-l-4 border-l-rose-500">
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-400/50">Aylık Toplam Gider</div>
          <div className="text-xl font-black mt-2 text-white">5.000,00 ₺</div>
        </div>

        <div className="card-premium border-l-4 border-l-sky-500">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-400/50">Net Toplam Varlık</div>
          <div className="text-xl font-black mt-2 text-emerald-400">
            {totalNetBalance.toLocaleString('tr-TR')} ₺
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-200 tracking-wide px-1">Hesaplarım & Cüzdanlarım</h2>
        
        <div className="wallet-grid">
          {wallets.map((wallet) => {
            const activePlan = wallet.plans.find(p => p.id === wallet.activePlanId) || wallet.plans[0];
            return (
              <div 
                key={wallet.id} 
                onClick={() => navigate(`/wallets/${wallet.id}`)}
                className="card-premium flex flex-col justify-between h-[180px] cursor-pointer hover:border-emerald-500/30 hover:scale-[1.01] transition-all duration-300 group"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-base text-slate-100 group-hover:text-emerald-400 transition-colors">{wallet.name}</h3>
                      <span className="text-xs text-slate-500">Aktif Plan: {activePlan.planName}</span>
                    </div>
                    <span className="text-lg font-black text-emerald-400">
                      {wallet.totalBalance.toLocaleString('tr-TR')} ₺
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-400/60 border-t border-emerald-950/30 pt-3">
                  <span>Detayları ve İşlemleri Gör</span>
                  <span className="text-emerald-400 text-sm group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}

          <div className="group border-2 border-dashed border-emerald-900/30 hover:border-emerald-500/30 rounded-2xl p-6 flex flex-col items-center justify-center h-[180px] cursor-pointer transition-all duration-300 bg-[#0b3324]/10 hover:bg-[#0b3324]/20">
            <span className="text-sm font-bold text-slate-200 tracking-wide">+ Yeni Cüzdan Oluştur</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-premium flex items-center justify-center min-h-[200px] border-dashed border-2 border-emerald-500/10 text-center p-8">
          <p className="text-emerald-400/60 font-medium text-sm">
            [Gelir, Gider ve Kalan Bakiye Liste Görünümü]
          </p>
        </div>
        <div className="card-premium flex flex-col justify-center items-center min-h-[200px] border-dashed border-2 border-emerald-500/10 text-center p-6">
          <p className="text-emerald-400/60 font-medium text-xs">
            [Pasta Dilimi Grafik Alanı]
          </p>
        </div>
      </div>
    </div>
  );
};