const core = {
    headerAnimation() {
        const header = $('.header');
        if ($(document).scrollTop() > 0 || header.hasClass('main-menu-open')) {
            header.addClass('header--active');
        } else {
            header.removeClass('header--active');
        }
    },
    mainMenu() {
        const header = $('.header');
        const body = $('body');
        const scrollWidth = scrollbarWidth() - 1;
        let status = false;

        $('.main-menu').css( 'transition', '0.5s all ease-in')

        function showMenu () {
            status = true;
            body.css({'position': 'fixed', 'top': `-${window.scrollY}px`, 'padding-right': `${scrollWidth}px`});
            header.css({'padding-right': `${scrollWidth}px`});
            header.addClass('main-menu-open');
        }
        function hideMenu() {
            const scrollY = document.body.style.top;
            status = false;
            body.css({'position': 'static', 'top': '', 'padding-right': '0'});
            header.css({'padding-right': '0'});
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
            header.removeClass('main-menu-open')
        }
        function scrollbarWidth() {
            const documentWidth = parseInt(document.documentElement.clientWidth);
            const windowsWidth = parseInt(window.innerWidth);
            return windowsWidth - documentWidth;
        }


        $('.header__button').click(() => {
            if(status) {
                hideMenu();
            } else {
                showMenu()
            }
        })
        $('.header__close-menu, .main-menu__link').click(() => {
            hideMenu();
        })
    },
    tabs() {
        $('.tabs').on('click', '.tabs__list-item', function (e) {
            const curIndex = $(this).index();
            const tabs = $(e.delegateTarget);
            const menu = tabs.find('.tabs__list-item')
            const content = tabs.find('.tabs__content');

            menu.removeClass('active');
            content.removeClass("active");
            $(this).addClass('active');
            content.eq(curIndex).addClass('active');
        });
    },
    slider() {
        const owlTestimonials = $('.testimonials__carousel');
        const owlButtonPrev = '<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="-15 -12 38 38"><path fill-rule="evenodd" fill="rgb(255,255,255)" d="M9.000,14.000 L7.000,14.000 L-0.000,7.000 L7.000,-0.000 L9.000,-0.000 L2.000,7.000 L9.000,14.000 Z"/></svg>';
        const owlButtonNext = '<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="-15 -12 38 38"><path fill-rule="evenodd" fill="rgb(255,255,255)" d="M-0.000,-0.000 L2.000,-0.000 L9.000,7.000 L2.000,14.000 L-0.000,14.000 L7.000,7.000 L-0.000,-0.000 Z"/></svg>';

        owlTestimonials.owlCarousel({
            margin: 0,
            nav: true,
            navContainer: '.owl-nav-container',
            navText: [
                owlButtonPrev,
                owlButtonNext
            ],
            navClass: [
                'owl-prev testimonials__nav-item',
                'owl-next testimonials__nav-item'
            ],
            dots: true,
            dotsContainer: '.owl-dots',
            dotClass: 'owl-dot testimonials__dot',
            loop: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                },
                768: {
                    items: 2,
                }
            },
            items: 2,
            autoplay: true,
            autoplayHoverPause: true,
            smartSpeed: 600,
        })
    },
    smoothScroll(selector) {
        const margin = -75;

        selector.click(function() {
            console.log($($(this).attr("href")).offset().top+margin+ "px");
            $("html, body").animate({
                scrollTop: $($(this).attr("href")).offset().top+margin+ "px"
            }, {
                duration: 1600,
                easing: "swing"
            });
            return false;
        });
    }
}

$(document).ready(function () {
    core.headerAnimation();
    core.mainMenu();
    core.tabs();
    core.slider();
    core.smoothScroll($('.smooth-links'));

    $(document).on('scroll', () => {
        core.headerAnimation();
    })
});
