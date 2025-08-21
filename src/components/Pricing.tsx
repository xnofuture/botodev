import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Crown } from "lucide-react";
import AuthDialog from "@/components/AuthDialog";

const Pricing = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  
  const plans = [
    {
      name: "Базовый",
      icon: <Zap className="w-8 h-8" />,
      price: "29 990",
      period: "месяц",
      description: "Идеально для малого бизнеса",
      features: [
        "Простой чат-бот",
        "До 1000 сообщений/месяц",
        "Базовая аналитика",
        "Email поддержка",
        "1 интеграция",
        "Обучение команды"
      ],
      popular: false,
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      name: "Премиум",
      icon: <Star className="w-8 h-8" />,
      price: "79 990",
      period: "месяц",
      description: "Для растущих компаний",
      features: [
        "Умный AI-агент",
        "До 10 000 сообщений/месяц",
        "Продвинутая аналитика",
        "Приоритетная поддержка",
        "5 интеграций",
        "Кастомизация интерфейса",
        "Голосовой помощник",
        "Обучение на ваших данных"
      ],
      popular: true,
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      name: "Enterprise",
      icon: <Crown className="w-8 h-8" />,
      price: "от 199 990",
      period: "месяц",
      description: "Для крупных предприятий",
      features: [
        "Полная AI-экосистема",
        "Безлимитные сообщения",
        "Продвинутая аналитика + BI",
        "Персональный менеджер",
        "Безлимитные интеграции",
        "White-label решение",
        "API для разработчиков",
        "SLA 99.9%",
        "Безопасность корпоративного уровня"
      ],
      popular: false,
      gradient: "from-amber-500/20 to-orange-500/20"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-60 h-60 rounded-full bg-primary/5 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-accent/5 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          <span className="text-white font-bold">
              Выберите подходящий план
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-foreground/80 max-w-3xl mx-auto">
            Гибкие тарифы для любого бизнеса. Начните с базового плана и масштабируйтесь по мере роста
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-7xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card relative flex flex-col ${
                plan.popular
                  ? 'ring-2 ring-primary/50 md:scale-105 transform'
                  : ''
              } animate-slide-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary px-4 py-1 rounded-full text-sm font-medium text-white">
                    Популярный
                  </span>
                </div>
              )}

              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-xl opacity-50`}></div>
              
              <div className="relative p-4 sm:p-6 md:p-8 flex flex-col h-full">
                <div className="text-center mb-4 sm:mb-6 md:mb-8">
                  <div className="text-primary mb-2 sm:mb-4 flex justify-center">
                    {plan.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-foreground/70 text-xs sm:text-sm mb-3 sm:mb-4 flex items-center justify-center">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-2xl sm:text-3xl md:text-[2.75rem] font-extrabold text-gradient">{plan.price}</span>
                    <span className="text-foreground/60 ml-1 sm:ml-2 text-xs sm:text-sm md:text-base">₽/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 md:mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80 text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full mt-auto bg-transparent border border-white/30 hover:bg-white/10 text-xs sm:text-sm md:text-base py-2 sm:py-3"
                  onClick={() => setShowAuthDialog(true)}
                >
                  {plan.name === "Enterprise" ? "Связаться с нами" : "Выбрать план"}
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>
      
      <AuthDialog isOpen={showAuthDialog} onClose={() => setShowAuthDialog(false)} />
    </section>
  );
};

export default Pricing;