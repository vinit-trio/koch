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

if (document.getElementById("loadMapBtn")) {
    document.getElementById("loadMapBtn").addEventListener("click", function () {
        document.getElementById("google_map").innerHTML = `
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.2480362618803!2d7.852373276857274!3d51.04850774412271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47beac8c5a07c74d%3A0xc94d8a01bf807361!2sKoch%20Immobilien%20GmbH!5e0!3m2!1sen!2sin!4v1765172976077!5m2!1sen!2sin" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        `;
    });
}

document.addEventListener('alpine:init', () => {
    Alpine.data('lightbox', () => ({
        images: [],
        current: null,
        zoomed: false,

        init() {
            this.images = [...this.$refs.gallery.querySelectorAll('img')]
                .map(img => img.src);
        },

        open(i) {
            this.current = i;
            document.body.classList.add('overflow-hidden');
            this.zoomed = false;
        },

        close() {
            this.current = null;
            document.body.classList.remove('overflow-hidden');
        },

        next() {
            this.current = (this.current + 1) % this.images.length;
            this.zoomed = false;
        },

        prev() {
            this.current = (this.current - 1 + this.images.length) % this.images.length;
            this.zoomed = false;
        },

        toggleZoom() {
            this.zoomed = !this.zoomed;
        }
    }))
})
