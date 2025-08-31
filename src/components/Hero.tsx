import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  offer: string;
  image: string;
  alt: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Best Deal Online on smart watches",
    subtitle: "SMART WEARABLE.",
    offer: "UP to 80% OFF",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Smart Watch with Blue Strap"
  },
  {
    id: 2,
    title: "Premium Electronics Collection",
    subtitle: "LATEST TECH.",
    offer: "UP to 60% OFF",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Premium Headphones"
  },
  {
    id: 3,
    title: "Fashion & Lifestyle Essentials",
    subtitle: "TRENDING STYLE.",
    offer: "UP to 50% OFF",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Designer Sneakers"
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="relative z-10">
          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-gray-800 space-y-6">
              <div className="space-y-3">
                <h2 className="text-lg font-medium text-blue-600">
                  {currentSlideData.title}
                </h2>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {currentSlideData.subtitle}
                </h1>
              </div>
              
              <div className="inline-block bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg">
                {currentSlideData.offer}
              </div>
              
              <div className="flex items-center gap-4">
                <button className="bg-blue-500 text-white hover:bg-blue-600 px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105">
                  Shop Now
                </button>
                <button className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg">
                  Learn More
                </button>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-blue-600 font-medium">4.8 (2,847 reviews)</span>
              </div>
            </div>

            {/* Right Side - Product Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main Product Image */}
                <div className="relative w-72 h-72 lg:w-80 lg:h-80">
                  <img
                    src={currentSlideData.image}
                    alt={currentSlideData.alt}
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  />
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-3 -right-3 bg-white rounded-full p-3 shadow-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">80%</span>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-3 -left-3 bg-white rounded-full p-3 shadow-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">Free</span>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-indigo-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-8 lg:left-16 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-500 p-3 rounded-full transition-all duration-200 hover:scale-110 shadow-lg backdrop-blur-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-8 lg:right-16 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-500 p-3 rounded-full transition-all duration-200 hover:scale-110 shadow-lg backdrop-blur-sm"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? 'bg-blue-500 scale-125'
                    : 'bg-blue-300 hover:bg-blue-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".15"
            fill="currentColor"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.71,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".3"
            fill="currentColor"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}