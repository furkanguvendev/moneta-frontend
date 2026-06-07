import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(false);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  const handleStartApp = () => {
    if (dontShowAgain) {
      localStorage.setItem('skipLanding', 'true');
    }
    navigate('/login');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] font-sans antialiased overflow-x-hidden">

      <header className="sticky top-0 z-50 w-full flex items-center justify-between px-6 py-5 bg-[var(--bg-main)]/90 backdrop-blur-md border-b border-[var(--bg-input)] md:px-16 lg:px-24">
        <div className="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=64&auto=format&fit=crop&q=80" alt="Moneta Logo" className="w-8 h-8 rounded-lg object-cover" />
          <span className="text-xl font-black tracking-tight text-white">Moneta</span>
        </div>
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[var(--text-muted)]">
          <a href="#features" className="hover:text-white transition-colors">Özellikler</a>
          <a href="#architecture" className="hover:text-white transition-colors">Teknoloji Altyapısı</a>
          <a href="#about" className="hover:text-white transition-colors">Hakkımızda</a>
          <a href="#faq" className="hover:text-white transition-colors">Sıkça Sorulan Sorular</a>
        </nav>
      </header>

      <main className="w-full flex flex-col items-center space-y-24 md:space-y-40 lg:space-y-48 pb-24">
        
        {/* HERO SECTION */}
        <section id="hero" className="w-full min-h-[calc(100vh-73px)] flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 px-6 py-12 md:px-16 lg:px-24 max-w-7xl">
          <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8">
            <span className="inline-block px-4 py-1.5 bg-[var(--bg-card)] border border-[var(--bg-input)] text-[var(--color-success)] text-xs font-bold tracking-wider uppercase rounded-full">
              Yeni Nesil Finans Yönetimi
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">Moneta</h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] leading-tight">Finansal Özgürlüğünüzü Tasarlayın.</h2>
            <p className="text-sm md:text-base lg:text-lg text-[var(--text-muted)] max-w-xl leading-relaxed">
              Gelir ve giderlerinizi takip etmenin en sade, modern ve akıllı yolu. 
              Bütçenizi kontrol altına edin, geleceğinizi güvenle planlayın.
            </p>
            <div className="w-full flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button onClick={handleStartApp} className="w-full sm:w-auto px-8 py-4 bg-[var(--color-primary)] hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                Hemen Başla
              </button>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-[var(--text-muted)] hover:text-white transition-colors py-2 select-none">
                <input type="checkbox" checked={dontShowAgain} onChange={(e) => setDontShowAgain(e.target.checked)} className="w-4 h-4 accent-[var(--color-primary)] rounded" />
                <span>Bu ekranı bir daha gösterme</span>
              </label>
            </div>
          </div>
          <div className="flex-1 w-full max-w-2xl flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" alt="Moneta Dashboard Mockup" className="w-full h-auto rounded-2xl shadow-2xl border border-[var(--bg-input)] object-cover shadow-blue-500/5" />
          </div>
        </section>

        <section id="features" ref={addToRefs} className="reveal-section w-full px-6 py-12 md:px-16 lg:px-24 max-w-7xl space-y-16 md:space-y-24 border-t border-[var(--bg-input)]/30 scroll-mt-24">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">Moneta İle Neler Yapabilirsiniz?</h2>
            <p className="text-[var(--text-muted)] max-w-xl mx-auto text-sm md:text-base lg:text-lg">Paranızı yönetmek hiç bu kadar kolay ve anlaşılır olmamıştı.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
            <div className="p-6 md:p-8 bg-[var(--bg-card)] border border-[var(--bg-input)] rounded-2xl flex flex-col space-y-5 hover:border-[var(--color-primary)]/50 transition-all duration-300 shadow-xl">
              <div className="w-14 h-14 bg-[var(--bg-input)] rounded-xl flex items-center justify-center flex-shrink-0">
                <img src="https://img.icons8.com/fluency/48/wallet.png" alt="Gelir Gider İkonu" className="w-8 h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Gelir ve Gider Takibi</h3>
              <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed flex-grow">Tüm nakit akışınızı, cüzdan hareketlerinizi tek bir ekrandan anlık olarak kaydedin. İşlemlerinizi kategorize ederek nereye ne harcadığınızı net olarak görün.</p>
            </div>
            <div className="p-6 md:p-8 bg-[var(--bg-card)] border border-[var(--bg-input)] rounded-2xl flex flex-col space-y-5 hover:border-[var(--color-primary)]/50 transition-all duration-300 shadow-xl">
              <div className="w-14 h-14 bg-[var(--bg-input)] rounded-xl flex items-center justify-center flex-shrink-0">
                <img src="https://img.icons8.com/fluency/48/combo-chart.png" alt="Grafik İkonu" className="w-8 h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Gelişmiş Analizler</h3>
              <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed flex-grow">Harcama alışkanlıklarınızı dinamik ve anlaşılır analitik grafiklerle inceleyin. DTO yapısıyla optimize edilmiş veri akışı sayesinde bütçenizin durumunu raporlarla kontrol altında tutun.</p>
            </div>
            <div className="p-6 md:p-8 bg-[var(--bg-card)] border border-[var(--bg-input)] rounded-2xl flex flex-col space-y-5 hover:border-[var(--color-primary)]/50 transition-all duration-300 shadow-xl">
              <div className="w-14 h-14 bg-[var(--bg-input)] rounded-xl flex items-center justify-center flex-shrink-0">
                <img src="https://img.icons8.com/fluency/48/shield.png" alt="Güvenlik İkonu" className="w-8 h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Güvenli Kimlik Doğrulama</h3>
              <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed flex-grow">Hesabınız ve finansal verileriniz Spring Security altyapısı ile koruma altındadır. Güvenli giriş ve yetkilendirme katmanları sayesinde cüzdan verilerinize sadece siz erişebilirsiniz.</p>
            </div>
            <div className="p-6 md:p-8 bg-[var(--bg-card)] border border-[var(--bg-input)] rounded-2xl flex flex-col space-y-5 hover:border-[var(--color-primary)]/50 transition-all duration-300 shadow-xl">
              <div className="w-14 h-14 bg-[var(--bg-input)] rounded-xl flex items-center justify-center flex-shrink-0">
                <img src="https://img.icons8.com/fluency/48/target.png" alt="Hedef İkonu" className="w-8 h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Bütçe Planlama</h3>
              <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed flex-grow">Geleceğe yönelik harcamalarınızı güvenle planlayın. Aylık bütçenizi yapılandırarak beklenmedik giderlerin önüne geçin ve finansal sınırlarınızı kendiniz belirleyin.</p>
            </div>
          </div>
        </section>

        <section id="architecture" ref={addToRefs} className="reveal-section w-full px-6 py-16 bg-[var(--bg-card)] border-y border-[var(--bg-input)] md:px-16 lg:px-24 flex justify-center scroll-mt-24">
          <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-8 md:space-y-10 text-center lg:text-left">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">Güçlü ve Kararlı Altyapı</h2>
                <p className="text-[var(--text-muted)] text-sm md:text-base lg:text-lg">Arka planda çalışan teknolojilerimiz, finansal işlemlerinizin güvenliğini ve hızını garanti eder.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 text-left">
                <div className="space-y-3">
                  <h4 className="text-base md:text-lg font-bold text-white border-l-2 border-[var(--color-primary)] pl-3">Spring Boot & RESTful API</h4>
                  <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">Temiz istisna yönetimi (clean exception handling) ve optimize edilmiş veri transfer nesneleri (DTOs) ile mimari açıdan kusursuz, hızlı ve kararlı bir API deneyimi sunuyoruz.</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-base md:text-lg font-bold text-white border-l-2 border-[var(--color-success)] pl-3">Supabase & PostgreSQL</h4>
                  <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">Finansal verileriniz bulut üzerinde, ilişkisel veri tabanı modellemesiyle esnek ve veri bütünlüğü (data integrity) tam olarak korunarak saklanır.</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full max-w-xl flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80" alt="Moneta Mimari Entegrasyon Şeması" className="w-full h-auto rounded-xl border border-[var(--bg-input)] object-cover shadow-2xl" />
            </div>
          </div>
        </section>

        <section id="about" ref={addToRefs} className="reveal-section w-full px-6 py-4 md:px-16 lg:px-24 max-w-4xl text-center space-y-6 md:space-y-8 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">Neden Moneta?</h2>
          <p className="text-sm md:text-base lg:text-xl text-[var(--text-muted)] leading-relaxed font-light">
            Moneta, karmaşık finansal tablolar ve anlaşılması zor muhasebe terimleri yerine, 
            size paranızın kontrolünü tamamen sade ve kullanıcı dostu bir arayüzle sunmak için tasarlandı. 
            Mühendislik disipliniyle geliştirilen güçlü backend mimarisi ve ilişkisel veritabanı entegrasyonu sayesinde 
            işlemleriniz her zaman hızlı, tutarlı ve yüksek standartlarda güvenlidir.
          </p>
        </section>

        <section id="faq" ref={addToRefs} className="reveal-section w-full px-6 py-12 md:px-16 lg:px-24 max-w-4xl space-y-12 md:space-y-16 scroll-mt-24 border-t border-[var(--bg-input)]/30">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">Sıkça Sorulan Sorular</h2>
          </div>
          <div className="space-y-4 md:space-y-6 w-full">
            <div className="p-6 md:p-7 bg-[var(--bg-card)] border border-[var(--bg-input)] rounded-2xl space-y-2 md:space-y-3 text-left shadow-lg">
              <h4 className="text-base md:text-lg font-bold text-white">Moneta'yı kullanmak ücretli mi?</h4>
              <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">Moneta'nın temel bütçe, gelir-gider takibi ve analiz özelliklerini tamamen ücretsiz olarak kullanmaya başlayabilirsiniz.</p>
            </div>
            <div className="p-6 md:p-7 bg-[var(--bg-card)] border border-[var(--bg-input)] rounded-2xl space-y-2 md:space-y-3 text-left shadow-lg">
              <h4 className="text-base md:text-lg font-bold text-white">Verilerim ne kadar güvende?</h4>
              <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">Verileriniz, Spring Security şifreleme protokolleri ve Supabase bulut veritabanı koruması altında, tamamen izole and ilişkisel veri bütünlüğü sağlanarak saklanır.</p>
            </div>
            <div className="p-6 md:p-7 bg-[var(--bg-card)] border border-[var(--bg-input)] rounded-2xl space-y-2 md:space-y-3 text-left shadow-lg">
              <h4 className="text-base md:text-lg font-bold text-white">"Bu ekranı bir daha gösterme" seçeneği nasıl çalışır?</h4>
              <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">Bu seçeneği işaretleyip giriş yaptığınızda, tarayıcınızın yerel depolama alanı (localStorage) üzerinde bir değer tutulur ve Moneta'yı her açtığınızda sizi doğrudan giriş ekranına yönlendirir.</p>
            </div>
          </div>
        </section>

      </main>

      <footer className="w-full py-10 border-t border-[var(--bg-input)] text-center text-xs text-[var(--text-muted)] bg-[var(--bg-main)]">
        <p>&copy; 2026 Moneta. Tüm Hakları Saklıdır.</p>
      </footer>

    </div>
  );
};