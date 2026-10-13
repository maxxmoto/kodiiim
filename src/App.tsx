import { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
import { langDict } from './i18n';
import LegalPage from './LegalPage';
import logo from './logo.webp';

const B = import.meta.env.BASE_URL;

// Hero-1: видео с фолбэком на webp
const HERO1_VIDEO = `${B}images/hero-1.mp4`;
const HERO1_POSTER = `${B}images/hero-1.webp`;

// Изображения для кейсов
const CASE1_IMG = `${B}images/case-1.webp`;
const CASE2_IMG = `${B}images/case-2.webp`;
const CASE3_IMG = `${B}images/case-3.webp`;

// Фоновые изображения для карточек услуг
const SERVICE_BG_IMAGES = [
  `${B}images/service-1.webp`,
  `${B}images/service-2.webp`,
  `${B}images/service-3.webp`,
  `${B}images/service-4.webp`
];

// Анимированный счетчик
function AnimatedCounter({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState('0');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const match = value.match(/(\d+)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseInt(match[1]);
    const suffix = value.replace(match[1], '');
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentNum = Math.floor(targetNum * easeOut);

      setDisplayValue(currentNum + suffix);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return <div ref={ref} className="stat-num">{displayValue}</div>;
}

export default function App() {
  const [lang, setLang] = useState('ru');
  const t = langDict[lang];
  const [zone, setZone] = useState(0);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [msg, setMsg] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [titleAnimating, setTitleAnimating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [showLegal, setShowLegal] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [heroVideoFailed, setHeroVideoFailed] = useState(false);

  const servicesRef = useRef<HTMLElement>(null);
  const contactsRef = useRef<HTMLElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Обновление заголовка документа
  useEffect(() => {
    document.title = t.docTitle;
  }, [t.docTitle]);

  // Ротация заголовков каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleAnimating(true);
      setTimeout(() => {
        setTitleIndex((prev) => (prev + 1) % t.heroTitles.length);
        setTitleAnimating(false);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, [t.heroTitles.length]);

  // Ротация отзывов каждые 3 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % t.reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [t.reviews.length]);

  // Scroll spy для навигации по зонам
  const updateZone = useCallback(() => {
    const posY = window.scrollY;
    const svcTop = servicesRef.current?.offsetTop ?? 0;
    const ctcTop = contactsRef.current?.offsetTop ?? 0;
    const threshold = window.innerHeight * 0.35;

    let idx = 0;
    if (posY >= svcTop - threshold) idx = 1;
    if (posY >= ctcTop - threshold) idx = 2;
    setZone(idx);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateZone, { passive: true });
    window.addEventListener('resize', updateZone);
    updateZone();
    return () => {
      window.removeEventListener('scroll', updateZone);
      window.removeEventListener('resize', updateZone);
    };
  }, [updateZone]);

  // Reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Клик по зоне навигации
  const handleZoneClick = (i: number) => {
    if (i === 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (i === 1 && servicesRef.current) {
      const threshold = window.innerHeight * 0.35;
      window.scrollTo({ top: servicesRef.current.offsetTop - threshold, behavior: 'smooth' });
    } else if (i === 2 && contactsRef.current) {
      const threshold = window.innerHeight * 0.35;
      window.scrollTo({ top: contactsRef.current.offsetTop - threshold, behavior: 'smooth' });
    }
  };

  // Toast уведомление
  const showToast = (message: string) => {
    setToastMsg(message);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3200);
  };

  // Отправка формы
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      showToast(t.fillWarn);
      return;
    }
    showToast(t.success);
    setName('');
    setContact('');
    setMsg('');
  };

  // Дублирование элементов для бесшовной бегущей строки
  const marqueeDouble = [...t.marqueeItems, ...t.marqueeItems];

  if (showLegal) {
    return <LegalPage onBack={() => setShowLegal(false)} />;
  }

  return (
    <>
      <div className="bg-gradient" aria-hidden="true"></div>

      <div className="page">
        {/* ======= ПЕРВЫЙ ЭКРАН ======= */}
        <div className="screen1">
          <header className="topbar">
            <a className="logo" href="#top" onClick={() => setMobileMenuOpen(false)}>
              <img src={logo} alt={t.logo} />
            </a>
            <nav className="nav">
              <a href="#services">{t.nav1}</a>
              <a href="#process">{t.nav2}</a>
              <a href="#cases">{t.nav3}</a>
              <a href="#faq">{t.nav5}</a>
              <a href="#reviews">{t.nav6}</a>
              <a href="#contacts">{t.nav4}</a>
            </nav>
            <div className="header-right">
              <div className="lang-switcher">
                <button
                  className={`lang-btn ${lang === 'ru' ? 'active' : ''}`}
                  onClick={() => setLang('ru')}
                >
                  RU
                </button>
                <button
                  className={`lang-btn ${lang === 'zh' ? 'active' : ''}`}
                  onClick={() => setLang('zh')}
                >
                  中文
                </button>
              </div>
              <a href="#contacts" className="btn btn-white btn-desktop">{t.cta}</a>
              <a href="#contacts" className="btn btn-white btn-mobile">{t.contactBtn}</a>
              <button
                className={`burger ${mobileMenuOpen ? 'burger-open' : ''}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </header>

          {/* Мобильное меню */}
          <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>{t.nav1}</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)}>{t.nav2}</a>
            <a href="#cases" onClick={() => setMobileMenuOpen(false)}>{t.nav3}</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>{t.nav5}</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)}>{t.nav6}</a>
            <a href="#contacts" onClick={() => setMobileMenuOpen(false)}>{t.nav4}</a>
          </div>

          <section className="hero panel" id="top">
            {titleIndex === 0 && !heroVideoFailed ? (
              <video
                className="hero-bg-img"
                src={HERO1_VIDEO}
                poster={HERO1_POSTER}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onError={() => setHeroVideoFailed(true)}
              />
            ) : (
              <img src={t.heroImages[titleIndex]} alt="" className="hero-bg-img" />
            )}
            <div className="hero-overlay"></div>
            <h1 className={`hero-title ${titleAnimating ? 'hero-title-out' : 'hero-title-in'}`}>
              {t.heroTitles[titleIndex]}
            </h1>
          </section>

          <section className="cta-bar panel">
            <div className="marquee-wrapper">
              <div className="marquee-track">
                {marqueeDouble.map((item, i) => (
                  <span key={i} className="marquee-item">
                    <span className="marquee-dot">◆</span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <a href="#contacts" className="btn btn-blue btn-long">
              <span className="btn-shine"></span>
              <span className="btn-long-text">{t.cta}</span>
              <span className="long-arrow">
                <svg width="80" height="20" viewBox="0 0 80 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 10 L76 10 M62 3 L76 10 L62 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </section>
        </div>

        {/* ======= УСЛУГИ ======= */}
        <section id="services" className="panel section" ref={servicesRef}>
          <h2 className="section-title reveal">{t.nav1}</h2>
          <div className="cards">
            {t.services.map((service, i) => (
              <div
                className={`card-flip ${flippedCards.has(i) ? 'flipped' : ''}`}
                key={i}
                onClick={() => {
                  const newFlipped = new Set(flippedCards);
                  if (newFlipped.has(i)) {
                    newFlipped.delete(i);
                  } else {
                    newFlipped.add(i);
                  }
                  setFlippedCards(newFlipped);
                }}
              >
                <div className="card-flip-inner">
                  <div className="card-flip-front">
                    <div className="card-flip-bg" style={{ backgroundImage: `url(${SERVICE_BG_IMAGES[i]})` }}></div>
                    <div className="card-flip-content">
                      <div className="card-flip-icon">↻</div>
                      <h3>{service.desc}</h3>
                    </div>
                  </div>
                  <div className="card-flip-back">
                    <div className="card-flip-icon">↻</div>
                    <h3>{service.title}</h3>
                    <p>{service.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======= ПРОЦЕСС ======= */}
        <section id="process" className="panel section">
          <h2 className="section-title reveal">{t.nav2}</h2>
          <div className="steps">
            {t.steps.map((step, i) => (
              <div className="step reveal" key={i} style={{ backgroundImage: `url(${step.bg})` }}>
                <div className="step-overlay"></div>
                <div className="step-content">
                  <span className="step-num">0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======= КЕЙСЫ ======= */}
        <section id="cases" className="panel section">
          <h2 className="section-title reveal">{t.nav3}</h2>
          <div className="cases-grid">
            <article className="case reveal">
              <div className="case-art">
                <img src={CASE1_IMG} alt={t.case1t} />
              </div>
              <div className="case-body">
                <h3>{t.case1t}</h3>
                <p>{t.case1d}</p>
              </div>
            </article>
            <article className="case reveal">
              <div className="case-art">
                <img src={CASE2_IMG} alt={t.case2t} />
              </div>
              <div className="case-body">
                <h3>{t.case2t}</h3>
                <p>{t.case2d}</p>
              </div>
            </article>
            <article className="case reveal">
              <div className="case-art">
                <img src={CASE3_IMG} alt={t.case3t} />
              </div>
              <div className="case-body">
                <h3>{t.case3t}</h3>
                <p>{t.case3d}</p>
              </div>
            </article>
          </div>
        </section>

        {/* ======= СТАТИСТИКА ======= */}
        <section className="panel section stats-section reveal">
          <h2 className="section-title">{t.statsTitle}</h2>
          <div className="stats-grid">
            {t.stats.map((stat, i) => (
              <div className="stat-card" key={i}>
                <AnimatedCounter value={stat.num} />
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ======= ОТЗЫВЫ ======= */}
        <section id="reviews" className="panel section">
          <h2 className="section-title reveal">{t.nav6}</h2>
          <div className="reviews-carousel">
            <div className="reviews-carousel-track" style={{ transform: `translateX(-${reviewIndex * 100}%)` }}>
              {t.reviews.map((review, i) => (
                <div
                  className={`review-card ${i === reviewIndex ? 'review-active' : ''}`}
                  key={i}
                >
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">«{review.text}»</p>
                  <div className="review-author">
                    <div className="review-avatar">
                      {review.avatar ? (
                        <img src={review.avatar} alt={review.name} />
                      ) : (
                        review.name[0]
                      )}
                    </div>
                    <div>
                      <div className="review-name">{review.name}</div>
                      <div className="review-role">{review.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="reviews-dots">
              {t.reviews.map((_, i) => (
                <button
                  key={i}
                  className={`review-dot ${i === reviewIndex ? 'active' : ''}`}
                  onClick={() => setReviewIndex(i)}
                  aria-label={`Отзыв ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ======= FAQ ======= */}
        <section id="faq" className="panel section">
          <h2 className="section-title reveal">{t.nav5}</h2>
          <div className="faq-list">
            {t.faqs.map((faq, i) => (
              <div className={`faq-item ${openFaq === i ? 'faq-open' : ''}`} key={i}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="faq-icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-content">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======= КОНТАКТЫ ======= */}
        <section id="contacts" className="panel section contacts" ref={contactsRef}>
          <div className="contacts-left reveal">
            <h2 className="section-title">{t.contact_title}</h2>
            <p className="contacts-text">{t.contact_text}</p>
          </div>
          <form className="reveal" onSubmit={handleSubmit} noValidate>
            <input
              className="field"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.ph1}
            />
            <input
              className="field"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder={t.ph2}
            />
            <textarea
              className="field"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder={t.ph3}
            />
            <button className="btn btn-blue" type="submit">
              <span>{t.send}</span>
              <span className="arrow">→</span>
            </button>
          </form>
        </section>

        <footer className="footer">
          {t.footer} · <a href="#" onClick={(e) => { e.preventDefault(); setShowLegal(true); window.scrollTo(0, 0); }}>Юридические документы</a>
        </footer>
      </div>

      {/* Навигация по зонам */}
      <nav className="zone-nav" aria-label="page zones">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            className={`zone-dot ${zone === i ? 'active' : ''}`}
            onClick={() => handleZoneClick(i)}
            aria-label={`zone ${i + 1}`}
          />
        ))}
      </nav>

      {/* Toast уведомление */}
      <div className={`toast ${toastVisible ? 'show' : ''}`} role="status">
        {toastMsg}
      </div>

      {/* Плавающая кнопка Telegram */}
      <TelegramButton />
    </>
  );
}

