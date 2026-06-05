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
    <div>
      
      <header>
        <div>
          <img src="/assets/logo.svg" alt="Moneta Logo" />
          <span>Moneta</span>
        </div>
        <nav>
          <a href="#features">Özellikler</a>
          <a href="#architecture">Teknoloji Altyapısı</a>
          <a href="#about">Hakkımızda</a>
          <a href="#faq">Sıkça Sorulan Sorular</a>
        </nav>
      </header>

      <main>
        
        <section id="hero">
          <div>
            <span>Yeni Nesil Finans Yönetimi</span>
            <h1>Moneta</h1>
            <h2>Finansal Özgürlüğünüzü Tasarlayın.</h2>
            <p>
              Gelir ve giderlerinizi takip etmenin en sade, modern ve akıllı yolu. 
              Bütçenizi kontrol altına alın, geleceğinizi güvenle planlayın.
            </p>
          </div>

          <div>
            <button onClick={handleStartApp}>Hemen Başla</button>
            <label>
              <input 
                type="checkbox" 
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
              />
              <span>Bu ekranı bir daha gösterme</span>
            </label>
          </div>

          <div>
            <img src="/assets/hero-dashboard-mockup.png" alt="Moneta Dijital Cüzdan Genel Bakış Ekranı" />
          </div>
        </section>

        <section id="features">
          <div>
            <h2>Moneta İle Neler Yapabilirsiniz?</h2>
            <p>Paranızı yönetmek hiç bu kadar kolay ve anlaşılır olmamıştı.</p>
          </div>

          <div>
            <div>
              <img src="/assets/icons/wallet.svg" alt="Gelir Gider İkonu" />
              <h3>Gelir ve Gider Takibi</h3>
              <p>Tüm nakit akışınızı, cüzdan hareketlerinizi tek bir ekrandan anlık olarak kaydedin. İşlemlerinizi kategorize ederek nereye ne harcadığınızı net olarak görün.</p>
            </div>

            <div>
              <img src="/assets/icons/analytics.svg" alt="Grafik İkonu" />
              <h3>Gelişmiş Analizler ve Grafik</h3>
              <p>Harcama alışkanlıklarınızı dinamik ve anlaşılır analitik grafiklerle inceleyin. DTO yapısıyla optimize edilmiş veri akışı sayesinde bütçenizin durumunu raporlarla kontrol altında tutun.</p>
            </div>

            <div>
              <img src="/assets/icons/shield.svg" alt="Güvenlik İkonu" />
              <h3>Güvenli Kimlik Doğrulama</h3>
              <p>Hesabınız ve finansal verileriniz Spring Security altyapısı ile koruma altındadır. Güvenli giriş ve yetkilendirme katmanları sayesinde cüzdan verilerinize sadece siz erişebilirsiniz.</p>
            </div>

            <div>
              <img src="/assets/icons/target.svg" alt="Hedef İkonu" />
              <h3>Bütçe Planlama</h3>
              <p>Geleceğe yönelik harcamalarınızı güvenle planlayın. Aylık bütçenizi yapılandırarak beklenmedik giderlerin önüne geçin ve finansal sınırlarınızı kendiniz belirleyin.</p>
            </div>
          </div>
        </section>

        <section id="architecture">
          <div>
            <h2>Güçlü ve Kararlı Altyapı</h2>
            <p>Arka planda çalışan teknolojilerimiz, finansal işlemlerinizin güvenliğini ve hızını garanti eder.</p>
          </div>

          <div>
            <div>
              <h4>Spring Boot & RESTful API</h4>
              <p>Temiz istisna yönetimi (clean exception handling) ve optimize edilmiş veri transfer nesneleri (DTOs) ile mimari açıdan kusursuz, hızlı ve kararlı bir API deneyimi sunuyoruz.</p>
            </div>

            <div>
              <h4>Supabase & PostgreSQL</h4>
              <p>Finansal verileriniz bulut üzerinde, ilişkisel veri tabanı modellemesiyle esnek ve veri bütünlüğü (data integrity) tam olarak korunarak saklanır.</p>
            </div>
          </div>
          
          <div>
            <img src="/assets/architecture-diagram.png" alt="Moneta Altyapı ve Veri Entegrasyon Şeması" />
          </div>
        </section>

        <section id="about">
          <div>
            <h2>Neden Moneta?</h2>
            <p>
              Moneta, karmaşık finansal tablolar ve anlaşılması zor muhasebe terimleri yerine, 
              size paranızın kontrolünü tamamen sade ve kullanıcı dostu bir arayüzle sunmak için tasarlandı. 
              Mühendislik disipliniyle geliştirilen güçlü backend mimarisi ve ilişkisel veritabanı entegrasyonu sayesinde 
              işlemleriniz her zaman hızlı, tutarlı ve yüksek standartlarda güvenlidir.
            </p>
          </div>
        </section>

        <section id="faq">
          <div>
            <h2>Sıkça Sorulan Sorular</h2>
          </div>

          <div>
            <div>
              <h4>Moneta'yı kullanmak ücretli mi?</h4>
              <p>Moneta'nın temel bütçe, gelir-gider takibi ve analiz özelliklerini tamamen ücretsiz olarak kullanmaya başlayabilirsiniz.</p>
            </div>

            <div>
              <h4>Verilerim ne kadar güvende?</h4>
              <p>Verileriniz, Spring Security şifreleme protokolleri ve Supabase bulut veritabanı koruması altında, tamamen izole ve ilişkisel veri bütünlüğü sağlanarak saklanır.</p>
            </div>

            <div>
              <h4>"Bu ekranı bir daha gösterme" seçeneği nasıl çalışır?</h4>
              <p>Bu seçeneği işaretleyip giriş yaptığınızda, tarayıcınızın yerel depolama alanı (localStorage) üzerinde bir değer tutulur ve Moneta'yı her açtığınızda sizi doğrudan giriş ekranına yönlendirir.</p>
            </div>
          </div>
        </section>

      </main>

      <footer>
        <p>&copy; 2026 Moneta. Tüm Hakları Saklıdır.</p>
      </footer>

    </div>
  );
};