import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { useWalletStore } from "../store/useWalletStore";
import { useAuthStore } from "../store/useAuthStore";

export const Profile = () => {
  const authUser = useAuthStore((state) => state.user);
  const { userProfile, fetchUserProfile } = useUserStore();
  const { wallets, fetchWallets, deleteWallet, isLoading } = useWalletStore();

  useEffect(() => {
    fetchWallets();
    if (authUser?.id) {
      fetchUserProfile(Number(authUser.id));
    }
  }, [fetchWallets, fetchUserProfile, authUser?.id]);

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

  const totalBalance = wallets.reduce((acc, curr) => acc + Number(curr.balance || 0), 0);

  return (
    <div className="w-full space-y-8 p-4 sm:p-6 lg:p-8 text-slate-100">
      {/* Header */}
      <div className="border-b border-emerald-950/40 pb-6">
        <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">Hesabım</h1>
        <p className="mt-2 text-xs text-slate-400">
          Kişisel profil detaylarınız ve aktif varlık durumunuz.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
        
        {/* SOL: Profil Kartı (5 Sütun) */}
        <div className="lg:col-span-5 bg-emerald-950/20 border border-emerald-800/30 rounded-3xl p-8 backdrop-blur-md shadow-2xl flex flex-col items-center text-center justify-between space-y-6">
          <div className="w-full flex flex-col items-center space-y-4">
            <div className="w-28 h-28 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-3xl shadow-lg shadow-emerald-500/10">
              {getInitials(userProfile?.firstName, userProfile?.lastName, userProfile?.userName)}
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-100 tracking-wide">
                {userProfile?.firstName || userProfile?.lastName
                  ? `${userProfile?.firstName || ""} ${userProfile?.lastName || ""}`.trim()
                  : userProfile?.userName || "Kullanıcı"}
              </h2>
              <span className="inline-block text-[11px] text-emerald-400 tracking-widest uppercase font-black bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
                Aktif Üye
              </span>
            </div>
          </div>

          <div className="w-full pt-6 border-t border-emerald-900/40 text-left space-y-1.5 bg-emerald-950/30 p-5 rounded-2xl border border-emerald-900/20">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              E-Posta Adresi
            </span>
            <p className="text-sm text-slate-200 font-semibold truncate">
              {userProfile?.email || "E-posta bulunamadı"}
            </p>
          </div>
        </div>

        {/* SAĞ: Cüzdanlar ve Genel Varlık Özeti (7 Sütun) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 w-full">
          
          {/* Üst Kısım: Büyük Toplam Varlık Gösterge Kartı */}
          <div className="bg-gradient-to-br from-emerald-900/30 via-emerald-950/40 to-emerald-950/20 border border-emerald-800/40 rounded-3xl p-8 shadow-2xl space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            
            <span className="text-xs font-bold text-emerald-400/80 uppercase tracking-widest block">
              Toplam Net Varlık
            </span>
            <div className="text-4xl lg:text-5xl font-black text-white tracking-tight">
              {totalBalance.toLocaleString("tr-TR")}{" "}
              <span className="text-xl font-bold text-emerald-400">₺</span>
            </div>
            <p className="text-xs text-slate-400 pt-3 border-t border-emerald-900/40">
              Kayıtlı <span className="text-emerald-400 font-bold">{wallets.length}</span> cüzdanın anlık bakiye toplamı.
            </p>
          </div>

          {/* Alt Kısım: Cüzdan Listesi */}
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-slate-100">{wallet.name}</h4>
                        <span className="text-[11px] text-slate-400 font-semibold uppercase">{wallet.currency || "TL"} Cüzdanı</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-medium block uppercase tracking-wider">Bakiye</span>
                        <span className="font-black text-emerald-400 text-xl">
                          {wallet.balance.toLocaleString("tr-TR")} {wallet.currency || "₺"}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteWallet(wallet.id)}
                        className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/20 transition-all cursor-pointer hover:scale-105"
                        title="Cüzdanı Sil"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};