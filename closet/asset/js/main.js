/* ----------------------------------- RESIZE MOBILE 100VH ---------------------------------- */
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${document.documentElement.clientHeight}px`);
};
window.addEventListener("resize", appHeight);
appHeight();

/* ------------------------------ LOADING PAGE ------------------------------ */
$(window).on('pageshow load', function() {
  $('body').removeClass('fadeout');
});

$(window).on("load", function () {
  // $("body").addClass("disable-scroll");
  setTimeout(() => {
    $(".c-loading > img").fadeIn("slow");
  }, 1000);
  setTimeout(() => {
    $(".c-loading > img").fadeOut();
  }, 2500);
  setTimeout(() => {
    $(".c-loading").fadeOut("slow");
    $("body").removeClass("disable-scroll");
  }, 3000);
});

$(document).ready(function () {
  
  // loading
  $('a:not([href^="#"]):not([target]):not([href^="mailto"])').on('click', function(e) {
      // e.preventDefault();
      url = $(this).attr('href');
      if (url !== '') {
          idx = url.indexOf("#");
          var hash = idx != -1 ? url.substring(idx) : "";

          if ($(hash).length > 0) {
              $('html, body').animate({
                  scrollTop: $(hash).offset().top
              }, 300)
              return false;
          }
          $('body').addClass('fadeout');
          setTimeout(function() {
              window.location = url;
          }, 600);
      }
      return false;
  });

  // SCROLL FADE
  $(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    var bottom = scrollTop + $(window).height();
    $(".in-view").each(function () {
      if (bottom > $(this).offset().top + 100) {
        $(this).addClass("fade-in");
      } else {
        $(this).removeClass("fade-in");
      }
    });
  });

  $(".js-loader::before").css({
    opacity: 1,
  });
  $(".js-loader").addClass("is-show");
  if (window.devicePixelRatio > 1) {
    var lowresImages = $("img.for-rentina");
    lowresImages.each(function (i) {
      var lowres = $(this).attr("src");
      var highres = lowres.replace(".", "@2x.");
      $(this).attr("src", highres);
    });
  }

  var userAgent, ieReg, ie;
  userAgent = window.navigator.userAgent;
  ieReg = /msie|Trident.*rv[ :]*11\./gi;
  ie = ieReg.test(userAgent);

  if (ie) {
    centerImg("c-mainslide__container");
    centerImg("c-listimg__item");
    centerImg("c-card1__inner");
    centerImg("c-product__thumbnail");
    centerImg("p-top5__img");
    centerImg("p-top6__img");
    centerImg("c-slide__container");
    centerImg("p-top7__img");
    centerImg("p-top8__img");
    centerImg("p-top1__img");
    $(".c-mainslide__listimg__item").addClass("c-mainslide__listimg__item--ie");
    $(".c-items__item").addClass("c-items__item--ie");
    $(".c-modal__info").addClass("c-modal__info--ie");
  }

  if (ie) {
    $(".js-img-container").each(function () {
      var $container = $(this),
        imgUrl = $container.find("img").prop("src");
      if (imgUrl) {
        $container
          .css("backgroundImage", "url(" + imgUrl + ")")
          .addClass("js-custom-object-fit");
      }
    });
  }
  function centerImg(element) {
    $("." + element).each(function () {
      var $container = $(this),
        imgUrl = $container.find("img").prop("src");
      if (imgUrl) {
        $container
          .css("backgroundImage", "url(" + imgUrl + ")")
          .addClass(element + "--ie");
      }
    });
  }

  $(".js-menubtn").click(function () {
    $(".js-header").toggleClass("is-open");
    $("body").toggleClass("disable-scroll");
    $(this).toggleClass("is-open");
  });
  $(".c-gnavi__close").click(function () {
    $(".js-header").removeClass("is-open");
    $("body").removeClass("disable-scroll");
    $(".js-menubtn").removeClass("is-open");
  });
  // $('.js-header__logo').css('opacity', 0);

  var scrollBar = false;

  var isMobile = false; //initiate as false
  // device detection
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  ) {
    isMobile = true;
  }

  if (isMobile) {
    scrollBar = true;
  } else scrollBar = false;

  $("#fullpage").fullpage({
    sectionSelector: ".vertical-scrolling",
    anchors: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
    controlArrows: false,
    menu: "#menu",
    scrollingSpeed: 1200,
    easingcss3: "cubic-bezier(.5,.03,0,.99)",
    scrollOverflow: false,
    scrollBar: scrollBar,
    autoScrolling: true,
    afterLoad: function (anchorLink, index) {
      $(this).find(".c-info").addClass("is-show");
      //using index
      if (index == 2) {
        $(".p-top video").hide();
      }
      if (index == 10) {
        $(".js-title1").addClass("is-show");
        setTimeout(function () {
          $(".js-p").addClass("is-show");
        }, 100);
      }
    },
    onLeave: function (index, nextIndex, direction) {
      $(this).find(".c-info").removeClass("is-show");
      if (index == 1 && direction == "down") {
        // $('.js-header__logo').css('opacity', 1);
      }
      if (index == 2 && direction == "up") {
        $(".p-top video").show();
        // $('.js-header__logo').css('opacity', 0);
      }
      if (index == 10 && direction == "up") {
        $(".js-p").removeClass("is-show");
        $(".js-title1").removeClass("is-show");
      }
    },
  });
  $(".js-scroll").click(function (e) {
    e.preventDefault();
    $.fn.fullpage.moveSectionDown();
  });

  $(".js-link").click(function () {
    $('.js-header').removeClass('is-open');
    $('.js-menubtn').removeClass('is-open');
    $("body").removeClass("disable-scroll");
  });

  $(".accordion-panel li > a").click(function () {
    $(".js-header").removeClass("is-open");
    $(".js-menubtn").removeClass("is-open");
    $("body").removeClass("disable-scroll");
  });

  var breakpointMobile = 813,
    isChanging = false,
    isFiltered = false,
    windowHeight = $(window).height(),
    windowWidth = $(window).width();
  $(".js-mainslide")
    .on("init reinit breakpoint", function (event, slick) {
      if (!isChanging) {
        isChanging = true;
        // The highest breakpoint is null
        if (
          slick.activeBreakpoint &&
          slick.activeBreakpoint <= breakpointMobile
        ) {
          if (!isFiltered && windowHeight > windowWidth) {
            slick.slickFilter(":not(.hide-on-tablet)");
            isFiltered = true;
          }
        } else {
          if (isFiltered) {
            slick.slickUnfilter();
            isFiltered = false;
          }
        }
        isChanging = false;
      }
    })
    .slick({
      slidesToShow: 1,
      dots: true,
      arrows: false,
      appendDots: $(".c-mainslide__control"),
      responsive: [
        {
          breakpoint: 813,
          settings: {
            dots: false,
          },
        },
      ],
    });

  $(window).on("orientationchange", function () {
    windowHeight = $(window).height();
    windowWidth = $(window).width();
    if (windowWidth > windowHeight) {
      $(".js-mainslide").slick("slickFilter", ":not(.hide-on-tablet)");
    } else {
      $(".js-mainslide").slick("slickUnfilter");
    }
    $(".js-mainslide").slick("resize");
  });

  $(".js-slide").slick({
    slidesToShow: 1,
    dots: true,
    arrows: false,
  });

  $(".js-card1__thumbnail").slick({
    slidesToShow: 1,
    dots: true,
    arrows: true,
  });
  $(".js-card1__thumbnail").click(function (event) {
    event.stopPropagation();
  });

  $(".js-menu__selector").click(function () {
    $(".js-menu__ul").toggleClass("is-show");
    $(this).toggleClass("is-open");
  });

  var elements_article = $(".js-article").children().children();
  elements_article.addClass("scroll-in");
  show_element(elements_article);

  $(".js-collection1").click(function () {
    $(".js-frame").fadeIn(300);
  });
  $(".js-link3").click(function () {
    $(".js-frame").fadeIn(300);
  });
  $(".js-frame__close").click(function () {
    $(".js-frame").fadeOut(300);
  });
  $(".js-modal__close").click(function () {
    $(".js-modal").fadeOut(300);
    $("body").removeClass("disable-scroll");
  });

  var products = $(".c-product");
  products.each(function (i, e) {
    var product = products.eq(i);
    var content = product.find(".c-modal__inner").html();
    product.click(function () {
      $(".js-modal__inner").empty();
      $(".js-modal__inner").html(content);
      $(".c-modal").fadeIn(300);
    });
  });

  var $menu2_li = $(".js-menu2__li");
  $menu2_li.each(function (i, e) {
    var element = $menu2_li.eq(i);
    var name = element.attr("href").substring(1);
    element.click(function (e) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $("#" + name).offset().top,
        },
        1000
      );
    });
  });

  var menu = $(".js-menu");
  menu.each(function (i, e) {
    var element = menu.eq(i);
    element.click(function () {
      var name = $(this).attr("href").substring(1);
      var text = $(this).text();
      menu.removeClass("is-active");
      $(this).addClass("is-active");
      $(".js-menu__ul").removeClass("is-show");
      $(".js-menu__text").html(text);
      items.removeClass("is-show");
      if (name == "all") {
        $(".js-news__text").html("ALL");
        // $(".js-items").children().fadeOut(300);  
        $(".c-items__top").fadeOut(300);
        setTimeout(function () {
          window.scrollTo(0, 0);
          $(".js-all").show();
          // $(".js-items").children().show();
          $(".c-items__item").show();
          $(".p-news__article").show();
        }, 500);
        setTimeout(function () {
          show_item(items);
        }, 1000);
      } else {
        $(".js-news__text").html(text);
	$(".js-items").children().fadeOut(300);
        setTimeout(function () {
          window.scrollTo(0, 0);
          $(".js-" + name).show();
        }, 500);
        setTimeout(function () {
          show_item(items);
        }, 1000);
      }
    });
  });

  var items = $(".js-items").children().children();
  var fade_items = $(".u-fade");
  var line_items = $(".u-line");
  var parallax_items = $(".u-parallax");

  show_item(items);
  show_item_fade(fade_items);
  show_item_line(line_items);
  parallax(parallax_items);

  function colectionInit() {
    var top = $(window).scrollTop();
    var $collection1 = $(".js-collection1");
    var $collection2 = $(".js-collection2");
    var $smalllogo = $(".js-smalllogo");
    var $title2 = $(".js-title2");
    var $p = $(".js-p");
    var $btn1 = $(".js-btn1");
    var $menu2 = $(".js-menu2");
    if (top < 300) {
      $collection1.find(".c-info").addClass("is-show");
    }
    if (top > $collection2.offset().top - 300) {
      $collection1.find(".c-info").removeClass("is-show");
      $smalllogo.addClass("is-show");
      setTimeout(function () {
        $title2.addClass("is-show");
      }, 100);
      setTimeout(function () {
        $p.addClass("is-show");
      }, 200);
      setTimeout(function () {
        $btn1.addClass("is-show");
      }, 300);
    } else {
      $smalllogo.removeClass("is-show");
      $p.removeClass("is-show");
      $title2.removeClass("is-show");
      $btn1.removeClass("is-show");
    }
    if (top > $collection2.offset().top + $collection2.height()) {
      $smalllogo.removeClass("is-show");
      $p.removeClass("is-show");
      $title2.removeClass("is-show");
      $btn1.removeClass("is-show");
    }

    var startpoint = $("#home").offset().top;
    var endpoint = $("#pets").offset().top + $("#pets").height();
    if ($(window).width() < 414) {
      if (top > startpoint - 70) {
        $menu2.addClass("is-start");
        if (top > endpoint - 370) {
          $menu2.removeClass("is-start");
          $menu2.addClass("is-stop");
        } else {
          $menu2.removeClass("is-stop");
          $menu2.addClass("is-start");
        }
      } else {
        $menu2.removeClass("is-start");
      }
    } else if ($(window).width() < 812) {
      if (top > startpoint - 100) {
        $menu2.addClass("is-start");
        if (top > endpoint - 420) {
          $menu2.removeClass("is-start");
          $menu2.addClass("is-stop");
        } else {
          $menu2.removeClass("is-stop");
          $menu2.addClass("is-start");
        }
      } else {
        $menu2.removeClass("is-start");
      }
    } else {
      if (top > startpoint - 130) {
        $menu2.addClass("is-start");
        if (top > endpoint - 535) {
          $menu2.removeClass("is-start");
          $menu2.addClass("is-stop");
        } else {
          $menu2.removeClass("is-stop");
          $menu2.addClass("is-start");
        }
      } else {
        $menu2.removeClass("is-start");
      }
    }
    $menu2_li.each(function (i, e) {
      var element = $menu2_li.eq(i);
      var name = element.attr("href").substring(1);
      if (top > $("#" + name).offset().top - 100) {
        $menu2_li.stop().removeClass("is-active");
        element.stop().addClass("is-active");
      }
    });
  }

  if ($("main.p-collection").length > 0) {
    colectionInit();
  }
  if ($("main.p-phase2").length > 0) {
    var top = $(window).scrollTop();
    if (top > 0) {
      $(".js-info2").removeClass("u-fade--show");
      $(".js-scroll2").removeClass("u-fade--show");
    } else {
      $(".js-info2").addClass("u-fade--show");
      $(".js-scroll2").addClass("u-fade--show");
    }
    if (top > $(".js-phase23").offset().top) {
      $(".js-header__logo2").removeClass("c-header__logo--white");
      $(".js-menubtn").removeClass("c-menubtn--white");
    } else {
      $(".js-header__logo2").addClass("c-header__logo--white");
      // $(".js-menubtn").addClass("c-menubtn--white");
    }
  }
  $(window).on("scroll", function () {
    show_item(items);
    show_item_fade(fade_items);
    show_item_line(line_items);
    parallax(parallax_items);

    show_element(elements_article);

    if ($("main.p-items").length > 0) {
      checkOffset();
    }
    if ($("main.p-collection").length > 0) {
      colectionInit();
    }
    if ($("main.p-phase2").length > 0) {
      var top = $(window).scrollTop();
      if (top > 0) {
        $(".js-info2").removeClass("u-fade--show");
        $(".js-scroll2").removeClass("u-fade--show");
      } else {
        $(".js-info2").addClass("u-fade--show");
        $(".js-scroll2").addClass("u-fade--show");
      }
      if (top > $(".js-phase23").offset().top) {
        $(".js-header__logo2").removeClass("c-header__logo--white");
        $(".js-menubtn").removeClass("c-menubtn--white");
        $(".js-insta").removeClass("c-header--insta");
      } else {
        $(".js-header__logo2").addClass("c-header__logo--white");
        // $(".js-menubtn").addClass("c-menubtn--white");
        $(".js-insta").addClass("c-header--insta");
      }
    }
  });

  var looks = $(".js-look");
  looks.each(function (i, e) {
    var look = looks.eq(i);
    var id = look.attr("data-id");
    var content = $("#" + id).html();
    look.click(function () {
      $(".js-modal__inner").empty();
      $(".js-modal__inner").html(content);
      $(".c-modal").fadeIn(300);
      $("body").addClass("disable-scroll");
      setTimeout(function () {
        // var slide_width = $('.c-modal__img img').width();
        // $('.js-modal__slide').width(slide_width);
        $(".js-modal__slide").on(
          "init reInit afterChange",
          function (event, slick, currentSlide, nextSlide) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (currentSlide ? currentSlide : 0) + 1;
            $(".js-modal__status").text(i + " / " + slick.slideCount);
          }
        );
        $(".js-modal__slide").slick({
          dots: false,
          arrows: true,
          fade: true,
        });
      }, 10);
    });
  });

  $(".js-mainslide").outerHeight($(window).height());
  $(".js-slide").outerHeight($(window).height());
  $(".js-phase21").outerHeight($(window).height());
  $(".js-top1__img").outerHeight($(window).height());
  $(".js-top5__img").outerHeight($(window).height());
  $(".js-top6__img").outerHeight($(window).height());
  $(".js-top7__img").outerHeight($(window).height());
  $(".js-listimg").outerHeight($(window).height());

  $(window).on("resize", function () {
    $(".js-phase21").outerHeight($(window).height());
    $(".js-listimg").outerHeight($(window).height());
    $(".js-top7__img").outerHeight($(window).height());
    $(".js-top1__img").outerHeight($(window).height());
  });

  // 11/4
  const countThumbnail = $(".js-thumbnail__slide").length || 0;

  if (countThumbnail) {
    for (let i = 0; i < countThumbnail; i++) {
      $(".js-thumbnail__slide")
        .eq(i)
        .slick({
          appendArrows: $(".c-card__controller").eq(i),
          arrows: true,
          slidesToShow: 1,
        });
    }
  }
});

function show_item(items) {
  var screen = $(window).scrollTop() + $(window).height();
  items.each(function (i, e) {
    var item = items.eq(i);
    if (screen > item.offset().top + 50) {
      item.addClass("is-show");
    }
  });
}

function show_item_fade(items) {
  var screen = $(window).scrollTop() + $(window).height();
  items.each(function (i, e) {
    var item = items.eq(i);
    if (screen > item.offset().top + 100) {
      item.addClass("u-fade--show");
    }
  });
}

function show_item_line(items) {
  var screen = $(window).scrollTop() + $(window).height();
  items.each(function (i, e) {
    var item = items.eq(i);
    if (screen > item.offset().top + 100) {
      item.addClass("u-line--show");
    }
  });
}

function parallax(items) {
  var screen = $(window).scrollTop() + $(window).height();
  items.each(function (i, e) {
    var item = items.eq(i);
    if (screen > item.offset().top + 100) {
      item.addClass("u-parallax--show");
    } else {
      item.removeClass("u-parallax--show");
    }
  });
}

function checkOffset() {
  var target = $(".c-menu__inner");
  if (
    target.offset().top + target.height() >=
    $(".c-footer").offset().top - 185
  )
    target.addClass("is-stop");
  if (
    $(document).scrollTop() + window.innerHeight <
    $(".c-footer").offset().top + 160
  )
    target.removeClass("is-stop"); // restore when you scroll up
}

function show_element(element) {
  var height = $(window).height();
  var screen = $(window).scrollTop() + height;
  element.each(function (i, e) {
    var item = element.eq(i);
    if (screen > item.offset().top + 100) {
      item.addClass("is-show");
    }
  });
}

/* -------------------------------- ACCORDION ------------------------------- */
let accordion = document.getElementsByClassName("js-accordion");
let panel = document.getElementsByClassName("accordion-panel");

for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    this.classList.toggle("active");
    if (panel[i].style.maxHeight) {
      panel[i].style.maxHeight = null;
      // panel[i].style.minHeight = null;
      // panel[i].style.height = null;
    } else {
      panel[i].style.maxHeight = panel[i].scrollHeight + "px";
      // panel[i].style.height = "auto";
    }
  });
}

/* --------------------------------- CONCEPT -------------------------------- */
// const concept = document.querySelector('#menu-concept');
// concept.addEventListener("click", function () {
//   $('.js-header').removeClass('is-open');
//   $('.js-menubtn').removeClass('is-open');
//   $("body").removeClass("disable-scroll");
//   setTimeout(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, 300);
// });