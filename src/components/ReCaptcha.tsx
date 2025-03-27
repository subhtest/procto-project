'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      render: (container: HTMLElement, options: any) => number;
      getResponse: (widgetId: number) => string;
      reset: (widgetId: number) => void;
    };
  }
}

interface ReCaptchaProps {
  onVerify: (token: string) => void;
  onExpire: () => void;
}

export default function ReCaptcha({ onVerify, onExpire }: ReCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    
    if (!siteKey) {
      console.error('reCAPTCHA site key is not configured');
      return;
    }

    const loadScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (scriptLoadedRef.current) {
          resolve();
          return;
        }

        // Check if script is already in the document
        if (document.querySelector('script[src*="recaptcha/api.js"]')) {
          scriptLoadedRef.current = true;
          resolve();
          return;
        }

        // Create a new script element
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
        script.async = true;
        script.defer = true;

        // Add script to document
        document.head.appendChild(script);

        // Wait for script to load
        script.onload = () => {
          scriptLoadedRef.current = true;
          resolve();
        };

        script.onerror = (error) => {
          console.error('Error loading reCAPTCHA script:', error);
          reject(error);
        };
      });
    };

    const waitForGrecaptcha = () => {
      return new Promise<void>((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds maximum wait time

        const checkGrecaptcha = () => {
          if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
            resolve();
          } else if (attempts >= maxAttempts) {
            reject(new Error('reCAPTCHA failed to load after 5 seconds'));
          } else {
            attempts++;
            setTimeout(checkGrecaptcha, 100);
          }
        };

        checkGrecaptcha();
      });
    };

    const initializeRecaptcha = async () => {
      try {
        await loadScript();
        await waitForGrecaptcha();
        
        if (containerRef.current && window.grecaptcha && typeof window.grecaptcha.render === 'function') {
          // Reset any existing widget
          if (widgetIdRef.current && window.grecaptcha) {
            window.grecaptcha.reset(widgetIdRef.current);
          }

          // Render new widget
          widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              onVerify(token);
            },
            'expired-callback': () => {
              onExpire();
            },
            'error-callback': () => {
              console.error('reCAPTCHA error occurred');
            },
            theme: 'light',
            size: 'normal',
          });
        } else {
          console.error('reCAPTCHA not properly initialized');
        }
      } catch (error) {
        console.error('Error initializing reCAPTCHA:', error);
      }
    };

    initializeRecaptcha();

    return () => {
      if (widgetIdRef.current && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    };
  }, [onVerify, onExpire]);

  return (
    <div 
      ref={containerRef} 
      className="flex justify-center"
      style={{ minHeight: '65px' }}
    />
  );
} 