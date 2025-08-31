var perfume = {};
perfume.video01 = null;
perfume.video02 = null;
perfume.id01 = "HLeBxpe00jA";
perfume.slideTimer = null;
perfume.isLoadedVideo = false;

$(document).ready(function(){

	$(window).resize(function(){
		perfume.updateResize();
	})
	perfume.updateResize();
	checkPage();

	function checkPage(){
		if(perfume.isLoadedVideo){

			setTimeout(function(){
				$('#loading .txt').fadeOut('200');
				$('#loading .logo').addClass('animate')
			},200)

			setTimeout(function(){

				$("#container").show();
				$('#loading .logo').addClass('hide')
				$('#loading').addClass('hide')

				setTimeout(function(){
					if(location.hash){
						// アンカーが#osakaかどうかを判断する
						var anchorh = $(location.hash).offset().top;
						$("html, body").scrollTop(anchorh)
						// $("html, body").animate({scrollTop:anchorh},500);
					}
				},100)


				setTimeout(function(){
					$('#loading').hide();
					$("body").removeClass("loading");

					$("#modal-movie").css("opacity",0.0);
					$("#modal-movie").show();
					setTimeout(function(){
					  $("#modal-movie").css("opacity",1.0)
					},100)

					var ua = navigator.userAgent.toLowerCase();
					var ver = navigator.appVersion.toLowerCase();
					var isSafari = (ua.indexOf('safari') > -1) && (ua.indexOf('chrome') == -1);
					if(!isSafari && !perfume.isSp){
						perfume.video01.unMute();
					}
					perfume.video01.playVideo();

				},200)
			},200)

		}else{
			setTimeout(checkPage,200);
		}
	}
});

perfume.shareURL = function(provider,shareUrl,sharetext,hash){

	if(provider == "twitter"){
		var url = "https://twitter.com/intent/tweet"
		url += "?text=" + encodeURIComponent(sharetext);
		url += "&url=" + encodeURIComponent(shareUrl);
		url += "&hashtags=" + encodeURIComponent(hash);
	}else if(provider == "facebook"){
		var url = "https://www.facebook.com/sharer/sharer.php"
		url += "?u=" + encodeURIComponent(shareUrl);
	}else if(provider == "line"){
		var url = "https://line.me/R/msg/text/?"
		url += encodeURIComponent(shareUrl)
		url += " " + encodeURIComponent(sharetext);
	}
	window.open(url);
}


