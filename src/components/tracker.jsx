// _app.js or inside each page component
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function AnalyticsTracker() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: url }),
      });
    };

    // Track first load and every route change
    handleRouteChange(window.location.pathname);
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, []);

  return null;
}