'use client';
import { useRef, useState, useEffect } from 'react';
import { gallery } from '@/data/site';
import { Photo } from './shared';
const filters = ['SVI', 'EPOKSIDNI PODOVI', 'POLIURETANSKI PODOVI', 'DETALJI IZVEDBE'];
export function Gallery() {
  const [filter, setFilter] = useState('SVI');
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const origin = useRef<HTMLButtonElement | null>(null);
  const closing = useRef(false);
  const closeAnimation = useRef<Animation | null>(null);
  const touch = useRef({ x: 0, y: 0 });
  const items = gallery.filter(i => filter === 'SVI' || i.category === filter);
  const isOpen = active !== null;
  const move = (n: number) => { if (!closing.current) setActive(a => a === null ? null : (a + n + items.length) % items.length); };
  useEffect(() => {
    if (!isOpen) return;
    dialog.current?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = old; closeAnimation.current?.cancel(); };
  }, [isOpen]);
  function close() {
    if (closing.current) return;
    closing.current = true;
    const finish = () => { dialog.current?.close(); setActive(null); closing.current = false; origin.current?.focus(); };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || document.hidden || !dialog.current?.animate) { finish(); return; }
    closeAnimation.current = dialog.current.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(6px)' }], { duration: 140, easing: 'ease-out' });
    closeAnimation.current.finished.then(finish, () => { closing.current = false; });
  }
  return <>
    <div className="filters" aria-label="Filtriraj vizualizacije">{filters.map(f => <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>)}</div>
    <p className="sr-only" role="status">{items.length} vizualizacija</p>
    <div key={filter} className="gallery-grid">{items.map(item => <button className="gallery-item" key={item.id} aria-haspopup="dialog" onClick={e => { origin.current = e.currentTarget; setActive(items.findIndex(i => i.id === item.id)); }}>
      <Photo id={item.id} alt={item.alt}/><div className="gallery-caption"><div><small>VIZUALIZACIJA / PRIMJER ZAVRŠNE OBRADE</small><h2>{item.title}</h2></div></div>
    </button>)}</div>
    <dialog ref={dialog} className="lightbox" aria-label="Pregled vizualizacije" onCancel={e => { e.preventDefault(); close(); }} onClick={e => { if (e.target === e.currentTarget) close(); }} onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); move(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); } }}>
      <button className="lightbox-close" onClick={close} autoFocus>ZATVORI ×</button>
      {active !== null && <div onTouchStart={e => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }} onTouchEnd={e => { const dx = e.changedTouches[0].clientX - touch.current.x; const dy = e.changedTouches[0].clientY - touch.current.y; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1); }}>
        <Photo key={items[active].id} id={items[active].id} alt={items[active].alt}/>
        <div className="lightbox-bottom"><button onClick={() => move(-1)} aria-label="Prethodna slika">PRETHODNA</button><p aria-live="polite">{items[active].title}<small>AI VIZUALIZACIJA · {active + 1} / {items.length}</small></p><button onClick={() => move(1)} aria-label="Sljedeća slika">SLJEDEĆA</button></div>
      </div>}
    </dialog>
  </>;
}
