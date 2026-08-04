import { useState } from "react";

interface CreateWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (walletName: string, currency: string) => Promise<void>;
}

export const CreateWalletModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateWalletModalProps) => {
  const [walletName, setWalletName] = useState("");
  const [currency, setCurrency] = useState("TRY");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletName.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(walletName, currency);
      setWalletName("");
      setCurrency("TRY");
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#071d15] border border-emerald-500/20 rounded-2xl p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Yeni Cüzdan Oluştur</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-emerald-400/70 uppercase tracking-wider">
              Cüzdan Adı
            </label>
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
            <label className="text-xs font-semibold text-emerald-400/70 uppercase tracking-wider">
              Para Birimi
            </label>
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
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-800 text-[#04110d] font-bold py-3 px-4 rounded-xl transition-colors text-sm mt-2 cursor-pointer"
          >
            {isSubmitting ? "Oluşturuluyor..." : "Cüzdanı Ekle"}
          </button>
        </form>
      </div>
    </div>
  );
};