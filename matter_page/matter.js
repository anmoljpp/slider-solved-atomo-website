document.addEventListener('DOMContentLoaded', function () {
    // Hamburger Menu Functionality
    function initializeHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const navList = document.querySelector('#navbar ul');

        if (!hamburger || !navList) {
            console.warn('Hamburger or navList not found!');
            return;
        }

        hamburger.addEventListener('click', function () {
            navList.classList.toggle('active');
            this.classList.toggle('open');

            const navItems = navList.querySelectorAll('li');
            navItems.forEach((item, index) => {
                if (navList.classList.contains('active')) {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                }
            });
        });

        const navLinks = document.querySelectorAll('#navbar a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navList.classList.remove('active');
                hamburger.classList.remove('open');
                const navItems = navList.querySelectorAll('li');
                navItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                });
            });
        });
    }

    function initializeSlider(sliderContainer) {
        const slider = sliderContainer.querySelector('.slider');
        const slides = sliderContainer.querySelectorAll('.slide');
        const prevBtn = sliderContainer.querySelector('.prev-btn');
        const nextBtn = sliderContainer.querySelector('.next-btn');
        const dots = sliderContainer.querySelectorAll('.dot');
    
        if (!slider || slides.length === 0 || !prevBtn || !nextBtn || !dots.length) {
            console.warn('Slider elements missing in:', sliderContainer);
            return;
        }
    
        function getVisibleSlides() {
            const width = window.innerWidth;
            if (width <= 480) return 1;
            if (width <= 768) return 2;
            if (width <= 1024) return 3;
            return 4;
        }
    
        let visibleSlides = getVisibleSlides();
        const totalSlides = slides.length;
        let currentIndex = 0;
        let isTransitioning = false;
        let autoSlideInterval = null;
        let touchStartX = 0;
        let touchEndX = 0;
    
        // Update dots
        function updateDots() {
            const visibleDots = Math.min(totalSlides, dots.length);
            const activeIndex = currentIndex % totalSlides;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex && index < visibleDots);
            });
        }
    
        // Update slider position
        function updateSlider(useTransition = true) {
            if (isTransitioning) return;
            isTransitioning = useTransition;
    
            slider.style.transition = useTransition
                ? 'transform 0.5s ease-in-out'
                : 'none';
            const offset = -(currentIndex * (100 / visibleSlides));
            slider.style.transform = `translateX(${offset}%)`;
    
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', Math.abs(index - currentIndex) < visibleSlides);
            });
    
            updateDots();
    
            // Reset to first slide after reaching the 9th slide
            if (currentIndex >= 8) {
                setTimeout(() => {
                    currentIndex = 0;
                    updateSlider(false);
                    startAutoSlide();
                }, useTransition ? 500 : 0);
            }
    
            if (useTransition) {
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            } else {
                isTransitioning = false;
            }
        }
    
        // Handle looping
        function handleTransitionEnd() {
            if (currentIndex >= totalSlides) {
                currentIndex = 0;
                updateSlider(false);
            } else if (currentIndex < 0) {
                currentIndex = totalSlides - 1;
                updateSlider(false);
            }
        }
    
        // Autoplay
        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(() => {
                if (currentIndex < 8) {
                    currentIndex++;
                    updateSlider(true);
                } else {
                    updateSlider(true); // Trigger the reset in updateSlider
                }
            }, 3000);
        }
    
        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }
    
        // Button events
        nextBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex++;
            updateSlider(true);
            stopAutoSlide();
            startAutoSlide();
        });
    
        prevBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex--;
            updateSlider(true);
            stopAutoSlide();
            startAutoSlide();
        });
    
        // Dot events
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                if (isTransitioning) return;
                const slideIndex = parseInt(dot.getAttribute('data-slide')) - 1;
                currentIndex = slideIndex;
                updateSlider(true);
                stopAutoSlide();
                startAutoSlide();
            });
        });
    
        // Touch events
        slider.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
            stopAutoSlide();
        });
    
        slider.addEventListener('touchmove', e => {
            touchEndX = e.touches[0].clientX;
        });
    
        slider.addEventListener('touchend', () => {
            const touchDistance = touchStartX - touchEndX;
            if (Math.abs(touchDistance) > 50) {
                if (touchDistance > 0) {
                    currentIndex++;
                } else {
                    currentIndex--;
                }
                updateSlider(true);
            }
            startAutoSlide();
        });
    
        // Pause on hover
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    
        // Handle resize
        window.addEventListener('resize', () => {
            const newVisibleSlides = getVisibleSlides();
            if (newVisibleSlides !== visibleSlides) {
                visibleSlides = newVisibleSlides;
                currentIndex = Math.min(currentIndex, totalSlides - 1);
                updateSlider(false);
            }
        });
    
        // Initialize
        updateSlider(false);
        startAutoSlide();
        slider.addEventListener('transitionend', handleTransitionEnd);
    }

    // Scroll-Controlled Video
    function initializeVideoScroll() {
        const video = document.getElementById('scrollVideo');
        const firstPage = document.getElementById('first-page');

        if (!video || !firstPage) {
            console.warn('Video or first page not found!');
            return;
        }

        const keyTimes = [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.3, 4.6, 4.9, 5.3, 5.6, 5.8];
        const totalDuration = Math.max(...keyTimes);

        video.currentTime = 0;
        video.pause();

        const updateVideoTime = () => {
            const firstPageHeight = firstPage.offsetHeight;
            const windowHeight = window.innerHeight;
            const triggerPoint = firstPageHeight - windowHeight;
            const scrollY = window.scrollY;

            const secondPage = document.getElementById('second-page');
            const scrollableSectionHeight = secondPage ? secondPage.offsetHeight : firstPageHeight;
            const sectionBottom = triggerPoint + scrollableSectionHeight;

            const isInVideoSection = scrollY >= triggerPoint && scrollY <= sectionBottom;

            if (!isInVideoSection) {
                video.pause();
                if (scrollY < triggerPoint) {
                    video.currentTime = 0;
                } else if (scrollY > sectionBottom) {
                    video.currentTime = totalDuration;
                }
                return;
            }

            const scrollPositionInSection = Math.max(0, Math.min(scrollY - triggerPoint, scrollableSectionHeight));
            const progress = scrollPositionInSection / scrollableSectionHeight;
            const currentTime = progress * totalDuration;

            let targetTime = 0;
            for (let i = 0; i < keyTimes.length - 1; i++) {
                const startProgress = (keyTimes[i] / totalDuration);
                const endProgress = (keyTimes[i + 1] / totalDuration);
                if (progress >= startProgress && progress <= endProgress) {
                    const keyProgress = (progress - startProgress) / (endProgress - startProgress);
                    targetTime = keyTimes[i] + (keyTimes[i + 1] - keyTimes[i]) * keyProgress;
                    break;
                }
            }

            if (progress >= (keyTimes[keyTimes.length - 1] / totalDuration)) {
                targetTime = keyTimes[keyTimes.length - 1];
            }

            video.currentTime = targetTime;

            if (video.paused && scrollPositionInSection > 0 && scrollPositionInSection < scrollableSectionHeight) {
                video.play().catch(e => console.log("Playback prevented:", e));
            }
        };

        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            updateVideoTime();

            scrollTimeout = setTimeout(() => {
                const firstPageHeight = firstPage.offsetHeight;
                const windowHeight = window.innerHeight;
                const triggerPoint = firstPageHeight - windowHeight;
                const secondPage = document.getElementById('second-page');
                const scrollableSectionHeight = secondPage ? secondPage.offsetHeight : firstPageHeight;
                const sectionBottom = triggerPoint + scrollableSectionHeight;
                const scrollY = window.scrollY;

                const isInVideoSection = scrollY >= triggerPoint && scrollY <= sectionBottom;
                if (isInVideoSection) {
                    video.pause();
                }
            }, 50);
        });

        updateVideoTime();
    }

    // Third Page Animation
    function initializeThirdPageAnimation() {
        const thirdPage = document.getElementById('third-page');
        const fourthPage = document.getElementById('fourth-page');
        const modelContainer = document.querySelector('.model-scroll-container');
        const centralCircle = document.querySelector('.central-circle');
        const featureCircles = document.querySelectorAll('.feature-circle');
        const svg = document.querySelector('.connection-lines');

        if (!thirdPage || !fourthPage || !centralCircle || !featureCircles.length || !svg) {
            console.warn('Third page animation elements missing!');
            return;
        }

        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

        const markerStart = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        markerStart.setAttribute('id', 'arrow-start');
        markerStart.setAttribute('viewBox', '0 0 10 10');
        markerStart.setAttribute('refX', '5');
        markerStart.setAttribute('refY', '5');
        markerStart.setAttribute('markerWidth', '6');
        markerStart.setAttribute('markerHeight', '6');
        markerStart.setAttribute('orient', 'auto-start-reverse');
        const arrowStartPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrowStartPath.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
        arrowStartPath.setAttribute('class', 'marker');
        markerStart.appendChild(arrowStartPath);
        defs.appendChild(markerStart);

        const markerEnd = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        markerEnd.setAttribute('id', 'arrow-end');
        markerEnd.setAttribute('viewBox', '0 0 10 10');
        markerEnd.setAttribute('refX', '5');
        markerEnd.setAttribute('refY', '5');
        markerEnd.setAttribute('markerWidth', '6');
        markerEnd.setAttribute('markerHeight', '6');
        markerEnd.setAttribute('orient', 'auto');
        const arrowEndPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrowEndPath.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
        arrowEndPath.setAttribute('class', 'marker');
        markerEnd.appendChild(arrowEndPath);
        defs.appendChild(markerEnd);

        svg.appendChild(defs);

        let fifthFeatureActivated = false;
        let fifthFeatureTimer = null;

        function createLines() {
            // Placeholder: Implement line creation logic if needed
        }

        function handleScroll() {
            const scrollPosition = window.scrollY + window.innerHeight;
            const thirdPageTop = thirdPage.offsetTop;
            const thirdPageHeight = thirdPage.offsetHeight;
            const fourthPageHeight = fourthPage.offsetHeight;

            const thirdPageBottom = thirdPageTop + thirdPageHeight;

            const scrollProgress = Math.min(
                Math.max((scrollPosition - thirdPageBottom) / fourthPageHeight, 0),
                1
            );

            if (scrollPosition >= thirdPageBottom) {
                centralCircle.classList.add('active');
            } else {
                centralCircle.classList.remove('active');
                fifthFeatureActivated = false;
                if (fifthFeatureTimer) clearTimeout(fifthFeatureTimer);
            }

            const featureCount = featureCircles.length;
            featureCircles.forEach((feature, index) => {
                const threshold = (index + 1) * 0.16;
                if (scrollProgress >= threshold) {
                    feature.classList.add('active');
                    if (index === 4 && !fifthFeatureActivated) {
                        fifthFeatureActivated = true;
                        if (fifthFeatureTimer) clearTimeout(fifthFeatureTimer);
                        fifthFeatureTimer = setTimeout(() => {
                            centralCircle.classList.add('effect-complete');
                        }, 1000);
                    }
                } else {
                    feature.classList.remove('active');
                    if (index === 4) {
                        fifthFeatureActivated = false;
                        if (fifthFeatureTimer) clearTimeout(fifthFeatureTimer);
                    }
                }
            });

            createLines();

            const scale = 1 + (scrollProgress * 0.2);
            centralCircle.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }

        function init() {
            createLines();
            window.addEventListener('resize', createLines);
            handleScroll();
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
                        window.addEventListener('scroll', handleScroll);
                        handleScroll();
                    } else {
                        window.removeEventListener('scroll', handleScroll);
                        centralCircle.classList.remove('active');
                        centralCircle.classList.remove('effect-complete');
                        featureCircles.forEach(feature => feature.classList.remove('active'));
                        fifthFeatureActivated = false;
                        if (fifthFeatureTimer) clearTimeout(fifthFeatureTimer);
                        createLines();
                    }
                });
            },
            {
                threshold: 0,
                rootMargin: `0px 0px -${thirdPage.offsetHeight - 50}px 0px`
            }
        );

        observer.observe(thirdPage);
        init();
    }

    // Initialize all components
    initializeHamburgerMenu();
    const sliders = document.querySelectorAll('#second-page, #fourth-page');
    sliders.forEach(slider => initializeSlider(slider));
    initializeVideoScroll();
    initializeThirdPageAnimation();
});



