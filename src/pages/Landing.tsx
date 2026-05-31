import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(false);

  const handleStartApp = () => {
    if (dontShowAgain) {
      localStorage.setItem('skipLanding', 'true');
    }
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] overflow-x-hidden font-sans antialiased selection:bg-blue-500 selection:text-white flex items-center justify-center">
      
      {/* Arka Plan Işık Efektleri (Glow) */}
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-[var(--color-primary)] opacity-[0.08] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60vw] h-[60vw] bg-[var(--color-success)] opacity-[0.06] blur-[150px] rounded-full pointer-events-none" />

      {/* ================= SECTION 1: HERO ================= */}
      <section className="w-full flex items-center justify-center px-6 py-12 md:py-20 lg:px-16 xl:px-24 z-10">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 items-center">
          
          {/* Sol Kolon - Giriş ve CTA */}
          <div className="lg:col-span-6 space-y-8 md:space-y-12 text-left flex flex-col gap-8">
            <header className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--bg-card)] border border-[var(--bg-input)] text-[var(--text-primary)] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-full w-fit">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-success)] animate-pulse"></span>
                Yeni Nesil Finans Yönetimi
              </div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white select-none leading-none">
                Moneta
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] leading-tight tracking-tight">
                Finansal Özgürlüğünüzü Tasarlayın.
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-[var(--text-muted)] max-w-xl leading-relaxed">
                Gelir ve giderlerinizi takip etmenin en sade, modern ve akıllı yolu. 
                Bütçenizi kontrol altına alın, geleceğinizi güvenle planlayın.
              </p>
            </header>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center pt-4">
              <button 
                onClick={handleStartApp}
                className="px-10 py-4 bg-[var(--color-primary)] hover:bg-blue-600 text-white text-lg font-bold rounded-xl shadow-xl shadow-blue-500/15 transition-all duration-300 transform hover:-translate-y-0.5 text-center tracking-wide"
              >
                Hemen Başla
              </button>

              <label className="flex items-center gap-3 cursor-pointer select-none text-base text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors py-2 group">
                <input 
                  type="checkbox" 
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="w-5 h-5 accent-[var(--color-primary)] rounded border-[var(--bg-input)] bg-[var(--bg-main)] cursor-pointer transition-transform group-hover:scale-105"
                />
                <span>Bu ekranı bir daha gösterme</span>
              </label>
            </div>
          </div>

          {/* Sağ Kolon - Soyut 3D Maket Kartı */}
          <div className="hidden lg:block lg:col-span-6 relative w-full h-[460px] lg:h-[520px] bg-[var(--bg-card)] border border-[var(--bg-input)] rounded-2xl shadow-2xl p-8 overflow-hidden transform perspective-1000 rotate-y-[-4deg] rotate-x-[2deg] hover:rotate-y-0 hover:rotate-x-0 transition-all duration-700 ease-out">
            <div className="flex items-center gap-2 pb-5 border-b border-[var(--bg-input)] mb-8 opacity-60">
              <div className="w-3.5 h-3.5 rounded-full bg-[var(--color-danger)] opacity-60"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/60"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[var(--color-success)] opacity-60"></div>
              <div className="w-32 h-3.5 bg-[var(--bg-input)] rounded ml-4 opacity-40"></div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-5 bg-[var(--bg-input)] bg-opacity-30 rounded-xl space-y-4 border border-[var(--bg-input)] border-opacity-40">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-success)] bg-opacity-20 flex items-center justify-center text-sm">💰</div>
                  <div className="w-16 h-3 bg-[var(--text-muted)] opacity-20 rounded"></div>
                  <div className="w-24 h-5 bg-[var(--text-primary)] opacity-30 rounded"></div>
                </div>
                <div className="p-5 bg-[var(--bg-input)] bg-opacity-30 rounded-xl space-y-4 border border-[var(--bg-input)] border-opacity-40">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] bg-opacity-20 flex items-center justify-center text-sm">📊</div>
                  <div className="w-20 h-3 bg-[var(--text-muted)] opacity-20 rounded"></div>
                  <div className="w-20 h-5 bg-[var(--text-primary)] opacity-30 rounded"></div>
                </div>
              </div>

              <div className="p-6 bg-[var(--bg-input)] bg-opacity-15 rounded-xl border border-[var(--bg-input)] border-opacity-30 h-52 flex flex-col justify-between">
                <div className="w-36 h-4 bg-[var(--text-muted)] opacity-20 rounded"></div>
                <div className="flex items-end gap-4 h-32 pt-4 px-2">
                  <div className="w-full h-[35%] bg-[var(--bg-input)] rounded-t opacity-40"></div>
                  <div className="w-full h-[60%] bg-[var(--bg-input)] rounded-t opacity-40"></div>
                  <div className="w-full h-[45%] bg-[var(--color-primary)] bg-opacity-30 rounded-t border-t-2 border-[var(--color-primary)]"></div>
                  <div className="w-full h-[80%] bg-[var(--bg-input)] rounded-t opacity-40"></div>
                  <div className="w-full h-[65%] bg-[var(--color-success)] bg-opacity-30 rounded-t border-t-2 border-[var(--color-success)]"></div>
                  <div className="w-full h-[95%] bg-[var(--bg-input)] rounded-t opacity-40"></div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-90 pointer-events-none" />
          </div>

        </div>
      </section>

    </div>
  );
};