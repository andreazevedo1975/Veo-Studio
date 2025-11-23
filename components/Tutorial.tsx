
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, useState } from 'react';
import { ArrowRightIcon, XMarkIcon } from './icons';

export interface TutorialStep {
  targetId: string;
  title: string;
  content: string;
}

interface TutorialProps {
  steps: TutorialStep[];
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ steps, isActive, onComplete, onSkip }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  // Effect to handle scrolling to the element when the step changes
  useEffect(() => {
    if (!isActive) return;

    const targetId = steps[currentStepIndex]?.targetId;
    const element = document.getElementById(targetId);
    if (element) {
      // Scroll into view ONLY when the step changes, not on every scroll event
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isActive, currentStepIndex, steps]);

  // Effect to track position updates (resize/scroll)
  useEffect(() => {
    if (!isActive) {
      setTargetRect(null);
      return;
    }

    const updateRectOnly = () => {
      const targetId = steps[currentStepIndex]?.targetId;
      const element = document.getElementById(targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
      } else {
        setTargetRect(null);
      }
    };

    // Initial calculation
    const timeoutId = setTimeout(updateRectOnly, 100);
    
    // Update position on scroll/resize without forcing scrollIntoView
    window.addEventListener('resize', updateRectOnly);
    window.addEventListener('scroll', updateRectOnly, true); // Capture phase to handle nested scrolls

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateRectOnly);
      window.removeEventListener('scroll', updateRectOnly, true);
    };
  }, [isActive, currentStepIndex, steps]);

  // CRITICAL FIX: If not active OR if target is not found yet, 
  // DO NOT render the container. This prevents an invisible "inset-0" div 
  // with pointer-events-auto from blocking the entire screen (Frozen UI bug).
  if (!isActive || !targetRect) return null;

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const currentStep = steps[currentStepIndex];

  return (
    // CHANGED: pointer-events-none ensures the overlay never blocks clicks on the app itself.
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Backdrop with cutout effect using box-shadow trick - Visual only */}
      {/* Added pointer-events-none explicitly to be safe */}
      <div 
        className="absolute inset-0 transition-all duration-500 ease-in-out pointer-events-none"
        style={{
          boxShadow: `0 0 0 9999px rgba(0, 0, 0, 0.75)`,
          top: targetRect.top - 8,
          left: targetRect.left - 8,
          width: targetRect.width + 16,
          height: targetRect.height + 16,
          borderRadius: '12px',
          position: 'absolute',
        }}
      />

      {/* Tooltip Card - MUST be pointer-events-auto to be clickable */}
      <div
        className="absolute w-80 bg-[#2c2c2e] border border-gray-600 rounded-xl shadow-2xl p-5 transition-all duration-500 ease-in-out flex flex-col gap-3 pointer-events-auto"
        style={{
          // Simple positioning logic: prioritize bottom, fallback to top if too low
          top: targetRect.bottom + 24 > window.innerHeight - 200 
                ? targetRect.top - 200 // show above
                : targetRect.bottom + 24, // show below
          left: Math.min(
              Math.max(16, targetRect.left + targetRect.width / 2 - 160), 
              window.innerWidth - 336
          )
        }}
      >
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-white">{currentStep.title}</h3>
          <button 
            onClick={onSkip}
            className="text-gray-500 hover:text-gray-300 transition-colors"
            aria-label="Fechar tutorial"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-sm text-gray-300 leading-relaxed">
          {currentStep.content}
        </p>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-700">
          <span className="text-xs text-gray-500 font-medium">
            Passo {currentStepIndex + 1} de {steps.length}
          </span>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {currentStepIndex === steps.length - 1 ? 'Concluir' : 'Próximo'}
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Arrow (simple CSS triangle) */}
        <div 
          className="absolute w-4 h-4 bg-[#2c2c2e] border-t border-l border-gray-600 transform rotate-45"
          style={{
              top: targetRect.bottom + 24 > window.innerHeight - 200 
                ? 'auto' 
                : '-9px',
              bottom: targetRect.bottom + 24 > window.innerHeight - 200 
                ? '-9px' 
                : 'auto',
              left: '50%',
              marginLeft: '-8px'
          }}
        />
      </div>
    </div>
  );
};

export default Tutorial;
