import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

export type ProjectData = {
  title: string;
  problem: string;
  architecture: string;
  businessImpact: string;
  metrics: { label: string, value: string }[];
  links: { github?: string };
};

type SpiderLilyProps = {
  id: string | number; 
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  projectData?: ProjectData;
};

export default function SpiderLily({ id, isOpen = false, onClose, className = "", projectData }: SpiderLilyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stemRef = useRef<SVGGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const [modalStyle, setModalStyle] = useState<React.CSSProperties>({});
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const blossomsConfig = [
    { id: 0, angle: -85 },
    { id: 1, angle: -50 },
    { id: 2, angle: -15 },
    { id: 3, angle: 20 },
    { id: 4, angle: 55 },
    { id: 5, angle: 90 },
  ];

  // Idle Sway
  useEffect(() => {
    if (stemRef.current && !isOpen) {
      const duration = 4 + Math.random() * 2;
      const delay = Math.random() * -duration;
      
      const swayTween = gsap.to(stemRef.current, {
        rotation: 2,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay,
        transformOrigin: "bottom center"
      });
      return () => {
        swayTween.kill();
      };
    }
  }, [isOpen]);

  // Initial State & Bloom Interaction
  useEffect(() => {
    if (!containerRef.current) return;

    if (isOpen) {
      // Bloom Open
      gsap.killTweensOf(containerRef.current.querySelectorAll("path, circle"));
      gsap.killTweensOf(glowRef.current);
      
      gsap.to(containerRef.current.querySelector(".hero-sheath"), {
        scale: 0.8, opacity: 0, duration: 0.15, transformOrigin: "bottom center"
      });

      for (let i = 0; i < blossomsConfig.length; i++) {
        const blossomDelay = i * 0.04;
        
        gsap.to(containerRef.current.querySelectorAll(`.hero-petal-base-${i}`), {
          scale: 1.0, rotation: 0, ease: "power3.out", duration: 0.35, delay: blossomDelay
        });
        gsap.to(containerRef.current.querySelectorAll(`.hero-petal-grad-${i}`), {
          scale: 1.0, rotation: 0, opacity: 1, ease: "power3.out", duration: 0.35, delay: blossomDelay
        });

        gsap.to(containerRef.current.querySelectorAll(`.hero-stamen-${i}`), {
          strokeDashoffset: 0, ease: "none", duration: 0.45, delay: blossomDelay + 0.15, stagger: 0.02
        });

        gsap.to(containerRef.current.querySelectorAll(`.hero-stamen-anther-${i}`), {
          opacity: 1, ease: "power1.inOut", duration: 0.15, delay: blossomDelay + 0.45, stagger: 0.02
        });
      }

      if (glowRef.current) {
        gsap.to(glowRef.current, { scale: 1, opacity: 0.6, duration: 0.65 });
      }

    } else {
      // Close or Idle
      gsap.killTweensOf(containerRef.current.querySelectorAll("path, circle"));
      gsap.killTweensOf(glowRef.current);
      
      for (let i = blossomsConfig.length - 1; i >= 0; i--) {
        const reverseDelay = (blossomsConfig.length - 1 - i) * 0.03;

        gsap.to(containerRef.current.querySelectorAll(`.hero-stamen-anther-${i}`), {
          opacity: 0, duration: 0.1
        });

        gsap.to(containerRef.current.querySelectorAll(`.hero-stamen-${i}`), {
          strokeDashoffset: 1000, ease: "none", duration: 0.30, delay: reverseDelay
        });

        gsap.to(containerRef.current.querySelectorAll(`.hero-petal-base-${i}`), {
          scale: 0.2, rotation: 0, ease: "power3.out", duration: 0.35, delay: reverseDelay + 0.1
        });
        gsap.to(containerRef.current.querySelectorAll(`.hero-petal-grad-${i}`), {
          scale: 0.2, rotation: 0, opacity: 0, ease: "power3.out", duration: 0.35, delay: reverseDelay + 0.1
        });
      }

      gsap.to(containerRef.current.querySelector(".hero-sheath"), {
        scale: 1, opacity: 1, duration: 0.2, delay: 0.3, transformOrigin: "bottom center"
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, { scale: 0.5, opacity: 0, duration: 0.45 });
      }
    }
  }, [isOpen, blossomsConfig.length]);

  // Dynamic Modal Positioning
  useEffect(() => {
    if (!isOpen) return;
    
    const updatePosition = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const spaceAbove = rect.top;
        const spaceBelow = window.innerHeight - rect.bottom;
        
        // If there's less than 350px above, and more space below, open downwards
        const openBelow = spaceAbove < 350 && spaceBelow > spaceAbove;
        
        setModalStyle({
          position: 'fixed',
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translateX(-50%)',
          zIndex: 99999,
          ...(openBelow 
            ? { top: `${rect.bottom + 10}px`, bottom: 'auto' }
            : { bottom: `${window.innerHeight - rect.top + 40}px`, top: 'auto' }
          )
        });
      }
    };
    
    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  // Modal Animation Lifecycle
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setIsAnimatingOut(false);
    } else if (isRendered) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setIsRendered(false);
        setIsAnimatingOut(false);
      }, 300); // match animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered]);

  return (
    <div 
      ref={wrapperRef}
      className={`spider-lily-wrapper ${className}`}
      style={{ 
        position: 'relative', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        cursor: 'pointer',
        zIndex: 20
      }}
    >
      <div 
        ref={containerRef}
        style={{ 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transformOrigin: 'bottom',
          transition: 'all 0.3s',
          width: '80px', 
          height: '50px', 
          margin: '0 auto' 
        }}
      >
        <div 
          ref={glowRef}
          style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100px', height: '100px', transform: 'translate(-50%, -50%) scale(0.5)', 
            background: 'rgba(225, 29, 72, 0.3)', borderRadius: '50%', filter: 'blur(15px)',
            opacity: 0, pointerEvents: 'none'
          }}
        />

        <div style={{ position: 'relative', pointerEvents: 'none', width: '80px', height: '80px', marginTop: '-30px' }}>
          <svg viewBox="-300 -300 600 600" style={{ width: '100%', height: '100%', overflow: 'visible', filter: 'drop-shadow(0 0 5px rgba(225,29,72,0.5))' }}>
            <defs>
              <radialGradient id={`petal-grad-${id}`} cx="50%" cy="100%" r="100%">
                <stop offset="0%" stopColor="#e11d48" stopOpacity="1" />
                <stop offset="100%" stopColor="#ff4d6d" stopOpacity="0.3" />
              </radialGradient>
              <linearGradient id={`stamen-glow-${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#e11d48" />
                <stop offset="100%" stopColor="#fff" />
              </linearGradient>
            </defs>
            <g ref={stemRef}>
              <path d="M0,0 Q -5,30 2,60 T -2,120 T 3,180 T 0,220" stroke="#123527" fill="none" strokeWidth="4" strokeLinecap="round" />
              <path d="M2,60 Q 25,20 45,5 Q 30,45 2,60 Z" fill="#123527" opacity="0.8" />
              <path d="M-2,100 Q -30,60 -50,45 Q -35,85 -2,100 Z" fill="#123527" opacity="0.6" />

              <path className="hero-sheath" d="M0,0 C -15,-20 -20,-70 0,-90 C 20,-70 15,-20 0,0 Z" fill="#2A0810" />
              
              {blossomsConfig.map((b) => (
                <g key={`blossom-${b.id}`} transform={`rotate(${b.angle}) translate(0, -10)`}>
                  <g>
                    {[-110, -70, -30, 30, 70, 110].map((deg, i) => (
                      <g key={`petal-${i}`} transform={`rotate(${deg})`}>
                        <path
                          className={`hero-petal-base-${b.id}`}
                          d="M0,0 C -25,-40 -15,-90 0,-130 C 15,-170 30,-200 5,-220 C -20,-200 -5,-170 15,-130 C 30,-90 20,-40 0,0 Z"
                          fill="rgb(100,9,14)"
                          style={{ transformOrigin: "0 0", transform: "scale(0.2) rotate(0deg)" }}
                        />
                        <path
                          className={`hero-petal-grad-${b.id}`}
                          d="M0,0 C -25,-40 -15,-90 0,-130 C 15,-170 30,-200 5,-220 C -20,-200 -5,-170 15,-130 C 30,-90 20,-40 0,0 Z"
                          fill={`url(#petal-grad-${id})`}
                          style={{ transformOrigin: "0 0", transform: "scale(0.2) rotate(0deg)", opacity: 0 }}
                        />
                      </g>
                    ))}
                  </g>
                  <g>
                    {[-85, -50, -15, 15, 50, 85].map((deg, i) => {
                      const isLong = i % 2 === 0;
                      const yDest = isLong ? -280 : -230;
                      const sweep = i < 3 ? -60 : 60;
                      const stamenPath = `M0,0 Q ${sweep},${yDest / 2} 0,${yDest}`;
                      
                      return (
                        <g key={`stamen-${i}`} transform={`rotate(${deg})`}>
                          <path
                            className={`hero-stamen-${b.id}`}
                            d={stamenPath}
                            fill="none"
                            stroke={`url(#stamen-glow-${id})`}
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            style={{ strokeDasharray: "1000", strokeDashoffset: "1000" }}
                          />
                          <circle
                            className={`hero-stamen-anther-${b.id}`}
                            cx="0" cy={yDest} r="3"
                            fill="#FACC15"
                            style={{ opacity: 0 }}
                          />
                        </g>
                      );
                    })}
                  </g>
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>

      {isRendered && projectData && typeof document !== 'undefined' && createPortal(
        <>
          <div 
            className={isAnimatingOut ? 'modal-backdrop-out' : 'modal-backdrop-in'}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99990 }} 
            onClick={(e) => { e.stopPropagation(); onClose?.(); }} 
          />
          <div 
            className={`project-modal ${isAnimatingOut ? 'modal-out' : 'modal-in'}`}
            onClick={(e) => e.stopPropagation()}
            style={modalStyle}
          >
          <div className="project-modal-header">
            <h3>{projectData.title}</h3>
            <button onClick={(e) => { e.stopPropagation(); onClose?.(); }}>&times;</button>
          </div>
          
          <div className="project-modal-content">
            <div className="modal-section">
              <h4>Problem</h4>
              <p>{projectData.problem}</p>
            </div>
            <div className="modal-section">
              <h4>Architecture</h4>
              <p>{projectData.architecture}</p>
            </div>
            <div className="modal-section">
              <h4>Impact</h4>
              <p className="impact-text">{projectData.businessImpact}</p>
            </div>
            
            <div className="modal-metrics">
              {projectData.metrics.map((m, i) => (
                <div key={i} className="metric-box">
                  <p className="metric-label">{m.label}</p>
                  <p className="metric-value">{m.value}</p>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              {projectData.links?.github && (
                <a href={projectData.links.github} target="_blank" rel="noreferrer" className="modal-link">
                  View Source &#8599;
                </a>
              )}
            </div>
          </div>
        </div>
        </>,
        document.body
      )}
    </div>
  );
}
