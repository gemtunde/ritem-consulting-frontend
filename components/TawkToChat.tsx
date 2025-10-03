'use client';

import { useEffect } from 'react';

export default function TawkToChat() {
  useEffect(() => {
    const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
    const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

    if (!propertyId || !widgetId) {
      console.warn('Tawk.to credentials not configured. Please add NEXT_PUBLIC_TAWK_PROPERTY_ID and NEXT_PUBLIC_TAWK_WIDGET_ID to .env.local');
      return;
    }

    if (propertyId === 'your_property_id_here' || widgetId === 'your_widget_id_here') {
      console.warn('Tawk.to credentials are using default values. Please update .env.local with your actual credentials.');
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);

      const tawkWidget = document.getElementById('tawk-bubble');
      if (tawkWidget) {
        tawkWidget.remove();
      }
    };
  }, []);

  return null;
}
