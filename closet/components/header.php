<?php
    $url = $_SERVER['REQUEST_URI'];
    $base = basename($_SERVER['REQUEST_URI']);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Google Tag Manager -->
    <script>
    (function(w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-WW6CW7X');
    </script>
    <!-- End Google Tag Manager -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php
		$titlePage = 'Perfume Closet';
        if($url === '/cam/closet/collection/') $titlePage = 'Collection ｜ ' . $titlePage;
		if(strstr($url,'collection/3')==true) $titlePage = '#3 ｜ ' . $titlePage;
		if(strstr($url,'collection/4-phase1')==true) $titlePage = '#4 - Phase1 ｜ ' . $titlePage;
		if(strstr($url,'collection/4-phase2')==true) $titlePage = '#4 - Phase2 ｜ ' . $titlePage;
		if(strstr($url,'collection/5-phase1')==true) $titlePage = '#5 - Phase1 ｜ ' . $titlePage;
		if(strstr($url,'collection/5-phase2')==true) $titlePage = '#5 - Phase2 ｜ ' . $titlePage;
        if(strstr($url,'collection/6')==true) $titlePage = '#6 ｜ ' . $titlePage;
        if(strstr($url,'collection/7')==true) $titlePage = '#7 ｜ ' . $titlePage;
        if(strstr($url,'collection/8')==true) $titlePage = '#8 ｜ ' . $titlePage;
        if(strstr($url,'collection/9')==true) $titlePage = '#9 ｜ ' . $titlePage;
        if(strstr($url,'collection/10')==true) $titlePage = '#10 ｜ ' . $titlePage;
		if(strstr($url,'collection/cosme')==true) $titlePage = 'Perfume Closet Cosme ｜ ' . $titlePage;
		if(strstr($url,'collection/jewelry')==true) $titlePage = 'Watch / Jewelry ｜ ' . $titlePage;
        if(strstr($url,'collection/p-dot-mask')==true) $titlePage = 'P-dot Mask ｜ ' . $titlePage;
		if(strstr($url,'collection/perfume-of-perfume')==true) $titlePage = 'PERFUME OF PERFUME ｜ ' . $titlePage;
		if(strstr($url,'collection/sneakers-dance-heel')==true) $titlePage = 'SNEAKERS / DANCE HEEL ｜ ' . $titlePage;
        if(strstr($url,'item')==true) $titlePage = 'ITEMS ｜ ' . $titlePage;
        if(strstr($url,'news')==true) $titlePage = 'News ｜ ' . $titlePage;
        if(isset($title)){
			$titlePage = strip_tags($title) . $titlePage;
		}
	?>
    <title>
        <?php echo $titlePage ?>

    </title>

    <meta name="keywords"
        content="Perfume,パフューム,ぱふゅーむ,PerfumeCloset,パフュームクローゼット,あ～ちゃん,かしゆか,のっち,a-chan,KASHIYUKA,NOCCHi" />
    <meta name="description"
        content="Perfume Fashion Project「Perfume Closet」オフィシャルサイト ｜ Perfumeの楽曲や世界観を元にしたアイテムで皆さんと繋がりたい、日々を一緒に過ごしたい。その想いからスタートしたプロジェクト。" />
    <meta name="Copyright" content="© AMUSE Inc. All Rights Reserved.">
    <meta name="robots" content="index, follow" />
    <meta name="pinterest" content="nopin" />
    <meta name="format-detection" content="telephone=no" />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:site_name" content="Perfume Closet" />
    <meta name="apple-mobile-web-app-title" content="Perfume Closet" />
    <link rel="apple-touch-icon-precomposed" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="shortcut icon" href="/cam/closet/assets/img/meta/favicon.ico" type="image/vnd.microsoft.icon" />
    <link rel="icon" href="/cam/closet/assets/img/meta/favicon.ico" type="image/vnd.microsoft.icon" />
    <link rel="apple-touch-icon" href="/cam/closet/assets/img/meta/apple-touch-icon.png" />
    <link rel="apple-touch-icon" sizes="57x57" href="/cam/closet/assets/img/meta/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/cam/closet/assets/img/meta/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/cam/closet/assets/img/meta/apple-touch-icon-76x76.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/cam/closet/assets/img/meta/apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="/cam/closet/assets/img/meta/apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/cam/closet/assets/img/meta/apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/cam/closet/assets/img/meta/apple-touch-icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/cam/closet/assets/img/meta/apple-touch-icon-180x180.png" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="<?php echo $titlePage ?>" />
    <meta property="og:description"
        content="Perfume Fashion Project「Perfume Closet」オフィシャルサイト ｜ Perfumeの楽曲や世界観を元にしたアイテムで皆さんと繋がりたい、日々を一緒に過ごしたい。その想いからスタートしたプロジェクト。" />
    <meta property="og:url" content="<?php echo 'https://www.perfume-web.jp' . $url ?>" />
    <link rel="canonical" href="<?php echo 'https://www.perfume-web.jp' . $url ?>" />
    <meta property="og:image" content="https://www.perfume-web.jp/cam/closet/assets/img/meta/ogp.png" />
    <link rel="image_src" href="https://www.perfume-web.jp/cam/closet/assets/img/meta/ogp.png" />

    <?php switch($url): 
    case '/cam/closet/collection/' : ?>
    <link href="https://fonts.googleapis.com/css?family=EB+Garamond:400,500" rel="stylesheet" />
    <link rel="stylesheet" href="/cam/closet/asset/css/style.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/collection.css">
    <?php break; ?>

    <?php case '/cam/closet/collection/3/' : ?>
    <link href="https://fonts.googleapis.com/css?family=EB+Garamond:400,500" rel="stylesheet" />
    <link rel="stylesheet" href="/cam/closet/assets/css/style.css">
    <script src="/cam/closet/assets/js/modernizr.custom.82834.js" charset="UTF-8"></script>
    <script src="/cam/closet/assets/js/libs.js" charset="UTF-8"></script>
    <link rel="stylesheet" href="/cam/closet/asset/css/style2.css">
    <?php break; ?>

    <?php case '/cam/closet/collection/4-phase1/' : ?>
    <link rel="stylesheet" href="/cam/closet/asset/css/style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css">
    <link href="/cam/closet/asset/css/jquery.fullpage.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <?php break; ?>

    <?php case '/cam/closet/collection/4-phase2/' : ?>
    <link rel="stylesheet" href="/cam/closet/asset/css/style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css">
    <link href="/cam/closet/asset/css/jquery.fullpage.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <?php break; ?>

    <?php case '/cam/closet/collection/5-phase1/' : ?>
    <link rel="stylesheet" href="/cam/closet/asset/css/mask.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/05_p1.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css">
    <?php break; ?>

    <?php case '/cam/closet/collection/5-phase2/' : ?>
    <link rel="stylesheet" href="/cam/closet/asset/css/style.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/mask.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/05_p2.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <link rel="stylesheet" href="/cam/closet/asset/css/jquery.fullpage.min.css">
    <?php break; ?>

    <?php case '/cam/closet/collection/6/' : ?>
    <link rel="stylesheet" href="/cam/closet/asset/css/style.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/mask.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/05_p2.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/jquery.fullpage.min.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <?php break; ?>

    <?php case '/cam/closet/collection/7/' : ?>
    <link rel="stylesheet" href="/cam/closet/asset/css/style.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/phase7.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/jquery.fullpage.min.css">
    <?php break; ?>

    <?php case '/cam/closet/collection/8/' : ?>
    <link rel="stylesheet" href="/cam/closet/asset/css/style.css?v=1">
    <link rel="stylesheet" href="/cam/closet/asset/css/phase8.css?v=1">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/jquery.fullpage.min.css">
    <?php break; ?>

    <?php case '/cam/closet/collection/9/' : ?>
    <link rel="stylesheet" href="/cam/closet/asset/css/style.css?v=1">
    <link rel="stylesheet" href="/cam/closet/asset/css/phase9.css?v=1">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/jquery.fullpage.min.css">
    <?php break; ?>

    <?php case '/cam/closet/collection/10/' : ?>
    <link rel="stylesheet" href="/cam/closet/asset/css/style.css?v=1">
    <link rel="stylesheet" href="/cam/closet/asset/css/phase10.css?v=1">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/jquery.fullpage.min.css">
    <?php break; ?>

    <?php case '/cam/closet/collection/cosme/' : ?>
    <link rel="stylesheet" href="/cam/closet/asset/css/mask.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/palette.css">
    <link rel="stylesheet" href="/cam/closet/assets/css/owl.carousel.min.css">
    <link rel="stylesheet" href="/cam/closet/assets/css/owl.theme.default.min.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/style4.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/danceheel.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css">
    <?php break; ?>

    <?php case '/cam/closet/collection/jewelry/' : ?>
    <link href="https://fonts.googleapis.com/css?family=EB+Garamond:400,500" rel="stylesheet" />
    <link rel="stylesheet" href="/cam/closet/assets/css/owl.carousel.min.css">
    <link rel="stylesheet" href="/cam/closet/assets/css/owl.theme.default.min.css">
    <link rel="stylesheet" href="/cam/closet/assets/css/style.css" />
    <link rel="stylesheet" href="/cam/closet/asset/css/style4.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/mask.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/style.css" />
    <link rel="stylesheet" href="/cam/closet/asset/css/jewelry.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/danceheel.css">
    <?php break; ?>

    <?php case '/cam/closet/collection/p-dot-mask/' : ?>
    <link rel="stylesheet" href="/cam/closet/asset/css/mask.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css">
    <?php break; ?>

    <?php case '/cam/closet/collection/perfume-of-perfume/' : ?>
    <link href="https://fonts.googleapis.com/css?family=EB+Garamond:400,500" rel="stylesheet" />
    <link rel="stylesheet" href="/cam/closet/asset/css/style4.css">
    <link rel="stylesheet" href="/cam/closet/assets/css/style.css" />
    <?php break; ?>

    <?php case'/cam/closet/collection/sneakers-dance-heel/' : ?>
    <link href="https://fonts.googleapis.com/css?family=EB+Garamond:400,500" rel="stylesheet" />
    <link rel="stylesheet" href="/cam/closet/assets/css/style.css" />
    <link rel="stylesheet" href="/cam/closet/asset/css/mask.css">
    <link rel="stylesheet" href="/cam/closet/assets/css/owl.carousel.min.css">
    <link rel="stylesheet" href="/cam/closet/assets/css/owl.theme.default.min.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/style4.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/danceheel.css">
    <?php break; ?>

    <?php case '/cam/closet/item/' : ?>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <link rel="stylesheet" href="/cam/closet/asset/css/style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/jquery.fullpage.min.css">
    <?php break; ?>

    <?php case strstr($url,'news')==true : ?>
    <link rel="stylesheet" href="/cam/closet/asset/css/style.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/news.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/jquery.fullpage.min.css">
    <?php break; ?>

    <?php break; default : ?>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css" />
    <link rel="stylesheet" href="/cam/closet/asset/css/style.css">
    <link rel="stylesheet" href="/cam/closet/asset/css/top.css?ver=1.0">
    <link rel="stylesheet" href="/cam/closet/asset/css/jquery.fullpage.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css">
    <?php endswitch; ?>

    <link rel="stylesheet" href="https://use.typekit.net/znl0vnv.css">
</head>

<?php if (
    $url == '/cam/closet/collection/3/'
) : ?>

<body data-ismodal="false" class="not-scroll">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WW6CW7X" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <script src="/cam/closet/assets/js/script.js" charset="UTF-8"></script>
    <div class="js-cssMediaType"></div>
    <div class="l-viewport js-viewport">
        <div class="l-loader__protect js-loader__protect active"></div>
        <div class="l-loader js-loader">
            <div class="l-loader__bg js-loader__bg"></div>
            <div class="l-loader__logo js-loader__logo"></div>
        </div>

<?php elseif (
    strstr($url,'collection/perfume-of-perfume') == true ||
    strstr($url,'collection/jewelry') == true
    // strstr($url,'collection/sneakers-dance-heel') == true
) : ?>
    <body class="fadeout">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WW6CW7X" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <div class="l-viewport" style="position: relative;">

<?php else : ?>
    <body class="fadeout">
<?php endif; ?>

    <header class="c-header js-header">
        <div class="c-header__logo" data-header-change>
            <a href="/cam/closet/">
                <img src="/cam/closet/asset/img/common/logo.png" alt="Logo">
            </a>
        </div>
        <div class="c-header_wrapright">
            <a href="https://www.instagram.com/perfumeclosetofficial/" target="_blank" class="c-header_insta" data-header-change>
                <!-- <span>Official Instagram Open !</span> -->
            </a>
            <button class="c-menubtn js-menubtn" data-header-change>
                <span></span>
                <span></span>
            </button>
        </div>
        <nav class="c-gnavi">
            <div class="c-gnavi__close">
                <img src="/cam/closet/asset/img/top/close.svg" alt="close">
            </div>
            <div class="c-gnavi__inner">
                <ul>
                    <li class="js-li"><a href="/cam/closet/" class="js-link"><span>TOP</span></a></li>
                    <li class="js-li js-accordion">
                        <span>COLLECTION</span>

                        <ul class="accordion-panel">
                            <li><a href="/cam/closet/collection/">All</a></li>
                            <li><a href="/cam/closet/collection/10/">#10</a></li>
                            <li><a href="/cam/closet/collection/9/">#9</a></li>
                            <li><a href="/cam/closet/collection/8/">#8</a></li>
                            <li><a href="/cam/closet/collection/7/">#7</a></li>
                            <li><a href="/cam/closet/collection/6/">#6</a></li>
                            <li><a href="/cam/closet/collection/5-phase2/">#5 - Phase2</a></li>
                            <li><a href="/cam/closet/collection/5-phase1/">#5 - Phase1</a></li>
                            <li><a href="/cam/closet/collection/4-phase2/">#4 - Phase2</a></li>
                            <li><a href="/cam/closet/collection/4-phase1/">#4 - Phase1</a></li>
                            <li><a href="/cam/closet/collection/3/">#3</a></li>
                            <li><a href="/cam/closet/collection/1/#s2/">#2</a></li>
                            <li><a href="/cam/closet/collection/1/#s1/">#1</a></li>
                            <li>-</li>
                            <li><a href="/cam/closet/collection/sneakers-dance-heel/">Sneakers / Dance Heel</a>
                            </li>
                            <li><a href="/cam/closet/collection/jewelry/">Watch / Jewelry</a></li>
                            <li><a href="/cam/closet/collection/cosme/">Cosme</a></li>
                            <li><a href="/cam/closet/collection/p-dot-mask/">P-dot Mask</a></li>
                          <!-- <li><a href="/cam/closet/collection/perfume-of-perfume/">Perfume of Perfume</a></li> -->
                        </ul>
                    </li>
                    <li class="js-li js-accordion">
                        <span>ITEM</span>

                        <ul class="accordion-panel">
                            <li><a href="/cam/closet/item/#new">New - #10</a></li>
                            <li style="font-weight: normal;">-</li>
                            <li><a href="/cam/closet/item/#apparel">Apparel</a></li>
                            <li><a href="/cam/closet/item/#pdh">Shoes</a></li>
                            <li><a href="/cam/closet/item/#pjw">Watch / Jewelry</a></li>
                            <li><a href="/cam/closet/item/#pcp">Cosme</a></li>
                            <li><a href="/cam/closet/item/#goods">Goods</a></li>
                            <li><a href="/cam/closet/item/">All</a></li>
                        </ul>
                    </li>
                    <li class="js-li js-accordion">
                        <span>NEWS</span>

                        <ul class="accordion-panel">
                            <li><a href="/cam/closet/news/">All</a></li>
                            <li><a href="/cam/closet/news/#category1">Info</a></li>
                            <li><a href="/cam/closet/news/#category2">Popup Shop</a></li>
                        </ul>
                    </li>
                    <?php if (
                       $base == "closet"
                    ) : ?>
                        <li class="js-li js-concept">
                            <a href="#concept">
                                <span>CONCEPT</span>
                            </a>
                        </li>
                    <?php else : ?>
                        <!-- <li class="js-li" id="menu-concept">
                            <span>CONCEPT</span>
                        </li> -->
                        <li class="js-li js-concept">
                            <a href="/cam/closet/#concept">
                                <span>CONCEPT</span>
                            </a>
                        </li>
                    <?php endif; ?>
                    <li class="js-li">
                        <a href="https://www.instagram.com/perfumeclosetofficial/"
                            target="_blank" class="js-link"><span>INSTAGRAM</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>