perfume.updateResize = function(){
	var old = perfume.isSp;
	var current = false;
	if(window.matchMedia){
		if (window.matchMedia('(max-width: 1023px)').matches) {
			current = true;
		}else{
			current = false;
		}
	}else{
		current = false;
	}

	var ww = (window.innerWidth || document.documentElement.clientWidth || 0);
	var wh = (window.innerHeight || document.documentElement.clientHeight || 0);

	if(old==null || old != current){
		perfume.isSp = current;
		perfume.init();
	}

	if(!perfume.isSp){

		$("#key").width(ww);
		$("#key").height(wh);


		var tw = $(window).width();
		var th = $(window).height();
		if (tw > 1280) {
			tw = 1230
		}
		if (th > 1280) {
			th = 1230
		}

		var h = th - 100;
		var w = tw


		var scw = w / 16;
		var sch = h / 9;
		var sc =  (scw < sch) ? scw : sch;

		var sw = 16 * sc;
		var sh = (9 * sc);

		$('#modal-movie .modal-scroll').css("width", sw + 'px');
		$('#modal-movie .modal-scroll').css("height", sh + 'px');

		// $('#key .kv').css("transform","scale("+sc2+","+sc2+")");
		// $('#key .kv').css("margin-right", diff + 'px');

		// $('#key .videocontainer').css("width", sw + 'px');
		// $('#key .videocontainer').css("height", sh + 'px');


		// $('#key .videocontainer').css("width", sw + 'px');
		// $('#key .videocontainer').css("height", sh + 'px');
		// $('#key .videocontainer').css("top",(h / 2 - sh / 2 )+'px');
		// $('#key .videocontainer').css("left",(w / 2 - sw / 2)+'px');

		$("#s1 .movie").width(ww);
		$("#s1 .movie").height(Math.floor(ww / 16 * 9));

		$("#s1 .springoflife").height(
			Math.floor((2521 / 2560) * ww)
		);
		$("#s1 .laserbeam").height(
			Math.floor((4837 / 2560) * ww)
		);
		$("#s1 .flash").height(
			Math.floor((4000 / 2560) * ww)
		);
		$("#s1 .tokyogirl").height(
			Math.floor((1519 / 2560) * ww)
		);
		$("#s1 .another").height(
			Math.floor((1107 / 2560) * ww)
		);

		$("#s1 .slides").height(
			Math.floor((ww * 0.65))
		);

		var nm = (ww - $("#modal-item .info").width()) * -0.5
		$("#modal-item .images .images-inner").css("margin-left", nm + "px");

		var imgw = ($("#modal-item .info").width() - nm) - 390;
		var imgh = imgw / 3 * 2;
		var mgh = (wh - imgh) * 0.5;
		$("#modal-item .info .info-inner").css("bottom", mgh +"px");

	}else{

		$("#s1 .springoflife").height(
			Math.floor((1506 / 750) * ww)
		);
		$("#s1 .laserbeam").height(
			Math.floor((2162 / 750) * ww)
		);
		$("#s1 .flash").height(
			Math.floor((1586 / 750) * ww)
		);
		$("#s1 .tokyogirl").height(
			Math.floor((613 / 750) * ww)
		);
		$("#s1 .another").height(
			Math.floor((495 / 750) * ww)
		);

		$("#s1 .slides").height(
			Math.floor((ww * 0.65))
		);

		$("#modal-item .images .images-inner").css("margin-left","0px");
	}

}

