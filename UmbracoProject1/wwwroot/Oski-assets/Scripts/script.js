function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return [curtop];
    }
}

function toggleLanguageDropdown() {
    document.getElementById("languageDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.language-btn')) {
        var dropdowns = document.getElementsByClassName("language-dropdown");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

const menuItemsWithChildren = document.querySelectorAll('.header__menu__item');
const menuItemsArray = Array.from(menuItemsWithChildren);
const activeMenuItemInfo = menuItemsArray.find(menuItem => {
    const menuItemInfo = menuItem.querySelector('.header__menu__item__info');
    return menuItemInfo && menuItemInfo.classList.contains('header__menu__item__info--active')
});

function toggleMenuItems(menuItem, itemChildren, itemIcon) {
    itemIcon.classList.toggle('rotate');

    if (itemChildren.classList.contains('header__menu__item__children--visible')) {
        itemIcon.style.background = 'url("/Content/images/menu_arrow.svg") no-repeat';
    } else {
        itemIcon.style.background = 'url("/Content/images/menu_arrow_active.svg") no-repeat';
    }

    itemChildren.classList.toggle('header__menu__item__children--visible');

    menuItem.classList.toggle('header__menu__item--left-line');

    if (menuItem) {
        const childrenWrap = menuItem.querySelector('.header__menu__item__children__wrap');
        if (childrenWrap) {
            childrenWrap.classList.toggle('header__menu__item__children__wrap--visible');
        }
    }
}
function genericClickHandler(e) {

    if (window.innerWidth < 950) {
        handleMenuItemMobileClick.call(this, e);
    } else {
        handleMenuItemClick.call(this, e);
    }
}


function bindMenuEvents() {
    menuItemsWithChildren.forEach((menuItem, index) => {
        const itemChildren = menuItem.querySelector('.header__menu__item__children');

        if (itemChildren) {
            menuItem.removeEventListener('click', handleMenuItemClick);
            menuItem.addEventListener('click', handleMenuItemClick);
        }
    });
}

function handleMenuItemClick() {
    const clickedMenuItem = this;
    const menuItemInfo = clickedMenuItem.querySelector('.header__menu__item__info');
    const itemIcon = clickedMenuItem.querySelector('.header__menu__item__icon');
    const childrenWrap = clickedMenuItem.querySelector('.header__menu__item__children__wrap');

    menuItemsWithChildren.forEach((menuItem) => {
        if (menuItem !== clickedMenuItem) {
            const otherMenuItemInfo = menuItem.querySelector('.header__menu__item__info');
            const otherItemIcon = menuItem.querySelector('.header__menu__item__icon');
            const otherChildrenWrap = menuItem.querySelector('.header__menu__item__children__wrap');

            if (otherChildrenWrap) {
                otherChildrenWrap.style.display = 'none';
                otherChildrenWrap.classList.remove('header__menu__item__children__wrap--visible');
                otherItemIcon.classList.remove('header__menu__item__icon--active');
                otherMenuItemInfo.classList.remove('header__menu__item__info--active');
            } else {
                otherMenuItemInfo.classList.remove('header__menu__item__info--active');
            }

            if (activeMenuItemInfo) {
                activeMenuItemInfo.classList.remove('header__menu__item__info--active');
            }
        }
    });

    if (childrenWrap.classList.contains('header__menu__item__children__wrap--visible')) {
        childrenWrap.style.display = 'none';
    } else {
        childrenWrap.style.display = 'block';
    }

    childrenWrap.classList.toggle('header__menu__item__children__wrap--visible');
    itemIcon.classList.toggle('header__menu__item__icon--active');

    if (activeMenuItemInfo) {
        const nameOfActiveMenuItem = activeMenuItemInfo.innerText.split('\n')[0];
        if (menuItemInfo.innerText !== nameOfActiveMenuItem) {
            menuItemInfo.classList.toggle('header__menu__item__info--active');
        } else {
            menuItemInfo.classList.add('header__menu__item__info--active');
        }
    } else {
        menuItemInfo.classList.toggle('header__menu__item__info--active');
    }

    const menuItemWithOpenMenu = menuItemsArray
        .filter(menuItem => menuItem.querySelector('.header__menu__item__children__wrap--visible') !== null);

    if (menuItemWithOpenMenu.length === 0) {
        setTimeout(() => {
            if (activeMenuItemInfo) {
                activeMenuItemInfo.classList.add('header__menu__item__info--active');
            }
        }, 300);
    }
}


function handleMenuItemMobileClick(event) {
    const itemIcon = this.querySelector('.header__menu__item__icon');
    const childrenWrap = this.querySelector('.header__menu__item__children__wrap');

    const menuLink = this.querySelector('.header__menu-link');
    const itemChildren = this.querySelector('.header__menu__item__children');

    childrenWrap.classList.toggle('header__menu__item__children__wrap--visible');
    console.log('childrenWrap classList: ', childrenWrap.classList);

    itemIcon.classList.toggle('header__menu__item__icon--active');
    console.log('itemIcon classList: ', itemIcon.classList);

    menuLink.classList.toggle('header__menu-link--active');
    console.log('menuLink classList: ', menuLink.classList);

    toggleMenuItems(this, itemChildren, itemIcon);
}


document.addEventListener("DOMContentLoaded", function () {
    bindMenuEvents();

    const backToTopButton = document.getElementById("to_top_button");

    backToTopButton.addEventListener('click', function () {
        window.scroll({
            left: 0,
            top: 0,
            behavior: 'smooth'
        });
    });

    /*Меню-бургер, открытие\закрытие*/
    document.querySelector('.header__burger').addEventListener('click', function (e) {
        e.preventDefault();
        const burger = document.querySelector('.header__burger');
        const burgerImg = document.querySelector('.header__burger img');
        const navigation = document.querySelector('.header__navigation');
        burger.classList.toggle('header__burger--active');
        navigation.classList.toggle('header__navigation--active');

        // Update the image source
        if (burger.classList.contains('header__burger--active')) {
            burgerImg.src = '/Content/images/burger_close.svg';
            document.body.style.overflow = 'hidden';
        } else {
            burgerImg.src = '/Content/images/burger_open.svg';
            document.body.style.overflow = 'auto';
        }
    });

    /*Плавный переход по клику на пунктах главного меню*/
    document.querySelectorAll('nav').forEach((el) => {
        el.addEventListener('click', function (e) {
            if (e.target.tagName == 'A') {
                if (document.querySelector('.header__burger').classList.contains('header__burger--active')) {
                    document.querySelector('.header__burger').classList.remove('header__burger--active');
                    document.querySelector('.header__navigation').classList.remove('header__navigation--active');
                    document.body.style.overflow = 'auto';
                }

            }
        })
    })

    /*Переход на секцию "Связаться с нами" из шапки сайта*/
    document.querySelectorAll('.header__button').forEach((el) => {
        el.addEventListener('click', function (e) {
            if (e.target.getAttribute("href")[0] === "#") {
                e.preventDefault();
                if (document.querySelector('.header__burger').classList.contains('header__burger--active')) {
                    document.querySelector('.header__burger').classList.remove('header__burger--active');
                    document.querySelector('.header__navigation').classList.remove('header__navigation--active');
                    document.body.style.overflow = 'auto';
                }
                var id = e.target.getAttribute("href");
                var url = e.target.dataset.link;
                var element = document.querySelector(id);
                if (element) {
                    window.scroll({
                        left: 0,
                        top: findPos(element),
                        behavior: 'smooth'
                    });
                } else {
                    location.href = url;
                }
            }
        })
    })

    /*"Приклеивание" меню-шапки к верху экрана*/
    window.addEventListener('scroll', function () {
        if (this.scrollY > this.innerHeight) { document.querySelector('#header').classList.add('header--active'); }
        else { document.querySelector('#header').classList.remove('header--active'); }
    });


    /*Показывание (скролл вверх) и скрытие (скролл вниз) меню при прокрутке странцы*/
    var header = document.querySelector('#header'),
        scrollPrev = 0;
    window.addEventListener('scroll', function () {
        var scrolled = this.scrollY;
        if (scrolled > 100 && scrolled > scrollPrev) {
            header.classList.add('out');
        } else {
            header.classList.remove('out');
        }
        scrollPrev = scrolled;
    }, { passive: true });

    /*Показывание (скролл вниз) и скрытие (скролл вверх) кнопки "Back to top" при прокрутке странцы*/
    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }, { passive: true });

    /*dropdown list for search*/
    $('.search__form-select__button').click(function (e) {
        var form = $(this).parents("form#form-search")
        $(form).find('.search__form-select__list').toggleClass('hide');
        $(form).find('.search__form-select__list > li').css('display', 'block');
    });

    $('.search__form-select__item').click(function (e) {

        var value = $(this).find('button').data("value");
        var text = $(this).find('button').first().text();


        if (text.length !== 0 && value.length !== 0) {
            $('.search__form-select__input').val(value);
            $('.search__form-select__button').text(text);
        }

        $('.search__form-select__list').addClass('hide');
    });

    /*message error for search*/
    $('button#submit-search').click(function (e) {
        e.preventDefault();

        var form = $(this).parents('form#form-search')

        var element = $(form).find('#input-search');

        var min = $(element).attr('min');

        if (element.val().length < (min === "" ? 4 : min)) {
            $(form).find('.search__error-message').show();
        } else {
            $(form).find('.search__error-message').hide();
            page = 1;
            $(form).submit();
        }
    })

    /* get data from Search Api Controller */
    $("form#form-search").submit(function (event) {
        event.preventDefault();

        $(".pagination").addClass("d-none")

        var section = $(this).parents('#search')

        var searchResult = $(section).find("#print-result-search .search__result")

        var $form = $(this),
            query = $form.find("input[name='query']").val(),
            button = $form.find("button[type='submit']"),
            typeSearch = $form.find("input[name='typeSearch']").val(),
            url = $form.attr("action");

        button.prop('disabled', true);

        $(searchResult).empty();

        var $post = $.post(url, { query, typeSearch, takeElem, page: (page - 1) >= 0 ? page - 1 : 0 });

        $post.done(function (data) {

            $(section).find("#print-result-search .search__result__title").html("Your search " + query + " returned " + data.resultCount + " results")

            var sortData = data.searchResults.sort(function (a, b) {
                if (a.score < b.score) {
                    return 1;
                } else {
                    return -1;
                }
            })

            sortData.forEach(element => {

                var title = $('<h5/>')
                    .addClass("search__result__title-card")
                    .text(element.title)

                var description = $('<p/>')
                    .addClass("search__result__description-card")
                    .text(element.description)

                var link = $("<a/>")
                    .attr('href', element.url)
                    .addClass("search__result__link-card font-link-default")
                    .text(window.location.origin + element.url);

                var div = $('<div/>')
                    .addClass("search__result__card")
                    .append(title)
                    .append(description)
                    .append(link)

                $(searchResult).append(div);

            })

            CreatePagination(page, data.resultCount, takeElem);

            if (sortData.length > 0) {
                $(".pagination").removeClass("d-none")
            }

        }).fail(function (data) {
        }).always(function () {
            button.prop('disabled', false);
        }).catch(function (e) { console.log(e) });
    })

    /*send data to contact api controller*/
    $("form#contactForm").submit(function (event) {
        event.preventDefault();
        var $form = $(this),
            subject = $form.find("input[name='subject']").val(),
            name = $form.find("input[name='name']").val(),
            email = $form.find("input[name='email']").val(),
            toEmail = $form.find("input[name='toEmail']").val(),
            phone = $form.find("input[name='phone']").val(),
            site = $form.find("input[name='site']").val(),
            message = $form.find("textarea[name='message']").val(),
            button = $form.find("button[type='submit']"),
            recaptcha = $form.find(".g-recaptcha").data("sitekey"),
            response = $("#g-recaptcha-response").val(),
            __RequestVerificationToken = $form.find("input[name='__RequestVerificationToken']").val();

        url = $form.attr("action");

        button.prop('disabled', true);

        if (!!!($('#g-recaptcha-response').val()) && typeof recaptcha !== 'undefined') {
            $(".contact__recaptcha").show();

            button.prop('disabled', false);
        } else {
            $(".contact__recaptcha").hide();
            recaptcha = typeof recaptcha !== 'undefined' ? recaptcha : "not used";
            response = typeof response !== 'undefined' ? response : "not used";
            var $post = $.post(url, { name, email, message, recaptcha, toEmail, phone, subject, response, __RequestVerificationToken, site });

            $post.done(function (data) {
                $(".contact__success-answer").show("slow");
                $(".contact__error-answer").hide("slow");
            }).fail(function (data) {
                $(".contact__error-answer").show("slow");
                $(".contact__success-answer").hide("slow");
            }).always(function () {
                $form.find("input[name='name']").val("");
                $form.find("input[name='email']").val("");
                $form.find("input[name='phone']").val("");
                $form.find("textarea[name='message']").val("");

                button.prop('disabled', false);
            }).catch(function (e) { console.log(e) });
        }
    });

    //check for duplicate search types
    var itemsTypeSearch = $(".search__form-select .search__form-select__item");
    if (itemsTypeSearch.length > 1) {
        var typesSearch = [];

        $(itemsTypeSearch).each(function (index) {
            var element = $(itemsTypeSearch)[index];

            var value = $(element).find("button").data("value");

            if (typesSearch.includes(value)) {
                $(element).hide();
            } else {
                typesSearch.push(value);
            }
        });

        if (typesSearch.length < 2) {
            $(".search__form-select").hide();
        }
    }

    //pagination for api controller (search)
    var page = 1;
    var takeElem = parseInt($(".pagination").data("take-elem"), 10) || 5;

    $("section.search .pagination .pagination__item").click(function () {
        event.preventDefault();

        if ($(this).data("page") != undefined) {
            page = parseInt($(this).data("page"), 10) || 1;

            $("form#form-search").submit();
        }
    })

    var CreatePagination = function (page, resultCount, takeElem) {
        var maxPage = Math.ceil(resultCount / takeElem);
        var links = $(".pagination .pagination__item");

        var leftArrow = links[0],
            firstPage = links[1],
            firstThreeFullStop = links[2],

            activePageMinusTwo = links[3],
            activePageMinusOne = links[4],
            activePage = links[5],
            activePagePlusOne = links[6],
            activePagePlusTwo = links[7],

            lastThreeFullStop = links[8],
            lastPage = links[9],
            rightArrow = links[10];

        var optionsItemsPagination = new Array(
            { element: leftArrow, condition: ((page - 1) < 1), dataPage: page - 1 },
            { element: firstPage, condition: ((page - 3) < 1), dataPage: 1, changeElementInHtml: true },
            { element: firstThreeFullStop, condition: ((page - 4) < 1) },

            { element: activePageMinusTwo, condition: ((page - 2) < 1), dataPage: page - 2, changeElementInHtml: true },
            { element: activePageMinusOne, condition: ((page - 1) < 1), dataPage: page - 1, changeElementInHtml: true },

            { element: activePage, dataPage: page, changeElementInHtml: true },

            { element: activePagePlusOne, condition: ((page + 1) > maxPage), dataPage: page + 1, changeElementInHtml: true },
            { element: activePagePlusTwo, condition: ((page + 2) > maxPage), dataPage: page + 2, changeElementInHtml: true },

            { element: lastThreeFullStop, condition: ((page + 4) > maxPage) },
            { element: lastPage, condition: ((page + 3) > maxPage), dataPage: maxPage, changeElementInHtml: true },
            { element: rightArrow, condition: ((page + 1) > maxPage), dataPage: page + 1 },
        );

        CreateItemPagination(optionsItemsPagination);
    }

    var CreateItemPagination = (optionsItemsPagination) => {
        optionsItemsPagination.forEach(item => {

            if (typeof (item.condition) !== "undefined")
                $(item.element).addClass(item.condition ? "d-none" : "")
                    .removeClass(!(item.condition) ? "d-none" : "");

            if (typeof (item.dataPage) !== "undefined")
                $(item.element).data("page", item.dataPage);

            if (item.changeElementInHtml === true)
                $(item.element).html(item.dataPage);
        })
    };

    /*Переключение табов в блоке с сотрудниками*/
    $('.employees__trigger').on('click', function (e) {
        e.preventDefault();
        var id = $(this).attr('data-tab');
        $('.employees__trigger').removeClass('employees__trigger--active');
        $('.employees__tab').fadeOut(0);
        $(this).addClass('employees__trigger--active');
        $('#' + id).fadeIn(300);
    });

    /*Аккордеон в блоке с сотрудниками*/
    $('.employees__item-button').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.employees__item-heading').toggleClass('employees__item-heading--active').next('.employees__item-info').slideToggle(300);
    });

    /*Слайдер, главная страница, Новая команда*/
    $('.new-team__slider').slick({
        infinite: true,
        slidesToShow: $('.new-team__slider').data("slides-show"),
        slidesToScroll: 1,
        speed: 1000,
        dots: true,
        prevArrow: '<button type="button" class="new-team__arrow new-team__arrow--prev"><img src="../Content/images/slider-arrow-prev.svg" alt="Prev arrow"></button>',
        nextArrow: '<button type="button" class="new-team__arrow new-team__arrow--next"><img src="../Content/images/slider-arrow-next.svg" alt="Next arrow"></button>',
        responsive: [
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.new-team2__slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        prevArrow: '<button type="button" class="new-team2__arrow new-team2__arrow--prev"><img src="../Content/images/slider-arrow-prev.svg" alt="Prev arrow"></button>',
        nextArrow: '<button type="button" class="new-team2__arrow new-team2__arrow--next"><img src="../Content/images/slider-arrow-next.svg" alt="Next arrow"></button>',
        dots: true,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 401,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    });
    /*Подключение слайдера на первом экране*/
    $('.team__slider').slick({
        infinite: true,
        slidesToShow: $('.team__slider').data("slides-show"),
        slidesToScroll: 1,
        speed: 1000,
        dots: true,
        prevArrow: '<button type="button" class="team__arrow team__arrow--prev"><img src="../Content/images/slider-arrow-prev.svg" alt="Prev arrow"></button>',
        nextArrow: '<button type="button" class="team__arrow team__arrow--next"><img src="../Content/images/slider-arrow-next.svg" alt="Next arrow"></button>',
        responsive: [
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});
// Открытие\закрытие детальной информации по разработчику
$('.new-slide__team-details.more-button').on('click', function (e) {
    e.preventDefault();
    let detailsBlock = $(this).data('details'),
        parent = $(this).closest('.new-slide__team'),
        infoBlock = parent.siblings('.new-slide__members');
    parent.fadeOut(0);
    infoBlock.find('.new-slide__members-wrap[data-tab="' + detailsBlock + '"]').fadeIn(300);
});

$('.new-slide__team-details.back-button').on('click', function (e) {
    e.preventDefault();
    let parent = $(this).closest('.new-slide__members-wrap'),
        teamBlock = $(this).closest('.new-slide__members').siblings('.new-slide__team');
    parent.fadeOut(0);
    teamBlock.fadeIn(300);
});
//Выпадющий список вопрос ответ
$(document).ready(function () {

    var elementForAccordion;

    $(".accordion__item").click(function (e) {

        if (elementForAccordion) {
            if (!$(elementForAccordion).find(".accordion__answer").is(":hidden")) {
                $(elementForAccordion).find(".accordion__answer").slideUp();
            }

            if ($(elementForAccordion).find(".accordion__question").hasClass("accordion__active__title"))
                $(elementForAccordion).find(".accordion__question").removeClass("accordion__active__title");

            if ($(elementForAccordion).hasClass("active"))
                $(elementForAccordion).removeClass("active");
        }

        elementForAccordion = this

        if ($(this).find(".accordion__answer").is(":hidden")) {
            $(this).find(".accordion__answer").slideDown();

            if (!$(this).hasClass("active"))
                $(this).addClass("active");
        } else {
            $(this).find(".accordion__answer").slideUp();
        }
    });
})

//Nofollow for all external links
$(document).ready(function () {
    $("a[href^='http://']").each(function () {
        if (this.href.indexOf(location.hostname) == -1) {
            $(this).attr('rel', 'nofollow');
        }
    });
    $("a[href^='https://']").each(function () {
        if (this.href.indexOf(location.hostname) == -1) {
            $(this).attr('rel', 'nofollow');
        }
    });
});