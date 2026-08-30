import React, { useState, useEffect } from "react";
import { useCategoryStore } from "../store/useCategoryStore";

export type PaymentMethod = "CASH" | "CREDIT_CARD";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletId: number;
  onSave: (data: { 
    amount: number; 
    transactionType: "INCOME" | "EXPENSE"; 
    description: string; 
    categoryId: number;
    walletId: number;
    paymentMethod: PaymentMethod;
    installmentCount?: number;
  }) => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ 
  isOpen, 
  onClose, 
  walletId, 
  onSave 
}) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");
  const [installmentCount, setInstallmentCount] = useState<number>(1);
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [description, setDescription] = useState("");

  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isNewCategoryMandatory, setIsNewCategoryMandatory] = useState(false);
  const [isCategorySubmitting, setIsCategorySubmitting] = useState(false);

  const { categories, fetchCategories, createCategory, isLoading } = useCategoryStore();

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, fetchCategories]);

  if (!isOpen) return null;

  const handleCreateCategory = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      setIsCategorySubmitting(true);
      await createCategory({
        name: newCategoryName.trim(),
        isMandatory: isNewCategoryMandatory
      });

      setNewCategoryName("");
      setIsNewCategoryMandatory(false);
      setIsAddingNewCategory(false);
      await fetchCategories();
    } catch (err) {
      console.error(err);
    } finally {
      setIsCategorySubmitting(false);
    }
  };

 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    const finalCategoryId = categoryId || (categories.length > 0 ? categories[0].id : "");
    if (!finalCategoryId) return;

    const payload = { 
      amount: parseFloat(amount), 
      transactionType: type, 
      description, 
      categoryId: Number(finalCategoryId),
      walletId: walletId,
      paymentMethod,
      installmentCount: paymentMethod === "CREDIT_CARD" ? installmentCount : 1
    };

    console.log("TransactionModal onSave payload:", payload); // <-- EKLENEN SATIR

    onSave(payload);

    // Formu sıfırla
    setAmount("");
    setCategoryId("");
    setDescription("");
    setPaymentMethod("CASH");
    setInstallmentCount(1);
    onClose();
};

  const currentSelectValue = categoryId || (categories.length > 0 ? categories[0].id : "");
  const monthlyAmount = amount && installmentCount > 1 ? (parseFloat(amount) / installmentCount).toFixed(2) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="modal-container w-full max-w-md bg-[#03140e] border border-emerald-950/60 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center pb-4 border-b border-emerald-950/40">
          <h3 className="text-md font-bold text-white tracking-wide">Yeni İşlem Ekle</h3>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Gelir / Gider Seçimi */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-950/60 rounded-xl border border-emerald-950/40">
            <button
              type="button"
              onClick={() => setType("EXPENSE")}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                type === "EXPENSE" ? "bg-rose-500/20 text-rose-400" : "text-slate-400"
              }`}
            >
              Gider (-)
            </button>
            <button
              type="button"
              onClick={() => {
                setType("INCOME");
                setPaymentMethod("CASH"); // Gelirde taksit/kredi kartı olmayacağı için
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                type === "INCOME" ? "bg-emerald-500/20 text-emerald-400" : "text-slate-400"
              }`}
            >
              Gelir (+)
            </button>
          </div>

          {/* Ödeme Yöntemi (Sadece Gider İçin) */}
          {type === "EXPENSE" && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-emerald-400/40 uppercase tracking-widest">Ödeme Yöntemi</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("CASH")}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                    paymentMethod === "CASH"
                      ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
                      : "bg-zinc-950 border-emerald-950/60 text-slate-400 hover:border-emerald-900"
                  }`}
                >
                  💵 Nakit / Peşin
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("CREDIT_CARD")}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                    paymentMethod === "CREDIT_CARD"
                      ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
                      : "bg-zinc-950 border-emerald-950/60 text-slate-400 hover:border-emerald-900"
                  }`}
                >
                  💳 Kredi Kartı / Taksit
                </button>
              </div>
            </div>
          )}

          {/* Tutar */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-emerald-400/40 uppercase tracking-widest">
              {paymentMethod === "CREDIT_CARD" ? "Toplam Tutar" : "Tutar"}
            </label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-zinc-950 border border-emerald-950/60 rounded-xl px-4 py-2.5 text-white text-lg font-semibold focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>

          {/* Taksit Alanı (Kredi Kartı Seçiliyse Görünür) */}
          {type === "EXPENSE" && paymentMethod === "CREDIT_CARD" && (
            <div className="p-3 bg-[#04110d] border border-emerald-950 rounded-xl space-y-2 animate-in fade-in duration-150">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest">Taksit Sayısı</label>
                {monthlyAmount && (
                  <span className="text-[11px] font-bold text-emerald-400">
                    Aylık: {monthlyAmount} ₺
                  </span>
                )}
              </div>
              <select
                value={installmentCount}
                onChange={(e) => setInstallmentCount(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-emerald-950/60 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                  <option key={num} value={num}>
                    {num === 1 ? "Tek Çekim (1 Taksit)" : `${num} Taksit`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Kategori */}
          <div className="space-y-1">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-bold text-emerald-400/40 uppercase tracking-widest">Kategori</label>
              <button
                type="button"
                onClick={() => setIsAddingNewCategory(!isAddingNewCategory)}
                className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                {isAddingNewCategory ? "← Listeye Dön" : "+ Hızlı Kategori Ekle"}
              </button>
            </div>

            {isAddingNewCategory ? (
              <div className="p-3 bg-[#04110d] border border-emerald-950 rounded-xl space-y-3 animate-in fade-in duration-150">
                <input
                  type="text"
                  placeholder="Kategori adı (örn: Kedi Maması)"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full bg-zinc-950 border border-emerald-950/60 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isNewCategoryMandatory}
                      onChange={(e) => setIsNewCategoryMandatory(e.target.checked)}
                      className="accent-emerald-500 rounded border-emerald-950"
                    />
                    Zorunlu Gider mi?
                  </label>
                  <button
                    type="button"
                    disabled={isCategorySubmitting || !newCategoryName.trim()}
                    onClick={handleCreateCategory}
                    className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-800/40 disabled:text-zinc-600 text-zinc-950 font-bold text-[11px] rounded-lg transition-all cursor-pointer"
                  >
                    {isCategorySubmitting ? "Ekleniyor..." : "Ekle"}
                  </button>
                </div>
              </div>
            ) : (
              <select
                value={currentSelectValue}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                required
                className="w-full bg-zinc-950 border border-emerald-950/60 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all cursor-pointer"
              >
                {isLoading ? (
                  <option value="">Kategoriler yükleniyor...</option>
                ) : categories.length === 0 ? (
                  <option value="">Önce kategori oluşturmalısınız</option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-[#03140e]">
                      {cat.name} {cat.isMandatory ? " (Zorunlu)" : ""}
                    </option>
                  ))
                )}
              </select>
            )}
          </div>

          {/* Açıklama */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-emerald-400/40 uppercase tracking-widest">Açıklama</label>
            <input
              type="text"
              placeholder="İşlem detayı..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-950 border border-emerald-950/60 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all font-normal"
            />
          </div>

          <button 
            type="submit" 
            disabled={isAddingNewCategory}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800/40 disabled:text-zinc-600 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/10 transition-all cursor-pointer mt-2"
          >
            İşlemi Kaydet
          </button>
        </form>
      </div>
    </div>
  );
};