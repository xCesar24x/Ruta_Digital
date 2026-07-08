import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Follower smooth tracking using requestAnimationFrame (much smoother than setTimeout)
    let followerX = 0;
    let followerY = 0;
    let animationFrameId = null;

    const updateFollower = () => {
      // Lerp/Easing interpolation
      followerX += (mouseX - followerX - 10) * 0.12;
      followerY += (mouseY - followerY - 10) * 0.12;

      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;

      animationFrameId = requestAnimationFrame(updateFollower);
    };

    updateFollower();

    // Listen to button hovers globally to scale the follower
    const handleMouseEnter = () => {
      follower.style.transform = 'scale(2.5)';
      follower.style.background = 'rgba(0, 255, 170, 0.1)';
      follower.style.borderColor = 'rgba(0, 255, 170, 0.8)';
    };

    const handleMouseLeave = () => {
      follower.style.transform = 'scale(1)';
      follower.style.background = 'none';
      follower.style.borderColor = 'rgba(0, 255, 170, 0.4)';
    };

    const attachHoverListeners = () => {
      const elements = document.querySelectorAll('.btn-main, .btn-secondary, .btn-primary, .btn-demo, .tab-btn, .calc-card, a');
      elements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Attach listeners on mount and after a short delay to account for dynamic contents
    attachHoverListeners();
    const intervalId = setInterval(attachHoverListeners, 1500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);

      const elements = document.querySelectorAll('.btn-main, .btn-secondary, .btn-primary, .btn-demo, .tab-btn, .calc-card, a');
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  );
}
