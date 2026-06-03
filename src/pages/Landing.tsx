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
          <span>🪙</span>
          <span>Moneta</span>
        </div>
        <nav>
          <a href="#features">Özellikler</a>
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
        </section>

        <section id="features">
          <div>
            <h2>Moneta İle Neler Yapabilirsiniz?</h2>
            <p>Paranızı yönetmek hiç bu kadar kolay ve anlaşılır olmamıştı.</p>
          </div>

          <div>
            <div>
              <div>💰</div>
              <h3>Gelir ve Gider Takibi</h3>
              <p>Tüm nakit akışınızı tek bir ekrandan anlık olarak kaydedin, kategorize edin ve nereye ne harcadığınızı net olarak görün.</p>
            </div>

            <div>
              <div>📊</div>
              <h3>Gelişmiş Analizler ve Grafik</h3>
              <p>Harcama alışkanlıklarınızı dinamik ve anlaşılır grafiklerle analiz edin. Bütçenizin durumunu raporlarla kontrol altında tutun.</p>
            </div>

            <div>
              <div>🛡️</div>
              <h3>Güvenli Dijital Cüzdan</h3>
              <p>Finansal verileriniz modern şifreleme altyapıları ve güvenli bulut servisleri ile tamamen koruma altında saklanır.</p>
            </div>

            <div>
              <div>🎯</div>
              <h3>Bütçe Hedefleri Koyma</h3>
              <p>Belirli kategoriler için aylık harcama limitleri belirleyin, sınırları aşmaya yaklaştığınızda bütçenizi koruyun.</p>
            </div>
          </div>
        </section>

        <section id="about">
          <div>
            <h2>Neden Moneta?</h2>
            <p>
              Moneta, karmaşık finansal tablolar ve anlaşılması zor muhasebe terimleri yerine, 
              size paranızın kontrolünü tamamen sade ve kullanıcı dostu bir arayüzle sunmak için tasarlandı. 
              Mühendislik disipliniyle geliştirilen güçlü backend mimarisi sayesinde işlemleriniz her zaman hızlı, 
              tutarlı ve güvenlidir.
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
              <p>Verileriniz, endüstri standardı güvenlik protokolleri ve ilişkisel veri tabanı koruması altında, tamamen izole bir şekilde saklanır.</p>
            </div>

            <div>
              <h4>"Bu ekranı bir daha gösterme" seçeneği nasıl çalışır?</h4>
              <p>Bu seçeneği işaretleyip giriş yaptığınızda, tarayıcınız Moneta'yı her açtığında sizi doğrudan giriş ekranına yönlendirir.</p>
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