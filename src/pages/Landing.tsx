import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(false);
  const sectionsRef = useRef<HTMLElement[]>([]);

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
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="landing-container">
      
      {/* HEADER SECTION */}
      <header className="landing-header">
        <div className="flex items-center gap-4">
          <img src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=64&auto=format&fit=crop&q=80" alt="Moneta Logo" className="w-8 h-8 rounded-lg object-cover" />
          <span className="text-xl font-black tracking-tight text-white">Moneta</span>
        </div>
        <nav className="landing-nav">
          <a href="#features" className="hover:text-emerald-400 transition-colors">Özellikler</a>
          <a href="#architecture" className="hover:text-emerald-400 transition-colors">Teknoloji Altyapısı</a>
          <a href="#about" className="hover:text-emerald-400 transition-colors">Hakkımızda</a>
          <a href="#faq" className="hover:text-emerald-400 transition-colors">Sıkça Sorulan Sorular</a>
        </nav>
      </header>

      <main className="landing-main">
        
        {/* HERO SECTION */}
        <section id="hero" className="landing-section-hero">
          <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <span className="inline-block px-5 py-2 bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold tracking-wider uppercase rounded-full mb-8">
              Yeni Nesil Finans Yönetimi
            </span>
            <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-none mb-6">
              Moneta
            </h1>
            <h2 className="text-2xl lg:text-4xl font-extrabold text-white/90 leading-tight mb-6">
              Finansal Özgürlüğünüzü Tasarlayın.
            </h2>
            <p className="text-sm lg:text-lg text-white/60 max-w-xl leading-relaxed mb-10">
              Gelir ve giderlerinizi takip etmenin en sade, modern ve akıllı yolu. 
              Bütçenizi kontrol altına edin, geleceğinizi güvenle planlayın.
            </p>
            <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-6">
              <button onClick={handleStartApp} className="landing-btn-primary">
                Hemen Başla
              </button>
              <label className="flex items-center gap-3 cursor-pointer text-sm text-white/60 hover:text-white transition-colors py-2 select-none">
                <input type="checkbox" checked={dontShowAgain} onChange={(e) => setDontShowAgain(e.target.checked)} className="w-5 h-5 accent-emerald-500 rounded" />
                <span>Bu ekranı bir daha gösterme</span>
              </label>
            </div>
          </div>
          <div className="flex-1 w-full max-w-2xl flex items-center justify-center mt-12 lg:mt-0">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" alt="Moneta Dashboard Mockup" className="w-full h-auto rounded-2xl shadow-2xl border border-white/10 object-cover shadow-emerald-500/5" />
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" ref={addToRefs} className="landing-section-standard reveal-section">
          <div className="text-center w-full flex flex-col items-center justify-center mb-16 lg:mb-24">
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight mb-6">
              Moneta İle Neler Yapabilirsiniz?
            </h2>
            <p className="text-white/60 text-sm lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Paranızı yönetmek hiç bu kadar kolay ve anlaşılır olmamıştı.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
            <div className="landing-card">
              <div className="landing-card-icon-wrapper">
                <img src="https://img.icons8.com/fluency/48/wallet.png" alt="Gelir Gider İkonu" className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Gelir ve Gider Takibi</h3>
              <p className="text-xs lg:text-sm text-white/60 leading-relaxed flex-grow">Tüm nakit akışınızı, cüzdan hareketlerinizi tek bir ekrandan anlık olarak kaydedin. İşlemlerinizi kategorize ederek nereye ne harcadığınızı net olarak görün.</p>
            </div>
            
            <div className="landing-card">
              <div className="landing-card-icon-wrapper">
                <img src="https://img.icons8.com/fluency/48/combo-chart.png" alt="Grafik İkonu" className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Gelişmiş Analizler</h3>
              <p className="text-xs lg:text-sm text-white/60 leading-relaxed flex-grow">Harcama alışkanlıklarınızı dinamik ve anlaşılır analitik grafiklerle inceleyin. DTO yapısıyla optimize edilmiş veri akışı sayesinde bütçenizin durumunu raporlarla kontrol altında tutun.</p>
            </div>
            
            <div className="landing-card">
              <div className="landing-card-icon-wrapper">
                <img src="https://img.icons8.com/fluency/48/shield.png" alt="Güvenlik İkonu" className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Güvenli Kimlik Doğrulama</h3>
              <p className="text-xs lg:text-sm text-white/60 leading-relaxed flex-grow">Hesabınız ve finansal verileriniz Spring Security altyapısı ile koruma altındadır. Güvenli giriş ve yetkilendirme katmanları sayesinde cüzdan verilerinize sadece siz erişebilirsiniz.</p>
            </div>
            
            <div className="landing-card">
              <div className="landing-card-icon-wrapper">
                <img src="https://img.icons8.com/fluency/48/target.png" alt="Hedef İkonu" className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Bütçe Planlama</h3>
              <p className="text-xs lg:text-sm text-white/60 leading-relaxed flex-grow">Geleceğe yönelik harcamalarınızı güvenle planlayın. Aylık bütçenizi yapılandırarak beklenmedik giderlerin önüne geçin ve finansal sınırlarınızı kendiniz belirleyin.</p>
            </div>
          </div>
        </section>

        {/* ARCHITECTURE SECTION */}
        <section id="architecture" ref={addToRefs} className="landing-section-bg reveal-section">
          <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 flex flex-col justify-center text-center lg:text-left">
              <div className="mb-10">
                <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight mb-4">Güçlü ve Kararlı Altyapı</h2>
                <p className="text-white/60 text-sm lg:text-lg leading-relaxed">Arka planda çalışan teknolojilerimiz, finansal işlemlerinizin güvenliğini ve hızını garanti eder.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
                <div className="flex flex-col">
                  <h4 className="text-base lg:text-lg font-bold text-white border-l-2 border-emerald-500 pl-4 mb-3">Spring Boot & RESTful API</h4>
                  <p className="text-xs lg:text-sm text-white/60 leading-relaxed">Temiz istisna yönetimi ve optimize edilmiş veri transfer nesneleri (DTOs) ile mimari açıdan kusursuz, hızlı ve kararlı bir API deneyimi sunuyoruz.</p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-base lg:text-lg font-bold text-white border-l-2 border-emerald-400 pl-4 mb-3">Supabase & PostgreSQL</h4>
                  <p className="text-xs lg:text-sm text-white/60 leading-relaxed">Finansal verileriniz bulut üzerinde, ilişkisel veri tabanı modellemesiyle esnek ve veri bütünlüğü tam olarak korunarak saklanır.</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full max-w-xl flex items-center justify-center mt-12 lg:mt-0">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80" alt="Moneta Mimari Entegrasyon Şeması" className="w-full h-auto rounded-xl border border-white/10 object-cover shadow-2xl" />
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" ref={addToRefs} className="w-full px-6 py-12 max-w-4xl text-center flex flex-col items-center justify-center scroll-mt-24 reveal-section">
          <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight mb-8">Neden Moneta?</h2>
          <p className="text-sm lg:text-xl text-white/70 leading-relaxed font-light max-w-3xl">
            Moneta, karmaşık finansal tablolar ve anlaşılması zor muhasebe terimleri yerine, 
            size paranızın kontrolünü tamamen sade ve kullanıcı dostu bir arayüzle sunmak için tasarlandı. 
            Mühendislik disipliniyle geliştirilen güçlü backend mimarisi ve ilişkisel veritabanı entegrasyonu sayesinde 
            işlemleriniz her zaman hızlı, tutarlı ve yüksek standartlarda güvenlidir.
          </p>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" ref={addToRefs} className="w-full px-6 py-20 lg:py-32 max-w-4xl flex flex-col items-center justify-center scroll-mt-24 border-t border-white/10 reveal-section">
          <div className="text-center w-full mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight">Sıkça Sorulan Sorular</h2>
          </div>
          <div className="flex flex-col gap-6 w-full">
            <div className="landing-card text-left shadow-lg">
              <h4 className="text-base lg:text-lg font-bold text-white mb-3">Moneta'yı kullanmak ücretli mi?</h4>
              <p className="text-xs lg:text-sm text-white/60 leading-relaxed">Moneta'nın temel bütçe, gelir-gider takibi ve analiz özelliklerini tamamen ücretsiz olarak kullanmaya başlayabilirsiniz.</p>
            </div>
            <div className="landing-card text-left shadow-lg">
              <h4 className="text-base lg:text-lg font-bold text-white mb-3">Verilerim ne kadar güvende?</h4>
              <p className="text-xs lg:text-sm text-white/60 leading-relaxed">Verileriniz, Spring Security şifreleme protokolleri ve Supabase bulut veritabanı koruması altında, tamamen izole and ilişkisel veri bütünlüğü sağlanarak saklanır.</p>
            </div>
            <div className="landing-card text-left shadow-lg">
              <h4 className="text-base lg:text-lg font-bold text-white mb-3">"Bu ekranı bir daha gösterme" seçeneği nasıl çalışır?</h4>
              <p className="text-xs lg:text-sm text-white/60 leading-relaxed">Bu seçeneği işaretleyip giriş yaptığınızda, tarayıcınızın yerel depolama alanı (localStorage) üzerinde bir değer tutulur ve Moneta'yı her açtığınızda sizi doğrudan giriş ekranına yönlendirir.</p>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER SECTION */}
      <footer className="w-full py-12 border-t border-white/10 text-center text-xs text-white/40 bg-[#062419]">
        <p>&copy; 2026 Moneta. Tüm Hakları Saklıdır.</p>
      </footer>

    </div>
  );
};