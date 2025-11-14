import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  startX: number;
  startY: number;
  tx: number;
  ty: number;
  delay: number;
  color: string;
  size: number;
  shape: 'circle' | 'square' | 'triangle';
}

const colors = [
  'hsl(85, 40%, 55%)',
  'hsl(75, 45%, 50%)',
  'hsl(95, 35%, 60%)',
  'hsl(120, 25%, 70%)',
  'hsl(80, 50%, 45%)',
];

export const Confetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    // Massive confetti burst from center
    const centerX = 50;
    const centerY = 40;
    
    const confettiPieces = Array.from({ length: 80 }, (_, i) => {
      const angle = (i / 80) * Math.PI * 2;
      const velocity = 100 + Math.random() * 200;
      
      return {
        id: i,
        startX: centerX,
        startY: centerY,
        tx: Math.cos(angle) * velocity,
        ty: Math.sin(angle) * velocity - 100,
        delay: Math.random() * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 8,
        shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
      };
    });
    
    setPieces(confettiPieces);
    
    // Trigger burst animation
    setTimeout(() => setBurst(true), 100);
    
    // Add continuous floating confetti after burst
    setTimeout(() => {
      const floatingPieces = Array.from({ length: 30 }, (_, i) => ({
        id: 100 + i,
        startX: Math.random() * 100,
        startY: -10,
        tx: (Math.random() - 0.5) * 100,
        ty: 0,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 6,
        shape: ['circle', 'square'][Math.floor(Math.random() * 2)] as 'circle' | 'square',
      }));
      setPieces(prev => [...prev, ...floatingPieces]);
    }, 2000);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => {
        const isFloating = piece.id >= 100;
        
        return (
          <div
            key={piece.id}
            className={isFloating ? 'absolute animate-float' : 'absolute'}
            style={{
              left: `${piece.startX}%`,
              top: isFloating ? '-10%' : `${piece.startY}%`,
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
              opacity: burst || isFloating ? 0.8 : 0,
              animationDelay: `${piece.delay}s`,
              animationDuration: isFloating ? `${3 + Math.random() * 2}s` : '3s',
              animationFillMode: 'forwards',
              ...(isFloating ? {} : {
                '--tx': `${piece.tx}px`,
                '--ty': `${piece.ty}px`,
                animation: burst ? 'confetti-explosion 3s ease-out forwards' : 'none',
              }),
              borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'square' ? '2px' : '0',
              clipPath: piece.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
              boxShadow: `0 0 ${piece.size * 2}px ${piece.color}`,
            } as React.CSSProperties}
          />
        );
      })}
      
      {/* Glowing orbs */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className="absolute animate-float"
          style={{
            left: `${20 + i * 15}%`,
            top: `${20 + (i % 2) * 30}%`,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors[i % colors.length]} 0%, transparent 70%)`,
            opacity: 0.3,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${4 + i}s`,
            filter: 'blur(20px)',
          }}
        />
      ))}
    </div>
  );
};
