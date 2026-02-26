document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    const toggleNav = () => {
        navLinks.classList.toggle('active');
        // Prevent body scrolling when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    };

    hamburger.addEventListener('click', toggleNav);

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleNav();
            }
        });
    });

    // 2. Typing Effect for Hero Section
    const typingSpan = document.querySelector('.typing-text');
    const textArray = ['System Developer', 'Backend Engineer', 'Tech Enthusiast'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at the end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect
    if(typingSpan) setTimeout(type, 1000);

    // 3. Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden-element').forEach(el => observer.observe(el));

    // 4. Dynamic Modal Logic
    const modal = document.getElementById('projectModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalStack = document.getElementById('modalStack');
    const closeBtn = document.querySelector('.close-modal');
    const openBtns = document.querySelectorAll('.open-modal');

    // Open Modal and Fill Data
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const videoSrc = btn.getAttribute('data-video');
            const title = btn.getAttribute('data-title');
            const desc = btn.getAttribute('data-desc');
            const stack = btn.getAttribute('data-stack');

            modalVideo.src = videoSrc;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modalStack.textContent = stack;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock background scroll
            modalVideo.play();
        });
    });

    // Close Function
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Unlock background scroll
        modalVideo.pause();
        modalVideo.src = ""; // Reset source
    };

    closeBtn.addEventListener('click', closeModal);

    // Close when clicking outside content
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModal();
        }
    });

    // 5. Header Active State on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});

// Resume Download Logic
function downloadResume(e) {
    e.preventDefault(); // Prevent page jump
    const link = document.createElement("a");
    link.href = "assets/Justine Macarayan_Resume.pdf";
    link.download = "Justine Macarayan_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}