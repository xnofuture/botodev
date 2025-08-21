import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import heroBackground from "@/assets/hero-bg.jpg";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={heroBackground}
          alt="AI Future"
          className="w-full h-full object-cover opacity-30"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-accent/10 animate-float" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 rounded-full bg-primary/5 animate-float" style={{
        animationDelay: '2s'
      }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main heading */}
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-20xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-left mt-8 sm:mt-12 md:mt-[100px] lg:mt-[200px]"
          >
            <span className="text-gradient">Автоматизируйте бизнес</span>
            <br />
            с помощью AI-агентов
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-xl text-foreground/80 mb-4 sm:mb-6 md:mb-8 text-left"
          >
            Мы создаем умных ассистентов, которые работают 24/7
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          >
            <div className="glass-card text-center h-32 sm:h-40 flex flex-col justify-center p-4">
              <div className="text-3xl font-bold text-gradient mb-4">300</div>
              <div className="text-foreground/70">Готовых решений</div>
            </div>
            <div className="glass-card text-center h-40 flex flex-col justify-center">
              <div className="text-3xl font-bold text-gradient mb-2">24/7</div>
              <div className="text-foreground/70">SUPPORT</div>
            </div>
            <div className="glass-card text-center h-40 flex flex-col justify-center">
              <div className="text-3xl font-bold text-gradient mb-2">99%</div>
              <div className="text-foreground/70">UPTIME</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>;
};
export default Hero;