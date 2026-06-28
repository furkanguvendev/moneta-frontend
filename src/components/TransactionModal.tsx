import React, { useState } from "react";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { amount: number; transactionType: "INCOME" | "EXPENSE"; description: string; categoryId: string }) => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, onSave }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [categoryId, setCategoryId] = useState("yemek");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    onSave({ amount: parseFloat(amount), transactionType: type, description, categoryId });
    setAmount("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-md bg-[#03140e] border border-emerald-950 rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center pb-4 border-b border-emerald-950/40">
          <h3 className="text-md font-bold text-white tracking-wide">Yeni İşlem Ekle</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors cursor-pointer">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-950/60 rounded-xl border border-emerald-950/40">
            <button
              type="button"
              onClick={() => setType("EXPENSE")}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${type === "EXPENSE" ? "bg-rose-500/20 text-rose-400" : "text-slate-400"}`}
            >
              Gider (-)
            </button>
            <button
              type="button"
              onClick={() => setType("INCOME")}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${type === "INCOME" ? "bg-emerald-500/20 text-emerald-400" : "text-slate-400"}`}
            >
              Gelir (+)
            </button>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-emerald-400/40 uppercase tracking-widest">Tutar (₺)</label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-input-dark text-lg"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-emerald-400/40 uppercase tracking-widest">Kategori</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="form-input-dark text-sm text-slate-300 appearance-none"
            >
              <option value="yemek" className="bg-[#03140e]">Yemek & Eğlence</option>
              <option value="diger" className="bg-[#03140e]">Diğer Harcamalar / Yatırım</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-emerald-400/40 uppercase tracking-widest">Açıklama</label>
            <input
              type="text"
              placeholder="İşlem detayı..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input-dark text-sm font-normal"
            />
          </div>

          <button type="submit" className="w-full mt-2 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer">
            İşlemi Kaydet
          </button>
        </form>
      </div>
    </div>
  );
};