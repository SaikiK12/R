// FAQ Accordion
        document.querySelectorAll('.faq-item').forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const wasActive = item.classList.contains('active');
                
                document.querySelectorAll('.faq-item').forEach(i => {
                    i.classList.remove('active');
                });
                
                if (!wasActive) {
                    item.classList.add('active');
                }
            });
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll reveal animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                } else {
                    entry.target.classList.remove('revealed');
                }
            });
        }, observerOptions);

        // Observe all sections and elements
        document.addEventListener('DOMContentLoaded', () => {
            // Main sections
            const sections = document.querySelectorAll('.hero, .stats, .certification, .pricing, .pricing-note, .value-props, .faq, .team, footer');
            sections.forEach(section => {
                section.classList.add('scroll-reveal');
                observer.observe(section);
            });

            // Individual cards and items
            const items = document.querySelectorAll('.stat-item, .cert-card, .pricing-card, .value-card, .faq-intro, .faq-item');
            items.forEach((item, index) => {
                item.classList.add('scroll-reveal');
                item.style.transitionDelay = `${(index % 3) * 0.08}s`;
                observer.observe(item);
            });

            // Team cards with sequential animation
            const teamCards = document.querySelectorAll('.team-card');
            teamCards.forEach((card, index) => {
                card.classList.add('scroll-reveal');
                card.style.transitionDelay = `${index * 0.15}s`;
                observer.observe(card);
            });

            // Hero content
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.classList.add('scroll-reveal');
                observer.observe(heroContent);
            }

            // Titles
            const titles = document.querySelectorAll('.section-title, .section-title-left, .faq-title-center');
            titles.forEach(title => {
                title.classList.add('scroll-reveal');
                observer.observe(title);
            });
        });