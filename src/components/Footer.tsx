import { Mail, Phone, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-border/20">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <img
              src="/src/img/new_logo.png"
              alt="AiGain Logo"
              className="h-6 sm:h-8 max-w-[100px] sm:max-w-[120px] mb-3 sm:mb-4 object-contain"
            />
            <p className="text-foreground/70 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              Автоматизируем ваш бизнес с помощью передовых AI-технологий.
              Создаем умных ассистентов, которые работают 24/7.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground">
              Быстрые ссылки
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-foreground/70 hover:text-primary transition-colors text-sm sm:text-base">
                  О нас
                </a>
              </li>
              <li>
                <a href="#services" className="text-foreground/70 hover:text-primary transition-colors text-sm sm:text-base">
                  Услуги
                </a>
              </li>
              <li>
                <a href="#advantages" className="text-foreground/70 hover:text-primary transition-colors text-sm sm:text-base">
                  Преимущества
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground">
              Контакты
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3 text-foreground/70">
                <Mail size={16} className="sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">info@aigain.ru</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-foreground/70">
                <Phone size={16} className="sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-foreground/70">
                <MessageCircle size={16} className="sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">@aigain_support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/20 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center backdrop-blur-md bg-white/10 rounded-lg px-4 py-2">
          <p className="text-foreground/60 text-xs sm:text-sm">
            © 2025 AIGain. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;