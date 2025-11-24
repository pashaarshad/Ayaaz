// Language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const contentSections = document.querySelectorAll('.content-section');

    // Function to switch language
    function switchLanguage(lang) {
        // Remove active class from all buttons
        langButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // Hide all content sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        // Show selected language content
        const activeContent = document.getElementById(`content-${lang}`);
        if (activeContent) {
            activeContent.classList.add('active');
        }

        // Store language preference
        localStorage.setItem('preferredLanguage', lang);
    }

    // Add click event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        switchLanguage(savedLang);
    }

    // Add animation effects on scroll (for future enhancements)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all detail items for animation
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });

    // Add hover effect to detail items
    detailItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.4)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Add sparkle effect on cursor movement (decorative enhancement)
    let timeout;
    document.addEventListener('mousemove', function(e) {
        if (timeout) clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            createSparkle(e.pageX, e.pageY);
        }, 100);
    });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: #ffd700;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: sparkleAnimation 1s ease-out forwards;
            box-shadow: 0 0 6px #ffd700;
        `;
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }

    // Add sparkle animation CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleAnimation {
            0% {
                opacity: 1;
                transform: scale(0) translateY(0);
            }
            50% {
                opacity: 0.8;
                transform: scale(1.5) translateY(-10px);
            }
            100% {
                opacity: 0;
                transform: scale(0) translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === '1') switchLanguage('en');
        if (e.key === '2') switchLanguage('ur');
        if (e.key === '3') switchLanguage('kn');
    });

    // Add fade-in animation on page load
    setTimeout(() => {
        document.querySelector('.container').style.opacity = '1';
    }, 100);

    // Console message
    console.log('🎉 Valima Invitation Website Loaded Successfully!');
    console.log('Keyboard shortcuts: Press 1 for English, 2 for Urdu, 3 for Kannada');
});
