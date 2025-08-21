import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import aiImage from '@/img/AI.png';

const ScrollAnimatedImage = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"] // фиксим привязку
  });

  // Маппинг: 0 → 60°, 0.5 → 0°, 1 → 60°
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, 40]);

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center min-h-[100vh] py-6 sm:py-8 md:py-[10vh]"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="w-full max-w-[1200px]"
        style={{
          rotateX: rotate,
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
