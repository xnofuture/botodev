import { motion } from "framer-motion";
import {
  MessageCircle,
  BarChart3,
  ShoppingCart,
  Users,
  Database,
  GraduationCap,
  Clock, TrendingUp, Shield, Zap, Target, Wallet
} from "lucide-react";

const Services = () => {
  // Сгруппированные сервисы
  const groupedServices = [
    [
      { title: "Аналитика продаж", description: "Умный анализ данных и прогнозирование продаж с помощью ИИ" },
      { title: "Автоподдержка", description: "AI-ассистенты для клиентского сервиса, работающие круглосуточно" },
      { title: "CRM интеграция", description: "Интеллектуальная работа с клиентской базой и лидами" }
    ],
    [
      { title: "Обработка заказов", description: "Автоматизация процесса от получения заказа до доставки" },
      { title: "Рекрутинг", description: "AI-помощники для поиска и отбора кандидатов" }
    ],
    [
      { title: "Обучение сотрудников", description: "Персонализированные AI-тренеры для вашей команды" }
    ]
  ];

  // Сгруппированные преимущества
  const groupedAdvantages = [
    [
      { title: "Работа 24/7", description: "AI-агенты не спят, не болеют и не уходят в отпуск" },
      { title: "Рост эффективности", description: "Увеличение производительности на 300-500%" },
      { title: "Высокая точность", description: "Минимизация человеческих ошибок до 0.1%" }
    ],
    [
      { title: "Мгновенная реакция", description: "Обработка запросов за секунды, а не часы" },
      { title: "Персонализация", description: "Индивидуальный подход к каждому клиенту" }
    ],
    [
      { title: "Экономия затрат", description: "Снижение операционных расходов до 70%" }
    ]
  ];

  return (
    <section id="services" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
          {/* Левая колонка: Что мы предлагаем */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center text-white">Предлагаем</h3>
            <div className="bg-background/20 backdrop-filter backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl">
              <div className="space-y-6 sm:space-y-8">
                {groupedServices.flatMap((group, groupIndex) =>
                  group.map((service, index) => (
                    <motion.div
                      key={`${groupIndex}-${index}`}
                      className="pb-3 sm:pb-4 last:pb-0"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <motion.h3
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-left text-foreground"
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        {service.title}
                      </motion.h3>
                      <motion.p
                        className="text-foreground/70 text-xs sm:text-sm md:text-base leading-relaxed text-left"
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.1 }}
                      >
                        {service.description}
                      </motion.p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* Правая колонка: Преимущества */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center text-white">Преимущества</h3>
            <div className="bg-background/20 backdrop-filter backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl">
              <div className="space-y-6 sm:space-y-8">
                {groupedAdvantages.flatMap((group, groupIndex) =>
                  group.map((advantage, index) => (
                    <motion.div
                      key={`${groupIndex}-${index}`}
                      className="pb-3 sm:pb-4 last:pb-0"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <motion.h3
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-left sm:text-right text-foreground"
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        {advantage.title}
                      </motion.h3>
                      <motion.p
                        className="text-foreground/70 text-xs sm:text-sm md:text-base leading-relaxed text-left sm:text-right"
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.1 }}
                      >
                        {advantage.description}
                      </motion.p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;