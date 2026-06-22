export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Sayfa Başlığı */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Finansal Rapor</h1>
        <p className="text-xs text-emerald-400/60 mt-0.5">Moneta anlık cüzdan ve harcama analizleri</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-premium border-l-4 border-l-emerald-500 bg-gradient-to-br from-[#0b3324]/60 to-transparent">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400/50">Aylık Toplam</div>
          <div className="text-lg font-bold mt-2 text-white">
            {"Gelir Burada Yazacak"}
          </div>
        </div>
        
        <div className="card-premium border-l-4 border-l-rose-500">
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-400/50">Aylık Toplam</div>
          <div className="text-lg font-bold mt-2 text-white">
            {"Gider Burada Yazacak"}
          </div>
        </div>

        <div className="card-premium border-l-4 border-l-sky-500">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-400/50">Hesap Özeti</div>
          <div className="text-lg font-bold mt-2 text-white">
            {"Güncel Bakiye Burada Yazacak"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-premium flex items-center justify-center min-h-[280px] border-dashed border-2 border-emerald-500/20 text-center p-8">
          <p className="text-emerald-400 font-medium text-sm leading-relaxed max-w-md">
            {"Gelir, Gider ve Kalan Bakiye Buarada normal liste olarak yazacak"}
          </p>
        </div>
        <div className="card-premium flex flex-col justify-center items-center min-h-[280px] border-dashed border-2 border-emerald-500/20 text-center p-6">
          <div className="w-24 h-24 rounded-full border-4 border-emerald-500/10 border-t-emerald-500 animate-spin-[linear_3s_infinite] mb-4" />
          <p className="text-emerald-400 font-medium text-xs leading-relaxed">
            {"Gelir, gider ve kalan bakiye pasta dilimi grafik olarak burada olacak"}
          </p>
        </div>
      </div>

      <div className="card-premium flex items-center justify-center min-h-[220px] border-dashed border-2 border-emerald-500/20 text-center p-8">
        <p className="text-emerald-400 font-medium text-sm leading-relaxed max-w-2xl">
          {"Bu bölümde de tam olareak bilmiyorum ama geçmiş de dahil bileşik olarak gelir gider kalan para yazsın önceki aylar da dahil mesela bilemedim ama öyle birşey"}
        </p>
      </div>
    </div>
  );
};