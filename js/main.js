// Carousel arrows for the Web2/Web3/Portfolio News/Media sliders.
// The sliders themselves are native CSS scroll-snap rows (see main.css);
// this just wires the existing prev/next buttons to scrollBy() and keeps
// their disabled state in sync with scroll position. Replaces jQuery +
// slick (item 6 of the visual refresh).
(function () {
    'use strict';

    function closestStep(track) {
        var item = track.querySelector('.slider__item');
        if (!item) return track.clientWidth;
        var style = window.getComputedStyle(item);
        var width = item.getBoundingClientRect().width;
        var marginLeft = parseFloat(style.marginLeft) || 0;
        var marginRight = parseFloat(style.marginRight) || 0;
        return width + marginLeft + marginRight;
    }

    function setupCarousel(container) {
        var track = container.querySelector('.slider');
        var prev = container.querySelector('[data-carousel-prev]');
        var next = container.querySelector('[data-carousel-next]');
        if (!track || !prev || !next) return;

        function update() {
            var max = track.scrollWidth - track.clientWidth - 1;
            prev.disabled = track.scrollLeft <= 0;
            next.disabled = max <= 0 || track.scrollLeft >= max;
        }

        prev.addEventListener('click', function () {
            track.scrollBy({ left: -closestStep(track), behavior: 'smooth' });
        });
        next.addEventListener('click', function () {
            track.scrollBy({ left: closestStep(track), behavior: 'smooth' });
        });
        track.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        update();
    }

    document.querySelectorAll('.media__container').forEach(setupCarousel);
})();
