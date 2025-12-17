// ------------------------------------------------------------------
// Hero swiper
// ------------------------------------------------------------------

if (document.querySelector('.hero_swiper')) {
    var swiper = new Swiper(".hero_swiper", {
        effect: "fade",
        speed: 4000,
        autoplay: {
            delay: 12000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });
}

// ------------------------------------------------------------------
// Testimonial swiper
// ------------------------------------------------------------------

if (document.querySelector('.testimonial_swiper')) {
    var swiper = new Swiper(".testimonial_swiper", {
        effect: "fade",
        speed: 4000,
        autoplay: {
            delay: 18000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });
}

// ------------------------------------------------------------------
// Back to top button
// ------------------------------------------------------------------

function backToTop() {
    return {
        visible: false,

        init() {
            const toggle = () => {
                this.visible = window.scrollY > 300;
            };

            toggle();
            window.addEventListener("scroll", toggle);
        },

        scrollToTop() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
}

// ------------------------------------------------------------------
// Lightbox image gallery
// ------------------------------------------------------------------

document.addEventListener('alpine:init', () => {
    try {
        Alpine.data('lightbox', () => ({
            images: [],
            current: null,
            zoomed: false,

            init() {
                if (!this.$refs.gallery) {
                    console.log('Lightbox: gallery ref not found');
                    return;
                }

                this.images = [...this.$refs.gallery.querySelectorAll('img')]
                    .map(img => img.src)
                    .filter(Boolean);

                if (!this.images.length) {
                    console.log('Lightbox: no images found');
                }
            },

            open(i = 0) {
                if (!this.images.length) return;

                this.current = i;
                this.zoomed = false;
                document.body.classList.add('overflow-hidden');
            },

            close() {
                this.current = null;
                this.zoomed = false;
                document.body.classList.remove('overflow-hidden');
            },

            next() {
                if (this.current === null || !this.images.length) return;

                this.current = (this.current + 1) % this.images.length;
                this.zoomed = false;
            },

            prev() {
                if (this.current === null || !this.images.length) return;

                this.current =
                    (this.current - 1 + this.images.length) % this.images.length;
                this.zoomed = false;
            },

            toggleZoom() {
                if (this.current === null) return;
                this.zoomed = !this.zoomed;
            }
        }));
    } catch (e) {
        console.log('Alpine Lightbox not found in this page', e);
    }
});

// ------------------------------------------------------------------
// Auto link activation
// ------------------------------------------------------------------

const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('a[href*="#"]');

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(link => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href').endsWith(`#${entry.target.id}`)
                    );
                });
            }
        });
    },
    {
        threshold: 0.6
    }
);

sections.forEach(section => observer.observe(section));