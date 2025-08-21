import { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";

const AICompanies = () => {
  const companies = [
    { name: "OpenAI", image: "/src/img/carousel/ai.png" },
    { name: "Google", image: "/src/img/carousel/google.png" },
    { name: "Microsoft", image: "/src/img/carousel/Windows.png" },
    { name: "NVIDIA", image: "/src/img/carousel/nvidia.png" },
    { name: "Tesla", image: "/src/img/carousel/tesla.png" },
    { name: "Amazon", image: "/src/img/carousel/amazon.png" },
    { name: "IBM", image: "/src/img/carousel/ibm.png" },
    { name: "Siemens", image: "/src/img/carousel/siemens.png" },
    { name: "Hyundai", image: "/src/img/carousel/hundai.png" },
    { name: "n8n", image: "/src/img/carousel/n8n.png" },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-8 sm:py-12 md:py-16 w-full"
    >
      <div className="w-full">
        <div className="relative overflow-hidden w-full bg-background/20 backdrop-filter backdrop-blur-sm rounded-lg">
          <div
            className={`flex space-x-4 sm:space-x-8 md:space-x-12 w-full ${isVisible ? 'animate-marquee-fast' : 'animate-marquee'}`}
          >
            {companies.map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 py-4 sm:py-6 md:py-8 min-w-[100px] sm:min-w-[150px] md:min-w-[200px] text-center"
              >
                <img
                  src={company.image}
                  alt={company.name}
                  className="h-12 sm:h-16 md:h-24 w-auto mx-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICompanies;