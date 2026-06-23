import { useState } from "react";

interface BudgetPlan {
  id: string;
  planName: string;
  categories: {
    yemek: number;
    diger: number;
  };
}

interface Wallet {
  id: string;
  name: string;
  totalBalance: number;
  activePlanId: string;
  plans: BudgetPlan[];
}

export const Wallets = () => {
  const [wallets, setWallets] = useState<Wallet[]>([
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

  const handlePlanChange = (walletId: string, planId: string) => {
    setWallets(prev => prev.map(w => w.id === walletId ? { ...w, activePlanId: planId } : w));
  };

  return (
    <div className="space-y-8">
      <div className="wallets-header-border">
        <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">
          Wallets & Budget Strategies
        </h1>
        <p className="mt-2 text-sm text-emerald-400/60 max-w-xl">
          Cüzdanlarınızı bağımsız stratejilerle yönetin. Her ayın dinamiklerine göre bütçe planlarınız arasında tek tıkla geçiş yapın.
        </p>
      </div>

      <div className="wallet-grid">
        {wallets.map((wallet) => {
          const activePlan = wallet.plans.find(p => p.id === wallet.activePlanId) || wallet.plans[0];
          const yemekYuzde = wallet.totalBalance > 0 ? (activePlan.categories.yemek / wallet.totalBalance) * 100 : 0;
          const digerYuzde = wallet.totalBalance > 0 ? (activePlan.categories.diger / wallet.totalBalance) * 100 : 0;

          return (
            <div key={wallet.id} className="card-premium flex flex-col justify-between h-[420px]">
              <div>
                <div className="wallet-card-header">
                  <div>
                    <h3 className="font-bold text-lg text-slate-100 tracking-wide">{wallet.name}</h3>
                    <span className="text-xs text-emerald-400/50">Dinamik Cüzdan</span>
                  </div>
                  <span className="text-xl font-black text-emerald-400">
                    {wallet.totalBalance.toLocaleString('tr-TR')} ₺
                  </span>
                </div>

                <div className="wallet-tabs-container">
                  {wallet.plans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => handlePlanChange(wallet.id, plan.id)}
                      className={`wallet-tab-btn ${
                        wallet.activePlanId === plan.id ? "wallet-tab-active" : "wallet-tab-inactive"
                      }`}
                    >
                      {plan.planName}
                    </button>
                  ))}
                </div>

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">Yemek & Eğlence</span>
                      <span className="text-emerald-400/80 font-bold">
                        {activePlan.categories.yemek.toLocaleString('tr-TR')} ₺
                      </span>
                    </div>
                    <div className="progress-track">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 progress-bar-transition"
                        style={{ width: `${Math.min(yemekYuzde, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">Diğer Harcamalar / Yatırım</span>
                      <span className="text-emerald-400/80 font-bold">
                        {activePlan.categories.diger.toLocaleString('tr-TR')} ₺
                      </span>
                    </div>
                    <div className="progress-track">
                      <div 
                        className="bg-gradient-to-r from-teal-500 to-cyan-400 progress-bar-transition"
                        style={{ width: `${Math.min(digerYuzde, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn-wallet-action">
                Stratejiyi Düzenle
              </button>
            </div>
          );
        })}

        {/* Hata veren class dışarı taşınmadı, doğrudan orijinal Tailwind sınıflarıyla burada çözüldü */}
        <div className="group border-2 border-dashed border-emerald-900/30 hover:border-emerald-500/30 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[420px] cursor-pointer transition-all duration-300 bg-[#0b3324]/10 hover:bg-[#0b3324]/20">
          <div className="p-4 bg-emerald-500/5 group-hover:bg-emerald-500/10 rounded-2xl border border-emerald-500/10 transition-colors duration-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <span className="text-sm font-bold text-slate-200 tracking-wide">Yeni Cüzdan Oluştur</span>
          <span className="text-xs text-emerald-400/40 text-center mt-1 max-w-[180px]">
            Farklı bütçe planları tanımlayabileceğiniz yeni hesap ekleyin.
          </span>
        </div>
      </div>
    </div>
  );
};