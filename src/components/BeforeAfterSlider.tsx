import { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  alt,
  beforeLabel = 'ANTES',
  afterLabel = 'DEPOIS',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  };

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX);
    };
    const onEnd = () => setIsDragging(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] overflow-hidden rounded-lg cursor-ew-resize select-none bg-zinc-900 border border-zinc-800 group"
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* Imagem de DEPOIS (Fica fixa ao fundo ocupando o espaço total) */}
      <img
        src={afterSrc}
        alt={`${alt} - Depois`}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Imagem de ANTES (Recortada dinamicamente pela div com base na posição do slider) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeSrc}
          alt={`${alt} - Antes`}
          className="absolute inset-0 h-full object-cover"
          style={{
            width: `${containerWidth || 1000}px`,
            maxWidth: 'none',
          }}
          draggable={false}
        />
      </div>

      {/* Etiquetas Indicadoras */}
      <div className="absolute top-4 left-4 bg-red-600/90 text-white text-[10px] font-bold tracking-[0.2em] px-3 py-1.5 rounded-sm pointer-events-none backdrop-blur-sm border border-red-400/30">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 bg-white/95 text-zinc-900 text-[10px] font-bold tracking-[0.2em] px-3 py-1.5 rounded-sm pointer-events-none backdrop-blur-sm shadow-lg">
        {afterLabel}
      </div>

      {/* Linha Divisória Visual */}
      <div
        className="absolute top-0 bottom-0 w-[2px] pointer-events-none z-10"
        style={{ left: `${position}%`, transform: 'translateX(-1px)' }}
      >
        <div className="w-full h-full bg-gradient-to-b from-red-500 via-white to-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
      </div>

      {/* Botão Central de Arrasto (Handle) */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <div className="relative flex items-center justify-center">
          <div className={`w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center border-2 border-red-500 transition-transform ${isDragging ? 'scale-110' : 'group-hover:scale-105'}`}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#dc2626"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 12H5l4-4v8l-4-4h4" />
              <path d="M15 12h4l-4-4v8l4-4h-4" />
            </svg>
          </div>
          {/* Linhas pulsantes decorativas nas laterais do botão */}
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-gradient-to-r from-transparent to-red-500" />
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-gradient-to-l from-transparent to-red-500" />
        </div>
      </div>

      {/* Texto de Ajuda inferior */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-950/90 text-zinc-300 text-xs px-4 py-2 rounded-full border border-zinc-700 backdrop-blur-md pointer-events-none flex items-center gap-2 shadow-xl">
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12H5l4-4v8l-4-4h4" />
            <path d="M15 12h4l-4-4v8l4-4h-4" />
          </svg>
          Arraste para comparar
        </span>
      </div>
    </div>
  );
}