document.addEventListener('DOMContentLoaded', function() {
    // Define sliders with their respective containers and controls
    const sliders = [
        {
            container: document.querySelector('#second-page .slider'),
            controls: document.querySelector('#second-page .slider-controls'),
            currentIndex: 0,
            maxSlides: 12 // Total number of slides in second-page slider
        },
        {
            container: document.querySelector('#fourth-page .slider'),
            controls: document.querySelector('#fourth-page .slider-controls'),
            currentIndex: 0,
            maxSlides: 12 // Total number of slides in fourth-page slider
        }
    ];

    // Initialize each slider
    sliders.forEach((slider) => {
        // Check if slider container and controls exist
        if (!slider.container || !slider.controls) {
            console.warn('Slider container or controls not found:', slider);
            return;
        }

        const slides = slider.container.querySelectorAll('.slide');
        if (slides.length === 0) {
            console.warn('No slides found in slider:', slider);
            return;
        }

        // Get the width of the first slide, including margins/padding
        const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginLeft || 0) + parseInt(getComputedStyle(slides[0]).marginRight || 0);
        const prevButton = slider.controls.querySelector('.round-button:first-child');
        const nextButton = slider.controls.querySelector('.round-button:last-child');

        // Function to move slider
        function moveSlider() {
            slider.container.style.transition = 'transform 0.5s ease-in-out';
            slider.container.style.transform = `translateX(-${slider.currentIndex * slideWidth}px)`;
        }

        // Next slide function
        function nextSlide() {
            if (slider.currentIndex < slider.maxSlides - 1) {
                slider.currentIndex++;
            } else {
                slider.currentIndex = 0; // Loop back to first slide
            }
            moveSlider();
        }

        // Previous slide function
        function prevSlide() {
            if (slider.currentIndex > 0) {
                slider.currentIndex--;
            } else {
                slider.currentIndex = slider.maxSlides - 1; // Loop to last slide
            }
            moveSlider();
        }

        // Event listeners for buttons
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        } else {
            console.warn('Next button not found for slider:', slider);
        }

        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        } else {
            console.warn('Previous button not found for slider:', slider);
        }

        // Handle window resize to recalculate slide width
        window.addEventListener('resize', () => {
            const newSlideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginLeft || 0) + parseInt(getComputedStyle(slides[0]).marginRight || 0);
            slider.container.style.transform = `translateX(-${slider.currentIndex * newSlideWidth}px)`;
        });

        // Initialize slider position
        moveSlider();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('electron-video');
    
    // Pause the video when it ends to stick at the last frame
    video.addEventListener('ended', () => {
        video.pause();
        video.currentTime = video.duration; // Ensure it stays on the last frame
    });
});