
    <?php 
    include('../components/header.php') 
    ?>

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WW6CW7X" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <!--▼ Content area ▼-->
    <main class="p-news">
        <div class="c-menu">
            <div class="c-menu__inner">
                <div class="c-menu__top">
                    <div class="c-menu__title">
                        <h2>NEWS</h2>
                    </div>
                    <button class="c-menu__selector hide-on-pc js-menu__selector">
                        NEWS / <span class="c-menu__text js-news__text">All</span>
                    </button>
                </div>
                <ul class="js-menu__ul">
                    <li><a href="#all" class="js-menu is-active">All</a></li>
                    <li><a href="#category1" class="js-menu" id="category1">Info</a></li>
                    <li><a href="#category2" class="js-menu" id="category2">Popup Shop</a></li>
                </ul>
            </div>
        </div>

        <div class="p-news__right js-items">
            <!-- title -->
            <div class="p-news__tle js-category1">
                <h2>Info</h2>
            </div>
            <div class="p-news__tle js-category2">
                <h2>Popup Shop</h2>
            </div>
            <!-- end title -->

            <!-- list category -->
            <a class="p-news__article category2 js-category2" href="/cam/closet/news/20221206_2.php">
                <div class="p-artical__item">
                    <div class="p-artical__content">
                        <p class="p-artical__date">
                            2022.12.06 <span>|</span> Popup Shop
                        </p>

                        <h2 class="p-artical__title">
                            第7弾ポップアップ詳細情報
                        </h2>
                    </div>

                    <div class="p-artical__arrow">
                        <img src="/cam/closet/asset/img/common/arrow-right.svg" alt="arrow right">
                    </div>
                </div>
            </a>
            <a class="p-news__article category1 js-category1" href="/cam/closet/news/20221206.php">
                <div class="p-artical__item">
                    <div class="p-artical__content">
                        <p class="p-artical__date">
                            2022.12.06 <span>|</span> Info
                        </p>

                        <h2 class="p-artical__title">
                            祝5周年！第7弾新作アパレルラインが登場！
                        </h2>
                    </div>

                    <div class="p-artical__arrow">
                        <img src="/cam/closet/asset/img/common/arrow-right.svg" alt="arrow right">
                    </div>
                </div>
            </a>
        </div>
    </main>
    <!--▼ Footer ▼-->
    <?php include('../components/footer.php') ?>
    <!--▲ Footer ▲-->
    <!--▲ ontent are ▲-->
    <!--▼ Footer ▼-->
    <!--▲ Footer ▲-->
    <!--[if lt IE 9]>
	<script src="https://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<script src="https://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
	<![endif]-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="/cam/closet/asset/js/jquery.fullpage.min.js"></script>
    <script type="text/javascript" src="/cam/closet/asset/js/scrolloverflow.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    <!-- Go to www.addthis.com/dashboard to customize your tools -->
    <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5a370cb7f0cda35b"></script>
    <script src="/cam/closet/asset/js/main.js?ver=1.0"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/simplePagination.js/1.6/jquery.simplePagination.js"></script> -->
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-12742550-2"></script>
    <script>
    history.scrollRestoration = "manual";

    $("document").ready(function() {
        // trigger
        setTimeout(function() {
            const urlItem = window.location.hash.split('/');
            $(urlItem[0]).trigger("click");
        }, 0);
        $(window).on('hashchange', function(e) {
            const urlChange = window.location.hash.split('/');
            $(urlChange[0]).trigger("click");
        });

        // paginatinon
        // $(window).on("resize", function(e) {
        //     checkScreenSize();
        // });
        // checkScreenSize();

        // function checkScreenSize() {
        //     const newWindowWidth = $(window).width();
        //     let items = $(".p-news__article");
        //     const perPage = 10;

        //     if (newWindowWidth < 820) {
        //         pagination(items, perPage);

        //         $(".js-menu__ul").delegate('a', 'click', function(e) {
        //             const menu = this.href.slice(this.href.indexOf("#") + 1);
        //             items = $(".js-" + menu);
        //             pagination(items, perPage);
        //         })
        //     }
        // }

        // function pagination(items, perPage) {
        //     items.slice(perPage).hide();
        //     $('#pagination-container').pagination({
        //         items: items.length,
        //         itemsOnPage: perPage,
        //         prevText: "&laquo;",
        //         nextText: "&raquo;",
        //         onPageClick: function(pageNumber) {
        //             const showFrom = perPage * (pageNumber - 1);
        //             const showTo = showFrom + perPage;
        //             items.hide().slice(showFrom, showTo).show();
        //         }
        //     });
        // }

        //
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'UA-12742550-2');
    })
    </script>
</body>

</html>