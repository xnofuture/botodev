import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ConsultationDialog from "./ConsultationDialog";
import { useAuth } from '@/hooks/useAuth'; // Добавлен импорт useAuth

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const { isAuthenticated, logout } = useAuth(); // Получение состояния аутентификации

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Плавное изменение прозрачности
      let newOpacity;
      if (currentScrollY <= 400) {
        newOpacity = 1;
      } else if (currentScrollY >= 600) {
        newOpacity = 0;
      } else {
        // Линейная интерполяция между 400-600px
        newOpacity = 1 - (currentScrollY - 400) / 200;
      }
      
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "О НАС", href: "#about" },
    { name: "УСЛУГИ", href: "#services" },
    { name: "ПРЕИМУЩЕСТВА", href: "#advantages" },
    { name: "КОНТАКТЫ", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 glass backdrop-blur-2xl bg-background/20`}
      style={{ opacity }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/src/img/new_logo.png"
              alt="AiGain Logo"
              className="h-8 lg:h-10 max-w-[180px] object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Auth & CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <a href="/dashboard">
                  <Button variant="ghost" className="text-foreground/80 hover:bg-white/80">
                    ДАШБОРД
                  </Button>
                </a>
                <Button
                  variant="ghost"
                  className="text-foreground/80 hover:bg-white/80"
                  onClick={logout}
                >
                  ВЫЙТИ
                </Button>
              </>
            ) : (
              <>
                <a href="/auth">
                  <Button
                    variant="ghost"
                    className="text-foreground/80 hover:bg-white/80"
                  >
                    ВХОД
                  </Button>
                </a>
                <Button
                  variant="default"
                  className="bg-primary hover:bg-primary/90 glow-primary"
                  onClick={() => setIsConsultationDialogOpen(true)}
                >
                  ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 rounded-xl p-4 bg-background/80 backdrop-blur-2xl">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              {isAuthenticated ? (
                <>
                  <a
                    href="/dashboard"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className="text-foreground/80 hover:bg-white/80 w-full justify-start"
                    >
                      ДАШБОРД
                    </Button>
                  </a>
                  <Button
                    variant="ghost"
                    className="text-foreground/80 hover:bg-white/80 w-full justify-start"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    ВЫЙТИ
                  </Button>
                </>
              ) : (
                <>
                  <a
                    href="/auth"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className="text-foreground/80 hover:bg-white/80 w-full justify-start"
                    >
                      ВХОД
                    </Button>
                  </a>
                  <Button
                    variant="default"
                    className="bg-primary hover:bg-primary/90 mt-4 w-full"
                    onClick={() => {
                      setIsConsultationDialogOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
      
      {/* Dialogs */}
      <ConsultationDialog
        isOpen={isConsultationDialogOpen}
        onClose={() => setIsConsultationDialogOpen(false)}
      />
    </header>
  );
};

export default Header;