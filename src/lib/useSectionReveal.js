import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, smokeFrom, smokeTo, fadeUpFrom, fadeUpTo } from './motion';

gsap.registerPlugin(ScrollTrigger);

// Entrance shared by the sections that use .section-head: badge, title and
// subtitle condense in, then the cards rise with a short stagger. Runs once.
export const useSectionReveal = (sectionRef, cardSelector) => {
  useEffect(() => {
    if (!sectionRef.current) return undefined; // section rendered nothing

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
        .fromTo('.section-badge', fadeUpFrom(), fadeUpTo())
        .fromTo('.section-title', smokeFrom(), smokeTo(), '-=0.3')
        .fromTo('.section-subtitle', fadeUpFrom(), fadeUpTo(), '-=0.5');

      const cards = sectionRef.current?.querySelectorAll(cardSelector);
      if (cards?.length) {
        // No blur here: these cards already use backdrop-filter, blurring them too is costly
        gsap.fromTo(cards,
          prefersReducedMotion() ? { opacity: 0 } : { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: cards[0], start: 'top 88%', once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, cardSelector]);
};
