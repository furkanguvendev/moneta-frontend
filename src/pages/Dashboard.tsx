import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWalletStore } from "../store/useWalletStore";
import { DashboardTasks } from "../components/DashboardTasks";
import { DashboardChart } from "../components/DashboardChart";

const currencySymbols: Record<string, string> = {
  TRY: '₺',
  USD: '$',
  EUR: '€',
  GBP: '£'
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const { wallets, isLoading, error, fetchWallets, addWallet } = useWalletStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [currency, setCurrency] = useState("TRY");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  const totalNetBalance = wallets.reduce((sum, w) => sum + w.balance, 0);

  const handleCreateWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletName.trim()) return;

    setIsSubmitting(true);
    try {
      await addWallet({ name: walletName, currency });
      setWalletName("");
      setCurrency("TRY");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="text-emerald-400 text-sm font-medium">Cüzdan bilgileri yükleniyor...</span>
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
        <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">Finansal Rapor</h1>
        <p className="text-xs text-emerald-400/60 mt-1">Moneta anlık cüzdan ve bütçe analizleri</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-premium border-l-4 border-l-emerald-500 bg-gradient-to-br from-[#0b3324]/30 to-transparent">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400/50">Aylık Toplam Gelir</div>
          <div className="text-xl font-black mt-2 text-white">0.00 ₺</div>
        </div>
        
        <div className="card-premium border-l-4 border-l-rose-500">
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-400/50">Aylık Toplam Gider</div>
          <div className="text-xl font-black mt-2 text-white">0.00 ₺</div>
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
          {wallets.map((wallet) => (
            <div 
              key={wallet.id} 
              onClick={() => navigate(`/wallets/${wallet.id}`)}
              className="card-premium flex flex-col justify-between h-[180px] cursor-pointer hover:border-emerald-500/30 hover:scale-[1.01] transition-all duration-300 group"
            >
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base text-slate-100 group-hover:text-emerald-400 transition-colors">{wallet.name}</h3>
                    <span className="text-xs text-slate-500">Bakiye Türü: {wallet.currency}</span>
                  </div>
                  <span className="text-lg font-black text-emerald-400">
                    {wallet.balance.toLocaleString('tr-TR')} {currencySymbols[wallet.currency] || wallet.currency}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400/60 border-t border-emerald-950/30 pt-3">
                <span>Detayları ve İşlemleri Gör</span>
                <span className="text-emerald-400 text-sm group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}

          <div 
            onClick={() => setIsModalOpen(true)} 
            className="group border-2 border-dashed border-emerald-900/30 hover:border-emerald-500/30 rounded-2xl p-6 flex flex-col items-center justify-center h-[180px] cursor-pointer transition-all duration-300 bg-[#0b3324]/10 hover:bg-[#0b3324]/20"
          >
            <span className="text-sm font-bold text-slate-200 tracking-wide">+ Yeni Cüzdan Oluştur</span>
          </div>
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#071d15] border border-emerald-500/20 rounded-2xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Yeni Cüzdan Oluştur</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateWallet} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-emerald-400/70 uppercase tracking-wider">Cüzdan Adı</label>
                <input 
                  type="text"
                  required
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                  placeholder="Örn: Vadeli Hesap, Binance, Nakit"
                  className="w-full bg-[#04110d] border border-emerald-900 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-emerald-400/70 uppercase tracking-wider">Para Birimi</label>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-[#04110d] border border-emerald-900 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                >
                  <option value="TRY">Türk Lirası (TRY)</option>
                  <option value="USD">Amerikan Doları (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">İngiliz Sterlini (GBP)</option>
                </select>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-800 text-[#04110d] font-bold py-3 px-4 rounded-xl transition-colors text-sm mt-2"
              >
                {isSubmitting ? "Oluşturuluyor..." : "Cüzdanı Ekle"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};