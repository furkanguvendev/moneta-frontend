import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWalletStore } from "../store/useWalletStore";

const currencySymbols: Record<string, string> = {
  TRY: '₺',
  USD: '$',
  EUR: '€',
  GBP: '£'
};

export const WalletDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { wallets, isLoading, error, fetchWallets } = useWalletStore();

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  const wallet = wallets.find((w) => w.id === Number(id));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="text-emerald-400 text-sm font-medium">Cüzdan detayları yükleniyor...</span>
      </div>
    );
  }

  if (error || !wallet) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center max-w-md mx-auto mt-12">
        <span className="text-xs text-red-400 font-medium block mb-4">
          {error || "Cüzdan bulunamadı veya bu cüzdana erişim yetkiniz yok!"}
        </span>
        <button 
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-white/10 hover:bg-white/25 border border-white/20 text-white rounded-xl text-xs font-bold transition-all"
        >
          Dashboard'a Dön
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-emerald-950/40 pb-6">
        <div>
          <button 
            onClick={() => navigate("/dashboard")}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-bold transition-colors mb-2 block"
          >
            ← Hesaplarıma Geri Dön
          </button>
          <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">{wallet.name}</h1>
          <p className="text-xs text-slate-500 mt-1">Hesap Türü: {wallet.currency} Cüzdanı</p>
        </div>

        <div className="bg-[#0b3324]/30 border border-emerald-500/20 rounded-2xl p-4 min-w-[200px] text-right">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400/50">Güncel Bakiye</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            {wallet.balance.toLocaleString('tr-TR')} {currencySymbols[wallet.currency] || wallet.currency}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-200 tracking-wide px-1">Hesap Hareketleri</h2>
          <div className="card-premium border-dashed border-2 border-emerald-500/10 p-8 text-center min-h-[250px] flex flex-col items-center justify-center">
            <p className="text-emerald-400/60 font-medium text-sm">Bu cüzdana ait henüz bir harcama veya gelir kaydı bulunmuyor.</p>
            <p className="text-xs text-slate-600 mt-1">İşlem eklemek için sağ paneli kullanabilirsiniz.</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-200 tracking-wide px-1">Hızlı İşlem Ekle</h2>
          <div className="card-premium bg-gradient-to-br from-[#0b3324]/20 to-transparent p-6 space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              [Yakında] Bu alandan cüzdanınıza hızlıca gelir veya gider ekleyerek bakiyenizi anlık güncelleyebileceksiniz.
            </p>
            <div className="w-full h-32 border border-emerald-950/50 rounded-xl bg-[#04110d]/50 flex items-center justify-center text-xs text-slate-600 font-mono">
              Gelir/Gider Formu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};