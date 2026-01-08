'use client';

import { useEffect } from 'react';
import { useTheme, primaryColors } from '@/app/context/ThemeContext';

export function useDynamicFavicon() {
  const { primaryColor, useGradient } = useTheme();

  useEffect(() => {
    const colorShades = primaryColors[primaryColor];
    const color = colorShades[500];

    // Create SVG favicon
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          ${useGradient ? `
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${colorShades[500]};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${colorShades[600]};stop-opacity:1" />
            </linearGradient>
          ` : ''}
        </defs>
        <rect width="100" height="100" rx="20" fill="${useGradient ? 'url(#grad)' : color}"/>
        <text x="50" y="72" font-family="Arial, sans-serif" font-size="60" font-weight="bold" text-anchor="middle" fill="white">A</text>
      </svg>
    `;

    // Convert SVG to data URL
    const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);

    // Update favicon
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = svgUrl;

    // Cleanup
    return () => {
      URL.revokeObjectURL(svgUrl);
    };
  }, [primaryColor, useGradient]);
}