perfume.init =function(){

	//commonn init

	var ww = (window.innerWidth || document.documentElement.clientWidth || 0);
	var wh = (window.innerHeight || document.documentElement.clientHeight || 0);

	if(perfume.isSp){

		$("#key").width(ww);
		$("#key").height(wh);


		$("#key .info").css("top",wh - $("#key .info").height());


		$("#loading").width(ww);
		$("#loading").height(wh);

		var h = $("#key").height();
		var w = $("#key").width();

		var scw = w / 16;
		var sch = h / 9;
		var sc =  (scw > sch) ? scw : sch;

		var sw = 16 * sc;
		var sh = (9 * sc);

		$('#key .videocontainer').css("width", sw + 'px');
		$('#key .videocontainer').css("height", sh + 'px');
		$('#key .videocontainer').css("top",(h / 2 - sh / 2 )+'px');
		$('#key .videocontainer').css("left",(w / 2 - sw / 2)+'px');

	}

	$("a.cut2").each(function(){
		// var l = $(this).find("img").length;
		// var $that = $(this);
		// function updateSlide(){
		// 	var d = parseInt($that.attr("data-delay"));
		// 	var idx = parseInt($that.attr("data-current"));
		// 	idx++;
		// 	if(idx > $that.find("img").length - 1){
		// 		idx = 0;
		// 	}
		// 	$that.find("img").removeClass('active');
		// 	$that.find("img:eq("+idx+")").addClass('active');
		// 	$that.attr("data-current",idx)
		// 	setTimeout(updateSlide,d);
		// }

		// if(l > 1){
		// 	$that.attr("data-delay",(Math.floor(Math.random() * 5) + 5) * 1000)
		// 	$that.attr("data-current",0)
		// 	var d = parseInt($that.attr("data-delay"));
		// 	setTimeout(updateSlide,d);
		// }

		// var trans = $(this).height() + 5;
		// if($(this).attr("direction") == "m"){
		// 	trans = ($(this).height() + 5) * -1
		// }

		// $(this).find("img").css("transform","translate(0px,"+trans+"px)");
		$(this).find("img:first-child").addClass('active');
		$(this).attr("data-dest",0);
		$(this).removeClass('show');

	})

	$("a.cut").each(function(){
		var l = $(this).find("img").length;
		var $that = $(this);
		function updateSlide(){
			var d = parseInt($that.attr("data-delay"));
			var idx = parseInt($that.attr("data-current"));
			idx++;
			if(idx > $that.find("img").length - 1){
				idx = 0;
			}
			$that.find("img").removeClass('active');
			$that.find("img:eq("+idx+")").addClass('active');
			$that.attr("data-current",idx)
			setTimeout(updateSlide,d);
		}

		if(l > 1){
			$that.attr("data-delay",(Math.floor(Math.random() * 5) + 5) * 1000)
			$that.attr("data-current",0)
			var d = parseInt($that.attr("data-delay"));
			setTimeout(updateSlide,d);
		}

		var trans = $(this).height() + 5;
		if($(this).attr("direction") == "m"){
			trans = ($(this).height() + 5) * -1
		}

		$(this).find("img").css("transform","translate(0px,"+trans+"px)");
		$(this).find("img:first-child").addClass('active');

		$(this).attr("data-dest",0);
		$(this).removeClass('show');

	})

	$(window).off("scroll").scroll(function () {
		scrollUpdate();
	});

	$(".slides li").removeClass("active");
	$(".slides li:first-child").addClass('active');
	if(perfume.slideTimer != null){
		clearInterval(perfume.slideTimer);
	}
	var slideCnt = 0;
	perfume.slideTimer = setInterval(function(){

		$(".slides li").removeClass("active");
		$(".slides li:eq("+slideCnt+")").addClass('active');

		slideCnt++;
		if(slideCnt > $(".slides li").length - 1){
			slideCnt = 0;
		}
	} , 5000);
	var mp = 0;

	function animationUpdate(){
		var scroll = $(window).scrollTop();
		var wh = (window.innerHeight || document.documentElement.clientHeight || 0);

		$("a.cut").each(function(){

			var dest = parseFloat($(this).attr("data-dest"));
			// var idest = parseFloat($(this).attr("data-idest"));
			var ct = $(this).offset().top;
			var ch = $(this).height();
			if($(this).hasClass('.chead')){
				ch = $(this).height() * 1.5;
			}
			var diff = $(this).offset().top - (scroll + (wh * 0.3));

			var p = diff * 0.001;
			if(p < 0){
				p = 0;
			}
			if(p > 5){
				p = 5;
			}
			var ndest = (p * ch * 0.5);

			dest += (ndest - dest) * 0.1;
			if(Math.abs(dest - ndest) < 0){
				dest = ndest;
			}
			$(this).css("transform","translate(0px, " + dest +"px)");
			$(this).attr("data-dest",dest);
		})
		perfume.animationFrame = window.requestAnimationFrame(animationUpdate);
	}
	if(perfume.animationFrame !=null){
		window.cancelAnimationFrame(perfume.animationFrame);
	}
	animationUpdate();

	var isH01 = false;
	var isH02 = false;
	var isH03 = false;
	var isH04 = false;

	function scrollUpdate(){
		var scroll = $(window).scrollTop();
		var wh = (window.innerHeight || document.documentElement.clientHeight || 0);

		//sidenavのcurrent
		var v01 = $("#s1 .springoflife");
		var v02 = $("#s1 .laserbeam");
		var v03 = $("#s1 .flash");
		var v04 = $("#s1 .tokyogirl");

		$("#sidenav a").removeClass("active")
		if (scroll > v01.offset().top - wh + (wh * 0.5) &&
			scroll < v01.offset().top + v01.height() - (wh * 0.5)){
			$("#sidenav a:eq(1)").addClass("active")
		}else if (scroll > v02.offset().top - wh + (wh * 0.5) &&
			scroll < v02.offset().top + v02.height() - (wh * 0.5)){
			$("#sidenav a:eq(0)").addClass("active")
		}else if (scroll > v03.offset().top - wh + (wh * 0.5) &&
			scroll < v03.offset().top + v03.height() - (wh * 0.5)){
			$("#sidenav a:eq(2)").addClass("active")
		}else if (scroll > v04.offset().top - wh + (wh * 0.5) &&
			scroll < v04.offset().top + v04.height() - (wh * 0.5)){
			$("#sidenav a:eq(3)").addClass("active")
		}

		$("a.cut").each(function(){
			//中をマスクで出す
			var fadePos = $(this).offset().top
			if (scroll > fadePos - wh + (wh * 0.2) && scroll < fadePos ){
				if(!$(this).hasClass("show")){
					$(this).addClass('show');
					$(this).find("img").css("transform","translate(0px,0px)");
				}
			}
		})

		var ch = $("#new .head1");
		var m = 92;
		if (scroll > wh + 92 - 32){
			ch.addClass('fix');
		}else{
			ch.removeClass('fix')
		}

		var h01 = $("#s1 .springoflife h2");
		var h02 = $("#s1 .laserbeam h2");
		var h03 = $("#s1 .flash h2");
		var h04 = $("#s1 .tokyogirl h2");

		var cnt01 = 0;
		var cnt02 = 0;
		var cnt03 = 0;
		var cnt04 = 0;

		if (scroll > h01.offset().top - wh + (wh * 0.1) && !isH01){
			isH01 = true;
			console.log("h01");
			updateH01();
			function updateH01(){
				h01.css("background-position","0px " + ((100 / 29) * cnt01) +"%");
				cnt01++;
				if(cnt01 < 30){
					setTimeout(updateH01,30);
				}
			}
		}

		if (scroll > h02.offset().top - wh + (wh * 0.1) && !isH02){
			isH02 = true;
			console.log("h02");
			updateH02();
			function updateH02(){
				h02.css("background-position","0px " + ((100 / 29) * cnt02) +"%");
				cnt02++;
				if(cnt02 < 30){
					setTimeout(updateH02,30);
				}
			}
		}
		if (scroll > h03.offset().top - wh + (wh * 0.1) && !isH03){
			isH03 = true;
			console.log("h03");
			updateH03();
			function updateH03(){
				h03.css("background-position","0px " + ((100 / 29) * cnt03) +"%");
				cnt03++;
				if(cnt03 < 30){
					setTimeout(updateH03,30);
				}
			}
		}
		if (scroll > h04.offset().top - wh + (wh * 0.1) && !isH04){
			isH04 = true;
			console.log("h04");

			updateH04();
			function updateH04(){
				h04.css("background-position","0px " + ((100 / 29) * cnt04) +"%");
				cnt04++;
				if(cnt04 < 30){
					setTimeout(updateH04,30);
				}
			}
		}
	}


	$("#modal-movie a.btn-close").off().on("click",function(){
		$("#modal-movie").css("opacity",0.0);
		perfume.video01.pauseVideo();

		setTimeout(function(){
			$("#modal-movie").hide();
		},200)
	})

	$("#s1 .chead a").off().on("click",function(){
		$("html, body").animate({scrollTop:0},500);
	});


	$("#sidenav a").off().on("click",function(){
		var anchor = $(this).attr("data-anchor");
		var anchorh = $("#s1 ." +anchor).offset().top;
		$("html, body").animate({scrollTop:anchorh},500);
	});

	$("#footer .btn-top").off().on("click",function(){
		$("html, body").animate({scrollTop:0},500);
	});
	$(".share a").off('click').on("click",function(){
		var shareURL = "http://www.perfume-web.jp/cam/closet/";
		var sharetext = "Perfume Closet";

		if($(this).hasClass("tw")){
			perfume.shareURL("twitter",shareURL,sharetext,"prfm,PerfumeCloset");
		}else if($(this).hasClass("fb")){
			perfume.shareURL("facebook",shareURL,sharetext);
		}else if($(this).hasClass("ln")){
			perfume.shareURL("line",shareURL,sharetext);
		}


	});

	$("#new a.cut2").each(function(index, el) {

		var w = $(this).width();
		var h = $(this).height();

		var s = (w < h) ? w : h;
		s -= 80;
		if(s > 200){
			s = 200;
		}

		$(this).find("span").width(s);
		$(this).find("span").height(s);
		$(this).find("span").css("margin-left", (s * -0.5) + "px")
		$(this).find("span").css("margin-top", (s * -0.5) + "px")
	});

	$("#s1 a.cut").each(function(index, el) {

		var ww = (window.innerWidth || document.documentElement.clientWidth || 0);

		var wp = parseFloat($(this).css("width").replace("%","")) * 0.01
		var hp = parseFloat($(this).css("height").replace("%","")) * 0.01

		var w = Math.floor(wp * ww);
		var h = Math.floor(hp * ww);

		console.log(w,h)

		var s = (w < h) ? w : h;
		s -= 80;

		if(s > 200){
			s = 200;
		}

		$(this).find("span").width(s);
		$(this).find("span").height(s);
		$(this).find("span").css("margin-left", (s * -0.5) + "px")
		$(this).find("span").css("margin-top", (s * -0.5) + "px")
	});

	$("#s1 a.cut,#new a.cut2").off().on("click",function(){
		var itemId = $(this).attr("data-item");
		var dom = $("#" + itemId).text();

		$("#modal-item .modal-inner").empty();
		$("#modal-item .modal-inner").append(dom);

		var ww = (window.innerWidth || document.documentElement.clientWidth || 0);
		var wh = (window.innerHeight || document.documentElement.clientHeight || 0);


		if(!perfume.isSp){

			var nm = (ww - $("#modal-item .info").width()) * -0.5;
			$("#modal-item .images .images-inner").css("margin-left", nm + "px");


			console.log()

			var imgw = ($("#modal-item .info").width() - nm) - 390;
			var imgh = imgw / 3 * 2;
			var mgh = (wh - imgh) * 0.5;
			$("#modal-item .info .info-inner").css("bottom", mgh +"px");


			console.log(imgw)
			$("#modal-item .images-list ul").width(imgw);
			$("#modal-item .images-list ul").height(wh);
			$("#modal-item .images-list ul li").width(imgw);
			$("#modal-item .images-list ul li").height(wh);

			// $("#modal-item .images .images-inner li").width(imgw);
			// $("#modal-item .images .images-inner li").height(wh);

		}else{

			$("#modal-item .images .images-inner").css("margin-left", "0px");

			$("#modal-item .images-list ul").css("width",ww);
			$("#modal-item .images-list ul").css("height",ww);

		}

		var l = $("#modal-item .modal-inner .images li").length;
		pidx = 0;
		if(l > 1){
			$("#modal-item .controll .idx .current").empty().append(1);
			$("#modal-item .controll .idx .length").empty().append(l);

			$("#modal-item .modal-inner .images li").fadeOut(200)
			$("#modal-item .modal-inner .images li:eq("+pidx+")").fadeIn(200)


			function photoUpdate(direction){

				var l = $("#modal-item .modal-inner .images li").length;

				if(direction =="next"){
					pidx ++;
					if(pidx > l - 1){
						pidx = 0;
					}
				}
				if(direction =="prev"){
					pidx --;
					if(pidx < 0){
						pidx = l - 1;
					}
				}
				$("#modal-item .modal-inner .images li").fadeOut(200)
				$("#modal-item .modal-inner .images li:eq("+pidx+")").fadeIn(200)
				$("#modal-item .controll .idx .current").empty().append((pidx + 1));

			}

			$("#modal-item .controll .btn-next").off('click').on("click",function(){
				photoUpdate("next");
			});
			$("#modal-item .controll .btn-prev").off('click').on("click",function(){
				photoUpdate("prev");
			});
			$('#modal-item .images-list ul li').off('touchstart.swipe mousedown.swipe').on('touchstart.swipe mousedown.swipe', onTouchStart); //指が触れたか検知
			$('#modal-item .images-list ul li').off('touchmove.swipe mousemove.swipe').on('touchmove.swipe mousemove.swipe', onTouchMove); //指が動いたか検知
			$('#modal-item .images-list ul li').off('touchend.swipe mouseup.swipe').on('touchend.swipe mouseup.swipe', onTouchEnd); //指が離れたか検知

			var direction
			var stp;

			//スワイプ開始時の横方向の座標を格納
			function onTouchStart(event) {
				stp = getPosition(event);
				direction = ''; //一度リセットする
			}

			//スワイプの方向（left／right）を取得. 70px以上
			function onTouchMove(event) {
				if (stp - getPosition(event) > 70) {
					direction = 'left';
				} else if (stp - getPosition(event) < -70){
					direction = 'right';
				}
			}

			function onTouchEnd(event) {
				if (direction == 'right'){
					photoUpdate("next");
				} else if (direction == 'left'){
					photoUpdate("prev");
				}else{
					photoUpdate("next");
				}
			}

			function getPosition(event) {
				var x = 0;
				if(event.originalEvent.touches){
					x = event.originalEvent.touches[0].pageX;
				}else{
					x = event.originalEvent.pageX;
				}
				return x;
			}

		}else{
			$(".controll").hide();
		}

		$("#modal-item").css("opacity",0.0);
		$("#modal-item").show();
		setTimeout(function(){
		  $("#modal-item").css("opacity",1.0)
		},100)
		perfume.noScroll();
	})


	$("#modal-item a.btn-close").off().on("click",function(){
		$("#modal-item").css("opacity",0.0);
		setTimeout(function(){
			$("#modal-item").hide();
			perfume.scroll();
		},200)
	})




	if(perfume.isSp){
		perfume.initSP();
	}else{
		perfume.initPC();
	}
}

