window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.querySelectorAll('.video-section__info--none').forEach(function(el) {
            el.classList.add('video-section__info--visible');
        });
    }, 1000);
});
