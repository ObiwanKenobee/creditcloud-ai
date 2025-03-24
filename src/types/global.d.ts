
// Declare the canvas-confetti module
declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
    zIndex?: number;
  }

  function confetti(options?: ConfettiOptions): Promise<void>;
  
  namespace confetti {
    function reset(): void;
  }

  export = confetti;
}
