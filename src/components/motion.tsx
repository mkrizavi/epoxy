'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
// One observer per route; no scroll loop or React updates during animation.
export function MotionObserver() {
  const path = usePathname();
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const nodes = document.querySelectorAll<HTMLElement>('.reveal, .page-heading, .about-photo, .about-story, .process, .contact-cta, .contact-grid > div, .footer');
    const observer = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    }), { threshold: 0.08 });
    const configure = () => {
      observer.disconnect();
      nodes.forEach(node => {
        node.classList.add('reveal');
        if (media.matches) { node.classList.remove('motion-ready'); node.classList.add('visible'); }
        else if (!node.classList.contains('visible')) { node.classList.add('motion-ready'); observer.observe(node); }
      });
    };
    const visibility = () => document.documentElement.classList.toggle('motion-paused', document.hidden);
    configure(); visibility();
    media.addEventListener('change', configure);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect(); media.removeEventListener('change', configure);
      document.removeEventListener('visibilitychange', visibility);
      document.documentElement.classList.remove('motion-paused');
      nodes.forEach(node => node.classList.remove('motion-ready'));
    };
  }, [path]);
  return null;
}
export function Reflection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0, x = 50, y = 50;
    let bounds: DOMRect | null = null;
    const update = () => { frame = 0; element.style.setProperty('--x', `${x}%`); element.style.setProperty('--y', `${y}%`); };
    const enter = () => { bounds = element.getBoundingClientRect(); };
    const move = (event: PointerEvent) => {
      if (!media.matches || document.hidden || !bounds) return;
      x = (event.clientX - bounds.left) / bounds.width * 100;
      y = (event.clientY - bounds.top) / bounds.height * 100;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const reset = () => { cancelAnimationFrame(frame); frame = 0; bounds = null; element.style.removeProperty('--x'); element.style.removeProperty('--y'); };
    element.addEventListener('pointerenter', enter);
    element.addEventListener('pointermove', move, { passive: true });
    element.addEventListener('pointerleave', reset);
    window.addEventListener('scroll', reset, { passive: true });
    document.addEventListener('visibilitychange', reset);
    return () => { reset(); element.removeEventListener('pointerenter', enter); element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', reset); window.removeEventListener('scroll', reset); document.removeEventListener('visibilitychange', reset); };
  }, []);
  return <div ref={ref} className="reflection">{children}<div className="light" aria-hidden="true"/></div>;
}
