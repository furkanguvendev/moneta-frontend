import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TransactionModal } from "../components/TransactionModal";

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

interface Transaction {
  id: string;
  amount: number;
  transactionType: "INCOME" | "EXPENSE";
  description: string;
  categoryId: string;
  date: string;
}

export const WalletDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockWalletsData: Record<string, Wallet> = {
    w1: {
      id: "w1",
      name: "Maaş Hesabı (Nakit)",
      totalBalance: 20000,
      activePlanId: "p1",
      plans: [
        { id: "p1", planName: "Sosyal Ay Modu", categories: { yemek: 15000, diger: 5000 } },
        { id: "p2", planName: "Tasarruf Modu", categories: { yemek: 5000, diger: 15000 } }
      ]
    },
    w2: {
      id: "w2",
      name: "Kripto Sepetim",
      totalBalance: 45000,
      activePlanId: "p3",
      plans: [
        { id: "p3", planName: "HODL Stratejisi", categories: { yemek: 0, diger: 45000 } },
        { id: "p4", planName: "Al-Sat Modu", categories: { yemek: 10000, diger: 35000 } }
      ]
    }
  };

  const selectedWallet = mockWalletsData[id || "w1"] || mockWalletsData["w1"];
  const [wallet, setWallet] = useState<Wallet>(selectedWallet);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "t1", amount: 450, transactionType: "EXPENSE", description: "Akşam Yemeği", categoryId: "yemek", date: "28.06.2026" },
    { id: "t2", amount: 25000, transactionType: "INCOME", description: "Şirket Maaş Ödemesi", categoryId: "diger", date: "25.06.2026" }
  ]);

  const activePlan = wallet.plans.find((p: BudgetPlan) => p.id === wallet.activePlanId) || wallet.plans[0];
  const yemekYuzde = wallet.totalBalance > 0 ? (activePlan.categories.yemek / wallet.totalBalance) * 100 : 0;
  const digerYuzde = wallet.totalBalance > 0 ? (activePlan.categories.diger / wallet.totalBalance) * 100 : 0;

  const handlePlanChange = (planId: string) => {
    setWallet((prev: Wallet) => ({ ...prev, activePlanId: planId }));
  };

  const handleAddTransaction = (newTx: { amount: number; transactionType: "INCOME" | "EXPENSE"; description: string; categoryId: string }) => {
    const transactionItem: Transaction = {
      id: Math.random().toString(),
      amount: newTx.amount,
      transactionType: newTx.transactionType,
      description: newTx.description,
      categoryId: newTx.categoryId,
      date: "Bugün"
    };

    setTransactions((prev: Transaction[]) => [transactionItem, ...prev]);

    setWallet((prev: Wallet) => ({
      ...prev,
      totalBalance: newTx.transactionType === "INCOME" ? prev.totalBalance + newTx.amount : prev.totalBalance - newTx.amount
    }));
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-4 wallets-header-border">
        <button onClick={() => navigate("/dashboard")} className="px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-xs font-bold rounded-xl cursor-pointer hover:bg-emerald-500/10 transition-all">
          ← Dashboard'a Dön
        </button>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">{wallet.name}</h1>
          <p className="text-xs text-emerald-400/60 mt-0.5">Cüzdan Stratejisi ve Hesap Geçmişi</p>
        </div>
      </div>

      <div className="card-premium space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-emerald-400/40 uppercase tracking-widest">Kullanılabilir Bakiye</span>
            <div className="text-3xl font-black text-emerald-400 mt-0.5">
              {wallet.totalBalance.toLocaleString('tr-TR')} ₺
            </div>
          </div>
          
          <button onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 text-xs font-black tracking-wider uppercase rounded-xl transition-all cursor-pointer">
            + İşlem Ekle
          </button>
        </div>

        <div className="wallet-tabs-container max-w-md">
          {wallet.plans.map((plan: BudgetPlan) => (
            <button
              key={plan.id}
              onClick={() => handlePlanChange(plan.id)}
              className={`wallet-tab-btn ${wallet.activePlanId === plan.id ? "wallet-tab-active" : "wallet-tab-inactive"}`}
            >
              {plan.planName}
            </button>
          ))}
        </div>

        <div className="space-y-5 border-t border-emerald-950/30 pt-6">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300">Yemek & Eğlence</span>
              <span className="text-emerald-400/80 font-bold">{activePlan.categories.yemek.toLocaleString('tr-TR')} ₺</span>
            </div>
            <div className="progress-track">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 progress-bar-transition" style={{ width: `${Math.min(yemekYuzde, 100)}%` }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300">Diğer Harcamalar / Yatırım</span>
              <span className="text-emerald-400/80 font-bold">{activePlan.categories.diger.toLocaleString('tr-TR')} ₺</span>
            </div>
            <div className="progress-track">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-400 progress-bar-transition" style={{ width: `${Math.min(digerYuzde, 100)}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-300 tracking-wide px-1">Cüzdan Hareketleri</h3>
        <div className="space-y-2">
          {transactions.map((tx: Transaction) => (
            <div key={tx.id} className="flex justify-between items-center p-4 bg-[#0b3324]/20 border border-emerald-500/5 rounded-xl hover:border-emerald-500/20 transition-all">
              <div className="flex items-center gap-3">
                <div className={tx.transactionType === "INCOME" ? "tx-badge-income" : "tx-badge-expense"}>
                  {tx.transactionType === "INCOME" ? "GELİR" : "GİDER"}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-200">{tx.description || "Detaysız İşlem"}</p>
                  <span className="text-[10px] text-slate-500">{tx.date} • Kategori: {tx.categoryId === "yemek" ? "Yemek & Eğlence" : "Diğer"}</span>
                </div>
              </div>
              <span className={`font-black text-sm ${tx.transactionType === "INCOME" ? "text-emerald-400" : "text-rose-400"}`}>
                {tx.transactionType === "INCOME" ? "+" : "-"}{tx.amount.toLocaleString('tr-TR')} ₺
              </span>
            </div>
          ))}
        </div>
      </div>

      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddTransaction} />
    </div>
  );
};