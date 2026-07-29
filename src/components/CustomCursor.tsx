"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor({ inverted = false }: { inverted?: boolean }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);

  const colorClass = inverted ? "white" : "black";
  const bgColorClass = inverted ? "bg-white" : "bg-black";
  const borderColorClass = inverted ? "border-white" : "border-black";

  useEffect(() => {
    // Only show custom cursor on non-touch devices (devices with fine pointers)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    gsap.set([cursorRef.current], { opacity: 0 });

    const moveCursor = (e: MouseEvent) => {
      // Immediate movement for the center dot
      gsap.to(dotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });

      // Smooth trailing movement for the brackets
      gsap.to(bracketsRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
      
      gsap.to(cursorRef.current, { opacity: 1, duration: 0.3 });
    };

    const handleHoverIn = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering an interactive element
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button') ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.tagName.toLowerCase() === 'select'
      ) {
        gsap.to(bracketsRef.current, {
          scale: 0.6,
          rotate: 45,
          duration: 0.3,
          ease: "back.out(2)"
        });
        gsap.to(dotRef.current, {
          scale: 0,
          duration: 0.2
        });
      }
    };

    const handleHoverOut = () => {
      gsap.to(bracketsRef.current, {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: "back.out(2)"
      });
      gsap.to(dotRef.current, {
        scale: 1,
        duration: 0.2
      });
    };

    // Add global event listeners
    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleHoverIn);
    document.addEventListener("mouseout", handleHoverOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleHoverIn);
      document.removeEventListener("mouseout", handleHoverOut);
    };
  }, []);

  return (
    <div ref={cursorRef} className="fixed inset-0 pointer-events-none z-[99999] hidden sm:block">
      {/* Center Dot */}
      <div 
        ref={dotRef}
        className={`absolute top-0 left-0 w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${bgColorClass}`}
      />
      
      {/* Viewfinder Brackets */}
      <div 
        ref={bracketsRef}
        className="absolute top-0 left-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        {/* Top Left */}
        <div className={`absolute top-0 left-0 w-2 h-2 border-t-[1.5px] border-l-[1.5px] transition-colors duration-300 ${borderColorClass}`} />
        {/* Top Right */}
        <div className={`absolute top-0 right-0 w-2 h-2 border-t-[1.5px] border-r-[1.5px] transition-colors duration-300 ${borderColorClass}`} />
        {/* Bottom Left */}
        <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-[1.5px] border-l-[1.5px] transition-colors duration-300 ${borderColorClass}`} />
        {/* Bottom Right */}
        <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-[1.5px] border-r-[1.5px] transition-colors duration-300 ${borderColorClass}`} />
      </div>
    </div>
  );
}
