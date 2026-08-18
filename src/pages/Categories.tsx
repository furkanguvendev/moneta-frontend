import React, { useEffect, useState } from "react";
import { useCategoryStore } from "../store/useCategoryStore";
import type { CategoryResponse } from "../services/categoryService";

export const Categories = () => {
  const {
    categories,
    mandatoryCategories,
    isLoading,
    error,
    fetchCategories,
    fetchMandatoryCategories,
    createCategory,
    deleteCategory,
  } = useCategoryStore();

  const [name, setName] = useState("");
  const [isMandatory, setIsMandatory] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchMandatoryCategories();
  }, [fetchCategories, fetchMandatoryCategories]);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await createCategory({
        name,
        isMandatory,
      });
      setName("");
      setIsMandatory(false);
    } catch (err) {
      console.error("Kategori eklenirken hata oluştu:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) {
      await deleteCategory(id);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-emerald-950/40 pb-6">
        <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">
          Kategori Yönetimi
        </h1>
        <p className="text-xs text-slate-500">
          Gelir ve gider işlemleriniz için özelleştirilmiş kategorilerinizi buradan yönetebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Kategori Ekleme Formu */}
        <div className="card-premium bg-[#04110d]/60 border border-emerald-950/50 p-6 rounded-3xl space-y-4">
          <h2 className="text-base font-bold text-slate-200">Yeni Kategori Ekle</h2>

          <form onSubmit={handleAddCategory} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 pl-1">
                Kategori Adı
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Market, Kira, Fatura..."
                className="form-input-dark text-sm"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 pl-1">
                Kategori Durumu
              </label>

              <div className="flex gap-2 p-1 bg-[#03140e]/60 rounded-xl border border-emerald-950/40">
                <button
                  type="button"
                  onClick={() => setIsMandatory(false)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    !isMandatory
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "text-slate-400/60 hover:text-slate-200"
                  }`}
                >
                  Standart
                </button>
                <button
                  type="button"
                  onClick={() => setIsMandatory(true)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    isMandatory
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "text-slate-400/60 hover:text-slate-200"
                  }`}
                >
                  Zorunlu
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 mt-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
            >
              {isSubmitting ? "Ekleniyor..." : "+ Kategoriyi Kaydet"}
            </button>
          </form>
        </div>

        {/* Kategori Listesi */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-lg font-bold text-slate-200 tracking-wide">
              Mevcut Kategoriler
            </h2>
            <span className="text-xs text-emerald-400 font-semibold">
              {(categories?.length || 0) + (mandatoryCategories?.length || 0)} Kategori
            </span>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs text-red-400">
              {error}
            </div>
          )}

          {isLoading && (!categories || categories.length === 0) ? (
            <div className="p-8 text-center text-xs text-emerald-400 font-medium">
              Kategoriler yükleniyor...
            </div>
          ) : (!categories || categories.length === 0) && (!mandatoryCategories || mandatoryCategories.length === 0) ? (
            <div className="card-premium border-dashed border-2 border-emerald-500/10 p-8 text-center flex flex-col items-center justify-center">
              <p className="text-emerald-400/60 font-medium text-sm">
                Henüz kayıtlı bir kategori bulunmuyor.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Kullanıcı Kategorileri */}
              {categories?.map((cat: CategoryResponse) => (
                <div
                  key={cat.id}
                  className="group flex justify-between items-center p-4 rounded-2xl bg-[#04110d]/40 border border-emerald-950/40 hover:border-emerald-800/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-black px-2 py-1 rounded-md border ${
                        cat.isMandatory
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      }`}
                    >
                      {cat.isMandatory ? "ZORUNLU" : "ÖZEL"}
                    </span>
                    <span className="text-sm font-bold text-slate-200">
                      {cat.name}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer text-xs p-1"
                    title="Kategoriyi Sil"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Zorunlu / Sistem Kategorileri */}
              {mandatoryCategories?.map((cat: CategoryResponse) => (
                <div
                  key={`mand-${cat.id}`}
                  className="flex justify-between items-center p-4 rounded-2xl bg-[#04110d]/20 border border-slate-800/40 opacity-75"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black px-2 py-1 rounded-md border bg-slate-500/10 text-slate-400 border-slate-500/20">
                      SİSTEM
                    </span>
                    <span className="text-sm font-bold text-slate-300">
                      {cat.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};