// ─────────────────────────────────────────────
//  MOBILE DETECTION
// ─────────────────────────────────────────────
function isMobile() { return window.innerWidth <= 900; }

const menu      = document.getElementById("menu");
const container = document.getElementById("container");

// ─────────────────────────────────────────────
//  SWIPER CUBE — desktop only
// ─────────────────────────────────────────────
let swiper;

if (!isMobile()) {
    swiper = new Swiper(".swiper", {
        effect: "cube",
        speed: 550,
        allowTouchMove: true,
        grabCursor: true,
        cubeEffect: { shadow: false, slideShadows: false },
        mousewheel: { sensitivity: 1, thresholdDelta: 50, releaseOnEdges: false },
        on: {
            slideChange: function () {
                const idx = swiper.realIndex;
                document.querySelectorAll('.Links li').forEach(l => l.classList.remove('activeLink'));
                const navItems = Array.from(document.querySelectorAll('.Links li'));
                if (navItems[idx]) navItems[idx].classList.add('activeLink');
            }
        }
    });
}

// Navigate — cube on desktop, smooth scroll on mobile
function Navigate(indx) {
    if (isMobile()) {
        // Scroll to the corresponding swiper-slide
        const slides = document.querySelectorAll('.swiper-slide');
        if (slides[indx]) {
            const offset = 62; // mobile nav height
            const top = slides[indx].getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
        // Close mobile menu if open
        const mobMenu = document.getElementById('mob-menu');
        const mobIcon = document.getElementById('mob-menu-icon');
        const mobBtn  = document.getElementById('mob-menu-toggle');
        if (mobMenu) {
            mobMenu.classList.remove('open');
            mobBtn.classList.remove('open');
            mobIcon.className = 'fas fa-bars';
        }
        return;
    }
    document.querySelectorAll(".Links li").forEach(i => i.classList.remove("activeLink"));
    const navItems = Array.from(document.querySelectorAll(".Links li"));
    if (navItems[indx]) navItems[indx].classList.add("activeLink");
    swiper.slideTo(indx, 550, true);
}

// ─────────────────────────────────────────────
//  DESKTOP HAMBURGER
// ─────────────────────────────────────────────
function toggleMenu() {
    if (isMobile()) return;
    menu.classList.toggle('open');
    container.classList.toggle('open');
}

// ─────────────────────────────────────────────
//  MOBILE NAV TOGGLE
// ─────────────────────────────────────────────
function toggleMobMenu() {
    const mobMenu = document.getElementById('mob-menu');
    const mobIcon = document.getElementById('mob-menu-icon');
    const mobBtn  = document.getElementById('mob-menu-toggle');
    mobMenu.classList.toggle('open');
    mobBtn.classList.toggle('open');
    mobIcon.className = mobMenu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
}

// ─────────────────────────────────────────────
//  CLIENT CARD CAROUSEL — desktop only
// ─────────────────────────────────────────────
const items      = document.querySelectorAll(".cardslider .item");
const nextSlide  = document.getElementById("next");
const prevSlide  = document.getElementById("prev");
const cardwrapper = document.getElementById("card-container");

let active  = 7;
const mySlide = [...items];

function slideShow() {
    let count = 0;
    if (active === mySlide.length - 3) {
        mySlide[mySlide.length - 3].classList.add("activeSlide");
        mySlide.push(mySlide.shift());
        active--;
    } else if (active === 2) {
        mySlide[2].classList.add("activeSlide");
        mySlide.unshift(mySlide.pop());
        active++;
    } else {
        mySlide[active].classList.add("activeSlide");
    }
    for (let i = active + 1; i < mySlide.length; i++) {
        count++;
        mySlide[i].style.transform = `translateX(${10 * count}vw) scale(${1 - 0.2 * count}) perspective(2rem)`;
        mySlide[i].style.zIndex   = -count;
        mySlide[i].style.filter   = "blur(5px)";
        mySlide[i].style.opacity  = count > 2 ? 0 : 0.6;
    }
    count = 0;
    for (let i = active - 1; i >= 0; i--) {
        count++;
        mySlide[i].style.transform = `translateX(${-10 * count}vw) scale(${1 - 0.2 * count}) perspective(2rem)`;
        mySlide[i].style.zIndex   = -count;
        mySlide[i].style.filter   = "blur(5px)";
        mySlide[i].style.opacity  = count > 2 ? 0 : 0.6;
    }
}

function nextSlideClick() {
    active = active + 1 < items.length ? active + 1 : active;
    mySlide[active - 1].classList.remove("activeSlide");
    slideShow();
}

function prevSlideClick() {
    active = active - 1 >= 0 ? active - 1 : active;
    mySlide[active + 1].classList.remove("activeSlide");
    slideShow();
}

if (!isMobile()) {
    slideShow();
    cardwrapper.addEventListener("click", function (e) {
        const contWidth = cardwrapper.offsetWidth;
        const clickPos  = e.clientX - cardwrapper.getBoundingClientRect().left;
        if (e.target.closest('.activeSlide') || [nextSlide, prevSlide].includes(e.target)) return;
        clickPos > contWidth / 2 ? nextSlideClick() : prevSlideClick();
    });
}

// ─────────────────────────────────────────────
//  CORE VALUES MARQUEE SLIDER (both)
// ─────────────────────────────────────────────
new Swiper('.values-container', {
    loop: true,
    spaceBetween: 20,
    slideClass: "core-values",
    wrapperClass: "values-wrapper",
    speed: 5000,
    autoplay: { delay: 0, disableOnInteraction: false },
    breakpoints: {
        0:   { slidesPerView: 1.3, spaceBetween: 14 },
        901: { slidesPerView: 2,   spaceBetween: 20 }
    },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    pagination:  { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
});

// ─────────────────────────────────────────────
//  HEIGHT ADJUST — desktop only
// ─────────────────────────────────────────────
function adjustHeight() {
    const el = document.querySelector('.mySwiper');
    if (!el) return;
    if (isMobile()) {
        el.style.height = ''; // clear any inline height
    } else {
        el.style.height = window.innerHeight + 'px';
    }
}
window.addEventListener('load',   adjustHeight);
window.addEventListener('resize', adjustHeight);

// ─────────────────────────────────────────────
//  MOBILE SCROLL REVEAL
// ─────────────────────────────────────────────
if (isMobile()) {
    const targets = [
        '.services .service',
        '.item',
        '.company-mission',
        '.company-vission',
        '.contactinfo',
        '.heading',
        '.sub-heading',
    ];
    targets.forEach(sel =>
        document.querySelectorAll(sel).forEach(el => el.classList.add('mob-reveal'))
    );

    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('mob-visible'), i * 55);
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.07 });

    document.querySelectorAll('.mob-reveal').forEach(el => revealObs.observe(el));
}

// ─────────────────────────────────────────────
//  CONTACT FORM (Web3Forms)
// ─────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn          = this.querySelector('button[type="submit"]');
    const btnText      = btn.querySelector('.buttontext');
    const originalText = btnText.textContent;

    btnText.textContent = 'Sending...';
    btn.disabled = true;

    const formObject = {};
    new FormData(this).forEach((v, k) => { formObject[k] = v; });

    try {
        const res  = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(formObject)
        });
        const data = await res.json();
        if (data.success) {
            alert("Message sent! We'll get back to you soon.");
            this.reset();
        } else {
            alert('Failed to send. Please try again.');
        }
    } catch {
        alert('An error occurred. Please try again.');
    } finally {
        btnText.textContent = originalText;
        btn.disabled = false;
    }
});
