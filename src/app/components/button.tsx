// components/AnimatedButton.tsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './css/button.css';
interface AnimatedButtonProps {
  href?: string;
  label: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  href,
  label,
  className = '',
  onClick,
  type = 'button',
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const flairRef = useRef<HTMLSpanElement>(null);
  const xSetRef = useRef<((value: number) => void) | null>(null);
  const ySetRef = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    if (!buttonRef.current || !flairRef.current) return;

    // Initialize quick setters for performance
    xSetRef.current = gsap.quickSetter(flairRef.current, 'xPercent') as (value: number) => void;
    ySetRef.current = gsap.quickSetter(flairRef.current, 'yPercent') as (value: number) => void;

    const buttonElement = buttonRef.current;
    const flairElement = flairRef.current;

    const getXY = (e: MouseEvent) => {
      const rect = buttonElement.getBoundingClientRect();
      
      const xTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, rect.width, 0, 100),
        gsap.utils.clamp(0, 100)
      );

      const yTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, rect.height, 0, 100),
        gsap.utils.clamp(0, 100)
      );

      return {
        x: xTransformer(e.clientX - rect.left),
        y: yTransformer(e.clientY - rect.top)
      };
    };

    const handleMouseEnter = (e: any) => {
      const { x, y } = getXY(e);
      xSetRef.current?.(x);
      ySetRef.current?.(y);

      gsap.to(flairElement, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = (e: any) => {
      const { x, y } = getXY(e);

      gsap.killTweensOf(flairElement);

      gsap.to(flairElement, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseMove = (e: any) => {
      const { x, y } = getXY(e);
      gsap.to(flairElement, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: "power2"
      });
    };

    buttonElement.addEventListener('mouseenter', handleMouseEnter);
    buttonElement.addEventListener('mouseleave', handleMouseLeave);
    buttonElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      buttonElement.removeEventListener('mouseenter', handleMouseEnter);
      buttonElement.removeEventListener('mouseleave', handleMouseLeave);
      buttonElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const buttonClasses = `button button--stroke ${className}`.trim();

  // Render as anchor if href is provided, otherwise as button
  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        data-block="button"
      >
        <span className="button__flair" ref={flairRef}></span>
        <span className="button__label">{label}</span>
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      data-block="button"
      onClick={onClick}
    >
      <span className="button__flair" ref={flairRef}></span>
      <span className="button__label">{label}</span>
    </button>
  );
};

export default AnimatedButton;