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
    <div className="modal-overlay">
      <div className="modal-container space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Yeni Cüzdan Oluştur</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-emerald-400/70 uppercase tracking-wider">
              Cüzdan Adı
            </label>
            <input
              type="text"
              required
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              placeholder="Örn: Vadeli Hesap, Binance, Nakit"
              className="input-dark"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-emerald-400/70 uppercase tracking-wider">
              Para Birimi
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="select-dark"
            >
              <option value="TRY" className="bg-[#03140e]">Türk Lirası (TRY)</option>
              <option value="USD" className="bg-[#03140e]">Amerikan Doları (USD)</option>
              <option value="EUR" className="bg-[#03140e]">Euro (EUR)</option>
              <option value="GBP" className="bg-[#03140e]">İngiliz Sterlini (GBP)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-emerald mt-2"
          >
            {isSubmitting ? "Oluşturuluyor..." : "Cüzdanı Ekle"}
          </button>
        </form>
      </div>
    </div>
  );
};