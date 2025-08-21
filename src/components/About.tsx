import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import founder1 from "@/assets/founder1.jpg";
import founder2 from "@/assets/founder2.jpg";
import founder3 from "@/assets/founder3.jpg";
import founder4 from "@/assets/founder4.jpg";
import workflowImage from "@/img/AI Social Media Automation Workflow (No Code) _ Auto-Post to TikTok with Avatar & Voice using n8n_waifu2x_art_scan_noise1_scale.png";

const About = () => {
  const founders = [
    { name: "Алексей Иванов", role: "CEO", image: founder1 },
    { name: "Мария Петрова", role: "CTO", image: founder2 },
    { name: "Дмитрий Сидоров", role: "CMO", image: founder3 },
    { name: "Анна Козлова", role: "Lead Developer", image: founder4 }
  ];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section id="about" className="py-40 lg:py-64" ref={ref}>
      <div className="container mx-auto px-4 lg:px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Text content */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="text-white font-bold">О нас</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed mb-4 sm:mb-6">
              AiGain — это команда экспертов в области искусственного интеллекта,
              которая помогает бизнесу автоматизировать процессы и повышать
              эффективность с помощью передовых AI-технологий.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed">
              Мы создаем индивидуальные решения, которые интегрируются с вашими
              существующими системами и работают как полноценные цифровые сотрудники.
            </p>
          </motion.div>

          {/* Director section */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-full">
              <div className="backdrop-blur-md bg-background/[5%] rounded-none p-4 sm:p-6 text-right no-rounded">
                <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">{founders[0].name}</h3>
                <p className="text-foreground/70 mb-2 text-sm sm:text-base">Генеральный директор</p>
                <p className="text-foreground/80 italic text-sm sm:text-base mt-6">
                  "Моя цель - сделать AI-технологии доступными для бизнеса любого масштаба.
                  Вместе мы построим будущее, где технологии работают на благо человека.
                  Наша команда каждый день трудится, чтобы вы могли сосредоточиться на главном - развитии своего бизнеса.
                  Доверьтесь профессионалам, и мы превзойдем ваши ожидания."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;