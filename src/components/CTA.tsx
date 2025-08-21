import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import ConsultationDialog from "@/components/ConsultationDialog";

const CTA = () => {
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] = useState(false);

  return <section className="py-[10rem] lg:py-[12rem] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary/5 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-accent/5 animate-float" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-primary/10 animate-float" style={{
        animationDelay: '2s'
      }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="w-full text-center">
          <div className="glass-card animate-slide-up p-6 sm:p-8 md:p-12">
            <div className="mb-4 sm:mb-6">
              
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6">
              <span className="text-white">
                Автоматизируйте бизнес
                <br />
                уже сегодня
              </span>
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg text-foreground/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Получите персональную консультацию. Узнайте, как AI может
              трансформировать ваш бизнес за 30 дней
            </p>
            
            <div className="flex flex-col items-center">
              <Button
                size="lg"
                className="text-base sm:text-xl bg-transparent border border-white/30 px-6 sm:px-8 py-4 sm:py-6 group hover:bg-white/80"
                onClick={() => setIsConsultationDialogOpen(true)}
              >
                получить консультацию
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={20} />
              </Button>
              <p className="text-xs sm:text-sm text-foreground/60 mt-2 sm:mt-[5px]">
                Бесплатная консультация
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <ConsultationDialog
        isOpen={isConsultationDialogOpen}
        onClose={() => setIsConsultationDialogOpen(false)}
      />
    </section>;
};
export default CTA;