perfume.initSP = function(){
	//device init
	$("img").each(function(){
		p = $(this).attr("data-src");
		if(p!=undefined){
			p = p.replace(".png","_2x.png");
			p = p.replace(".jpg","_2x.jpg");
			// //console.log(p)
			$(this).attr("src",p)
		}
	})
}

perfume.initPC = function(){
	$("img").each(function(){
		p = $(this).attr("data-src");
		$(this).attr("src",p)
	})
}


perfume.currentY;
perfume.noScroll = function(){
	perfume.currentY = $( window ).scrollTop();
	$("body").addClass('noscroll');
	$("body").css('top',-1 * perfume.currentY);
}

perfume.scroll = function(){
	$("body").css('top',"auto");
	$("body").removeClass('noscroll');
	$( 'html, body' ).prop( { scrollTop: perfume.currentY } );
}

function onYouTubeIframeAPIReady() {
	perfume.isLoadedVideo = true;
	perfume.video01 = new YT.Player(
		"video01",
		{
			height: '100%',
			width: '100%',
			videoId: perfume.id01,
			wmode: 'transparent',
			playerVars:{
				// controls:0,
				showinfo:0,
				// disablekb:1,
				autoplay:1,
				rel:0,
				modestbranding:1,
				frameborder:"0",
				playsinline:1
			},
			events:{
				'onReady': function (event) {
					console.log("ready");
					perfume.video01.mute();
					perfume.isLoadedVideo = true;
				},
				'onStateChange': function (event) {
					// if(event.data == YT.PlayerState.PLAYING ){
					// 	$("#key .videocontainer").css("opacity","1.0");
					// 	$("#key h1").css("opacity","0.0");
					// }else if(event.data == YT.PlayerState.ENDED){
					// 	console.log("ended");
					// 	perfume.video01.seekTo(0);
					// 	perfume.video01.playVideo();
					// }
				}
			}
		}
	);
}

if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun /*, thisp */)
  {
	"use strict";

	if (this === void 0 || this === null)
	  throw new TypeError();

	var t = Object(this);
	var len = t.length >>> 0;
	if (typeof fun !== "function")
	  throw new TypeError();

	var res = [];
	var thisp = arguments[1];
	for (var i = 0; i < len; i++)
	{
	  if (i in t)
	  {
		var val = t[i]; // in case fun mutates this
		if (fun.call(thisp, val, i, t))
		  res.push(val);
	  }
	}

	return res;
  };
}

if (!("indexOf" in Array.prototype)) {
	Array.prototype.indexOf = function(find, i) {
		var n;
		if (i === undefined) i = 0;
		if (i < 0) i += this.length;
		if (i < 0) i = 0;
		n = this.length;
		while (i < n) {
			if (i in this && this[i] === find) return i;
			i++;
		}
		return -1;
	};
}
