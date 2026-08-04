import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWalletStore } from "../store/useWalletStore";
import { DashboardTasks } from "../components/DashboardTasks";
import { DashboardChart } from "../components/DashboardChart";
import { FinancialSummary } from "../components/FinancialSummary";
import { WalletCard, AddWalletCard } from "../components/WalletCard";
import { CreateWalletModal } from "../components/CreateWalletModal";

const currencySymbols: Record<string, string> = {
  TRY: "₺",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const { wallets, isLoading, error, fetchWallets, addWallet, deleteWallet } =
    useWalletStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  const totalNetBalance = wallets.reduce((sum, w) => sum + w.balance, 0);

  const handleCreateWallet = async (name: string, currency: string) => {
    await addWallet({ name, currency });
  };

  const handleDeleteWallet = async (walletId: number) => {
    await deleteWallet(walletId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="text-emerald-400 text-sm font-medium">
          Cüzdan bilgileri yükleniyor...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
        <span className="text-xs text-red-400 font-medium">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">
          Finansal Rapor
        </h1>
        <p className="text-xs text-emerald-400/60 mt-1">
          Moneta anlık cüzdan ve bütçe analizleri
        </p>
      </div>

      <FinancialSummary totalNetBalance={totalNetBalance} />

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-200 tracking-wide px-1">
          Hesaplarım & Cüzdanlarım
        </h2>

        <div className="wallet-grid">
          {wallets.map((wallet) => (
            <WalletCard
              key={wallet.id}
              wallet={wallet}
              currencySymbols={currencySymbols}
              onNavigate={(id) => navigate(`/wallets/${id}`)}
              onDelete={handleDeleteWallet}
            />
          ))}

          <AddWalletCard onClick={() => setIsModalOpen(true)} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardTasks
          wallets={wallets}
          totalNetBalance={totalNetBalance}
          currencySymbols={currencySymbols}
        />
        <DashboardChart
          wallets={wallets}
          totalNetBalance={totalNetBalance}
        />
      </div>

      <CreateWalletModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateWallet}
      />
    </div>
  );
};