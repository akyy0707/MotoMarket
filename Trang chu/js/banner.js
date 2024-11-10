let currentBanner = 0;
const banner = document.querySelectorAll('.banner-slide');
const cham = document.querySelectorAll('.cham');

function showBanner(index) {
    banner.forEach((banner, i) => {
        banner.style.display = i === index ? 'block' : 'none';
    });
    cham.forEach((cham, i) => {
        cham.classList.toggle('active', i === index);
    });
}

function goToBanner(index) {
    currentBanner = index;
    showBanner(currentBanner);
}

function autoSlide() {
    currentBanner = (currentBanner + 1) % banner.length;
    showBanner(currentBanner);
}

setInterval(autoSlide, 3000);

showBanner(currentBanner);