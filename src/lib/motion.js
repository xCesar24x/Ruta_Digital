// Shared motion helpers so every section feels like the same product.

let lenisInstance = null;

export const registerLenis = (instance) => {
  lenisInstance = instance;
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Modals: freeze the page behind them. Lenis keeps eating wheel events otherwise,
// so the background scrolls while the modal content stays stuck.
export const lockScroll = () => {
  if (lenisInstance) lenisInstance.stop();
  else document.documentElement.style.overflow = 'hidden';
};

export const unlockScroll = () => {
  if (lenisInstance) lenisInstance.start();
  else document.documentElement.style.overflow = '';
};

export const scrollToId = (id) => {
  const element = document.getElementById(id);
  if (!element) return;
  if (lenisInstance) lenisInstance.scrollTo(element);
  else element.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
};

export const openBooking = (service) => {
  window.dispatchEvent(new CustomEvent('open-booking-modal', { detail: service ? { service } : undefined }));
};

// Section heading "condensation" reveal. Only blur, opacity and transform:
// animating letter-spacing re-flows the text on every frame.
export const smokeFrom = () =>
  prefersReducedMotion()
    ? { opacity: 0 }
    : { opacity: 0, filter: 'blur(10px)', scale: 1.04, y: 16 };

export const smokeTo = (overrides = {}) => ({
  opacity: 1,
  filter: 'blur(0px)',
  scale: 1,
  y: 0,
  duration: prefersReducedMotion() ? 0.4 : 0.9,
  ease: 'power3.out',
  clearProps: 'filter',
  ...overrides,
});

export const fadeUpFrom = () =>
  prefersReducedMotion() ? { opacity: 0 } : { opacity: 0, y: 16, filter: 'blur(6px)' };

export const fadeUpTo = (overrides = {}) => ({
  opacity: 1,
  y: 0,
  filter: 'blur(0px)',
  duration: 0.6,
  ease: 'power2.out',
  clearProps: 'filter',
  ...overrides,
});
