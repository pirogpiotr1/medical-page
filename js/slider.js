$.fn.slider = function () {

    let vars = {
        countEls: 0,
        scrolling: false,
        timerId: null,
        slideshow: 0,
        slideshowFreq: 4,
        speed: 750,
    };

    let functions = {
        goNext: function () {
            if (!vars.scrolling) {
                vars.scrolling = true;
                let movement = `-=${100}%`;
                let cur_index = $this.find('.is-active').index();

                if (cur_index === vars.countEls - 1) {
                    functions.cloneLastElAtTheEnd();
                    functions.setConWidth(vars.countEls + 1);
                    functions.setElsWidth(vars.countEls + 1);
                }

                functions.changeActiveElNext();

                $this.find('.slider__wrapper').animate({
                    left: movement
                }, {
                    duration: vars.speed,
                    easing: 'swing',
                    complete: function () {
                        if (cur_index === vars.countEls - 1) {
                            functions.removeLastEl();
                            functions.setConWidth(vars.countEls);
                            functions.setElsWidth(vars.countEls)
                            functions.backToBegin();
                        }
                        vars.scrolling = false;
                    }
                });
            }
        },

        goTo: function (index) {
            functions.clearInterval();

            vars.scrolling = true;
            let cur_index = $this.find('.is-active').index();
            let movement = null;

            if (index > cur_index) {
                movement = `-=${index - cur_index}00%`
            } else {
                movement = `+=${cur_index - index}00%`
            }

            functions.changeActiveElTo(index)
            $this.find('.slider__wrapper').animate({
                left: movement
            }, {
                duration: vars.speed,
                easing: 'swing',
                complete: function () {
                    vars.scrolling = false;
                    functions.setSlideshow();
                }
            });
        },
        setSlideshow: function () {
            if (!vars.timerId) {
                vars.timerId = setInterval(function () {
                    functions.goNext();
                    console.log('auto')
                }, vars.slideshowFreq * 1000);
            }
        },
        clearInterval() {
            clearInterval(vars.timerId);
            vars.timerId = null;
        },
        setElsWidth(elsCount) {
            $this.find('.slider__wrapper .slider__wrapper__el').width(`${100 / elsCount}%`);
        },
        setConWidth(elsCount) {
            $this.find('.slider__wrapper').width(`${100 * elsCount}%`);
        },
        cloneLastElAtTheEnd() {
            $this.find('.slider__wrapper__el').eq(0).clone().appendTo($this.find('.slider__wrapper'));
        },
        removeLastEl() {
            $this.find('.slider__wrapper__el').last().remove();
        },
        backToBegin() {
            $this.find('.slider__wrapper').css('left', '0%');
        },
        changeActiveElNext() {
            if ($this.find('.is-active').index() === vars.countEls - 1) {
                $this.find('.slider__wrapper__el').removeClass('is-active').eq(0).addClass('is-active');
                $this.find('.slider__nav__el').removeClass('active').eq(0).addClass('active');
            } else {
                $this.find('.is-active').removeClass('is-active').next().addClass('is-active')
                $this.find('.active').removeClass('active').next().addClass('active');
            }
        },
        changeActiveElTo(index) {
            $this.find('.slider__wrapper__el').removeClass('is-active').eq(index).addClass('is-active');
        },
        addSliderNavListeners() {
            $('.slider__nav__el').on('click', function () {

                if (!$(this).hasClass('active')) {
                    $('.slider__nav__el').removeClass('active');
                    $(this).addClass('active');
                    functions.goTo($(this).index());
                }
            });
        },
        init: function () {
            vars.countEls = $this.find('.slider__wrapper .slider__wrapper__el').length;
            functions.setElsWidth(vars.countEls);
            functions.setConWidth(vars.countEls);
            functions.setSlideshow();
            functions.addSliderNavListeners();
        }
    };

    let $this = this;
    functions.init();
};
