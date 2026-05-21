document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX - 10 + 'px';
            follower.style.top = e.clientY - 10 + 'px';
        }, 50);
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.8rem 0';
            header.style.background = 'rgba(5, 5, 5, 0.95)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.background = 'rgba(5, 5, 5, 0.8)';
        }
    });

    // Active link on scroll using Intersection Observer
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Smooth hover effects for buttons
    const buttons = document.querySelectorAll('.btn-main, .btn-secondary, .btn-primary, .btn-demo');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            follower.style.transform = 'scale(2.5)';
            follower.style.background = 'rgba(0, 255, 170, 0.1)';
        });
        btn.addEventListener('mouseleave', () => {
            follower.style.transform = 'scale(1)';
            follower.style.background = 'none';
        });
    });

    // Portfolio Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => {
                c.classList.remove('active');
                c.style.display = 'none';
            });

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(`tab-${tabId}`);
            if(targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'block';
                
                // Re-initialize Lucide Icons for new content
                if (window.lucide) {
                    lucide.createIcons();
                }

                // Refresh AOS
                if (window.AOS) {
                    AOS.refresh();
                }
            }
        });
    });

    // Stats Counter Animation
    const statsNumbers = document.querySelectorAll('.stat-number');
    const statsGrid = document.querySelector('.stats-grid');
    
    if (statsNumbers.length && statsGrid) {
        let animated = false;
        
        const animateStats = () => {
            statsNumbers.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                const suffix = stat.getAttribute('data-suffix') || '';
                const duration = 2000; // 2 seconds
                const frameDuration = 1000 / 60; // 60 fps
                const totalFrames = Math.round(duration / frameDuration);
                const increment = target / totalFrames;
                
                let frame = 0;
                const updateCount = () => {
                    frame++;
                    const current = increment * frame;
                    
                    if (frame < totalFrames) {
                        stat.innerText = Math.floor(current) + suffix;
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.innerText = target + suffix;
                    }
                };
                updateCount();
            });
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animateStats();
                    animated = true;
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsGrid);
    }
});
