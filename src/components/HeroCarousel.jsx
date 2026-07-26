import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Good for your style.\nGood for the Earth.",
      subtitle: "Handcrafted luxury accessories made with intention.",
      image: "/luxury_hero_banner.webp",
      cta: "Shop Now",
    },
    {
      title: "Curated elegance\nfor the modern soul.",
      subtitle: "Designer abayas, bangles, and accessories.",
      image: "/luxury_hero_banner.webp",
      cta: "Explore Collection",
    },
    {
      title: "Buy fewer pieces,\ncreate less waste.",
      subtitle: "Timeless designs that transcend seasons.",
      image: "/luxury_hero_banner.webp",
      cta: "Discover More",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] min-h-[480px] md:min-h-[600px] overflow-hidden">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <span className="inline-block text-brand-cream/80 text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase mb-4 md:mb-6">
              New Arrivals
            </span>
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-brand-cream mb-4 md:mb-6 leading-[1.1] whitespace-pre-line">
              {slides[currentSlide].title}
            </h1>
            <p className="text-brand-cream/80 text-sm md:text-lg mb-6 md:mb-8 max-w-md leading-relaxed">
              {slides[currentSlide].subtitle}
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-brand-cream text-brand-dark px-6 md:px-10 py-3 md:py-4 text-xs md:text-sm font-semibold tracking-wider uppercase hover:bg-brand-gold hover:text-brand-cream transition-all duration-300"
            >
              {slides[currentSlide].cta}
            </button>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 ${
              idx === currentSlide
                ? "w-8 h-0.5 bg-brand-cream"
                : "w-4 h-0.5 bg-brand-cream/40 hover:bg-brand-cream/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
