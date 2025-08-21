import { useState, useRef, useEffect } from "react";

const ClientCases = () => {
  // Фиктивные данные для отзывов клиентов
  const clientReviews = [
    {
      position: "CEO",
      client_name: "Иван Петров",
      review_text: "Внедрение AI-решений позволило нам увеличить эффективность работы на 300%. Особенно impressed результатами в автоматизации клиентской поддержки.",
      revenue_growth: "+300%"
    },
    {
      position: "Директор по маркетингу",
      client_name: "Анна Смирнова",
      review_text: "С помощью AI-аналитики мы смогли оптимизировать наши маркетинговые кампании и значительно повысить ROI. Рекомендую всем, кто хочет вывести бизнес на новый уровень.",
      revenue_growth: "+150%"
    },
    {
      position: "Основатель стартапа",
      client_name: "Михаил Козлов",
      review_text: "AI-агенты справились с обработкой 95% запросов клиентов без участия человека. Это сэкономило нам огромные ресурсы и позволило сосредоточиться на развитии продукта.",
      revenue_growth: "+450%"
    },
    {
      position: "Руководитель отдела продаж",
      client_name: "Елена Волкова",
      review_text: "Прогнозирование продаж с помощью ИИ стало точным как никогда. Мы теперь можем предвидеть тренды и опережать конкурентов.",
      revenue_growth: "+220%"
    },
    {
      position: "CTO",
      client_name: "Дмитрий Федоров",
      review_text: "Интеграция AI в наши бизнес-процессы заняла всего неделю, а результаты превзошли все ожидания. Особенно эффективна автоматизация рутинных задач.",
      revenue_growth: "+380%"
    },
    {
      position: "Директор по персоналу",
      client_name: "Ольга Новикова",
      review_text: "AI-тренеры для сотрудников показали отличные результаты в обучении. Уровень удовлетворенности сотрудников вырос на 70%.",
      revenue_growth: "+180%"
    },
    {
      position: "Основатель e-commerce",
      client_name: "Алексей Морозов",
      review_text: "Персонализированные рекомендации увеличили средний чек на 40%. Клиенты в восторге от точных предложений.",
      revenue_growth: "+290%"
    },
    {
      position: "Директор по операциям",
      client_name: "Татьяна Лебедева",
      review_text: "Автоматизация складских процессов с помощью ИИ сократила время обработки заказов вдвое. Логистика стала прозрачной и эффективной.",
      revenue_growth: "+320%"
    },
    {
      position: "Маркетинг-директор",
      client_name: "Сергей Павлов",
      review_text: "AI-аналитика помогла нам выявить скрытые паттерны поведения клиентов. Это открыло новые возможности для роста.",
      revenue_growth: "+275%"
    },
    {
      position: "CEO финтех стартапа",
      client_name: "Наталья Орлова",
      review_text: "Система фрод-мониторинга на базе ИИ снизила потери от мошенничества на 85%. Безопасность стала на порядок выше.",
      revenue_growth: "+410%"
    },
    {
      position: "Директор по развитию",
      client_name: "Владимир Соколов",
      review_text: "AI-инсайты помогли нам выйти на новые рынки с точными данными о потребностях клиентов. Рост в новых сегментах превысил ожидания.",
      revenue_growth: "+350%"
    },
    {
      position: "Основатель SaaS-продукта",
      client_name: "Ирина Михайлова",
      review_text: "Чат-боты для онбординга новых пользователей увеличили конверсию на 60%. Поддержка пользователей стала мгновенной и персонализированной.",
      revenue_growth: "+260%"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [initialTranslateX, setInitialTranslateX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [translateX, setTranslateX] = useState(-100); // Сдвигаем на ширину reviewsToShow (100%)
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const containerRef = useRef<HTMLDivElement>(null);
  const reviewRefs = useRef<(HTMLDivElement | null)[]>([]);

  const reviewsToShow = isDesktop ? 4 : 1;
  const itemWidth = 100 / reviewsToShow;

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      setCurrentIndex(0);
      setTranslateX(-100);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Обработчики для драга
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setIsDragging(true);
    setStartX(clientX);
    setInitialTranslateX(translateX);
    setIsTransitioning(false);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startX;
    const containerWidth = containerRef.current.clientWidth;
    const deltaPercent = (deltaX / containerWidth) * 100;
    const newTranslateX = initialTranslateX + deltaPercent;

    // Ограничиваем перетаскивание границами с учетом копий отзывов
    const maxTranslate = 0;
    const minTranslate = -(clientReviews.length + reviewsToShow) * itemWidth;

    if (newTranslateX <= maxTranslate && newTranslateX >= minTranslate) {
      setTranslateX(newTranslateX);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    // Определяем новый индекс на основе позиции
    const newIndex = Math.round(-translateX / itemWidth) - reviewsToShow;

    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    setTranslateX(-(newIndex + reviewsToShow) * itemWidth);
  };

  // Обработчики для кнопок навигации
  const nextReview = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
    setTranslateX(-(currentIndex + 1 + reviewsToShow) * itemWidth);
  };

  const prevReview = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
    setTranslateX(-(currentIndex - 1 + reviewsToShow) * itemWidth);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-white font-bold">
              Кейсы клиентов
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-foreground/80 max-w-3xl mx-auto">
            Узнайте, как компании трансформировали свой бизнес с помощью наших AI-решений
          </p>
        </div>

        {/* Контейнер для отзывов */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div
            className={`flex ${isTransitioning ? 'transition-transform duration-300 ease-in-out' : ''}`}
            style={{ transform: `translateX(${translateX}%)` }}
            onTransitionEnd={() => {
              setIsTransitioning(false);
              if (currentIndex < 0) {
                setCurrentIndex(currentIndex + clientReviews.length);
                setTranslateX(translateX - clientReviews.length * itemWidth);
              }
              if (currentIndex > clientReviews.length - reviewsToShow) {
                setCurrentIndex(currentIndex - clientReviews.length);
                setTranslateX(translateX + clientReviews.length * itemWidth);
              }
            }}
          >
            {/* Добавляем копии последних отзывов в начало для плавного циклического перехода */}
            {clientReviews.slice(-reviewsToShow).map((review, index) => (
              <div
                key={`start-${index}`}
                className={`${isDesktop ? 'w-1/4' : 'w-full'} flex-shrink-0 px-2`}
              >
                <div className="glass-card rounded-xl p-4 sm:p-6 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white mb-2">{review.position}</h3>
                    <p className="text-foreground/80 mb-3 sm:mb-4">{review.client_name}</p>
                    <p className="text-foreground/90 mb-4 sm:mb-6 text-sm sm:text-base">{review.review_text}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white">
                      {review.revenue_growth}
                    </div>
                    <p className="text-foreground/70 text-xs sm:text-sm">рост показателей</p>
                  </div>
                </div>
              </div>
            ))}
            
            {clientReviews.map((review, index) => (
              <div
                key={index}
                ref={(el) => (reviewRefs.current[index] = el)}
                className={`${isDesktop ? 'w-1/4' : 'w-full'} flex-shrink-0 px-2`}
              >
                <div className="glass-card rounded-xl p-6 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-white mb-2">{review.position}</h3>
                    <p className="text-foreground/80 mb-4">{review.client_name}</p>
                    <p className="text-foreground/90 mb-6">{review.review_text}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-white">
                      {review.revenue_growth}
                    </div>
                    <p className="text-foreground/70">рост показателей</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Добавляем копии первых отзывов в конец для плавного циклического перехода */}
            {clientReviews.slice(0, reviewsToShow).map((review, index) => (
              <div
                key={`end-${index}`}
                className={`${isDesktop ? 'w-1/4' : 'w-full'} flex-shrink-0 px-2`}
              >
                <div className="glass-card rounded-xl p-6 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-white mb-2">{review.position}</h3>
                    <p className="text-foreground/80 mb-4">{review.client_name}</p>
                    <p className="text-foreground/90 mb-6">{review.review_text}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-white">
                      {review.revenue_growth}
                    </div>
                    <p className="text-foreground/70">рост показателей</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Индикаторы для мобильной версии */}
        {!isDesktop && (
          <div className="flex justify-center mt-6 space-x-2">
            {clientReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                  setTranslateX(-(index + reviewsToShow) * itemWidth);
                }}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
                aria-label={`Перейти к отзыву ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Навигационные кнопки для десктопа */}
        {isDesktop && (
          <div className="hidden lg:flex justify-center mt-8 space-x-4">
            <button
              onClick={prevReview}
              className="p-3 rounded-full border border-white/50 text-white hover:bg-white/10"
              aria-label="Предыдущие отзывы"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextReview}
              className="p-3 rounded-full border border-white/50 text-white hover:bg-white/10"
              aria-label="Следующие отзывы"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientCases;