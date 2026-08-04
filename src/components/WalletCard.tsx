interface Wallet {
  id: number;
  name: string;
  balance: number;
  currency: string;
}

interface WalletCardProps {
  wallet: Wallet;
  currencySymbols: Record<string, string>;
  onNavigate: (id: number) => void;
  onDelete: (id: number) => void;
}

export const WalletCard = ({
  wallet,
  currencySymbols,
  onNavigate,
  onDelete,
}: WalletCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`"${wallet.name}" adlı cüzdanı silmek istediğinize emin misiniz?`)) {
      onDelete(wallet.id);
    }
  };

  return (
    <div
      onClick={() => onNavigate(wallet.id)}
      className="card-premium flex flex-col justify-between h-[180px] cursor-pointer hover:border-emerald-500/30 hover:scale-[1.01] transition-all duration-300 group relative"
    >
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-base text-slate-100 group-hover:text-emerald-400 transition-colors">
              {wallet.name}
            </h3>
            <span className="text-xs text-slate-500">
              Bakiye Türü: {wallet.currency}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-lg font-black text-emerald-400">
              {wallet.balance.toLocaleString("tr-TR")}{" "}
              {currencySymbols[wallet.currency] || wallet.currency}
            </span>
            <button
              onClick={handleDelete}
              className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer"
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
      </div>

      <div className="flex justify-between items-center text-xs text-slate-400/60 border-t border-emerald-950/30 pt-3">
        <span>Detayları ve İşlemleri Gör</span>
        <span className="text-emerald-400 text-sm group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
    </div>
  );
};

export const AddWalletCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="group border-2 border-dashed border-emerald-900/30 hover:border-emerald-500/30 rounded-2xl p-6 flex flex-col items-center justify-center h-[180px] cursor-pointer transition-all duration-300 bg-[#0b3324]/10 hover:bg-[#0b3324]/20"
    >
      <span className="text-sm font-bold text-slate-200 tracking-wide">
        + Yeni Cüzdan Oluştur
      </span>
    </div>
  );
};