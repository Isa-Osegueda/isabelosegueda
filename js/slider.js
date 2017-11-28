var carousel = (function () {
    //initialise variables
    var slides = $('.slides'),
        items = slides.children('div'),
        length = items.length,
        current = 0,
        isAnimating = false,
        navprev = $('.sl-prev'),
        navnext = $('.sl-next'),

        init = function () {
            var currentItem = items.eq(current),
                //set slide position
                initCSS = {
                    top: 0,
                    zIndex: 99
                };
            //display slide in view
            currentItem.css(initCSS);
            initEvents();
            updateNavImg();

            //move slides out of view except current slide
            items.each(function (index, item) {
                if (index > 0) {
                    $(item).css({
                        top: '-100%',
                        zIndex: 1
                    });
                }
            });
        },
        //click events
        initEvents = function () {
            navprev.on('click', function (e) {
                e.preventDefault();
                slide('prev');
                updateNavImg();
            });

            navnext.on('click', function (e) {
                e.preventDefault();
                slide('next');
                updateNavImg();
            });
        },
        
        //animating slides
        slide = function (dir) {
            isAnimating = true;
            var currentItem = items.eq(current);
            //if direction is forward
            if (dir === 'next') {
                //if next slide is not the last, move to next slide
                //when last slide reached, go back to first slide
                (current < length - 1) ? ++current : current = 0;
            }
            //if direction is backward
            else if (dir === 'prev') {
                //if slide is not the first, move back to previous slide
                //is first slide reached, move to last slide
                (current > 0) ? --current : current = length - 1;
            }

            var newItem = items.eq(current);
            newItem.css({
                //when ascending order, move slide down, otherwise move slide up
                top: (dir === 'next') ? '-100%' : '100%',
                zIndex: 99
            });
            //
            var setTimeout = function () {
                currentItem.addClass('move').css({
                    top: (dir === 'next') ? '100%' : '-100%',
                    zIndex: 1
                });

                // move new slide to main view
                newItem.addClass('move').css('top', 0);
            }
            setTimeout();
        }

    return { init: init };

})();

//call function
$(function () {
    carousel.init();
});
