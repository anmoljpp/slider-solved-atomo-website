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

    // Video Pause on End
    function initializeVideo() {
        const video = document.getElementById('electron-video');
        if (video) {
            video.addEventListener('ended', () => {
                video.pause();
                video.currentTime = video.duration; // Stay on last frame
            });
        }
    }

    // Popup Functionality
    function initializePopup() {
        const buyButtons = document.querySelectorAll('.buy-button');
        const popup = document.getElementById('subscription-popup');
        const subscribeButton = document.getElementById('subscribe-button');
        const emailInput = document.getElementById('email-input');

        if (!popup || !subscribeButton || !emailInput) {
            console.warn('Popup elements not found!');
            return;
        }

        buyButtons.forEach(button => {
            button.addEventListener('click', () => {
                popup.classList.add('active');
            });
        });

        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });

        subscribeButton.addEventListener('click', () => {
            const email = emailInput.value.trim();
            if (email) {
                alert(`Thank you for subscribing with ${email}!`);
                emailInput.value = '';
                popup.classList.remove('active');
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Fourth Page Slider
    function initializeFourthPageSlider() {
        const featureSlider = document.querySelector('.features-slider');
        const featureSlides = document.querySelectorAll('.feature-slide');
        const prevFeatureBtn = document.querySelector('#fourth-page .prev-feature');
        const nextFeatureBtn = document.querySelector('#fourth-page .next-feature');
        const fourthPageSection = document.querySelector('#fourth-page');

        let currentFeatureIndex = 0;
        const autoSlideInterval = 10000; // 10 seconds
        const restartDelay = 1000; // 1 second
        let autoSlideTimer = null;
        let isAutoSliding = false;

        function updateSlidesToShow() {
            if (window.innerWidth <= 480) return 1;
            if (window.innerWidth <= 768) return 2;
            if (window.innerWidth <= 1024) return 3;
            return 4;
        }

        function updateFeatureSlider() {
            const slidesToShow = updateSlidesToShow();
            const slideWidth = featureSlides[0].offsetWidth + 30; // Width + margin
            const translateX = -currentFeatureIndex * slideWidth;
            featureSlider.style.transform = `translateX(${translateX}px)`;

            // Disable buttons at boundaries
            prevFeatureBtn.disabled = currentFeatureIndex === 0;
            nextFeatureBtn.disabled = currentFeatureIndex >= featureSlides.length - slidesToShow;
        }

        function autoSlide() {
            const slidesToShow = updateSlidesToShow();
            if (currentFeatureIndex >= featureSlides.length - slidesToShow) {
                setTimeout(() => {
                    currentFeatureIndex = 0;
                    updateFeatureSlider();
                    if (isAutoSliding) {
                        autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                    }
                }, restartDelay);
            } else {
                currentFeatureIndex++;
                updateFeatureSlider();
                if (isAutoSliding) {
                    autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                }
            }
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (!isAutoSliding) {
                            isAutoSliding = true;
                            autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                        }
                    } else {
                        if (isAutoSliding) {
                            isAutoSliding = false;
                            clearTimeout(autoSlideTimer);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(fourthPageSection);

        prevFeatureBtn.addEventListener('click', () => {
            clearTimeout(autoSlideTimer);
            if (currentFeatureIndex > 0) {
                currentFeatureIndex--;
                updateFeatureSlider();
            }
            if (isAutoSliding) {
                autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
            }
        });

        nextFeatureBtn.addEventListener('click', () => {
            clearTimeout(autoSlideTimer);
            const slidesToShow = updateSlidesToShow();
            if (currentFeatureIndex < featureSlides.length - slidesToShow) {
                currentFeatureIndex++;
                updateFeatureSlider();
            } else {
                setTimeout(() => {
                    currentFeatureIndex = 0;
                    updateFeatureSlider();
                    if (isAutoSliding) {
                        autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                    }
                }, restartDelay);
            }
        });

        window.addEventListener('resize', () => {
            updateFeatureSlider();
        });

        updateFeatureSlider();
    }

    // Second Page Slider (New Slider)
    function initializeSecondPageSlider() {
        const slidesContainer = document.getElementById('slidesContainer');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const slideGap = 15;

        // Sample data for slides
        const slidesData = [
                {
                  image: "/proton_page/Frame.svg",
                  title: "What Is Proton?",
                  description: "Proton is Atomo Innovation’s advanced smart home controller designed for tech-savvy users, prosumers, and premium automation setups. It offers seamless integration, powerful performance, and complete control over modern smart environments."
                },
                {
                  image: "/proton_page/Frame.svg",
                  title: "Why It Was Created",
                  description: "To deliver a powerful, secure, and future-ready smart home hub that goes beyond basic automation, enabling intelligent control, personalization, and scalability for evolving user needs."
                },
                {
                  image: "/proton_page/Frame.svg",
                  title: "Who It's For",
                  description: "Designed for smart homeowners, home automation integrators, and builders seeking deep customization, robust control, and a seamless connected living experience."
                },
                {
                  image: "/proton_page/Frame.svg",
                  title: "Lives at the Heart of the Home",
                  description: "Proton serves as the intelligent core of the smart home, seamlessly connecting and orchestrating devices, sensors, scenes, and routines in real-time. It ensures responsive automation and a unified user experience."
                },
                {
                  image: "/proton_page/Frame.svg",
                  title: "Engineered for Performance",
                  description: "With dedicated compute power and intelligent scheduling, Proton handles complex automation tasks with low latency and high reliability, ensuring smooth and efficient smart home operations."
                },
                {
                  image: "/proton_page/Frame.svg",
                  title: "Personalized Control",
                  description: "From voice commands to mobile apps to AI-generated routines, Proton seamlessly adapts to your lifestyle and preferences, delivering a truly personalized smart home experience."
                },
                {
                  image: "/proton_page/Frame.svg",
                  title: "Built for the Smart Home of Tomorrow",
                  description: "Future-proofed with support for Matter, Thread, Zigbee, and more, Proton is ready to integrate with the next wave of connected devices, ensuring long-term compatibility and flexibility."
                },
                {
                  image: "/proton_page/Frame.svg",
                  title: "Security First, Always",
                  description: "With local processing and a secure architecture, Proton keeps your smart home private, protected, and resilient—even without constant cloud connectivity."
                },
                {
                  image: "/proton_page/Frame.svg",
                  title: "Works Seamlessly with Atomo Devices",
                  description: "Proton integrates seamlessly with Neutron and Electron, delivering a unified experience across home and industrial automation for streamlined control and efficiency."
                },
                {
                  image: "/proton_page/Frame.svg",
                  title: "Elegantly Indian, Globally Capable",
                  description: "Developed in India with global standards in mind, Proton ensures international compatibility, reflecting the needs of modern living across continents."
                }
              ];
              
        // Create slides
        slidesData.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'slide';
            slideElement.innerHTML = `
                <img src="${slide.image}" alt="${slide.title}" class="slide-img">
                <div class="slide-content">
                    <h3 class="text-2xl font-bold mb-2">${slide.title}</h3>
                    <p class="text-base">${slide.description}</p>
                </div>
            `;
            slidesContainer.appendChild(slideElement);
        });

        const slides = document.querySelectorAll('#second-page .slide');
        let currentPosition = 0;

        function getVisibleSlidesCount() {
            const containerWidth = slidesContainer.parentElement.offsetWidth;
            const slideWidth = window.innerWidth <= 480 ? containerWidth :
                             window.innerWidth <= 768 ? (containerWidth / 2) :
                             window.innerWidth <= 1200 ? 300 : 357;
            const totalWidthPerSlide = slideWidth + slideGap;
            return Math.floor(containerWidth / totalWidthPerSlide) || 1;
        }

        function updateSlideWidths() {
            const containerWidth = slidesContainer.parentElement.offsetWidth;
            const visibleCount = getVisibleSlidesCount();
            let slideWidth;

            if (window.innerWidth <= 480) {
                slideWidth = containerWidth;
                slides.forEach(slide => slide.style.width = `${slideWidth}px`);
            } else if (window.innerWidth <= 768) {
                slideWidth = (containerWidth - (visibleCount - 1) * slideGap) / visibleCount;
                slides.forEach(slide => slide.style.width = `${slideWidth}px`);
            } else if (window.innerWidth <= 1200) {
                slideWidth = 300;
                slides.forEach(slide => slide.style.width = `${slideWidth}px`);
            } else {
                slideWidth = 357;
                slides.forEach(slide => slide.style.width = `${slideWidth}px`);
            }
            return slideWidth;
        }

        function updateButtons() {
            const visibleCount = getVisibleSlidesCount();
            prevBtn.disabled = currentPosition === 0;
            nextBtn.disabled = currentPosition >= slides.length - visibleCount;
        }

        function moveSlides() {
            const slideWidth = updateSlideWidths();
            const offset = currentPosition * (slideWidth + slideGap);
            slidesContainer.style.transform = `translateX(-${offset}px)`;
            updateButtons();
        }

        // Event listeners for buttons
        prevBtn.addEventListener('click', () => {
            if (currentPosition > 0) {
                currentPosition--;
                moveSlides();
            }
        });

        nextBtn.addEventListener('click', () => {
            const visibleCount = getVisibleSlidesCount();
            if (currentPosition < slides.length - visibleCount) {
                currentPosition++;
                moveSlides();
            }
        });

        // Handle window resize
        function handleResize() {
            const visibleCount = getVisibleSlidesCount();
            currentPosition = Math.min(currentPosition, slides.length - visibleCount);
            moveSlides();
        }

        window.addEventListener('resize', handleResize);

        // Initial setup
        updateSlideWidths();
        updateButtons();
        moveSlides();
    }

    // Initialize all components
    initializeHamburgerMenu();
    initializeVideo();
    initializePopup();
    initializeFourthPageSlider();
    initializeSecondPageSlider();
});