'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { business } from '@/data/site';
const links = [['/', 'POČETNA'], ['/radovi', 'RADOVI'], ['/o-nama', 'O NAMA'], ['/kontakt', 'KONTAKT']];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 30);
    scroll();
    window.addEventListener('scroll', scroll, { passive: true });
    return () => window.removeEventListener('scroll', scroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menu.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const close = () => { setOpen(false); toggle.current?.focus(); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key !== 'Tab') return;
      const items = [toggle.current, ...Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])].filter(Boolean) as HTMLElement[];
      const i = items.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i === 0) { e.preventDefault(); items.at(-1)?.focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    };
    const breakpoint = matchMedia('(min-width: 761px)');
    const resize = () => { if (breakpoint.matches) close(); };
    breakpoint.addEventListener('change', resize);
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', onKey); breakpoint.removeEventListener('change', resize); };
  }, [open]);
  return <header className={`header ${scrolled ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`}>
    <Link href="/" className="brand" aria-label="Epoxy Topalović — početna" onClick={() => setOpen(false)}><Image src="/brand/symbol-primary.png" alt="" width={68} height={54}/><span>EPOXY<strong>TOPALOVIĆ</strong></span></Link>
    <nav className="desktop-nav" aria-label="Glavna navigacija">{links.map(([href, label]) => <Link aria-current={path === href ? 'page' : undefined} key={href} href={href}>{label}</Link>)}</nav>
    <a href={business.tel} className="button nav-call">POZOVITE NAS</a>
    <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? 'ZATVORI −' : 'MENI +'}</button>
    <div ref={menu} id="mobile-menu" className="mobile-menu" inert={!open} aria-hidden={!open}>
      <nav aria-label="Mobilna navigacija">{links.map(([href, label], i) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined} style={{ '--item': i } as React.CSSProperties} onClick={() => setOpen(false)}><small>0{i + 1}</small>{label}</Link>)}</nav>
      <a href={business.tel}>{business.phone}</a><p>{business.location}</p>
    </div>
  </header>;
}
export function Footer() { return <footer className="wrap footer reveal"><Link className="footer-brand" href="/">EPOXY <strong>TOPALOVIĆ</strong></Link><p>Preciznost u svakom sloju.<br/>{business.location}</p><div><a href={business.tel}>{business.phone}</a><a href={`mailto:${business.email}`}>{business.email}</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} EPOXY TOPALOVIĆ</span><span>BETON. TRANSFORMIRAN.</span></div></footer>; }