// Компонент плавающей закладки Telegram
function TelegramButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const processSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    processSectionRef.current = document.getElementById('process');

    const handleScroll = () => {
      if (!processSectionRef.current) return;

      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const processTop = processSectionRef.current.offsetTop;

      setIsVisible(scrollPosition >= processTop);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div
      className={`telegram-bookmark ${isVisible ? 'telegram-bookmark-visible' : ''} ${isOpen ? 'telegram-bookmark-open' : ''}`}
      aria-label="Telegram"
    >
      <div className="telegram-bookmark-icon" onClick={handleIconClick}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.445c-.015.115-.05.228-.102.334l-2.347 11.046c-.102.465-.378.58-.76.362-.383-.218-.626-.336-.626-.336s-2.678-1.756-3.196-2.098c-.518-.342-.102-.528.378-.918.378-.306 6.216-5.694 6.33-6.18.012-.048.024-.222-.09-.318-.114-.096-.282-.06-.402-.036-.174.036-2.946 1.866-8.316 5.496-.786.534-1.498.792-2.142.78-.708-.012-2.064-.396-3.072-.726-1.242-.402-1.236-1.278.018-1.77 4.896-2.142 8.166-3.546 9.81-4.236 9.336-3.9 9.522-4.032 10.716-4.056z"/>
        </svg>
      </div>
      <a
        href="https://t.me/kodiiim"
        target="_blank"
        rel="noopener noreferrer"
        className="telegram-bookmark-text"
      >
        <span>Написать в Telegram</span>
      </a>
    </div>
  );
}
