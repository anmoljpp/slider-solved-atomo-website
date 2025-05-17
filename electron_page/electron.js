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
        // Sample data for slides
        const slidesData = [
            {
                image: '/proton_page/Frame.svg',
                title: 'What Is Proton?',
                description: 'Electron is Atomo Innovation’s industrial-grade edge computing platform, designed to bring advanced intelligence and real-time decision-making to the edge of industrial operations. It empowers businesses with faster data processing, enhanced automation, and seamless system integration.'
            },
            {
                image: '/proton_page/Frame.svg',
                title: 'Why It Exists?',
                description: 'Designed to modernize industries by enabling local AI decision-making without relying on cloud infrastructure, Electron ensures faster, more secure, and uninterrupted operations even in remote or disconnected environments.'
            },
            {
                image: '/proton_page/Frame.svg',
                title: "Who It's For?",
                description: 'Ideal for system integrators, automation engineers, and industrial IoT solution providers aiming to build intelligent, resilient systems with enhanced performance, reliability, and scalability at the edge.'
            },
            {
                image: '/proton_page/Frame.svg',
                title: 'Built for Harsh Realities!',
                description: 'PElectron excels in real-world environments - from remote farms to factory floors and power stations - delivering reliable edge intelligence wherever it is needed most.'
            },
            {
                image: '/proton_page/Frame.svg',
                title: 'Not Just a Device – A Platform!',
                description: 'Electron is built to perform in the toughest environments-be it remote farms, factory floors, or power stations-ensuring dependable edge computing wherever it is deployed.'
            },
            {
                image: '/proton_page/Frame.svg',
                title: 'Powers Smarter Operations',
                description: 'It empowers machines to communicate, predict potential issues, and optimize performance autonomously-directly at the edge, without relying on the cloud.'
            },
            {
                image: '/proton_page/Frame.svg',
                title: 'Your First Step into Industry 4.0!',
                description: 'Electron serves as a gateway to modern industrial practices, seamlessly bridging legacy systems with future-ready, intelligent infrastructure.'
            },
            {
                image: '/proton_page/Frame.svg',
                title: 'Easy to Integrate, Hard to Replace',
                description: 'Electron integrates effortlessly into existing systems-and once it is there, it becomes an indispensable part of operations, redefining efficiency and control.'
            },
            {
                image: '/proton_page/Frame.svg',
                title: 'Part of a Bigger Family',
                description: 'Electron works seamlessly with Atomo’s Neutron (Home) and Proton (Pro Home) systems, creating a unified ecosystem that powers comprehensive smart environments across residential and industrial settings.'
            },
            {
                image: '/proton_page/Frame.svg',
                title: 'Designed in India, Made for the World!',
                description: 'A proudly Indian innovation, Electron is designed to empower industries both locally and globally, combining robust engineering with a vision for worldwide impact.'
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