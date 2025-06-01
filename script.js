document.addEventListener('DOMContentLoaded', function() {

    // Smooth Scrolling for Nav Links (if needed, though html scroll-behavior covers most)
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Basic smooth scroll, can be enhanced
            // For modern browsers, CSS scroll-behavior: smooth is often enough
            // This JS version offers more control or fallback if needed
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 60, // Adjust for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active Nav Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Adjusted offset
            let sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('header nav ul li a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('header nav ul li a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }
    navHighlighter(); // Initial call

    // Gallery Tabs
    window.showGallery = function(galleryName) {
        const designGallery = document.getElementById('designs-gallery');
        const beforeAfterGallery = document.getElementById('before-after-gallery');
        const tabButtons = document.querySelectorAll('.tab-button');

        tabButtons.forEach(button => button.classList.remove('active'));

        if (galleryName === 'designs') {
            designGallery.style.display = 'grid';
            beforeAfterGallery.style.display = 'none';
            document.querySelector('.tab-button[onclick*="designs"]').classList.add('active');
        } else if (galleryName === 'before-after') {
            designGallery.style.display = 'none';
            beforeAfterGallery.style.display = 'grid';
            document.querySelector('.tab-button[onclick*="before-after"]').classList.add('active');
        }
    }

    // Star Rating Input
    const stars = document.querySelectorAll('.star-input i');
    const ratingValueInput = document.getElementById('rating-value');

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = this.dataset.value;
            ratingValueInput.value = value;
            stars.forEach(s => {
                s.classList.remove('fas', 'selected');
                s.classList.add('far');
            });
            for (let i = 0; i < value; i++) {
                stars[i].classList.remove('far');
                stars[i].classList.add('fas', 'selected');
            }
        });
        star.addEventListener('mouseover', function() {
            const value = this.dataset.value;
            for (let i = 0; i < value; i++) {
                stars[i].classList.remove('far');
                stars[i].classList.add('fas');
            }
        });
        star.addEventListener('mouseout', function() {
            const selectedValue = ratingValueInput.value || 0;
            stars.forEach((s, index) => {
                if (index < selectedValue) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'selected');
                } else {
                    s.classList.remove('fas', 'selected');
                    s.classList.add('far');
                }
            });
        });
    });

    // Review Form Photo Preview
    const photoUploadInput = document.getElementById('review-photo-upload');
    const photoPreview = document.getElementById('photo-preview');
    if (photoUploadInput) {
        photoUploadInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                // Basic validation (can be expanded)
                if (file.size > 2 * 1024 * 1024) { // 2MB limit
                    alert("File is too large. Maximum size is 2MB.");
                    this.value = ""; // Clear the input
                    photoPreview.style.display = 'none';
                    return;
                }
                if (!['image/jpeg', 'image/png'].includes(file.type)) {
                    alert("Invalid file type. Only JPG and PNG are allowed.");
                    this.value = ""; // Clear the input
                    photoPreview.style.display = 'none';
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(e) {
                    photoPreview.src = e.target.result;
                    photoPreview.style.display = 'block';
                }
                reader.readAsDataURL(file);
            } else {
                photoPreview.style.display = 'none';
            }
        });
    }

    // Review Form Submission (Frontend Demo)
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // For a real application, you would send this data to a backend server.
            // Example:
            // const formData = new FormData(this);
            // fetch('/api/reviews', { method: 'POST', body: formData })
            //   .then(response => response.json())
            //   .then(data => console.log(data))
            //   .catch(error => console.error(error));
            alert('Thank you for your review! (This is a demo - data not saved)');
            this.reset();
            photoPreview.style.display = 'none';
            stars.forEach(s => { // Reset stars
                s.classList.remove('fas', 'selected');
                s.classList.add('far');
            });
        });
    }

    // Contact Form Submission (delegates to Formspree)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Basic client-side validation (Formspree handles server-side)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                e.preventDefault();
                return;
            }
            // Formspree will handle the submission. Add a thank you message or redirect after submission via Formspree settings.
        });
    }

    // Update Footer Year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Scroll Animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: unobserve after animation to save resources
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove class to re-animate if scrolling up then down again
                // entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

});