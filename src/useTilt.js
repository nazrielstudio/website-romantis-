import { useRef } from 'react';

// Efek tilt 3D yang mengikuti posisi kursor/jari — dipakai di foto hero,
// kartu surat, dan polaroid galeri supaya terasa punya kedalaman (3D).
export function useTilt(strength = 10) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    const x = (point.clientX - rect.left) / rect.width - 0.5;
    const y = (point.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg) translateZ(6px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}
