const menu = document.getElementById("menu");
const container = document.getElementById("container");
const items = document.querySelectorAll(".cardslider .item");
const nextSlide = document.getElementById("next");
const prevSlide = document.getElementById("prev");
const cardwrapper = document.getElementById("card-container");

// ------- SWIPER (cube - GPU optimized) -------

var swiper = new Swiper(".swiper", {
    effect: "cube",
    speed: 550,
    allowTouchMove: true,
    grabCursor: true,
    cubeEffect: {
        shadow: false,
        slideShadows: false,
    },
    mousewheel: {
        sensitivity: 1,
        thresholdDelta: 50,
        releaseOnEdges: false,
    },
    on: {
        slideChange: function () {
            const currentIndex = swiper.realIndex;
            document.querySelectorAll('.Links li').forEach(link => link.classList.remove('activeLink'));
            const navItems = Array.from(document.querySelectorAll('.Links li'));
            if (navItems[currentIndex]) navItems[currentIndex].classList.add('activeLink');
        }
    }
});

function Navigate(indx) {
    document.querySelectorAll(".Links li").forEach(i => i.classList.remove("activeLink"));
    const navItems = Array.from(document.querySelectorAll(".Links li"));
    if (navItems[indx]) navItems[indx].classList.add("activeLink");
    swiper.slideTo(indx, 550, true);
}

// ------- HAMBURGER SLIDE -------

function toggleMenu() {
    menu.classList.toggle('open');
    container.classList.toggle('open');
}

// ------- CLIENT CARD SLIDER -------

let active = 7;
const mySlide = [...items];

function slideShow() {
    let count = 0;

    if (active === mySlide.length - 3) {
        mySlide[mySlide.length - 3].classList.add("activeSlide");
        let firstItem = mySlide.shift();
        mySlide.push(firstItem);
        active--;
    } else if (active === 2) {
        mySlide[2].classList.add("activeSlide");
        let lastItem = mySlide.pop();
        mySlide.unshift(lastItem);
        active++;
    } else {
        mySlide[active].classList.add("activeSlide");
    }

    for (var i = active + 1; i < mySlide.length; i++) {
        count++;
        mySlide[i].style.transform = `translateX(${10 * count}vw) scale(${1 - 0.2 * count}) perspective(2rem)`;
        mySlide[i].style.zIndex = -count;
        mySlide[i].style.filter = "blur(5px)";
        mySlide[i].style.opacity = count > 2 ? 0 : 0.6;
    }
    count = 0;
    for (var i = active - 1; i >= 0; i--) {
        count++;
        mySlide[i].style.transform = `translateX(${-10 * count}vw) scale(${1 - 0.2 * count}) perspective(2rem)`;
        mySlide[i].style.zIndex = -count;
        mySlide[i].style.filter = "blur(5px)";
        mySlide[i].style.opacity = count > 2 ? 0 : 0.6;
    }
}
slideShow();

cardwrapper.addEventListener("click", function (event) {
    const contWidth = cardwrapper.offsetWidth;
    const clickPos = event.clientX - cardwrapper.getBoundingClientRect().left;

    if (event.target.closest('.activeSlide') || [nextSlide, prevSlide].includes(event.target)) {
        return;
    }

    if (clickPos > contWidth / 2) {
        nextSlideClick();
    } else {
        prevSlideClick();
    }
});

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

// ------- CORE VALUES SLIDER -------

const valueSlide = new Swiper('.values-container', {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 20,
    slideClass: "core-values",
    wrapperClass: "values-wrapper",
    speed: 5000,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
});

// ------- HEIGHT ADJUST -------

function adjustHeight() {
    document.querySelector('.mySwiper').style.height = window.innerHeight + 'px';
}

window.addEventListener('load', adjustHeight);
window.addEventListener('resize', adjustHeight);

// ------- CONTACT FORM (Web3Forms) -------

document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const btn = this.querySelector('button[type="submit"]');
    const btnText = btn.querySelector('.buttontext');
    const originalText = btnText.textContent;

    btnText.textContent = 'Sending...';
    btn.disabled = true;

    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => { formObject[key] = value; });

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        const data = await response.json();

        if (data.success) {
            alert('Message sent! We\'ll get back to you soon.');
            this.reset();
        } else {
            alert('Failed to send. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    } finally {
        btnText.textContent = originalText;
        btn.disabled = false;
    }
});
