import { useState } from "react";

interface MiniWallet {
  id: string;
  name: string;
  balance: number;
  type: string;
}

export const Profile = () => {
  const user = {
    name: "Furkan",
    surname: "Güven",
    email: "furkan@moneta.com",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
  };

  const [userWallets, setUserWallets] = useState<MiniWallet[]>([
    { id: "w1", name: "Maaş Hesabı (Nakit)", balance: 20000, type: "Dinamik Cüzdan" },
    { id: "w2", name: "Kripto Sepetim", balance: 45000, type: "Yatırım Hesabı" },
    { id: "w3", name: "Vadeli Mevduat", balance: 12500, type: "Tasarruf Hesabı" },
    { id: "w4", name: "Yedek Akçe", balance: 5000, type: "Tasarruf Hesabı" }
  ]);

  const handleDeleteWallet = (walletId: string) => {
    setUserWallets(prev => prev.filter(w => w.id !== walletId));
  };

  return (
    <div className="profile-container">
      {/* Üst Başlık */}
      <div className="profile-header">
        <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">My Account</h1>
        <p className="mt-2 text-sm text-emerald-400/60 max-w-xl">
          Kişisel bilgilerinizi görüntüleyin ve sahip olduğunuz aktif cüzdanları yönetin.
        </p>
      </div>

      <div className="profile-main-layout">
        {/* Sol Panel: Kullanıcı Profil Kartı */}
        <div className="profile-info-card">
          <img src={user.avatarUrl} alt="Avatar" className="profile-avatar" />
          <h2 className="text-2xl font-black text-slate-100 tracking-wide">{user.name} {user.surname}</h2>
          <p className="text-xs text-emerald-400/50 mt-1 tracking-widest uppercase font-bold bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
            Premium Member
          </p>
          
          <div className="profile-email-section">
            <span className="text-[10px] font-bold text-emerald-400/40 uppercase tracking-widest">Email Address</span>
            <p className="text-sm text-slate-300 font-semibold truncate">{user.email}</p>
          </div>
        </div>

        {/* Sağ Panel: Gelişmiş Cüzdan Grid Alanı */}
        <div className="profile-wallets-section">
          <h3 className="text-base font-bold text-slate-200 tracking-wide mb-4 px-1">
            Registered Wallets ({userWallets.length})
          </h3>
          
          {userWallets.length === 0 ? (
            <div className="p-12 text-center text-sm text-slate-400/40 bg-zinc-950/20 rounded-2xl border border-dashed border-emerald-950/60 w-full">
              Henüz kayıtlı bir cüzdanınız bulunmuyor.
            </div>
          ) : (
            <div className="profile-grid-structure">
              {userWallets.map((wallet) => (
                <div key={wallet.id} className="profile-mini-wallet-card">
                  {/* Kart Üst Kısım: İkon ve İsim */}
                  <div className="flex justify-between items-start w-full gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-emerald-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-100 tracking-wide">{wallet.name}</h4>
                        <span className="text-xs text-slate-400/40">{wallet.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Kart Alt Kısım: Bakiye ve Silme Butonu */}
                  <div className="flex justify-between items-end w-full mt-6">
                    <span className="font-black text-emerald-400 text-lg tracking-wide">
                      {wallet.balance.toLocaleString('tr-TR')} ₺
                    </span>
                    <button 
                      onClick={() => handleDeleteWallet(wallet.id)} 
                      className="profile-delete-btn"
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
  );
};