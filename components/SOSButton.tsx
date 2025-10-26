import React, { useState, useRef, useCallback } from 'react';
import { BellAlertIcon } from '../constants';

const SOSButton: React.FC = () => {
    const [isHolding, setIsHolding] = useState(false);
    const holdTimeout = useRef<number | null>(null);

    const handleEmergencyBell = () => {
        // In a real app, this would trigger a call to Supabase or a hardware API
        alert(`Emergency Bell Rung!`);
    };
    
    const startHold = useCallback(() => {
        setIsHolding(true);
        holdTimeout.current = window.setTimeout(() => {
            handleEmergencyBell();
            setIsHolding(false); // Stop ripple after activation
        }, 3000);
    }, []);

    const endHold = useCallback(() => {
        setIsHolding(false);
        if (holdTimeout.current) {
            clearTimeout(holdTimeout.current);
            holdTimeout.current = null;
        }
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-20">
            <button
                onMouseDown={startHold}
                onMouseUp={endHold}
                onMouseLeave={endHold}
                onTouchStart={startHold}
                onTouchEnd={endHold}
                className="relative w-20 h-20 rounded-full bg-red-600 text-white flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform overflow-hidden focus:outline-none focus:ring-4 focus:ring-red-400/50"
                aria-label="Hold for 3 seconds for SOS"
            >
                <BellAlertIcon className="w-8 h-8 z-10" />
                <span className="z-10 font-bold text-sm">RING</span>
                <span
                    className={`absolute rounded-full bg-white/30 ${isHolding ? 'animate-ripple' : ''}`}
                ></span>
            </button>
             <style>{`
                @keyframes ripple {
                    from {
                        transform: scale(0);
                        opacity: 1;
                    }
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                .animate-ripple {
                    animation: ripple 3s linear;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
};

export default SOSButton;