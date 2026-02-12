document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // 2. Scroll Reveal Animation
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

    // 3. Dynamic Modal Logic
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
            modalVideo.play();
        });
    });

    // Close Function
    const closeModal = () => {
        modal.classList.remove('active');
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

    // 4. Header Active State on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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

// Resume Download Placeholder
function downloadResume() {
    const link = document.createElement("a");
    link.href = "assets/Justine Macarayan_Resume.pdf";
    link.download = "Justine Macarayan_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
