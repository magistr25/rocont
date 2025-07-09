const sliderBox = document.getElementById('sliderBox');
const slideWidth = 250; // ширина одного слайда (или sliderBox.offsetWidth если авто)
let isAnimating = false;

// Плавно крутим вперед
function moveNext() {
    if (isAnimating) return;
    isAnimating = true;
    sliderBox.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
    sliderBox.style.transform = `translateX(-${slideWidth}px)`;

    // После завершения анимации:
    sliderBox.addEventListener('transitionend', function handler() {
        // Переносим первый слайд в конец
        sliderBox.appendChild(sliderBox.firstElementChild);
        // Убираем смещение (без анимации)
        sliderBox.style.transition = 'none';
        sliderBox.style.transform = 'translateX(0)';
        isAnimating = false;
        sliderBox.removeEventListener('transitionend', handler);
    });
}

// Назад
function movePrev() {
    if (isAnimating) return;
    isAnimating = true;
    // Переносим последний слайд в начало — но сразу делаем -slideWidth!
    sliderBox.style.transition = 'none';
    sliderBox.insertBefore(sliderBox.lastElementChild, sliderBox.firstElementChild);
    sliderBox.style.transform = `translateX(-${slideWidth}px)`;
    // Теперь плавно возвращаем к 0
    setTimeout(() => {
        sliderBox.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
        sliderBox.style.transform = 'translateX(0)';
    }, 20);

    sliderBox.addEventListener('transitionend', function handler() {
        isAnimating = false;
        sliderBox.removeEventListener('transitionend', handler);
    });
}

// Свайп (touch)
let startX = 0, moved = false;
sliderBox.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    moved = false;
});
sliderBox.addEventListener('touchmove', () => { moved = true; });
sliderBox.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff < -30) moveNext();
    else if (diff > 30) movePrev();
});

// Клик (по картинке) — следующий
sliderBox.addEventListener('click', moveNext);

// Мышь (drag)
let mouseDown = false, mouseStartX = 0;
sliderBox.addEventListener('mousedown', e => {
    mouseDown = true;
    mouseStartX = e.clientX;
});
sliderBox.addEventListener('mouseup', e => {
    if (!mouseDown) return;
    const diff = e.clientX - mouseStartX;
    if (diff < -30) moveNext();
    else if (diff > 30) movePrev();
    mouseDown = false;
});
sliderBox.addEventListener('mouseleave', () => { mouseDown = false; });

// Чтобы не было drag ghost у картинок:
sliderBox.querySelectorAll('img').forEach(img => img.setAttribute('draggable', 'false'));

const startBlock = document.querySelector('.slider__item_start');
const arrowLeft = startBlock.querySelector('.arrow--left');
const arrowRight = startBlock.querySelector('.arrow--right');

arrowLeft.addEventListener('click', function(e) {
    e.stopPropagation();
    movePrev();
});
arrowRight.addEventListener('click', function(e) {
    e.stopPropagation();
    moveNext();
});

