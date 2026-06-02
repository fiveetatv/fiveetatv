"use client";

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const slides = [
  { 
    mobile: "/posters/mobile1.jpg", 
    desktop: "/posters/1.jpg",
    title: "Embrace Natural Wellness with Fiveetatv",
    subtitle: "Pure by Nature, Effective by Science",
    description: "Ayurvedic solutions for a healthier, happier you. Made with pure herbs. Backed by tradition.",
    primaryCTA: "Shop Now",
    secondaryCTA: "Know More"
  },
  { 
    mobile: "/posters/mobile2.jpg", 
    desktop: "/posters/2.jpg",
    title: "Balance Your Elements with Ayurveda",
    subtitle: "Traditional Wisdom, Modern Life",
    description: "Discover the power of five elements to restore your body's natural harmony and vitality.",
    primaryCTA: "View Collection",
    secondaryCTA: "Learn More"
  },
  { 
    mobile: "/posters/mobile3.jpg", 
    desktop: "/posters/3.jpg",
    title: "Nourish Your Body Naturally",
    subtitle: "Holistic Health, Every Day",
    description: "Experience the pure essence of Ayurveda, crafted for your daily wellness journey.",
    primaryCTA: "Discover More",
    secondaryCTA: "Our Story"
  },
  { 
    mobile: "/posters/mobile4.jpg", 
    desktop: "/posters/4.jpg",
    title: "Authentic Ayurvedic Care",
    subtitle: "Rooted in Nature",
    description: "Transform your lifestyle with our sustainably sourced, traditional herbal blends.",
    primaryCTA: "Shop Now",
    secondaryCTA: "Learn More"
  }
];

export default function Landing() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <section className="relative w-full overflow-hidden bg-background">
      {/* Visually Hidden H1 for SEO and Screen Readers */}
      <h1 className="sr-only">Fiveetatv - Premium Ayurvedic Wellness Products | Embrace Natural Wellness</h1>
      
      <div className="overflow-hidden w-full aspect-[3/4] md:aspect-[2/1]" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
              <picture className="relative block w-full h-full">
                <source srcSet={`${slide.mobile}?v=2`} media="(max-width: 768px)" />
                <Image 
                  src={`${slide.desktop}?v=2`} 
                  alt={slide.title} 
                  fill 
                  quality={95}
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
              </picture>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}