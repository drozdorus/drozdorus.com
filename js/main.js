// Carousel arrows for the Web2/Web3/Portfolio News/Media sliders.
// The sliders themselves are native CSS scroll-snap rows (see main.css);
// this just wires the existing prev/next buttons to scrollBy() and keeps
// their disabled state in sync with scroll position. Replaces jQuery +
// slick (item 6 of the visual refresh).
(function () {
    'use strict';

    // One card plus the gap after it: the distance between two neighbouring
    // cards (cards are spaced with CSS `gap`, not margins).
    function step(track) {
        var items = track.querySelectorAll('.slider__item');
        if (items.length < 2) return track.clientWidth;
        return items[1].offsetLeft - items[0].offsetLeft;
    }

    function setupCarousel(container) {
        var track = container.querySelector('.slider');
        var prev = container.querySelector('[data-carousel-prev]');
        var next = container.querySelector('[data-carousel-next]');
        if (!track || !prev || !next) return;

        // aria-disabled instead of the disabled attribute: a disabled button
        // drops keyboard focus to <body> the moment the row reaches its end.
        function setDisabled(button, value) {
            button.setAttribute('aria-disabled', value ? 'true' : 'false');
        }

        function update() {
            var max = track.scrollWidth - track.clientWidth;
            setDisabled(prev, track.scrollLeft <= 1);
            setDisabled(next, max <= 1 || track.scrollLeft >= max - 1);
        }

        function go(direction, button) {
            if (button.getAttribute('aria-disabled') === 'true') return;
            track.scrollBy({ left: direction * step(track), behavior: 'smooth' });
        }

        prev.addEventListener('click', function () { go(-1, prev); });
        next.addEventListener('click', function () { go(1, next); });
        track.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        update();
    }

    document.querySelectorAll('.media__container').forEach(setupCarousel);
})();
