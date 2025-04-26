import { useState, useEffect } from 'react';

interface DeviceOrientationState {
  alpha: number | null; // [0, 360) - rotation around z-axis
  beta: number | null;  // [-180, 180) - front/back
  gamma: number | null; // [-90, 90) - left/right
}

export const useDeviceOrientation = (): DeviceOrientationState => {
  const [orientation, setOrientation] = useState<DeviceOrientationState>({
    alpha: null,
    beta: null,
    gamma: null,
  });
  
  useEffect(() => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      });
    };
    
    // Check if DeviceOrientationEvent is supported
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
      
      // Request permission for iOS 13+ devices
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        // This is only available in secure contexts (HTTPS)
        console.log('Device orientation requires permission on this device');
      }
    }
    
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);
  
  return orientation;
};