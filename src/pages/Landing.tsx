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
          <a href="#about" className="hover:text-emerald-400 transition-colors">Mimari Yaklaşım</a>
          <a href="#faq" className="hover:text-emerald-400 transition-colors">Sıkça Sorulan Sorular</a>
        </nav>
      </header>

      <main className="landing-main">
        
        {/* HERO SECTION */}
        <section id="hero" className="landing-section-hero">
          <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <span className="inline-block px-5 py-2 bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold tracking-wider uppercase rounded-full mb-8">
              Kişisel Finans ve Cüzdan Yönetim Servisi
            </span>
            <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-none mb-6">
              Moneta
            </h1>
            <h2 className="text-2xl lg:text-4xl font-extrabold text-white/90 leading-tight mb-6">
              Bütçenizi Dinamik ve Güvenli Yönetin.
            </h2>
            <p className="text-sm lg:text-lg text-white/60 max-w-xl leading-relaxed mb-10">
              Birden fazla para birimiyle çalışan akıllı cüzdanlar oluşturun, harcamalarınızı anlık kategorize edin ve varlık dağılımınızı modern grafiklerle takip edin.
            </p>
            <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-6">
              <button onClick={handleStartApp} className="landing-btn-primary">
                Uygulamaya Giriş Yap
              </button>
              <label className="flex items-center gap-3 cursor-pointer text-sm text-white/60 hover:text-white transition-colors py-2 select-none">
                <input type="checkbox" checked={dontShowAgain} onChange={(e) => setDontShowAgain(e.target.checked)} className="w-5 h-5 accent-emerald-500 rounded" />
                <span>Bu ekranı bir daha gösterme</span>
              </label>
            </div>
          </div>
          <div className="flex-1 w-full max-w-2xl flex items-center justify-center mt-12 lg:mt-0">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" alt="Moneta Dashboard" className="w-full h-auto rounded-2xl shadow-2xl border border-white/10 object-cover shadow-emerald-500/5" />
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" ref={addToRefs} className="landing-section-standard reveal-section">
          <div className="text-center w-full flex flex-col items-center justify-center mb-16 lg:mb-24">
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight mb-6">
              Uygulama Yetenekleri
            </h2>
            <p className="text-white/60 text-sm lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Kapsamlı bir finansal takip sistemi için tasarlanan tüm temel modüller tek bir çatı altında.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
            <div className="landing-card">
              <div className="landing-card-icon-wrapper">
                <img src="https://img.icons8.com/fluency/48/wallet.png" alt="Çoklu Cüzdan İkonu" className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Çoklu Döviz Desteği</h3>
              <p className="text-xs lg:text-sm text-white/60 leading-relaxed flex-grow">
                Aynı anda TRY, USD, EUR ve GBP para birimlerinde bağımsız cüzdanlar oluşturun. Her cüzdanın bakiyesini ve hesap hareketlerini kendi döviz sembolüyle izole şekilde yönetin.
              </p>
            </div>
            
            <div className="landing-card">
              <div className="landing-card-icon-wrapper">
                <img src="https://img.icons8.com/fluency/48/combo-chart.png" alt="Recharts İkonu" className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Varlık Dağılım Grafiği</h3>
              <p className="text-xs lg:text-sm text-white/60 leading-relaxed flex-grow">
                Recharts kütüphanesiyle entegre Donut PieChart sayesinde, cüzdan bazında gelir ve gider oranlarınızı anlık görün. Filtrelenmiş bakiye analitiğiyle net finansal durumunuzu izleyin.
              </p>
            </div>
            
            <div className="landing-card">
              <div className="landing-card-icon-wrapper">
                <img src="https://img.icons8.com/fluency/48/tags.png" alt="Kategori İkonu" className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Esnek Kategori Yönetimi</h3>
              <p className="text-xs lg:text-sm text-white/60 leading-relaxed flex-grow">
                Sistem genelindeki hazır şablonları kullanın veya işlem esnasında modalı kapatmadan anlık olarak özel kategorinizi oluşturun. Zorunlu ve isteğe bağlı harcama etiketleriyle bütçenizi detaylandırın.
              </p>
            </div>
            
            <div className="landing-card">
              <div className="landing-card-icon-wrapper">
                <img src="https://img.icons8.com/fluency/48/synchronize.png" alt="Zustand İkonu" className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Küresel Durum Yönetimi</h3>
              <p className="text-xs lg:text-sm text-white/60 leading-relaxed flex-grow">
                Zustand tabanlı asenkron store yapısı (useWalletStore & useTransactionStore) sayesinde cüzdan ekleme, silme ve harcama güncellemelerinde arayüzü yenilemeden verileri senkronize edin.
              </p>
            </div>
          </div>
        </section>

        {/* ARCHITECTURE SECTION */}
        <section id="architecture" ref={addToRefs} className="landing-section-bg reveal-section">
          <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 flex flex-col justify-center text-center lg:text-left">
              <div className="mb-10">
                <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight mb-4">Kusursuz Teknolojik Altyapı</h2>
                <p className="text-white/60 text-sm lg:text-lg leading-relaxed">Güvenli kimlik doğrulama, optimize edilmiş API katmanları ve güçlü veri izolasyon mimarisi.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
                <div className="flex flex-col">
                  <h4 className="text-base lg:text-lg font-bold text-white border-l-2 border-emerald-500 pl-4 mb-3">Spring Boot & Security</h4>
                  <p className="text-xs lg:text-sm text-white/60 leading-relaxed">
                    Rol tabanlı JWT yetkilendirmesi, küresel exception handler yapısı ve DTO (Data Transfer Object) deseniyle güçlendirilmiş, kararlı ve yüksek performanslı RESTful mimari.
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-base lg:text-lg font-bold text-white border-l-2 border-emerald-400 pl-4 mb-3">Supabase & PostgreSQL</h4>
                  <p className="text-xs lg:text-sm text-white/60 leading-relaxed">
                    Kullanıcıya özel izole edilmiş ilişkisel veritabanı şeması. Harcamalar, cüzdanlar ve kategoriler arası veri bütünlüğü (ACID) ve hızlı indeksleme performansı.
                  </p>
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
            Moneta, karmaşık finansal araçların getirdiği kafa karışıklığını ortadan kaldırmak için modern mühendislik prensipleriyle inşa edildi. 
            Arka plandaki güçlü veri tabanı tasarımı, kullanıcıların kendilerine has harcama alışkanlıklarını güvenle saklarken; ön yüzdeki minimalist, 
            koyu tema odaklı arayüz tasarımı finansal durumunuzu en pürüzsüz ve akıcı şekilde analiz etmenizi sağlar.
          </p>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" ref={addToRefs} className="w-full px-6 py-20 lg:py-32 max-w-4xl flex flex-col items-center justify-center scroll-mt-24 border-t border-white/10 reveal-section">
          <div className="text-center w-full mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight">Sıkça Sorulan Sorular</h2>
          </div>
          <div className="flex flex-col gap-6 w-full">
            <div className="landing-card text-left shadow-lg">
              <h4 className="text-base lg:text-lg font-bold text-white mb-3">Aynı anda kaç farklı cüzdan oluşturabilirim?</h4>
              <p className="text-xs lg:text-sm text-white/60 leading-relaxed">
                Herhangi bir limit bulunmuyor. İhtiyacınıza göre farklı para birimlerinde (TRY, USD, EUR, GBP) dilediğiniz kadar nakit, banka hesabı veya kredi kartı cüzdanı tanımlayabilirsiniz.
              </p>
            </div>
            <div className="landing-card text-left shadow-lg">
              <h4 className="text-base lg:text-lg font-bold text-white mb-3">"Zorunlu Harcama" filtresi ne işe yarıyor?</h4>
              <p className="text-xs lg:text-sm text-white/60 leading-relaxed">
                İşlemlerinizi eklerken "Zorunlu" olarak işaretlediğiniz harcamalar (Kira, Faturalar vb.), keyfi harcamalarınızdan ayrıştırılarak bütçe disiplininizi daha net ölçümlemenize imkan tanır.
              </p>
            </div>
            <div className="landing-card text-left shadow-lg">
              <h4 className="text-base lg:text-lg font-bold text-white mb-3">"Bu ekranı bir daha gösterme" seçeneği nasıl çalışır?</h4>
              <p className="text-xs lg:text-sm text-white/60 leading-relaxed">
                Bu seçeneği işaretlediğinizde, tarayıcınızın yerel depolama alanına (`localStorage`) bir anahtar kaydedilir. Uygulamayı bir sonraki ziyaretinizde bu tanıtım sayfasını doğrudan atlayarak Login ekranına yönlendirilirsiniz.
              </p>
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