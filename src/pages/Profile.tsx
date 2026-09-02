import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useWalletStore } from "../store/useWalletStore";
import { useAuthStore } from "../store/useAuthStore";
import { useDebtStore } from "../store/useDebtStore";
import { FaWallet, FaTrashAlt, FaEnvelope, FaUserCheck, FaEdit } from "react-icons/fa";

export const Profile: React.FC = () => {
  const authUser = useAuthStore((state) => state.user);
  const { userProfile, fetchUserProfile, updateUserProfile } = useUserStore();
  const { wallets, fetchWallets, deleteWallet, isLoading } = useWalletStore();
  const { debts, fetchUserDebts } = useDebtStore();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [budgetStartDayInput, setBudgetStartDayInput] = useState("1");
  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  useEffect(() => {
    fetchWallets();
    if (authUser?.id) {
      fetchUserProfile(Number(authUser.id));
      fetchUserDebts();
    }
  }, [fetchWallets, fetchUserProfile, fetchUserDebts, authUser?.id]);

  const handleDeleteWallet = async (walletId: number) => {
    if (window.confirm("Bu cüzdanı silmek istediğinize emin misiniz?")) {
      await deleteWallet(walletId);
    }
  };

  const getInitials = (firstName?: string, lastName?: string, userName?: string) => {
    if (firstName || lastName) {
      const first = firstName ? firstName.charAt(0).toUpperCase() : "";
      const last = lastName ? lastName.charAt(0).toUpperCase() : "";
      return `${first}${last}` || "U";
    }
    return userName ? userName.charAt(0).toUpperCase() : "U";
  };

  const getCurrencySymbol = (currency?: string) => {
    switch (currency?.toUpperCase()) {
      case "USD": return "$";
      case "EUR": return "€";
      case "GBP": return "£";
      case "TRY":
      default: return "₺";
    }
  };

  const balancesByCurrency = wallets.reduce<Record<string, number>>((acc, wallet) => {
    const curr = wallet.currency?.toUpperCase() || "TRY";
    acc[curr] = (acc[curr] || 0) + Number(wallet.balance || 0);
    return acc;
  }, {});

  const totalRemainingDebt = debts
    .filter((d) => !d.isCompleted)
    .reduce((sum, d) => sum + d.remainingAmount, 0);

  const activeDebtCount = debts.filter((d) => !d.isCompleted).length;

  const handleOpenEdit = () => {
    setFirstNameInput(userProfile?.firstName || "");
    setLastNameInput(userProfile?.lastName || "");
    setBudgetStartDayInput(String(userProfile?.budgetStartDay || 1));
    setEditError(null);
    setIsEditOpen(true);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);

    const parsedDay = parseInt(budgetStartDayInput, 10);
    if (isNaN(parsedDay) || parsedDay < 1 || parsedDay > 28) {
      setEditError("Bütçe başlangıç günü 1 ile 28 arasında olmalıdır.");
      return;
    }

    if (!authUser?.id) return;

    setIsSaving(true);
    const success = await updateUserProfile(Number(authUser.id), {
      firstName: firstNameInput.trim() || undefined,
      lastName: lastNameInput.trim() || undefined,
      budgetStartDay: parsedDay,
    });
    setIsSaving(false);

    if (success) {
      setIsEditOpen(false);
    } else {
      setEditError("Profil güncellenirken bir hata oluştu.");
    }
  };

  return (
    <div className="w-full space-y-8 p-4 sm:p-6 lg:p-8 text-slate-100 selection:bg-emerald-500 selection:text-zinc-950">
      
      <div className="border-b border-emerald-950/40 pb-6">
        <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">Hesabım</h1>
        <p className="mt-2 text-xs text-slate-400">
          Kişisel profil detaylarınız ve aktif varlık durumunuz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        
        <div className="lg:col-span-5 bg-emerald-950/20 border border-emerald-800/30 rounded-3xl p-8 backdrop-blur-md shadow-2xl flex flex-col items-center text-center justify-between space-y-6 relative">
          <button
            onClick={handleOpenEdit}
            className="absolute top-5 right-5 p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/20 transition-all cursor-pointer"
            title="Profili Düzenle"
          >
            <FaEdit className="w-4 h-4" />
          </button>

          <div className="w-full flex flex-col items-center space-y-4">
            <div className="w-28 h-28 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-3xl shadow-lg shadow-emerald-500/10">
              {getInitials(userProfile?.firstName, userProfile?.lastName, userProfile?.username || authUser?.userName)}
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-100 tracking-wide">
                {userProfile?.firstName || userProfile?.lastName
                  ? `${userProfile?.firstName || ""} ${userProfile?.lastName || ""}`.trim()
                  : userProfile?.username || authUser?.userName || "Kullanıcı"}
              </h2>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 tracking-widest uppercase font-black bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
                <FaUserCheck className="text-xs" />
                Aktif Üye
              </span>
            </div>
          </div>

          <div className="w-full pt-6 border-t border-emerald-900/40 text-left space-y-1.5 bg-emerald-950/30 p-5 rounded-2xl border border-emerald-900/20">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <FaEnvelope className="text-emerald-400" />
              E-Posta Adresi
            </span>
            <p className="text-sm text-slate-200 font-semibold truncate">
              {userProfile?.email || authUser?.email || "E-posta bulunamadı"}
            </p>
          </div>

          <div className="w-full text-left space-y-1.5 bg-emerald-950/30 p-5 rounded-2xl border border-emerald-900/20">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Bütçe Başlangıç Günü
            </span>
            <p className="text-sm text-slate-200 font-semibold">
              Her ayın {userProfile?.budgetStartDay || 1}. günü
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col space-y-6 w-full">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-emerald-900/30 via-emerald-950/40 to-emerald-950/20 border border-emerald-800/40 rounded-3xl p-8 shadow-2xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              
              <span className="text-xs font-bold text-emerald-400/80 uppercase tracking-widest block">
                Toplam Varlık Dağılımı
              </span>
              
              <div className="flex flex-wrap gap-6 items-baseline">
                {Object.keys(balancesByCurrency).length > 0 ? (
                  Object.entries(balancesByCurrency).map(([curr, amount]) => (
                    <div key={curr} className="flex items-baseline gap-1">
                      <span className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                        {amount.toLocaleString("tr-TR")}
                      </span>
                      <span className="text-lg font-bold text-emerald-400">
                        {getCurrencySymbol(curr)}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="text-2xl font-bold text-slate-400">0,00 ₺</span>
                )}
              </div>

              <p className="text-xs text-slate-400 pt-3 border-t border-emerald-900/40">
                Kayıtlı <span className="text-emerald-400 font-bold">{wallets.length}</span> cüzdanın anlık bakiye durumları.
              </p>
            </div>

            <div className="bg-gradient-to-br from-rose-900/20 via-rose-950/20 to-emerald-950/20 border border-rose-800/30 rounded-3xl p-8 shadow-2xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              
              <span className="text-xs font-bold text-rose-400/80 uppercase tracking-widest block">
                Toplam Kalan Borç
              </span>
              
              <div className="flex items-baseline gap-1">
                <span className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                  {totalRemainingDebt.toLocaleString("tr-TR")}
                </span>
                <span className="text-lg font-bold text-rose-400">₺</span>
              </div>

              <p className="text-xs text-slate-400 pt-3 border-t border-rose-900/30">
                <span className="text-rose-400 font-bold">{activeDebtCount}</span> aktif borç/taksit kaydı.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-200 tracking-wide px-1">
              Aktif Cüzdanlar
            </h3>

            {isLoading && wallets.length === 0 && (
              <div className="p-8 text-center text-xs text-emerald-400 font-medium bg-emerald-950/20 rounded-2xl border border-emerald-900/30">
                Cüzdanlar yükleniyor...
              </div>
            )}

            {!isLoading && wallets.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 bg-emerald-950/10 rounded-2xl border border-dashed border-emerald-900/40">
                Henüz kayıtlı bir cüzdanınız bulunmuyor.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 w-full">
                {wallets.map((wallet) => (
                  <div
                    key={wallet.id}
                    className="p-5 bg-emerald-950/30 hover:bg-emerald-950/40 rounded-2xl border border-emerald-800/30 hover:border-emerald-500/40 transition-all duration-300 shadow-lg flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 group-hover:scale-105 transition-transform">
                        <FaWallet className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-slate-100">{wallet.name}</h4>
                        <span className="text-[11px] text-slate-400 font-semibold uppercase">
                          {wallet.currency || "TRY"} Cüzdanı
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-medium block uppercase tracking-wider">
                          Bakiye
                        </span>
                        <span className="font-black text-emerald-400 text-xl">
                          {Number(wallet.balance).toLocaleString("tr-TR")} {getCurrencySymbol(wallet.currency)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteWallet(wallet.id)}
                        className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/20 transition-all cursor-pointer hover:scale-105"
                        title="Cüzdanı Sil"
                      >
                        <FaTrashAlt className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#03140e] border border-emerald-950/60 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-emerald-950/40">
              <h3 className="text-md font-bold text-white tracking-wide">Profili Düzenle</h3>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-emerald-400/40 uppercase tracking-widest">Ad</label>
                <input
                  type="text"
                  value={firstNameInput}
                  onChange={(e) => setFirstNameInput(e.target.value)}
                  placeholder="Adınız"
                  className="w-full bg-zinc-950 border border-emerald-950/60 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-emerald-400/40 uppercase tracking-widest">Soyad</label>
                <input
                  type="text"
                  value={lastNameInput}
                  onChange={(e) => setLastNameInput(e.target.value)}
                  placeholder="Soyadınız"
                  className="w-full bg-zinc-950 border border-emerald-950/60 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-emerald-400/40 uppercase tracking-widest">
                  Bütçe Başlangıç Günü (1-28)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={budgetStartDayInput}
                  onChange={(e) => setBudgetStartDayInput(e.target.value)}
                  placeholder="1"
                  className="w-full bg-zinc-950 border border-emerald-950/60 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
                />
                <p className="text-[10px] text-slate-500">Aylık bütçe döneminizin hangi günden başlayacağını belirler.</p>
              </div>

              {editError && (
                <p className="text-xs text-rose-400 font-semibold">{editError}</p>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800/40 disabled:text-zinc-600 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/10 transition-all cursor-pointer mt-2"
              >
                {isSaving ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};