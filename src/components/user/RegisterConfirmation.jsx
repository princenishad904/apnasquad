import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Check, ArrowRight } from 'lucide-react';
import { useJoinTournamentMutation } from '@/redux/tournament/tournamentApi';
import { toast } from 'sonner';

const SwipeButton = ({ 
  onConfirm, 
  text = "Swipe to Register", 
  confirmedText = "Registration Confirmed!",
  loadingText = "Processing...",
  className = "",
  id,
  tournamentId // Added tournamentId prop
}) => {
  const [joinTournament, { isLoading }] = useJoinTournamentMutation();

  const [isSwiping, setIsSwiping] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const buttonRef = useRef(null);
  const sliderRef = useRef(null);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const maxSwipeDistanceRef = useRef(0);

  // Initialize max swipe distance on mount and resize
  useEffect(() => {
    const updateMaxSwipeDistance = () => {
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        maxSwipeDistanceRef.current = buttonRect.width - 50; // 50px for slider handle + margins
      }
    };

    updateMaxSwipeDistance();
    window.addEventListener('resize', updateMaxSwipeDistance);

    return () => {
      window.removeEventListener('resize', updateMaxSwipeDistance);
      cleanupEventListeners();
    };
  }, []);

  const cleanupEventListeners = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleMouseMove);
    document.removeEventListener('touchend', handleMouseUp);
  };

  const handleMouseDown = (e) => {
    if (isConfirmed || isLoading) return;
    
    isDraggingRef.current = true;
    setIsSwiping(true);
    startXRef.current = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !buttonRef.current) return;
    
    e.preventDefault();
    const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const maxSwipeDistance = maxSwipeDistanceRef.current;
    const swipeDistance = Math.min(Math.max(0, currentX - startXRef.current), maxSwipeDistance);
    
    setProgress((swipeDistance / maxSwipeDistance) * 100);
    
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${swipeDistance}px)`;
    }
    
    // Complete the swipe at 85% progress
    if (swipeDistance >= maxSwipeDistance * 0.85) {
      completeSwipe();
    }
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    
    isDraggingRef.current = false;
    setIsSwiping(false);
    
    // Reset if not completed
    if (progress < 85) {
      resetSwipe();
    }
    
    cleanupEventListeners();
  };

  const resetSwipe = () => {
    setProgress(0);
    if (sliderRef.current) {
      sliderRef.current.style.transform = 'translateX(0px)';
    }
  };

  const completeSwipe = async () => {
    setProgress(100);
    isDraggingRef.current = false;
    cleanupEventListeners();

    try {
      const { data, error } = await joinTournament({ 
        tournamentId:  id 
      });

      if (error) {
        toast.error(error?.data?.message || "Registration failed");
        resetSwipe();
        return;
      }

      if (data?.success) {
        setIsConfirmed(true);
        if (onConfirm) onConfirm();
        toast.success(data?.message || "Registration successful!");
      } else {
        throw new Error("Registration failed");
      }
    } catch (err) {
      toast.error("An error occurred during registration");
      resetSwipe();
    }
  };

  const resetButton = () => {
    setIsConfirmed(false);
    resetSwipe();
  };

  // Auto-reset after success (optional)
  useEffect(() => {
    if (isConfirmed) {
      const timer = setTimeout(() => {
        resetButton();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isConfirmed]);

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {/* Swipe Button */}
      <div
        ref={buttonRef}
        className={`
          relative w-full h-12 rounded-full overflow-hidden cursor-pointer
          transition-all duration-300 ease-out select-none
          ${isConfirmed 
            ? 'bg-green-500 shadow-lg shadow-green-500/30' 
            : isLoading 
            ? 'bg-blue-500 shadow-lg shadow-blue-500/30'
            : 'bg-gradient-to-r from-purple-600 to-indigo-700 shadow-md'
          }
          ${(isConfirmed || isLoading) ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}
        `}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Background Text */}
        <div className={`
          absolute inset-0 flex items-center justify-center text-white font-semibold
          transition-opacity duration-300
          ${isSwiping || isLoading || isConfirmed ? 'opacity-0' : 'opacity-100'}
        `}>
          <span className="flex items-center">
            {text}
            <ArrowRight className="ml-2 h-5 w-5" />
          </span>
        </div>

        {/* Loading State */}
        <div className={`
          absolute inset-0 flex items-center justify-center text-white font-semibold
          transition-opacity duration-300
          ${isLoading ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            {loadingText}
          </div>
        </div>

        {/* Confirmed State */}
        <div className={`
          absolute inset-0 flex items-center justify-center text-white font-semibold
          transition-opacity duration-300
          ${isConfirmed ? 'opacity-100' : 'opacity-0'}
        `}>
          <span className="flex items-center">
            <Check className="mr-2 h-6 w-6" />
            {confirmedText}
          </span>
        </div>

        {/* Progress Background (shows during swipe) */}
        <div 
          className={`
            absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600
            transition-opacity duration-300
            ${isSwiping && progress > 0 ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            width: `${progress}%`,
            transition: isSwiping ? 'none' : 'width 0.3s ease-out'
          }}
        />

        {/* Slider Handle */}
        {!isConfirmed && !isLoading && (
          <div
            ref={sliderRef}
            className={`
              absolute left-1 top-1 w-10 h-10 bg-white rounded-full
              flex items-center justify-center shadow-lg z-10
              transition-transform duration-150 ease-out
              ${isSwiping ? 'scale-105' : 'scale-100'}
            `}
          >
            <ChevronRight className="h-6 w-6 text-purple-600" />
          </div>
        )}
      </div>
    </div>
  );
};

// Example usage in a tournament registration component
const TournamentRegistration = () => {
  const handleRegistrationConfirm = () => {
    console.log('Registration confirmed!');
    // Additional logic after successful registration
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Tournament Registration
          </h1>
          <p className="text-gray-600">
            Confirm your participation in the Summer Championship
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Tournament Details</h3>
            <p className="text-gray-600">Summer Valorant Championship 2024</p>
            <p className="text-sm text-gray-500">August 15-17, 2024</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Player Information</h3>
            <p className="text-gray-600">Alex Johnson</p>
            <p className="text-sm text-gray-500">Team: Phoenix Rising</p>
          </div>
        </div>

        <SwipeButton 
          onConfirm={handleRegistrationConfirm}
          text="Swipe to Confirm Registration"
          confirmedText="Successfully Registered!"
          loadingText="Processing Registration..."
          tournamentId="your-tournament-id-here" // Pass actual tournament ID
        />
      </div>
    </div>
  );
};

export default TournamentRegistration;
export { SwipeButton };