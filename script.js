// ===============================
// Mobile Navigation Toggle
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // ===============================
    // Contact Form (demo)
    // ===============================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    const modals = document.querySelectorAll(".video-modal");
    const openButtons = document.querySelectorAll(".open-modal");

    // Open modal
    openButtons.forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            const index = btn.dataset.modal;
            const modal = modals[index];
            const video = modal.querySelector("video");

            modal.style.display = "flex";
            video.currentTime = 0;
            video.play();
        });
    });

    // Close modal
    modals.forEach(modal => {
        const closeBtn = modal.querySelector(".close");
        const video = modal.querySelector("video");

        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
            video.pause();
        });

        // Click outside modal
        modal.addEventListener("click", e => {
            if (e.target === modal) {
                modal.style.display = "none";
                video.pause();
            }
        });
    });

    // Escape key closes any open modal
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            modals.forEach(modal => {
                if (modal.style.display === "flex") {
                    modal.style.display = "none";
                    modal.querySelector("video").pause();
                }
            });
        }
    });

});

function downloadResume() {
  const link = document.createElement('a');
  link.href = 'assets/Justine Macarayan_Resume.pdf';
  link.download = 'Justine Macarayan_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
