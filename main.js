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

    // Active link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Smooth hover effects for buttons
    const buttons = document.querySelectorAll('.btn-main, .btn-secondary, .btn-primary');
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

    // Fetch and Load Portfolio Projects Dynamically
    const portfolioContainer = document.getElementById('portfolio-container');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (portfolioContainer) {
        // Function to bind cursor hover to dynamic elements
        const bindDynamicButtons = () => {
            const dynamicBtns = portfolioContainer.querySelectorAll('.btn-demo, .btn-repo');
            dynamicBtns.forEach(btn => {
                btn.addEventListener('mouseenter', () => {
                    follower.style.transform = 'scale(2.5)';
                    follower.style.background = 'rgba(0, 255, 170, 0.1)';
                });
                btn.addEventListener('mouseleave', () => {
                    follower.style.transform = 'scale(1)';
                    follower.style.background = 'none';
                });
            });
        };

        // Load Projects from projects.json
        fetch('proyectos.json')
            .then(res => res.json())
            .then(projects => {
                renderProjects(projects);
                setupFilters(projects);
            })
            .catch(err => {
                console.error("Error cargando portafolio:", err);
                portfolioContainer.innerHTML = '<p class="text-center" style="grid-column: 1/-1; color: var(--accent); font-weight: 600; padding: 2rem;">Hubo un problema cargando los proyectos. Por favor, refresca la página.</p>';
            });

        // Render projects template
        function renderProjects(projects) {
            portfolioContainer.innerHTML = '';
            
            projects.forEach((p, idx) => {
                const item = document.createElement('div');
                item.className = 'portfolio-item';
                item.setAttribute('data-category', p.categoria);
                item.setAttribute('data-aos', 'fade-up');
                if (idx > 0) {
                    item.setAttribute('data-aos-delay', (idx * 100).toString());
                }

                // Render tags
                const tagsHTML = p.tecnologias.map(t => `<span class="tech-tag">${t}</span>`).join('');

                item.innerHTML = `
                    <div class="portfolio-img">
                        <img src="${p.imagen}" alt="${p.titulo}">
                    </div>
                    <div class="portfolio-info">
                        <h3>${p.titulo}</h3>
                        <p>${p.descripcion}</p>
                        <div class="tech-tags">
                            ${tagsHTML}
                        </div>
                        <div class="portfolio-btns">
                            <a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn-demo">
                                <i data-lucide="external-link"></i> Demo
                            </a>
                            <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-repo">
                                <i data-lucide="github"></i> Code
                            </a>
                        </div>
                    </div>
                `;

                portfolioContainer.appendChild(item);
            });

            // Reinitialize Lucide icons for dynamic elements
            if (window.lucide) {
                lucide.createIcons();
            }
            
            // Reinitialize AOS
            if (window.AOS) {
                AOS.refresh();
            }

            // Bind custom cursor behaviors
            bindDynamicButtons();
        }

        // Setup filters interaction
        function setupFilters(projects) {
            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const filterValue = btn.getAttribute('data-filter');
                    const items = portfolioContainer.querySelectorAll('.portfolio-item');

                    items.forEach(item => {
                        const itemCategory = item.getAttribute('data-category');
                        
                        if (filterValue === 'all' || itemCategory === filterValue) {
                            item.classList.remove('hidden');
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.95)';
                            setTimeout(() => {
                                item.classList.add('hidden');
                            }, 350);
                        }
                    });
                });
            });
        }
    }
});
