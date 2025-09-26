
        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const sectionId = this.getAttribute('href').substring(1);
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                    }
                }
            });
        });

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMenuBtn = document.getElementById('close-menu-btn');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });

        // Hero Slider
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        let slideInterval;

        function showSlide(index) {
            slides.forEach(slide => {
                slide.style.transition = 'opacity 0.5s ease-in-out';
            });
            slides.forEach((slide, i) => {
                slide.style.opacity = i === index ? '1' : '0';
                slide.style.zIndex = i === index ? '1' : '0';
            });
            dots.forEach((dot, i) => {
                dot.style.opacity = i === index ? '1' : '0.5';
                dot.style.backgroundColor = i === index ? '#ffffff' : 'rgba(255, 255, 255, 0.5)';
            });
            currentSlide = index;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function startSlider() {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
            slideInterval = setInterval(nextSlide, 3000);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                startSlider();
                showSlide(index);
            });
        });

        const sliderContainer = document.querySelector('.hero-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            sliderContainer.addEventListener('mouseleave', () => {
                startSlider();
            });
        }

        showSlide(0);
        startSlider();

        // Project Filter
        document.addEventListener('DOMContentLoaded', function () {
            const filterTabs = document.querySelectorAll('.filter-tab');
            const projectItems = document.querySelectorAll('.project-item');

            filterTabs[0].classList.add('bg-navy', 'text-white');

            filterTabs.forEach(tab => {
                tab.addEventListener('click', function () {
                    filterTabs.forEach(t => t.classList.remove('bg-navy', 'text-white'));
                    this.classList.add('bg-navy', 'text-gray-700', 'font-bold', 'border-2', 'border-beige', 'shadow-lg');

                    const filter = this.getAttribute('data-filter');
                    projectItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
        });

        // Counter Animation
        document.addEventListener('DOMContentLoaded', function () {
            const counters = document.querySelectorAll('.count');
            const options = { threshold: 0.5 };

            const startCounting = (entry) => {
                const el = entry.target;
                const target = +el.getAttribute('data-target');
                let count = 0;
                const suffix = el.textContent.includes('K') ? 'K+' :
                    el.textContent.includes('M') ? 'M+' : '+';
                const duration = 1000;
                const startTime = performance.now();

                const updateCount = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const easedProgress = 1 - Math.pow(1 - progress, 3);
                    count = Math.floor(easedProgress * target);
                    el.textContent = count + suffix;
                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        el.textContent = target + suffix;
                    }
                };
                requestAnimationFrame(updateCount);
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startCounting(entry);
                        observer.unobserve(entry.target);
                    }
                });
            }, options);

            counters.forEach(counter => {
                observer.observe(counter);
            });
        });
   
        //form submission 
     document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const serviceID = "service_4sff5nm";  // 🔹 From EmailJS
  const templateID = "template_2phzcti"; // 🔹 From EmailJS

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      alert("✅ Message sent successfully!");
      this.reset();
    })
    .catch((error) => {
      console.error("❌ EmailJS Error:", error);
      alert("❌ Failed to send message. Please try again.");
    });
});
