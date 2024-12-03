'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { StaticCard1, StaticCard2 } from '@/components/Card1';
import Card2 from '@/components/Card2';
import { MendhiCard, BaratCard, WalimaCard } from '@/components/Card3';

// Panel data
const panels = [
  { id: 1, component: <StaticCard1 /> },
  { id: 2, component: <StaticCard2 /> },
  { id: 3, component: <Card2 /> },
  { id: 4, component: <MendhiCard /> },
  { id: 5, component: <BaratCard /> },
  { id: 6, component: <WalimaCard /> },
];

export default function AnimatedPanels() {
  const [currentPanel, setCurrentPanel] = useState(0);
  const isAnimating = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  // Handle swipe gestures for touch devices
  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    touchEndY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (
      touchStartY.current !== null &&
      touchEndY.current !== null &&
      !isAnimating.current
    ) {
      const distance = touchStartY.current - touchEndY.current;
      const swipeThreshold = 50;
      if (distance > swipeThreshold) {
        setCurrentPanel((prev) => Math.min(prev + 1, panels.length - 1));
      } else if (distance < -swipeThreshold) {
        setCurrentPanel((prev) => Math.max(prev - 1, 0));
      }
      lockAnimation();
    }
    touchStartY.current = null;
    touchEndY.current = null;
  };

  // Handle scroll gestures for desktop
  const handleScroll = (event: WheelEvent) => {
    if (isAnimating.current) return;
    const direction = event.deltaY > 0 ? 1 : -1;
    setCurrentPanel((prev) =>
      Math.max(0, Math.min(prev + direction, panels.length - 1))
    );
    lockAnimation();
  };

  // Prevent rapid animations
  const lockAnimation = () => {
    isAnimating.current = true;
    setTimeout(() => (isAnimating.current = false), 800);
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  return (
    <div
      className="bg-black h-screen w-full overflow-hidden relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {panels.map((panel, index) => (
        <motion.div
          key={panel.id}
          initial={{ y: '100%', opacity: 0 }}
          animate={{
            y: index === currentPanel ? '0%' : index > currentPanel ? '100%' : '-100%',
            opacity: index === currentPanel ? 1 : 0,
          }}
          transition={{
            duration: 2, // Shorter duration for quicker transitions
            ease: [0.25, 0.8, 0.5, 1], // Smooth bezier curve
          }}
          className="absolute inset-0 w-full h-screen"
        >
          {panel.component}
        </motion.div>
      ))}
    </div>
  );
}
