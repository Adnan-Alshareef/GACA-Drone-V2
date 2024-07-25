let timVine = document.getElementById("tim-vine");
let navbar = document.getElementById("main-nav");

let navPos = navbar.getBoundingClientRect().top;

window.addEventListener("scroll", e => {
    let scrollPos = window.scrollY;
    if (scrollPos > 800) {
        navbar.classList.add('sticky');


    } else {
        navbar.classList.remove('sticky');

    }
});


AOS.init({
    duration: 800,
})

$(document).ready(function () {
    // Cache selectors
    var $navItems = $('.nav-item a');
    var $sections = $navItems.map(function () {
        var href = $(this).attr('href');
        if (href.startsWith('#') && href.length > 1) {
            return $(href);
        }
    }).get();

    // Function to update active class based on scroll position
    function updateActiveNav() {
        var scrollPos = $(document).scrollTop();
        var windowHeight = $(window).height();
        var docHeight = $(document).height();
        var sectionFound = false;

        // Loop through sections to find the active one
        $sections.forEach(function ($section) {
            if ($section.length) {
                var sectionTop = $section.offset().top - 380; // Adjust for nav height or offset
                var sectionBottom = sectionTop + $section.outerHeight();

                // Check if the section is in the viewport
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    var id = $section.attr('id');
                    $navItems.removeClass('Active');
                    $('.nav-item a[href="#' + id + '"]').parent().addClass('Active');
                    sectionFound = true;
                } else {
                    // Remove Active class if scrolled out of section
                    var id = $section.attr('id');
                    $('.nav-item a[href="#' + id + '"]').parent().removeClass('Active');
                }
            }
        });

        // Handle the case when at the top of the page
        if (!sectionFound && scrollPos < $sections[0].offset().top - 100) {
            $navItems.removeClass('Active');
            $('.nav-item a[href="#"]').parent().addClass('Active');
        }

        // Handle the case when near the bottom of the page
        if (!sectionFound && (scrollPos + windowHeight) >= (docHeight - 10)) {
            var lastSection = $sections[$sections.length - 1];
            var lastId = lastSection.attr('id');
            $navItems.removeClass('Active');
            $('.nav-item a[href="#' + lastId + '"]').parent().addClass('Active');
        }
    }

    // Attach the updateActiveNav function to scroll event
    $(window).on('scroll', updateActiveNav);

    // Optional: Smooth scrolling when clicking on a nav item
    $navItems.on('click', function (event) {
        event.preventDefault();
        var target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 500);
        } else if ($(this).attr('href') === '#') {
            // Scroll to top if href="#"
            $('html, body').animate({
                scrollTop: 0
            }, 0);
        }
    });

    // Initial call to update the nav based on the current scroll position
    updateActiveNav();
});

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");

    function toggleCard(clickedCard) {
        cards.forEach(card => {
            if (card === clickedCard) {
                card.classList.add("expanded");
            } else {
                card.classList.remove("expanded");
            }
        });
    }

    cards.forEach(card => {
        card.addEventListener("click", function() {
            toggleCard(this);
        });
    });
});

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    freeMode: true,
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1.5,
            spaceBetween: 10
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 2.5,
            spaceBetween: 10
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 2.1,
            spaceBetween: 10
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 4,
            spaceBetween: 20
        }
    }
});