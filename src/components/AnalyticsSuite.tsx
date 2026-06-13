import {useEffect} from 'react';
import {Analytics as VercelAnalytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/react';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

function isRealMeasurementId(value: unknown): value is string {
  return typeof value === 'string' && /^G-[A-Z0-9]+$/.test(value) && !value.includes('REPLACE');
}

export function AnalyticsSuite() {
  useEffect(() => {
    if (!import.meta.env.PROD || !isRealMeasurementId(GA_MEASUREMENT_ID)) return;
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`)) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    const win = window as typeof window & {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };
    win.dataLayer = win.dataLayer || [];
    win.gtag = (...args: unknown[]) => {
      win.dataLayer?.push(args);
    };
    win.gtag('js', new Date());
    win.gtag('config', GA_MEASUREMENT_ID);
  }, []);

  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
