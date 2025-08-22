import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import aiImage from '@/img/AI.png';
import { useIsMobile } from '@/hooks/use-mobile'; // Исправленный импорт хука

const ScrollAnimatedImage = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile(); // Используем хук для определения типа устройства

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, 40]);

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center py-6 sm:py-8 md:py-[5vh] px-4 sm:px-0"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="w-full max-w-[1000]"
        style={{
          rotateX: rotate, // Анимация теперь всегда активна
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <img
          src={aiImage}
          alt="AI Visualization"
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </div>
  );
};

export default ScrollAnimatedImage;
