import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import heroImg from "../assets/hero.png";

interface ScrollAnimateProps {
  children: React.ReactNode;
  direction: "left" | "right" | "up";
}

function ScrollAnimate({ children, direction }: ScrollAnimateProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const getDirectionClass = () => {
    if (isVisible) return "opacity-100 translate-x-0 translate-y-0";
    if (direction === "left") return "opacity-0 -translate-x-24";
    if (direction === "right") return "opacity-0 translate-x-24";
    return "opacity-0 translate-y-12";
  };

  return (
    <div
      ref={domRef}
      className={`w-full transform transition-all duration-1000 ease-out ${getDirectionClass()}`}
    >
      {children}
    </div>
  );
}

export function Landing() {
  const navigate = useNavigate();
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isAlreadySkipped, setIsAlreadySkipped] = useState<boolean>(() => {
    return localStorage.getItem("skipLanding") === "true";
  });

  const handleGetStarted = () => {
    if (dontShowAgain) {
      localStorage.setItem("skipLanding", "true");
    }
    navigate("/login");
  };

  const handleRemoveSkipRule = () => {
    localStorage.removeItem("skipLanding");
    setIsAlreadySkipped(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-blue-500 selection:text-white" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      
      {/* SECTION 1: HERO */}
      <section className="px-6 py-16 md:py-24 flex flex-col items-center justify-center min-h-screen text-center max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight" style={{ color: 'var(--color-primary)' }}>
          Moneta
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mb-10 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Paranızı yönetmek hiç bu kadar kolay olmamıştı. Birden fazla dijital cüzdanı tek merkezden kontrol edin, harcamalarınızı anlık analiz edin.
        </p>
        
        <div className="w-full max-w-3xl mb-12 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border" style={{ borderColor: 'var(--bg-input)' }}>
          <img src={heroImg} alt="Moneta Preview" className="w-full h-auto object-cover" />
        </div>

        <div className="flex flex-col items-center gap-6 w-full">
          {isAlreadySkipped && (
            <div className="text-sm px-4 py-2 rounded-lg border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'rgba(234, 179, 8, 0.2)', color: 'var(--text-muted)' }}>
              Şu an otomatik geçiş kuralınız aktif.
              <button onClick={handleRemoveSkipRule} className="font-bold hover:underline ml-2" style={{ color: 'var(--color-primary)' }}>
                Kuralı İptal Et
              </button>
            </div>
          )}

          {!isAlreadySkipped && (
            <label className="flex items-center gap-3 cursor-pointer text-base transition-colors select-none" style={{ color: 'var(--text-muted)' }}>
              <input 
                type="checkbox" 
                checked={dontShowAgain} 
                onChange={(e) => setDontShowAgain(e.target.checked)} 
                className="w-5 h-5 rounded focus:ring-2 focus:ring-blue-500/50 accent-blue-500" 
                style={{ borderColor: 'var(--bg-input)', backgroundColor: 'var(--bg-input)' }}
              />
              Bir daha bu tanıtım sayfasını gösterme
            </label>
          )}

          <button 
            onClick={handleGetStarted} 
            className="px-10 py-4 rounded-xl text-lg font-bold text-white shadow-lg active:scale-95 transition-all duration-300"
            style={{ backgroundColor: 'var(--color-primary)', boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)' }}
          >
            Uygulamaya Devam Et
          </button>
        </div>
      </section>

      {/* SECTION 2: FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-24 flex flex-col gap-32 md:gap-48">
        
        {/* Özellik 1: Cüzdan Yönetimi */}
        <ScrollAnimate direction="left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="font-bold uppercase tracking-wider text-sm" style={{ color: 'var(--color-primary)' }}>Wallet Service</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Çoklu Cüzdan Altyapısı</h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Maaş hesabınız, nakit birikimleriniz veya kredi kartlarınız için saniyeler içinde bağımsız cüzdanlar oluşturun. Her cüzdanın bakiye yönetimini ve para birimini kendi içinde bağımsız olarak takip edin.
              </p>
            </div>
            <div className="p-8 md:p-10 rounded-2xl border shadow-xl transition-colors duration-300" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--bg-input)' }}>
              <div className="text-4xl mb-4">💳</div>
              <h4 className="text-xl font-semibold mb-2">Esnek Limit Kontrolü</h4>
              <p style={{ color: 'var(--text-muted)' }}>Backend entegrasyonu sayesinde cüzdanlar arası bakiyeleri güncel tutun ve transferleri hatasız yönetin.</p>
            </div>
          </div>
        </ScrollAnimate>

        {/* Özellik 2: İşlem Geçmişi */}
        <ScrollAnimate direction="right">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="p-8 md:p-10 rounded-2xl border shadow-xl transition-colors duration-300 md:order-last" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--bg-input)' }}>
              <div className="text-4xl mb-4">📊</div>
              <h4 className="text-xl font-semibold mb-2">Gelişmiş Filtreleme</h4>
              <p style={{ color: 'var(--text-muted)' }}>Tarih, miktar ve kategori filtreleriyle aradığınız harcamaya milisaniyeler içinde ulaşın.</p>
            </div>
            <div className="space-y-4 md:order-first">
              <span className="font-bold uppercase tracking-wider text-sm" style={{ color: 'var(--color-success)' }}>Transaction Store</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Detaylı Gelir ve Gider Takibi</h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Yaptığınız her harcamayı veya kazandığınız gelirleri ilgili cüzdan ile ilişkilendirerek kaydedin. Kategoriler sayesinde paranızın tam olarak nereye gittiğini görün.
              </p>
            </div>
          </div>
        </ScrollAnimate>

        {/* Özellik 3: Güvenlik */}
        <ScrollAnimate direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="font-bold uppercase tracking-wider text-sm" style={{ color: 'var(--color-danger)' }}>Secure Architecture</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Güvenli Token Tabanlı Kimlik Doğrulama</h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Moneta, kullanıcı verilerini korumak amacıyla JWT (JSON Web Token) altyapılı kimlik doğrulama mimarisi kullanır. Oturumunuz, Zustand store ve axios interceptor yapılandırmalarıyla tarayıcı katmanında kesintisiz ve güvenli bir şekilde sürdürülür.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <div className="px-6 py-4 rounded-xl border font-medium" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--bg-input)', color: 'var(--color-primary)' }}>
                %100 Güvenli Altyapı
              </div>
              <div className="px-6 py-4 rounded-xl border font-medium" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--bg-input)', color: 'var(--color-success)' }}>
                Anlık Zustand State Sync
              </div>
            </div>
          </div>
        </ScrollAnimate>

      </section>

      {/* SECTION 3: FOOTER */}
      <footer className="py-12 text-center border-t text-sm tracking-wide" style={{ borderColor: 'var(--bg-input)', color: 'var(--text-muted)' }}>
        &copy; {new Date().getFullYear()} Moneta App. Bütün hakları saklıdır. Backend & Frontend Portfolyo Projesi.
      </footer>

    </div>
  );
}