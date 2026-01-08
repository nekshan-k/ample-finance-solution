'use client';

import { useEffect, RefObject } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal(
  refs: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  options: ScrollRevealOptions = {}
) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = true,
  } = options;

  useEffect(() => {
    const elements = Array.isArray(refs) ? refs : [refs];
    const validElements = elements
      .map(ref => ref.current)
      .filter((el): el is HTMLElement => el !== null);

    if (validElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    validElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      validElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [refs, threshold, rootMargin, triggerOnce]);
}
