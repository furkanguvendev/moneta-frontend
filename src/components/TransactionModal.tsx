import React, { useState, useEffect } from "react";
import { useCategoryStore } from "../store/useCategoryStore";

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
  }) => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, walletId, onSave }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
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

    onSave({ 
      amount: parseFloat(amount), 
      transactionType: type, 
      description, 
      categoryId: Number(finalCategoryId),
      walletId: walletId
    });

    setAmount("");
    setCategoryId("");
    setDescription("");
    onClose();
  };

  const currentSelectValue = categoryId || (categories.length > 0 ? categories[0].id : "");

  return (
    /* fixed inset-0 z-50 flex items-center justify-center sınıfları eklendi */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="modal-container w-full max-w-md bg-[#03140e] border border-emerald-950/60 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center pb-4 border-b border-emerald-950/40">
          <h3 className="text-md font-bold text-white tracking-wide">Yeni İşlem Ekle</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors cursor-pointer">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-950/60 rounded-xl border border-emerald-950/40">
            <button
              type="button"
              onClick={() => setType("EXPENSE")}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${type === "EXPENSE" ? "bg-rose-500/20 text-rose-400" : "text-slate-400"}`}
            >
              Gider (-)
            </button>
            <button
              type="button"
              onClick={() => setType("INCOME")}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${type === "INCOME" ? "bg-emerald-500/20 text-emerald-400" : "text-slate-400"}`}
            >
              Gelir (+)
            </button>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-emerald-400/40 uppercase tracking-widest">Tutar</label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-dark text-lg font-semibold"
            />
          </div>

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
                className="select-dark"
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

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-emerald-400/40 uppercase tracking-widest">Açıklama</label>
            <input
              type="text"
              placeholder="İşlem detayı..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-dark font-normal"
            />
          </div>

          <button 
            type="submit" 
            disabled={isAddingNewCategory}
            className="btn-emerald mt-2 uppercase tracking-wider text-xs"
          >
            İşlemi Kaydet
          </button>
        </form>
      </div>
    </div>
  );
};