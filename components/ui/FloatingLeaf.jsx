"use client";

import { useEffect, useRef, useState } from "react";
import { useSpring, useTransform, motion, useInView } from "framer-motion";
import Image from "next/image";

export default function FloatingLeaf({ 
  type = "single", 
  className = "", 
  delay = 0, 
  blur = false,
  parallaxSpeed = 30
}) {
  const leafSrc = {
    single: "/assets/single-leaf.svg",
    double: "/assets/double-leaf.svg",
    branch: "/assets/leaf-branch.svg"
  }[type];

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [scrollY, setScrollY] = useState(0);

  const smoothY = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  });

  const smoothRotate = useSpring(0, {
    stiffness: 40,
    damping: 25,
    mass: 0.3,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const updateScroll = () => {
      setScrollY(window.scrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const parallaxOffset = scrollY * parallaxSpeed * 0.0008;
    smoothY.set(parallaxOffset);
    
    const rotateOffset = Math.sin(scrollY * 0.003 + delay) * 3;
    smoothRotate.set(rotateOffset);
  }, [scrollY, parallaxSpeed, delay, smoothY, smoothRotate]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
      animate={isInView ? { 
        opacity: blur ? 0.35 : 0.65, 
        scale: 1,
        rotate: 0
      } : {}}
      transition={{ 
        duration: 1.8, 
        ease: [0.25, 0.46, 0.45, 0.94], 
        delay 
      }}
      className={`absolute pointer-events-none z-0 ${className} ${blur ? 'blur-[2px]' : ''}`}
      style={{ 
        willChange: 'transform, opacity',
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      <motion.div
        style={{ 
          y: smoothY, 
          rotate: smoothRotate,
          willChange: 'transform',
        }}
        className="w-full h-full relative"
      >
        <Image 
          src={leafSrc} 
          alt="Leaf decoration" 
          fill 
          className="object-contain"
          sizes="150px"
          priority={false}
        />
      </motion.div>
    </motion.div>
  );
}