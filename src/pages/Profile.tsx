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

  return (
    <div className="profile-container space-y-8">
      <div className="profile-header border-b border-emerald-950/40 pb-4">
        <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">My Account</h1>
        <p className="mt-2 text-xs text-slate-500 max-w-xl">
          Kişisel bilgilerinizi görüntüleyin ve hesabınıza bağlı aktif cüzdanları yönetin.
        </p>
      </div>

      <div className="profile-main-layout grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="profile-info-card bg-gradient-to-br from-[#0b3324]/20 to-transparent p-6 rounded-3xl border border-emerald-950/40 flex flex-col items-center text-center space-y-4 h-fit">
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-2xl shadow-xl shadow-emerald-500/5">
            {getInitials(userProfile?.firstName, userProfile?.lastName, userProfile?.userName)}
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-100 tracking-wide">
              {userProfile?.firstName || userProfile?.lastName
                ? `${userProfile?.firstName || ""} ${userProfile?.lastName || ""}`.trim()
                : userProfile?.userName || "Kullanıcı"}
            </h2>
            <span className="inline-block text-[10px] text-emerald-400 mt-1 tracking-widest uppercase font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Aktif Üye
            </span>
          </div>

          <div className="profile-email-section w-full pt-4 border-t border-emerald-950/40 text-left space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
              E-Posta Adresi
            </span>
            <p className="text-xs text-slate-300 font-semibold truncate">
              {userProfile?.email || "E-posta bulunamadı"}
            </p>
          </div>
        </div>

        <div className="profile-wallets-section lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-base font-bold text-slate-200 tracking-wide">
              Kayıtlı Cüzdanlar ({wallets.length})
            </h3>
          </div>

          {isLoading && wallets.length === 0 && (
            <div className="text-xs text-emerald-400 font-medium">Cüzdanlar yükleniyor...</div>
          )}

          {!isLoading && wallets.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500 bg-[#04110d]/40 rounded-3xl border border-dashed border-emerald-950/60 w-full">
              Henüz kayıtlı bir cüzdanınız bulunmuyor.
            </div>
          ) : (
            <div className="profile-grid-structure grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className="profile-mini-wallet-card p-5 rounded-2xl bg-[#04110d]/40 border border-emerald-950/40 hover:border-emerald-800/20 transition-all flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start w-full gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-100 tracking-wide">
                          {wallet.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 font-semibold uppercase">
                          {wallet.currency || "TL"} Cüzdanı
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end w-full mt-6 pt-3 border-t border-emerald-950/30">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Mevcut Bakiye</span>
                      <span className="font-black text-emerald-400 text-base tracking-wide">
                        {wallet.balance.toLocaleString("tr-TR")} {wallet.currency || "₺"}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteWallet(wallet.id)}
                      className="profile-delete-btn p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/20 transition-colors cursor-pointer"
                      title="Cüzdanı Sil"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
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
  );
};