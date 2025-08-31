(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var config;

config = {
  COOKIE_DEBUG_MODE: false,
  DEBUG_MODE: false,
  STATS_MODE: false,
  STATS_FPS: 30,
  THROTTLE_MS: 50,
  TOUCH_SUPPORT: false,
  TABLET_WIN_W: 1280,
  PC_HEADER_H: 126,
  SP_HEADER_H: 95,
  PJAX_FADE_SPEED: 700,
  GRID_COL: 12,
  COLOR_SWITCH_DIFF_Y: 200,
  COMMON_EASING: "easeInOutCubic",
  KEY_COLOR_GRAY: "#f5f5f5",
  KEY_COLOR_YELLOW: "#fff20d",
  KEY_COLOR_MINT: "#95e4da",
  BLEND: {
    multiply: "multiply",
    screen: "screen",
    overlay: "overlay",
    darken: "darken",
    lighten: "lighten",
    colorDodge: "color-dodge",
    colorBurn: "color-burn",
    hardLight: "hard-light",
    softLight: "soft-light",
    difference: "difference",
    exclusion: "exclusion",
    hue: "hue",
    saturation: "saturation",
    color: "color",
    luminosity: "luminosity",
    normal: "normal"
  }
};

module.exports = config;


},{}],2:[function(require,module,exports){
var Base, Window, c, log;

c = require("../_config");

log = require("../_helpers/log");

Window = require("../_views/_format/Window");

module.exports = Base = (function() {
  Base.prototype.w = null;

  function Base() {
    log.stats();
    this.w = new Window({
      resizeThrottleMs: c.THROTTLE_MS,
      scrollThrottleMs: c.THROTTLE_MS,
      wheelThrottleMs: c.THROTTLE_MS
    });
    this.w.addListener();
    if (c.TOUCH_SUPPORT) {
      this.w.addTouchListener();
    }
    return;
  }

  return Base;

})();


},{"../_config":1,"../_helpers/log":18,"../_views/_format/Window":26}],3:[function(require,module,exports){
var Contents, CssMediaType, Format, Header, Loader, c, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

c = require("../_config");

log = require("../_helpers/log");

Loader = require("../_views/_format/Loader");

Header = require("../_views/_format/Header");

Contents = require("../_views/_format/Contents");

CssMediaType = require("../_views/_format/CssMediaType");

module.exports = Format = (function() {
  function Format(w, router) {
    this.w = w;
    this.router = router;
    this.onresize = bind(this.onresize, this);
    this.onscroll = bind(this.onscroll, this);
    this.footerFrameIn = bind(this.footerFrameIn, this);
    this.init = bind(this.init, this);
    this.begin = bind(this.begin, this);
    this.loader = new Loader(this.w);
    this.contents = new Contents(this.w, this.router);
    this.header = new Header(this.w, this.router, this.contents);
    this.cssMediaType = new CssMediaType(this.w);
    _.delay(this.header.frameIn, 1000);
    _.delay(this.footerFrameIn, 500);
    return;
  }

  Format.prototype.begin = function(complete) {
    this.loader.show((function(_this) {
      return function() {
        return _.delay(function() {
          _this.contents.hide();
          return complete();
        }, 500);
      };
    })(this));
  };

  Format.prototype.init = function(complete) {
    _.delay((function(_this) {
      return function() {
        return _this.contents.loaded(function() {
          _this.contents.show();
          return _.delay(function() {
            return _this.loader.hide(function() {
              return typeof complete === "function" ? complete() : void 0;
            });
          }, 100);
        });
      };
    })(this), 30);
  };

  Format.prototype.footerFrameIn = function() {
    $(".js-footer").velocity({
      opacity: 0,
      translateY: 200
    }, 0, (function(_this) {
      return function() {
        return $(".js-footer").velocity({
          opacity: 1,
          translateY: 0
        }, 1000, "easeOutExpo");
      };
    })(this));
  };

  Format.prototype.onscroll = function() {
    this.header.onscroll();
  };

  Format.prototype.onresize = function() {
    this.loader.onresize();
    this.contents.onresize();
    this.header.onresize();
    this.cssMediaType.onresize();
  };

  return Format;

})();


},{"../_config":1,"../_helpers/log":18,"../_views/_format/Contents":21,"../_views/_format/CssMediaType":22,"../_views/_format/Header":23,"../_views/_format/Loader":24}],4:[function(require,module,exports){
var DelayObj, FadeObj, Firstview, Gmap, Look, Modals, Pages, ShapeBg, c, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

c = require("../_config");

log = require("../_helpers/log");

Gmap = require("../_views/_module/Gmap");

FadeObj = require("../_views/_module/FadeObj");

DelayObj = require("../_views/_module/DelayObj");

ShapeBg = require("../_views/_pages/_top/ShapeBg");

Firstview = require("../_views/_pages/_top/Firstview");

Modals = require("../_views/_pages/_top/Modals");

Look = require("../_views/_pages/_top/Look");

module.exports = Pages = (function() {
  function Pages(w, router, format, viewport) {
    this.w = w;
    this.router = router;
    this.format = format;
    this.viewport = viewport;
    this.onresize = bind(this.onresize, this);
    this.onscroll = bind(this.onscroll, this);
    this.fadeObj = new FadeObj(this.w);
    this.delayObj = new DelayObj(this.w, this.viewport);
    this.shapeBg = new ShapeBg(this.w, this.viewport);
    this.firstview = new Firstview(this.w, this.viewport);
    this.look = new Look(this.w, this.viewport);
    this.modals = new Modals(this.w, this.router, this.viewport, this.format, this.delayObj);
    return;
  }

  Pages.prototype.onscroll = function() {
    this.fadeObj.onscroll();
    this.delayObj.onscroll();
    this.shapeBg.onscroll();
    this.firstview.onscroll();
  };

  Pages.prototype.onresize = function() {
    this.shapeBg.onresize();
    this.firstview.onresize();
    this.look.onresize();
    this.modals.onresize();
  };

  return Pages;

})();


},{"../_config":1,"../_helpers/log":18,"../_views/_module/DelayObj":29,"../_views/_module/FadeObj":30,"../_views/_module/Gmap":31,"../_views/_pages/_top/Firstview":34,"../_views/_pages/_top/Look":35,"../_views/_pages/_top/Modals":38,"../_views/_pages/_top/ShapeBg":39}],5:[function(require,module,exports){
var Base, Format, Pages, Project, Router, Viewport, c, cj, cmn, detect, display, fitImg, history, image, log, math,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

c = require("../_config");

log = require("../_helpers/log");

cmn = require("../_helpers/common");

detect = require("../_helpers/detect");

history = require("../_helpers/history");

image = require("../_helpers/image");

math = require("../_helpers/math");

display = require("../_helpers/display");

fitImg = require("../_helpers/fitImg");

cj = require("../_helpers/createjs");

Base = require("./Base");

Router = require("./Router");

Format = require("./Format");

Pages = require("./Pages");

Viewport = require("../_views/_format/Viewport");

Project = (function(superClass) {
  extend(Project, superClass);

  function Project() {
    this.initListener = bind(this.initListener, this);
    this.onscroll = bind(this.onscroll, this);
    this.onresize = bind(this.onresize, this);
    this.start = bind(this.start, this);
    this.begin = bind(this.begin, this);
    Project.__super__.constructor.call(this);
    cj.initTicker(c.STATS_FPS);
    this.router = new Router(this.w, this.begin, this.start);
    $(document).ready((function(_this) {
      return function() {
        return _this.format = new Format(_this.w, _this.router);
      };
    })(this));
    $(window).on("load", (function(_this) {
      return function() {
        _this.viewport = new Viewport(_this.w, _this.router, _this.format);
        _this.viewport.onresize();
        return _this.router.load();
      };
    })(this));
    return;
  }

  Project.prototype.begin = function() {
    var dfr;
    log.trace("Project.begin");
    dfr = $.Deferred();
    this.format.begin((function(_this) {
      return function() {
        return dfr.resolve();
      };
    })(this));
    return dfr.promise();
  };

  Project.prototype.start = function() {
    log.trace("Project.start");
    this.pages = new Pages(this.w, this.router, this.format, this.viewport);
    fitImg.init();
    this.format.init(this.initListener);
  };

  Project.prototype.onresize = function() {
    fitImg.resize();
    this.viewport.onresize();
    this.format.onresize();
    this.pages.onresize();
  };

  Project.prototype.onscroll = function() {
    this.viewport.onscroll();
    this.format.onscroll();
    this.pages.onscroll();
  };

  Project.prototype.initListener = function() {
    this.router.initPjaxListener();
    this.w.off("RESIZING", this.onresize);
    this.w.on("RESIZING", this.onresize);
    this.w.off("RESIZED", this.onresize);
    this.w.on("RESIZED", this.onresize);
    this.w.off("SCROLL", this.onscroll);
    this.w.on("SCROLL", this.onscroll);
    this.onresize();
    this.onscroll();
  };

  return Project;

})(Base);

module.exports = new Project;


},{"../_config":1,"../_helpers/common":11,"../_helpers/createjs":12,"../_helpers/detect":13,"../_helpers/display":14,"../_helpers/fitImg":15,"../_helpers/history":16,"../_helpers/image":17,"../_helpers/log":18,"../_helpers/math":19,"../_views/_format/Viewport":25,"./Base":2,"./Format":3,"./Pages":4,"./Router":6}],6:[function(require,module,exports){
var Pjax, Router, c, history, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

c = require("../_config");

log = require("../_helpers/log");

history = require("../_helpers/history");

Pjax = require("../_helpers/Pjax");

module.exports = Router = (function() {
  Router.prototype.path = null;

  Router.prototype.query = null;

  Router.prototype.page = null;

  Router.prototype.rootDirNum = 1;

  Router.prototype.DEV_DIR_NAME = "static";

  function Router(w, begin, start) {
    this.w = w;
    this.begin = begin;
    this.start = start;
    this.isTop = bind(this.isTop, this);
    this.load = bind(this.load, this);
    this.initPjaxListener = bind(this.initPjaxListener, this);
    this.judgment = bind(this.judgment, this);
    this.updateRootReferrer = bind(this.updateRootReferrer, this);
    this.setReferrer = bind(this.setReferrer, this);
    this.contentsPjax = new Pjax(this.w, ".js-pjax__contents", "a.pjax-contents[target!='_blank']");
    this.judgment();
    return;
  }

  Router.prototype.setReferrer = function(referrer) {
    if (!referrer) {
      this.rootReferrer = this.page;
    } else {
      this.pjaxReferrer = referrer;
    }
    log.trace("Router.setReferrer => @rootReferrer: " + this.rootReferrer + ", @pjaxReferrer: " + this.pjaxReferrer);
  };

  Router.prototype.updateRootReferrer = function() {
    this.rootReferrer = this.page;
    log.trace("Router.updateRootReferrer => @rootReferrer: " + this.rootReferrer);
  };

  Router.prototype.judgment = function() {
    this.path = history.getPaths();
    this.query = history.getQueryArr();
    this.hash = location.hash;
    if (this.path[1] === this.DEV_DIR_NAME) {
      this.rootDirNum = 2;
    }
    this.dir1 = this.path[this.rootDirNum];
    this.dir2 = this.path[this.rootDirNum + 1];
    this.dir3 = this.path[this.rootDirNum + 2];
    this.dir4 = this.path[this.rootDirNum + 3];
    if (this.isTop()) {
      this.page = "top";
    }
    log.trace("Router.judgment =>", {
      page: this.page,
      dir1: this.dir1,
      dir2: this.dir2,
      query: this.query
    });
  };

  Router.prototype.initPjaxListener = function() {
    this.contentsPjax.initListener({
      begin: (function(_this) {
        return function() {
          _this.setReferrer("contents");
          return _this.begin();
        };
      })(this),
      popstate: (function(_this) {
        return function() {
          _this.setReferrer("contents");
          return _this.begin();
        };
      })(this),
      complete: (function(_this) {
        return function() {
          _this.judgment();
          return _this.load();
        };
      })(this)
    });
  };

  Router.prototype.load = function() {
    this.start();
    this.initPjaxListener();
  };

  Router.prototype.isTop = function() {
    return !this.dir1 || this.dir1 === "index.html" || this.dir1 === "index.php";
  };

  return Router;

})();


},{"../_config":1,"../_helpers/Pjax":8,"../_helpers/history":16,"../_helpers/log":18}],7:[function(require,module,exports){
var EventObserver,
  slice = [].slice;

module.exports = EventObserver = (function() {
  function EventObserver() {}

  EventObserver.prototype.on = function(ev, callback) {
    var base, evs, j, len, name;
    if (this._callbacks == null) {
      this._callbacks = {};
    }
    evs = ev.split(' ');
    for (j = 0, len = evs.length; j < len; j++) {
      name = evs[j];
      (base = this._callbacks)[name] || (base[name] = []);
      this._callbacks[name].push(callback);
    }
    return this;
  };

  EventObserver.prototype.once = function(ev, callback) {
    this.on(ev, function() {
      this.off(ev, arguments.callee);
      return callback.apply(this, arguments);
    });
    return this;
  };

  EventObserver.prototype.trigger = function() {
    var args, callback, ev, j, len, list, ref;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    ev = args.shift();
    list = (ref = this._callbacks) != null ? ref[ev] : void 0;
    if (!list) {
      return;
    }
    for (j = 0, len = list.length; j < len; j++) {
      callback = list[j];
      if (callback.apply(this, args) === false) {
        break;
      }
    }
    return this;
  };

  EventObserver.prototype.off = function(ev, callback) {
    var cb, evs, i, j, k, len, len1, list, name, ref;
    if (!ev) {
      this._callbacks = {};
      return this;
    }
    evs = ev.split(' ');
    for (j = 0, len = evs.length; j < len; j++) {
      name = evs[j];
      list = (ref = this._callbacks) != null ? ref[name] : void 0;
      if (list) {
        if (callback) {
          for (i = k = 0, len1 = list.length; k < len1; i = ++k) {
            cb = list[i];
            if (!(cb === callback)) {
              continue;
            }
            list = list.slice();
            list.splice(i, 1);
            this._callbacks[name] = list;
          }
        } else {
          delete this._callbacks[name];
        }
      }
    }
    return this;
  };

  return EventObserver;

})();


},{}],8:[function(require,module,exports){
var Pjax, c, detect, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

c = require("../_config");

log = require("../_helpers/log");

detect = require("../_helpers/detect");

module.exports = Pjax = (function() {
  Pjax.prototype.ignoreClass = "" + Pjax.ignoreClass;

  function Pjax(w, el, trigger) {
    this.w = w;
    this.el = el;
    this.trigger = trigger;
    this.initListener = bind(this.initListener, this);
    this.removeListener = bind(this.removeListener, this);
    if (!this.el) {
      this.el = ".js-contents";
    }
    if (!this.trigger) {
      this.trigger = "a";
    }
    return;
  }

  Pjax.prototype.removeListener = function() {
    $("" + this.trigger).off("click.pjax").on("click.pjax", (function(_this) {
      return function(ev) {
        return false;
      };
    })(this));
  };

  Pjax.prototype.initListener = function(args) {
    var _href, _pjaxStackReplace, _timeout;
    _timeout = 10000;
    _pjaxStackReplace = false;
    _href = "";
    $(this.trigger + ":not(." + this.ignoreClass + ")").off("click.pjax").on("click.pjax", (function(_this) {
      return function(ev) {
        ev.preventDefault();
        _href = $(ev.currentTarget).attr("href");
        if (_href === "#") {
          return;
        }
        _this.removeListener();
        return args.begin().done(function() {
          $.pjax({
            url: _href,
            container: _this.el,
            fragment: _this.el,
            timeout: _timeout,
            replace: _pjaxStackReplace
          });
        });
      };
    })(this));
    $(document).off().on({
      "pjax:popstate": (function(_this) {
        return function() {
          window.location.href = _href;
          args.popstate();
        };
      })(this),
      "pjax:end": (function(_this) {
        return function(xhr, options) {
          args.complete();
        };
      })(this),
      "pjax:timeout": (function(_this) {
        return function(xhr, options) {
          window.location.href = _href;
        };
      })(this)
    });
  };

  return Pjax;

})();


},{"../_config":1,"../_helpers/detect":13,"../_helpers/log":18}],9:[function(require,module,exports){
var Throttle,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports = Throttle = (function() {
  var _timeStamp, _timerId;

  Throttle.minInterval = 100;

  _timerId = null;

  _timeStamp = 0;

  function Throttle(minInterval) {
    this.minInterval = minInterval;
    this.exec = bind(this.exec, this);
  }

  Throttle.prototype.exec = function(func) {
    var delta, now;
    now = +(new Date);
    delta = now - _timeStamp;
    clearTimeout(_timerId);
    if (delta >= this.minInterval) {
      _timeStamp = now;
      func();
    } else {
      _timerId = setTimeout((function(_this) {
        return function() {
          return _this.exec(func);
        };
      })(this), this.minInterval - delta);
    }
  };

  return Throttle;

})();


},{}],10:[function(require,module,exports){
var EO, View, c, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

c = require("../_config");

log = require("./log");

EO = require("./EventObserver");

module.exports = View = (function(superClass) {
  extend(View, superClass);

  View.prototype.ViewName = null;

  View.prototype.$el = null;

  function View(w) {
    this.w = w;
    this.log = bind(this.log, this);
    this.loaded = bind(this.loaded, this);
    return;
  }

  View.prototype.loaded = function(done) {
    this.$el.imagesLoaded().always((function(_this) {
      return function(o) {
        return log.trace(_this.ViewName + ".loaded.always");
      };
    })(this)).done((function(_this) {
      return function(o) {
        log.trace(_this.ViewName + ".loaded.done");
        return typeof done === "function" ? done() : void 0;
      };
    })(this)).fail((function(_this) {
      return function(o) {
        log.trace(_this.ViewName + ".loaded.fail");
        return typeof done === "function" ? done() : void 0;
      };
    })(this)).progress((function(_this) {
      return function(o, image) {
        var result;
        return result = image.isLoaded ? "loaded" : "broken";
      };
    })(this));
  };

  View.prototype.log = function(funcName, args) {
    if (args) {
      log.trace(this.ViewName + "." + funcName + " =>", args);
    } else {
      log.trace(this.ViewName + "." + funcName + " =>");
    }
  };

  return View;

})(EO);


},{"../_config":1,"./EventObserver":7,"./log":18}],11:[function(require,module,exports){
var appendCssInline, cf, fps;

cf = require("../_config");

fps = cf.TIMER_FPS || 30;

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
    return window.setTimeout(callback, 1000 / fps);
  };
})();

window.cancelAnimFrame = (function() {
  return window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame || window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame || function(callback) {
    return window.clearTimeout(callback, 1000 / fps);
  };
})();

appendCssInline = function(text) {
  var head, rule, style;
  head = document.getElementsByTagName("head").item(0);
  style = document.createElement("style");
  rule = document.createTextNode(text);
  style.media = "screen";
  style.type = "text/css";
  style.appendChild(rule);
  head.appendChild(style);
};

module.exports = {
  appendCssInline: appendCssInline
};


},{"../_config":1}],12:[function(require,module,exports){
var _setStroke, addTicker, createContainer, createPoint, createShapeCircle, createShapeEllipse, createShapeRect, createStage, drawCurveCircle, fitFullsizeObject, fitFullsizeStage, initTicker, log, math, removeTicker, removeTickerAll, setCenter;

log = require("../_helpers/log");

math = require("../_helpers/math");

initTicker = function(fps) {
  var default_fps;
  default_fps = 60;
  if (!fps) {
    fps = default_fps;
  }
  createjs.Ticker.setFPS(fps);
};

addTicker = function(func) {
  createjs.Ticker.removeEventListener("tick", func);
  createjs.Ticker.addEventListener("tick", func);
};

removeTicker = function(func) {
  createjs.Ticker.removeEventListener("tick", func);
};

removeTickerAll = function() {
  createjs.Ticker.removeAllEventListeners("tick");
};

createStage = function(id) {
  var stage;
  stage = new createjs.Stage(id);
  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(stage);
  }
  return stage;
};

createContainer = function(wrapper) {
  var container;
  container = new createjs.Container();
  wrapper.addChild(container);
  return container;
};

fitFullsizeStage = function(w, stage) {
  stage.canvas.width = w.w();
  stage.canvas.height = w.h();
  return stage;
};

fitFullsizeObject = function(w, object, margin) {
  if (!margin) {
    margin = 0;
  }
  object.graphics.command.w = w.w() - margin;
  object.graphics.command.h = w.h() - margin;
  return object;
};

setCenter = function(w, object) {
  object.x = w.w() / 2;
  object.y = w.h() / 2;
  return object;
};

createPoint = function(args) {
  var point;
  point = new createjs.Point();
  point.x = args.x || args.stage.canvas.width / 2;
  point.y = args.y || args.stage.canvas.height / 2;
  return point;
};

_setStroke = function(g, args) {
  if (args.strokeColor) {
    args.strokeStyle = args.strokeStyle || 1;
    g.setStrokeStyle(args.strokeStyle).beginStroke(args.strokeColor);
  }
  return g;
};

createShapeCircle = function(args) {
  var g, shape;
  shape = new createjs.Shape();
  g = shape.graphics;
  if (args.color) {
    g.beginFill(args.color);
  }
  _setStroke(g, args);
  g.drawCircle(args.x, args.y, args.r);
  args.stage.addChild(shape);
  return shape;
};

createShapeEllipse = function(args) {
  var shape;
  shape = new createjs.Shape();
  shape.graphics.setStrokeStyle(args.weight).beginStroke(args.color).drawEllipse(args.x, args.y, args.w, args.h);
  args.stage.addChild(shape);
  return shape;
};

drawCurveCircle = function(args) {
  var anchorX, anchorY, angle, controlX, controlY, g, i, j, ref, shape, theta;
  shape = new createjs.Shape();
  g = shape.graphics;
  _setStroke(g, args);
  args.segments = args.segments || 8;
  angle = 2 * Math.PI / args.segments;
  g.moveTo(args.x + args.r, args.y);
  for (i = j = 0, ref = args.segments; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
    theta = i * angle;
    anchorX = args.r * Math.cos(theta);
    anchorY = args.r * Math.sin(theta);
    controlX = anchorX + args.r * Math.tan(angle / 2) * Math.cos(theta - Math.PI / 2);
    controlY = anchorY + args.r * Math.tan(angle / 2) * Math.sin(theta - Math.PI / 2);
    g.quadraticCurveTo(controlX + args.x, controlY + args.y, anchorX + args.x, anchorY + args.y);
  }
  g.closePath();
  args.stage.addChild(shape);
  return shape;
};

createShapeRect = function(args) {
  var shape;
  shape = new createjs.Shape();
  shape.graphics.beginFill(args.color).rect(args.x, args.y, args.w, args.h);
  args.stage.addChild(shape);
  return shape;
};

module.exports = {
  initTicker: initTicker,
  addTicker: addTicker,
  removeTicker: removeTicker,
  removeTickerAll: removeTickerAll,
  createStage: createStage,
  createContainer: createContainer,
  fitFullsizeStage: fitFullsizeStage,
  fitFullsizeObject: fitFullsizeObject,
  setCenter: setCenter,
  createPoint: createPoint,
  createShapeCircle: createShapeCircle,
  createShapeEllipse: createShapeEllipse,
  drawCurveCircle: drawCurveCircle,
  createShapeRect: createShapeRect
};


},{"../_helpers/log":18,"../_helpers/math":19}],13:[function(require,module,exports){
var _indexOfAV, _indexOfPF, _indexOfUA, isAndroid, isAndroidVer, isChrome, isEdge, isFirefox, isIe, isIeUnder, isIeVer, isIos, isIosVer, isIpad, isMobileSafari, isPc, isSafari, isSmt, isWin, isWin10, lowerAV, lowerPF, lowerUA, pureAV, purePF, pureUA;

pureUA = window.navigator.userAgent;

pureAV = window.navigator.appVersion;

purePF = window.navigator.platform;

lowerUA = pureUA.toLowerCase();

lowerAV = pureAV.toLowerCase();

lowerPF = purePF.toLowerCase();

_indexOfUA = function(Ua) {
  var ua;
  ua = Ua.toLowerCase();
  return lowerUA.indexOf(ua);
};

_indexOfAV = function(Av) {
  var av;
  av = Av.toLowerCase();
  return lowerAV.indexOf(av);
};

_indexOfPF = function(Pf) {
  var pf;
  pf = Pf.toLowerCase();
  return lowerPF.indexOf(pf);
};

isIeVer = function() {
  var ver;
  ver = 0;
  if (lowerUA.match(/(msie|MSIE)/) || lowerUA.match(/(T|t)rident/)) {
    ver = lowerUA.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3];
    ver = parseInt(ver);
  }
  return ver;
};

isIeUnder = function(ver) {
  return isIeVer() <= ver && isIeVer() !== 0;
};

isIe = function(ver) {
  return isIeVer() === ver && isIeVer() !== 0;
};

isSmt = function() {
  return _indexOfUA("iphone") > 0 || _indexOfUA("ipod") > 0 || _indexOfUA("android") > 0;
};

isIos = function() {
  return _indexOfUA("ipad") > 0 || _indexOfUA("iphone") > 0 || _indexOfUA("ipod") > 0;
};

isIosVer = function() {
  var ver;
  ver = lowerUA.match(/([\d]+)_([\d]+)_([\d]+)/);
  if (!ver) {
    ver = lowerUA.match(/([\d]+)_([\d]+)/);
  }
  return ver[1];
};

isIpad = function() {
  return _indexOfUA("ipad") > 0;
};

isAndroid = function() {
  return _indexOfUA("android") > 0;
};

isAndroidVer = function(ver) {
  var isVer;
  if (!_indexOfUA("android") > 0) {
    return;
  }
  isVer = /(android)\s([0-9]{1,})([\.0-9]{1,})/.exec(lowerUA);
  if (isVer == null) {
    return;
  }
  isVer = isVer[0].split(" ")[1];
  return isVer === ver;
};

isWin = function() {
  return _indexOfPF("win") !== -1;
};

isWin10 = function() {
  return _indexOfUA("nt 10") > 0;
};

isChrome = function() {
  return _indexOfUA("chrome") > 0 && _indexOfUA("iab") === -1;
};

isFirefox = function() {
  return _indexOfUA("firefox") !== -1;
};

isSafari = function() {
  return _indexOfUA("safari") !== -1 && _indexOfUA("chrome") === -1 && _indexOfUA("edge") === -1;
};

isMobileSafari = function() {
  return _indexOfUA("safari") !== -1 && _indexOfUA("mobile") !== -1 && _indexOfUA("edge") === -1;
};

isEdge = function() {
  return _indexOfUA("edge") !== -1;
};

isPc = function() {
  return !isSmt() && !isIpad();
};

module.exports = {
  isIeVer: isIeVer,
  isIeUnder: isIeUnder,
  isIe: isIe,
  isSmt: isSmt,
  isIos: isIos,
  isIosVer: isIosVer,
  isIpad: isIpad,
  isAndroid: isAndroid,
  isAndroidVer: isAndroidVer,
  isWin: isWin,
  isWin10: isWin10,
  isChrome: isChrome,
  isFirefox: isFirefox,
  isSafari: isSafari,
  isMobileSafari: isMobileSafari,
  isEdge: isEdge,
  isPc: isPc
};


},{}],14:[function(require,module,exports){
var getHighestHeight, log, setInnerHighestHeight, setSquareHeight, transform3d_value;

log = require("../_helpers/log");

getHighestHeight = function($el) {
  var maxH;
  if (!$el[0]) {
    return;
  }
  maxH = 0;
  $el.each((function(_this) {
    return function(i, o) {
      if ($(o).height() > maxH) {
        return maxH = $(o).height();
      }
    };
  })(this));
  return maxH;
};

setSquareHeight = function($el) {
  if (!$el[0]) {
    return;
  }
  $el.each((function(_this) {
    return function(i, o) {
      return $(o).height($(o).width());
    };
  })(this));
};

setInnerHighestHeight = function($el) {
  if (!$el[0]) {
    return;
  }
  $el.each((function(_this) {
    return function(i, o) {
      var hh;
      hh = 0;
      $(o).find("*").each(function(ii, oo) {
        log.trace(i, ($(oo).height()) + " > hh(" + hh + ")", oo);
        if ($(oo).height() > hh) {
          return hh = $(oo).height();
        }
      });
      return $(o).height(hh);
    };
  })(this));
};

transform3d_value = function($el, prop) {
  var matrix, values;
  values = $el.css("transform");
  values = values.split('(')[1];
  values = values.split(')')[0];
  values = values.split(', ');
  matrix = {
    "scale-x": values[0],
    "rotate-z-p": values[1],
    "rotate-y-p": values[2],
    "perspective1": values[3],
    "rotate-z-m": values[4],
    "scale-y": values[5],
    "rotate-x-p": values[6],
    "perspective2": values[7],
    "rotate-y-m": values[8],
    "rotate-x-m": values[9],
    "scale-z": values[10],
    "perspective3": values[11],
    "translate-x": values[12],
    "translate-y": values[13],
    "translate-z": values[14],
    "perspective4": values[15]
  };
  if (prop) {
    return matrix[prop];
  } else {
    return matrix;
  }
};

module.exports = {
  getHighestHeight: getHighestHeight,
  setInnerHighestHeight: setInnerHighestHeight,
  setSquareHeight: setSquareHeight,
  transform3d_value: transform3d_value
};


},{"../_helpers/log":18}],15:[function(require,module,exports){
var _trimming, c, image, init, log, resize;

c = require("../_config");

log = require("../_helpers/log");

image = require("../_helpers/image");

_trimming = function(i, $img, isPc) {
  var _adjustX, _adjustY, _cutH, _cutW, _imgAspect, _imgH, _imgOrg, _imgW, _noImage, _parentAspect, _parentH, _parentW, _setSize;
  _imgW = 0;
  _imgH = 0;
  _parentW = 0;
  _parentH = 0;
  _imgAspect = 0;
  _parentAspect = 0;
  _imgOrg = image.getOrgSize($img);
  _noImage = function() {
    return _imgOrg.w === null || _imgOrg.h === null;
  };
  if (isPc) {
    _adjustX = Number($img.attr("data-pcX"));
    _adjustY = Number($img.attr("data-pcY"));
  } else {
    _adjustX = Number($img.attr("data-spX"));
    _adjustY = Number($img.attr("data-spY"));
  }
  if (!_adjustX) {
    _adjustX = 0;
  }
  if (!_adjustY) {
    _adjustY = 0;
  }
  _setSize = function() {
    _imgW = $img.width();
    _imgH = $img.height();
    _parentW = $img.parent().width();
    _parentH = $img.parent().height();
    _imgAspect = _imgW / _imgH;
    _parentAspect = _parentW / _parentH;
  };
  _cutW = function() {
    var left;
    $img.css({
      "width": "auto",
      "height": "100%"
    });
    _setSize();
    left = Math.floor((($img.width() - $img.parent().width()) / 2) - _adjustX);
    $img.css({
      "left": "-" + left + "px",
      "top": "0%"
    });
  };
  _cutH = function() {
    var top;
    $img.css({
      "width": "100%",
      "height": "auto"
    });
    _setSize();
    top = Math.floor((($img.height() - $img.parent().height()) / 2) - _adjustY);
    $img.css({
      "top": "-" + top + "px",
      "left": "0%"
    });
  };
  _setSize();
  if (_noImage()) {
    log.trace(i, "fitImg._trimming => NO IMAGE");
  } else if (_imgAspect >= _parentAspect) {
    _cutW();
  } else if (_imgAspect < _parentAspect) {
    _cutH();
  } else {
    _cutW();
  }
};

init = function() {
  var $img, isPc;
  $img = $(".js-fitImg");
  if (!$img[0]) {
    return;
  }
  isPc = $(window).width() >= c.TABLET_WIN_W;
  $img.each(function(i, o) {
    return $(o).imagesLoaded(function() {
      $(o).parent().css({
        "position": "relative",
        "overflow": "hidden"
      });
      $(o).css({
        "position": "absolute",
        "display": "block"
      });
      return _trimming(i, $(o), isPc);
    });
  });
};

resize = function() {
  var $img, isPc;
  $img = $(".js-fitImg");
  if (!$img[0]) {
    return;
  }
  isPc = $(window).width() >= c.TABLET_WIN_W;
  $img.each(function(i, o) {
    return _trimming(i, $(o), isPc);
  });
};

module.exports = {
  init: init,
  resize: resize
};


},{"../_config":1,"../_helpers/image":17,"../_helpers/log":18}],16:[function(require,module,exports){
var getPaths, getQuery, getQueryArr, getQueryObj, h, log, match, pushState, replaceState, setTitle, supported, w;

log = require("./log");

w = window;

h = w.history;

supported = function() {
  return h && h.pushState;
};

pushState = function(dir) {
  if (!supported()) {
    return;
  }
  h.replaceState("index", null, null);
  h.pushState(dir, null, dir);
};

replaceState = function(dir) {
  if (!supported()) {
    return;
  }
  h.replaceState(null, null, dir);
};

setTitle = function(title) {
  document.title = title;
  $("title").text(title);
};

match = function(str) {
  var _result;
  _result = location.pathname.indexOf(str) !== -1;
  log.trace("match:", _result);
  return _result;
};

getPaths = function(level) {
  var _label, _paths;
  _label = "history.getPaths => ";
  _paths = location.pathname.split("/");
  if (level != null) {
    return _paths[level];
  } else {
    return _paths;
  }
};

getQuery = function(key) {
  var qs, regex;
  key = key.replace(/[€[]/, "€€€[").replace(/[€]]/, "€€€]");
  regex = new RegExp("[€€?&]" + key + "=([^&#]*)");
  qs = regex.exec(w.location.href);
  if (qs === null) {
    return "";
  } else {
    return qs[1];
  }
};

getQueryObj = function() {
  var i, j, kv, obj, pair, ref;
  obj = {};
  pair = w.location.search.replace(/\?/g, "").split("&");
  i = 0;
  for (i = j = 0, ref = pair.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    kv = pair[i].split("=");
    obj[kv[0]] = kv[1];
  }
  return obj;
};

getQueryArr = function() {
  var arr, i, j, kv, obj, pair, ref;
  arr = [];
  pair = w.location.search.replace(/\?/g, "").split("&");
  i = 0;
  for (i = j = 0, ref = pair.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    kv = pair[i].split("=");
    obj = {};
    obj[kv[0]] = kv[1];
    arr[i] = obj;
  }
  return arr;
};

module.exports = {
  supported: supported,
  pushState: pushState,
  replaceState: replaceState,
  setTitle: setTitle,
  match: match,
  getPaths: getPaths,
  getQuery: getQuery,
  getQueryObj: getQueryObj,
  getQueryArr: getQueryArr
};


},{"./log":18}],17:[function(require,module,exports){
var getOrgSize, log;

log = require("../_helpers/log");

getOrgSize = function($img) {
  var img, size;
  size = {};
  img = new Image;
  img.src = $img.attr('src');
  size.w = img.width;
  size.h = img.height;
  return size;
};

module.exports = {
  getOrgSize: getOrgSize
};


},{"../_helpers/log":18}],18:[function(require,module,exports){
var assert, c, debug, error, fatal, info, stats, time, trace, warn;

c = require("../_config");

if (c.DEBUG_MODE) {
  assert = console.assert.bind(console);
  trace = console.log.bind(console, '[TRACE]');
  debug = console.debug.bind(console, '[DEBUG]');
  info = console.info.bind(console, '[INFO]');
  warn = console.warn.bind(console, '[WARN]');
  error = console.error.bind(console, '[ERROR]');
  fatal = console.error.bind(console, '[FATAL]');
  time = function() {
    return "【" + (new Date().toISOString()) + "】";
  };
} else {
  assert = (function(_this) {
    return function() {};
  })(this);
  trace = (function(_this) {
    return function() {};
  })(this);
  debug = (function(_this) {
    return function() {};
  })(this);
  info = (function(_this) {
    return function() {};
  })(this);
  warn = (function(_this) {
    return function() {};
  })(this);
  error = (function(_this) {
    return function() {};
  })(this);
  fatal = (function(_this) {
    return function() {};
  })(this);
  time = (function(_this) {
    return function() {};
  })(this);
}

stats = function(fps) {
  if (!c.STATS_MODE) {
    return;
  }
  if (c.STATS_FPS) {
    fps = c.STATS_FPS;
  } else {
    fps = 60;
  }
  stats = new Stats();
  stats.domElement.style.position = "fixed";
  stats.domElement.style.left = "0px";
  stats.domElement.style.top = "0px";
  stats.domElement.style.zIndex = "9999";
  document.body.appendChild(stats.domElement);
  $("#fpsText").css({
    "letter-spacing": "0px"
  });
  setInterval(function() {
    return stats.update();
  }, 1000 / fps);
};

module.exports = {
  assert: assert,
  trace: trace,
  debug: debug,
  info: info,
  warn: warn,
  error: error,
  fatal: fatal,
  time: time,
  stats: stats
};


},{"../_config":1}],19:[function(require,module,exports){
var getDegree, getDiagonal, getDistance, getMaxIntRandom, getMaxRandom, getRadian, getRandomArrayValue, getRangeIntRandom, getRangeRandom, getVx, getVy, randomOfAdd, randomOfMulti, randomOfNormal, randomOfSqrt, randomOfSquare, randomOfUniform;

getDiagonal = function(w, h) {
  return Math.sqrt(w * w + h * h);
};

getDistance = function(x1, y1, x2, y2) {
  var dx, dy;
  dx = x1 - x2;
  dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
};

getVx = function(radians, speed) {
  return Math.cos(radians) * speed;
};

getVy = function(radians, speed) {
  return Math.sin(radians) * speed;
};

getRadian = function(degree) {
  return degree * Math.PI / 180;
};

getDegree = function(radian) {
  return radian / Math.PI * 180;
};

randomOfUniform = function() {
  return Math.random();
};

randomOfAdd = function() {
  return (Math.random() + Math.random()) / 2;
};

randomOfMulti = function() {
  return Math.random() * Math.random();
};

randomOfSquare = function() {
  var _r;
  _r = Math.random();
  return _r * _r;
};

randomOfSqrt = function() {
  return Math.sqrt(Math.random());
};

randomOfNormal = function() {
  var _r, calc;
  calc = function() {
    var r, r1, r2;
    r1 = Math.random();
    r2 = Math.random();
    r = Math.sqrt(-2.0 * Math.log(r1)) * Math.sin(2.0 * Math.PI * r2);
    return (r + 3) / 6;
  };
  while (true) {
    _r = calc();
    if (0 <= _r && _r < 1) {
      break;
    }
  }
  return _r;
};

getMaxRandom = function(max, algorithm) {
  if (!algorithm) {
    algorithm = Math.random;
  }
  return algorithm() * max;
};

getMaxIntRandom = function(max, algorithm) {
  return Math.floor(getMaxRandom(max, algorithm));
};

getRangeRandom = function(min, max, algorithm) {
  if (!algorithm) {
    algorithm = Math.random;
  }
  return (algorithm() * (max - min)) + min;
};

getRangeIntRandom = function(min, max, algorithm) {
  return Math.floor(getRangeRandom(min, max, algorithm));
};

getRandomArrayValue = function(arr) {
  return arr[getMaxIntRandom(arr.length)];
};

module.exports = {
  getDiagonal: getDiagonal,
  getDistance: getDistance,
  getVx: getVx,
  getVy: getVy,
  getRadian: getRadian,
  getDegree: getDegree,
  randomOfUniform: randomOfUniform,
  randomOfAdd: randomOfAdd,
  randomOfMulti: randomOfMulti,
  randomOfSquare: randomOfSquare,
  randomOfSqrt: randomOfSqrt,
  randomOfNormal: randomOfNormal,
  getMaxRandom: getMaxRandom,
  getMaxIntRandom: getMaxIntRandom,
  getRangeRandom: getRangeRandom,
  getRangeIntRandom: getRangeIntRandom,
  getRandomArrayValue: getRandomArrayValue
};


},{}],20:[function(require,module,exports){
(function() {
  require("./_controller/Project");
})();

},{"./_controller/Project":5}],21:[function(require,module,exports){
var Contents, View, c, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

c = require("../../_config");

log = require("../../_helpers/log");

View = require("../../_helpers/View");

module.exports = Contents = (function(superClass) {
  extend(Contents, superClass);

  Contents.prototype.ViewName = "Contents";

  function Contents(w, router) {
    this.w = w;
    this.router = router;
    this.onresize = bind(this.onresize, this);
    this.show = bind(this.show, this);
    this.hide = bind(this.hide, this);
    this.relative = bind(this.relative, this);
    this.fixed = bind(this.fixed, this);
    this.$el = $(".js-contents");
    return;
  }

  Contents.prototype.fixed = function() {
    this.$el.addClass("is-fixed");
  };

  Contents.prototype.relative = function() {
    this.$el.removeClass("is-fixed");
  };

  Contents.prototype.hide = function() {
    this.$el.css({
      "opacity": 0
    });
  };

  Contents.prototype.show = function() {
    this.$el.css({
      "opacity": 1
    });
  };

  Contents.prototype.onresize = function() {
    if (!this.w.isTabletW()) {
      this.$el.css({
        "min-height": this.w.h()
      });
    } else {
      this.$el.css({
        "min-height": "auto"
      });
    }
  };

  return Contents;

})(View);


},{"../../_config":1,"../../_helpers/View":10,"../../_helpers/log":18}],22:[function(require,module,exports){
var CssMediaType, View, c, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

c = require("../../_config");

log = require("../../_helpers/log");

View = require("../../_helpers/View");

module.exports = CssMediaType = (function(superClass) {
  extend(CssMediaType, superClass);

  CssMediaType.prototype.val = null;

  CssMediaType.prototype.isPrint = null;

  function CssMediaType(w, router) {
    this.w = w;
    this.router = router;
    this.onresize = bind(this.onresize, this);
    this.onprint = bind(this.onprint, this);
    this.set = bind(this.set, this);
    this.listener = bind(this.listener, this);
    this.$el = $(".js-cssMediaType");
    return;
  }

  CssMediaType.prototype.listener = function() {
    this.$printButton.on("click", this.onprint);
    this.w.off("KEY_CMD_P", this.onprint);
    this.w.on("KEY_CMD_P", this.onprint);
  };

  CssMediaType.prototype.set = function(val) {
    this.val = this.$el.css("content").slice(1, -1);
    if (!val) {
      val = this.val;
    }
    if (val === "print") {
      this.isPrint = true;
      this.isScreen = false;
    } else {
      this.isPrint = false;
      this.isScreen = true;
    }
    this.trigger("CHANGE");
  };

  CssMediaType.prototype.onprint = function(ev) {
    ev.preventDefault();
    this.set("print");
    window.print();
    this.set("screen");
    return false;
  };

  CssMediaType.prototype.onresize = function() {
    this.set();
  };

  return CssMediaType;

})(View);


},{"../../_config":1,"../../_helpers/View":10,"../../_helpers/log":18}],23:[function(require,module,exports){
var Header, HeaderHam, HeaderNav, c, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

c = require("../../_config");

log = require("../../_helpers/log");

HeaderNav = require("./_child/HeaderNav");

HeaderHam = require("./_child/HeaderHam");

module.exports = Header = (function() {
  function Header(w, router, contents) {
    this.w = w;
    this.router = router;
    this.contents = contents;
    this.onresize = bind(this.onresize, this);
    this.onscroll = bind(this.onscroll, this);
    this.frameOut = bind(this.frameOut, this);
    this.frameIn = bind(this.frameIn, this);
    this.closeNav = bind(this.closeNav, this);
    this.toggleNav = bind(this.toggleNav, this);
    this.$el = $(".js-header");
    this.nav = new HeaderNav(this.w, this.router);
    this.ham = new HeaderHam(this.w);
    this.ham.$el.on("click", this.toggleNav);
    this.nav.on("CLICK", this.closeNav);
    this.$el.velocity({
      translateY: -c.PC_HEADER_H - 50
    }, 0);
    return;
  }

  Header.prototype.toggleNav = function() {
    this.$el.toggleClass("active");
    this.isOpened = this.$el.hasClass("active");
    this.ham.toggle(this.isOpened);
    this.nav.toggle(this.isOpened);
  };

  Header.prototype.closeNav = function() {
    this.$el.removeClass("active");
    this.isOpened = this.$el.hasClass("active");
    this.ham.close(this.isOpened);
    this.nav.close(this.isOpened);
  };

  Header.prototype.frameIn = function(complete) {
    this.$el.stop().velocity({
      translateY: 0
    }, 1000, "easeInOutExpo", (function(_this) {
      return function() {
        return typeof complete === "function" ? complete() : void 0;
      };
    })(this));
  };

  Header.prototype.frameOut = function(complete) {
    this.$el.stop().velocity({
      translateY: -100
    }, 1000, "easeInOutExpo", (function(_this) {
      return function() {
        return typeof complete === "function" ? complete() : void 0;
      };
    })(this));
  };

  Header.prototype.onscroll = function() {
    this.ham.onscroll();
    this.nav.onscroll();
  };

  Header.prototype.onresize = function() {};

  return Header;

})();


},{"../../_config":1,"../../_helpers/log":18,"./_child/HeaderHam":27,"./_child/HeaderNav":28}],24:[function(require,module,exports){
var Loader, c, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

c = require("../../_config");

log = require("../../_helpers/log");

module.exports = Loader = (function() {
  Loader.prototype.id = "cvs-loader__tile";

  function Loader(w) {
    this.w = w;
    this.onresize = bind(this.onresize, this);
    this.hide = bind(this.hide, this);
    this.show = bind(this.show, this);
    this.$el = $(".js-loader");
    this.$tile = $(".js-loader__tile");
    this.$bg = $(".js-loader__bg");
    this.$protect = $(".js-loader__protect");
    return;
  }

  Loader.prototype.show = function(complete) {
    this.$el.addClass("active");
    this.$protect.addClass("active");
    this.$el.velocity({
      "opacity": 1
    }, 100, (function(_this) {
      return function() {
        return typeof complete === "function" ? complete() : void 0;
      };
    })(this));
  };

  Loader.prototype.hide = function(complete) {
    _.delay((function(_this) {
      return function() {
        return _this.$el.velocity({
          "opacity": 0
        }, 300, function() {
          _this.$el.removeClass("active");
          _this.$protect.removeClass("active");
          return typeof complete === "function" ? complete() : void 0;
        });
      };
    })(this), 200);
  };

  Loader.prototype.onresize = function() {
    if (!this.$el[0]) {
      return;
    }
  };

  return Loader;

})();


},{"../../_config":1,"../../_helpers/log":18}],25:[function(require,module,exports){
var View, Viewport, c, detect, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

c = require("../../_config");

log = require("../../_helpers/log");

detect = require("../../_helpers/detect");

View = require("../../_helpers/View");

module.exports = Viewport = (function(superClass) {
  extend(Viewport, superClass);

  Viewport.prototype.ViewName = "Viewport";

  Viewport.prototype.position = null;

  function Viewport(w, router, format) {
    this.w = w;
    this.router = router;
    this.format = format;
    this.onresize = bind(this.onresize, this);
    this.onscroll = bind(this.onscroll, this);
    this.setScroll = bind(this.setScroll, this);
    this.setModalState = bind(this.setModalState, this);
    this.on = bind(this.on, this);
    this.off = bind(this.off, this);
    this.$el = document.querySelector(".js-viewport");
    this.$body = document.querySelector("body");
    this.setScroll();
    return;
  }

  Viewport.prototype.off = function() {
    this.beforeY = this.isY;
    $("body").addClass("not-scroll");
  };

  Viewport.prototype.on = function(toBeforeY) {
    $("body").removeClass("not-scroll");
    this.onresize();
    if (toBeforeY) {
      this.w.startOffsetMove(this.beforeY, 0);
    }
  };

  Viewport.prototype.setModalState = function(state) {
    $("body").attr({
      "data-ismodal": state
    });
  };

  Viewport.prototype.setScroll = function(y) {
    if (!y) {
      y = 0;
    }
    this.w.startOffsetMove(y, 50);
  };

  Viewport.prototype.onscroll = function() {
    this.isY = Math.round(1 * window.scrollY || window.pageYOffset || document.documentElement.scrollTop);
  };

  Viewport.prototype.onresize = function() {
    this.h = this.$el.clientHeight;
    this.$body.style.height = this.h + "px";
  };

  return Viewport;

})(View);


},{"../../_config":1,"../../_helpers/View":10,"../../_helpers/detect":13,"../../_helpers/log":18}],26:[function(require,module,exports){
var EO, Throttle, Window, c, detect,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

c = require("../../_config");

EO = require("../../_helpers/EventObserver");

Throttle = require("../../_helpers/Throttle");

detect = require("../../_helpers/detect");

module.exports = Window = (function(superClass) {
  var EVENT_END_LAG, _resizeThrottle, _resizeTimer, _scrollThrottle, _scrollTimer, _touchTimer, _wheelThrottle, _wheelTimer;

  extend(Window, superClass);

  Window.prototype.el = window;

  Window.prototype.$el = $(window);

  Window.prototype.$document = $(document);

  Window.prototype.$scrollTag = $("html,body");

  _resizeTimer = false;

  _scrollTimer = false;

  _wheelTimer = false;

  _touchTimer = false;

  _resizeThrottle = null;

  _scrollThrottle = null;

  _wheelThrottle = null;

  Window.prototype.resizeThrottleMs = 50;

  Window.prototype.scrollThrottleMs = 50;

  Window.prototype.wheelThrottleMs = 50;

  Window.scrollY = 0;

  Window.startScrollY = null;

  Window.endScrollY = null;

  Window.startPageX = null;

  Window.startPageY = null;

  Window.endPageX = null;

  Window.endPageY = null;

  Window.scrollDirection = null;

  Window.swipeDirection = null;

  EVENT_END_LAG = 200;

  function Window(opt) {
    this.removeAccessCookie = bind(this.removeAccessCookie, this);
    this.setAccessCookie = bind(this.setAccessCookie, this);
    this.isFirstAccess = bind(this.isFirstAccess, this);
    this.isTablet = bind(this.isTablet, this);
    this.isTabletW = bind(this.isTabletW, this);
    this.getBodyHeight = bind(this.getBodyHeight, this);
    this.stopOffsetMove = bind(this.stopOffsetMove, this);
    this.startOffsetVelocity = bind(this.startOffsetVelocity, this);
    this.startOffsetMove = bind(this.startOffsetMove, this);
    this.onkeydown = bind(this.onkeydown, this);
    this.onorientationchange = bind(this.onorientationchange, this);
    this.onpopstate = bind(this.onpopstate, this);
    this.ontouchend = bind(this.ontouchend, this);
    this.ontouchmove = bind(this.ontouchmove, this);
    this.ontouchstart = bind(this.ontouchstart, this);
    this.onmousewheel = bind(this.onmousewheel, this);
    this.onscroll = bind(this.onscroll, this);
    this.onscrollOnce = bind(this.onscrollOnce, this);
    this.onresize = bind(this.onresize, this);
    this.b = bind(this.b, this);
    this.r = bind(this.r, this);
    this.l = bind(this.l, this);
    this.t = bind(this.t, this);
    this.h = bind(this.h, this);
    this.w = bind(this.w, this);
    this.removeTouchListener = bind(this.removeTouchListener, this);
    this.removeListener = bind(this.removeListener, this);
    this.addTouchListener = bind(this.addTouchListener, this);
    this.addListener = bind(this.addListener, this);
    this.initScrollTag = bind(this.initScrollTag, this);
    this.currentWidth = this.el.innerWidth;
    if ((opt != null ? opt.resizeThrottleMs : void 0) != null) {
      this.resizeThrottleMs = opt.resizeThrottleMs;
    }
    if ((opt != null ? opt.scrollThrottleMs : void 0) != null) {
      this.scrollThrottleMs = opt.scrollThrottleMs;
    }
    if ((opt != null ? opt.wheelThrottleMs : void 0) != null) {
      this.wheelThrottleMs = opt.wheelThrottleMs;
    }
    _resizeThrottle = new Throttle(this.resizeThrottleMs);
    _scrollThrottle = new Throttle(this.scrollThrottleMs);
    _wheelThrottle = new Throttle(this.wheelThrottleMs);
    this.initScrollTag();
    return;
  }

  Window.prototype.initScrollTag = function() {
    this.scrollTag = !window.chrome && 'WebkitAppearance' in document.documentElement.style || navigator.userAgent.indexOf('OPR') !== -1 || navigator.userAgent.indexOf('Edge') !== -1 ? 'body' : 'html';
    this.$scrollTag = $(this.scrollTag);
  };

  Window.prototype.addListener = function() {
    this.el.addEventListener("resize", this.onresize);
    this.el.addEventListener("scroll", this.onscroll);
    this.$el.on("mousewheel", this.onmousewheel);
    this.$el.on("orientationchange", this.onorientationchange);
    this.$el.on("keydown", this.onkeydown);
  };

  Window.prototype.addTouchListener = function() {
    this.$el.on("touchstart", this.ontouchstart);
    this.$el.on("touchmove", this.ontouchmove);
  };

  Window.prototype.removeListener = function() {
    this.$el.off("resize", this.onresize);
    this.$el.off("scroll", this.onscroll);
    this.$el.off("mousewheel", this.onmousewheel);
    this.$el.off("orientationchange", this.onorientationchange);
    this.$el.off("keydown", this.onkeydown);
  };

  Window.prototype.removeTouchListener = function() {
    this.$el.off("touchstart", this.ontouchstart);
    this.$el.off("touchmove", this.ontouchmove);
  };

  Window.prototype.w = function() {
    return this.$el.width();
  };

  Window.prototype.h = function() {
    return this.$el.height();
  };

  Window.prototype.t = function(t) {
    if (t) {
      return this.$el.scrollTop(t);
    } else {
      return this.$el.scrollTop();
    }
  };

  Window.prototype.l = function() {
    return this.$el.scrollLeft();
  };

  Window.prototype.r = function() {
    return this.$el.scrollLeft() + this.$el.width();
  };

  Window.prototype.b = function() {
    return this.$el.scrollTop() + this.$el.height();
  };

  Window.prototype.onresize = function(ev) {
    if (this.currentWidth === this.el.innerWidth) {
      return;
    }
    this.currentWidth = this.el.innerWidth;
    this.trigger("RESIZE");
    _resizeThrottle.exec((function(_this) {
      return function() {
        return _this.trigger("RESIZING");
      };
    })(this));
    if (_resizeTimer !== false) {
      clearTimeout(_resizeTimer);
    }
    _resizeTimer = setTimeout((function(_this) {
      return function() {
        return _this.trigger("RESIZED");
      };
    })(this), EVENT_END_LAG);
  };

  Window.prototype.onscrollOnce = function(ev) {
    var ref;
    this.trigger("SCROLL_START");
    if ((ev != null ? (ref = ev.currentTarget) != null ? ref.scrollY : void 0 : void 0) != null) {
      this.endScrollY = ev.currentTarget.scrollY;
    }
  };

  Window.prototype.onscroll = function(ev) {
    this.scrollY = ev.currentTarget.scrollY;
    this.trigger("SCROLL");
    _scrollThrottle.exec((function(_this) {
      return function() {
        return _this.trigger("SCROLLING");
      };
    })(this));
    if (_scrollTimer !== false) {
      clearTimeout(_scrollTimer);
    }
    _scrollTimer = setTimeout((function(_this) {
      return function() {
        var ref;
        if ((ev != null ? (ref = ev.currentTarget) != null ? ref.scrollY : void 0 : void 0) != null) {
          _this.startScrollY = ev.currentTarget.scrollY;
        }
        if (_this.startScrollY < _this.endScrollY) {
          _this.scrollDirection = "up";
        } else if (_this.startScrollY > _this.endScrollY) {
          _this.scrollDirection = "down";
        }
        _this.$el.one("scroll", _this.onscrollOnce);
        return _this.trigger("SCROLLED");
      };
    })(this), EVENT_END_LAG);
  };

  Window.prototype.onmousewheel = function(ev) {
    var delta;
    delta = ev.originalEvent.deltaY ? -ev.originalEvent.deltaY : ev.originalEvent.wheelDelta ? ev.originalEvent.wheelDelta : -ev.originalEvent.detail;
    this.trigger("WHEEL", delta);
    _wheelThrottle.exec((function(_this) {
      return function() {
        return _this.trigger("WHEELING", delta);
      };
    })(this));
    if (_wheelTimer !== false) {
      clearTimeout(_wheelTimer);
    }
    _wheelTimer = setTimeout((function(_this) {
      return function() {
        return _this.trigger("WHEELED", delta);
      };
    })(this), EVENT_END_LAG);
  };

  Window.prototype.ontouchstart = function(ev) {
    this.startPageX = ev.originalEvent.changedTouches[0].pageX;
    this.startPageY = ev.originalEvent.changedTouches[0].pageY;
    this.trigger("TOUCH_START");
  };

  Window.prototype.ontouchmove = function(ev) {
    this.endPageX = ev.originalEvent.changedTouches[0].pageX;
    this.endPageY = ev.originalEvent.changedTouches[0].pageY;
    this.swipeRangeY = this.startPageY - this.endPageY;
    this.swipeRangeX = this.startPageX - this.endPageX;
    if (this.startPageX === this.endPageX || this.startPageY === this.endPageY) {
      return;
    }
    if (this.startPageY < this.endPageY) {
      this.swipeDirection = "up";
      this.trigger("SWIPING_UP", this.swipeRangeY);
    } else if (this.startPageY > this.endPageY) {
      this.swipeDirection = "down";
      this.trigger("SWIPING_DOWN", this.swipeRangeY);
    } else if (this.startPageX < this.endPageX) {
      this.swipeDirection = "left";
      this.trigger("SWIPING_LEFT", this.swipeRangeX);
    } else if (this.startPageX > this.endPageX) {
      this.swipeDirection = "right";
      this.trigger("SWIPING_RIGHT", this.swipeRangeX);
    }
    this.trigger("TOUCH_MOVE", ev);
    if (_touchTimer !== false) {
      clearTimeout(_touchTimer);
    }
    _touchTimer = setTimeout((function(_this) {
      return function() {
        _this.trigger("TOUCHED", ev);
        return _this.ontouchend(ev);
      };
    })(this), 200);
  };

  Window.prototype.ontouchend = function(ev) {
    this.endPageX = ev.originalEvent.changedTouches[0].pageX;
    this.endPageY = ev.originalEvent.changedTouches[0].pageY;
    if (this.startPageX === this.endPageX || this.startPageY === this.endPageY) {
      return;
    }
    if (this.startPageY < this.endPageY) {
      this.swipeDirection = "up";
      this.trigger("SWIPED_UP");
    } else if (this.startPageY > this.endPageY) {
      this.swipeDirection = "down";
      this.trigger("SWIPED_DOWN");
    } else if (this.startPageX < this.endPageX) {
      this.swipeDirection = "left";
      this.trigger("SWIPED_LEFT");
    } else if (this.startPageX > this.endPageX) {
      this.swipeDirection = "right";
      this.trigger("SWIPED_RIGHT");
    }
    this.trigger("TOUCH_END");
  };

  Window.prototype.onpopstate = function(ev) {
    this.trigger("POPSTATE", ev);
  };

  Window.prototype.onorientationchange = function(ev) {
    var direction;
    if (Math.abs(this.el.orientation === 90)) {
      this.trigger("LANDSCAPE");
      direction = "LANDSCAPE";
    } else {
      this.trigger("PORTRAIT");
      direction = "PORTRAIT";
    }
    this.trigger("ORIENTATION", direction);
    this.trigger("RESIZING");
  };

  Window.prototype.onkeydown = function(ev) {
    var key;
    key = {};
    key.p = ev.which === 80;
    key.s = ev.which === 83;
    key.cmd = ev.ctrlKey || ev.metaKey;
    if (key.cmd && key.p) {
      this.trigger("KEY_CMD_P", ev);
    } else if (key.cmd && key.s) {
      this.trigger("KEY_CMD_S", ev);
    }
  };

  Window.prototype.startOffsetMove = function(distance, speed, callback) {
    if (distance == null) {
      distance = 0;
    }
    if (speed == null) {
      speed = 1000;
    }
    if (detect.isChrome()) {
      $("html").stop().animate({
        scrollTop: distance
      }, speed, "easeInOutExpo", (function(_this) {
        return function() {
          return typeof callback === "function" ? callback() : void 0;
        };
      })(this));
    } else if (detect.isSafari() || detect.isMobileSafari() || detect.isEdge()) {
      $("body").stop().animate({
        scrollTop: distance
      }, speed, "easeInOutExpo", (function(_this) {
        return function() {
          return typeof callback === "function" ? callback() : void 0;
        };
      })(this));
    } else {
      $("html,body").stop().animate({
        scrollTop: distance
      }, speed, "easeInOutExpo", (function(_this) {
        return function() {
          return typeof callback === "function" ? callback() : void 0;
        };
      })(this));
    }
  };

  Window.prototype.startOffsetVelocity = function($el, speed, offset, callback) {
    if (speed == null) {
      speed = 1000;
    }
    if (offset == null) {
      offset = 0;
    }
    $el.velocity("scroll", {
      duration: speed,
      easing: "easeOutExpo",
      offset: offset,
      complete: (function(_this) {
        return function() {
          if (callback != null) {
            return callback();
          }
        };
      })(this)
    });
  };

  Window.prototype.stopOffsetMove = function() {
    this.$scrollTag.stop();
  };

  Window.prototype.getBodyHeight = function() {
    return Math.max.apply(null, [document.body.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight]);
  };

  Window.prototype.isTabletW = function() {
    return this.el.innerWidth < c.TABLET_WIN_W;
  };

  Window.prototype.isTablet = function() {
    return !detect.isPc() || this.el.innerWidth < c.TABLET_WIN_W;
  };

  Window.prototype.isFirstAccess = function() {
    return $.cookie("access") === void 0;
  };

  Window.prototype.setAccessCookie = function() {
    $.cookie("access", "onece");
  };

  Window.prototype.removeAccessCookie = function() {
    if (c.COOKIE_DEBUG_MODE) {
      $.removeCookie("access");
    }
  };

  return Window;

})(EO);


},{"../../_config":1,"../../_helpers/EventObserver":7,"../../_helpers/Throttle":9,"../../_helpers/detect":13}],27:[function(require,module,exports){
var HeaderHam, c, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

c = require("../../../_config");

log = require("../../../_helpers/log");

module.exports = HeaderHam = (function() {
  function HeaderHam(w) {
    this.w = w;
    this.resize = bind(this.resize, this);
    this.onscroll = bind(this.onscroll, this);
    this.close = bind(this.close, this);
    this.toggle = bind(this.toggle, this);
    this.$el = $(".js-headerHam");
    this.$inner = $(".js-headerHam__inner");
    return;
  }

  HeaderHam.prototype.toggle = function(isOpened) {
    this.$inner.toggleClass("active");
    if (isOpened) {
      this.$el.removeClass("type-black");
      this.$el.addClass("type-black");
    } else {
      this.$el.removeClass("type-black");
    }
  };

  HeaderHam.prototype.close = function() {
    this.$inner.removeClass("active");
    this.$el.removeClass("type-black");
    this.$el.removeClass("type-white");
  };

  HeaderHam.prototype.onscroll = function() {
    var ismodal;
    ismodal = $("body").attr("data-ismodal");
    if (ismodal === "true") {
      return;
    }
    if (this.w.t() > (this.w.h() - c.COLOR_SWITCH_DIFF_Y)) {
      this.$el.removeClass("type-white");
      this.$el.addClass("type-white");
    } else {
      this.$el.removeClass("type-white");
    }
  };

  HeaderHam.prototype.resize = function() {};

  return HeaderHam;

})();


},{"../../../_config":1,"../../../_helpers/log":18}],28:[function(require,module,exports){
var EO, HeaderNav, c, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

c = require("../../../_config");

EO = require("../../../_helpers/EventObserver");

log = require("../../../_helpers/log");

module.exports = HeaderNav = (function(superClass) {
  extend(HeaderNav, superClass);

  HeaderNav.prototype.logoIsLarged = false;

  function HeaderNav(w, router) {
    this.w = w;
    this.router = router;
    this.onscroll = bind(this.onscroll, this);
    this.close = bind(this.close, this);
    this.toggle = bind(this.toggle, this);
    this.$el = $(".js-headerNav");
    this.$logo = $(".js-header__logo");
    this.$shadow = $(".js-headerNav__shadow");
    this.$bg = $(".js-headerNav__bg");
    this.$list = $(".js-headerNav__list li");
    this.$logo.on("click", (function(_this) {
      return function() {
        return _this.trigger("CLICK");
      };
    })(this));
    this.$shadow.on("click", (function(_this) {
      return function() {
        return _this.trigger("CLICK");
      };
    })(this));
    this.$list.on("click", (function(_this) {
      return function() {
        return _this.trigger("CLICK");
      };
    })(this));
    this.$shadow.stop().velocity({
      opacity: 0
    }, 0);
    this.$bg.stop().velocity({
      translateX: -500
    }, 0);
    return;
  }

  HeaderNav.prototype.toggle = function(isOpened) {
    if (isOpened) {
      this.$el.addClass("active");
      this.$shadow.stop().velocity({
        opacity: 0.5
      }, 400);
      this.$bg.stop().velocity({
        translateX: 0
      }, 400, "easeOutExpo");
    } else {
      this.$el.removeClass("active");
      this.$shadow.stop().velocity({
        opacity: 0
      }, 0);
      this.$bg.stop().velocity({
        translateX: -500
      }, 0);
    }
  };

  HeaderNav.prototype.close = function() {
    this.$el.removeClass("active");
  };

  HeaderNav.prototype.onscroll = function() {};

  return HeaderNav;

})(EO);


},{"../../../_config":1,"../../../_helpers/EventObserver":7,"../../../_helpers/log":18}],29:[function(require,module,exports){
var DelayObj, c, detect,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

c = require("../../_config");

detect = require("../../_helpers/detect");

module.exports = DelayObj = (function() {
  DelayObj.prototype.els = [];

  DelayObj.prototype.isOff = false;

  DelayObj.prototype.DELAY = 0;

  DelayObj.prototype.SPEED = 1.5;

  DelayObj.prototype.RATE = 1;

  DelayObj.prototype.EASE = Power4.easeOut;

  function DelayObj(w, viewport) {
    this.w = w;
    this.viewport = viewport;
    this.onscroll = bind(this.onscroll, this);
    this.resetY = bind(this.resetY, this);
    this.off = bind(this.off, this);
    this.on = bind(this.on, this);
    this.init = bind(this.init, this);
    this.$el = $(".js-delayObj");
    this.els = [];
    this.init();
    return;
  }

  DelayObj.prototype.init = function() {
    this.$el.each((function(_this) {
      return function(i, o) {
        _this.els[i] = {};
        _this.els[i].id = i;
        if ($(o).attr("data-diff")) {
          _this.els[i].diff = $(o).attr("data-diff");
        } else {
          _this.els[i].delay = _this.DELAY;
        }
        if ($(o).attr("data-speed")) {
          _this.els[i].speed = $(o).attr("data-speed");
        } else {
          _this.els[i].speed = _this.SPEED;
        }
        if ($(o).attr("data-rate")) {
          return _this.els[i].rate = $(o).attr("data-rate");
        } else {
          return _this.els[i].rate = _this.RATE;
        }
      };
    })(this));
  };

  DelayObj.prototype.on = function() {
    return this.isOff = false;
  };

  DelayObj.prototype.off = function() {
    return this.isOff = true;
  };

  DelayObj.prototype.resetY = function(speed) {
    if (!speed) {
      speed = 0;
    }
    this.off();
    this.viewport.setScroll();
    this.$el.each((function(_this) {
      return function(i, o) {
        return TweenLite.to(o, speed, {
          y: 0,
          ease: _this.EASE
        });
      };
    })(this));
  };

  DelayObj.prototype.onscroll = function() {
    if (this.isOff) {
      return;
    }
    if (!detect.isPc()) {
      this.$el.each((function(_this) {
        return function(i, o) {
          var speed;
          speed = _this.els[i].speed;
          return TweenMax.set(o, {
            y: -_this.viewport.isY
          });
        };
      })(this));
    } else {
      this.$el.each((function(_this) {
        return function(i, o) {
          var speed;
          speed = _this.els[i].speed;
          return TweenLite.to(o, speed, {
            y: -_this.viewport.isY,
            ease: _this.EASE
          });
        };
      })(this));
    }
  };

  return DelayObj;

})();


},{"../../_config":1,"../../_helpers/detect":13}],30:[function(require,module,exports){
var FadeObj, c, detect,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

c = require("../../_config");

detect = require("../../_helpers/detect");

module.exports = FadeObj = (function() {
  FadeObj.prototype.els = [];

  FadeObj.prototype.isAllActived = false;

  FadeObj.prototype.PC_SCROLL_FIRE_DIFF_Y = 0;

  FadeObj.prototype.SP_SCROLL_FIRE_DIFF_Y = 30;

  FadeObj.prototype.SHOW_BEGIN_SCALE = 1;

  FadeObj.prototype.SHOW_SPEED = 2000;

  FadeObj.prototype.SHOW_EASE = "easeOutCubic";

  function FadeObj(w) {
    this.w = w;
    this.onscroll = bind(this.onscroll, this);
    this.scrollFire = bind(this.scrollFire, this);
    this.show = bind(this.show, this);
    this.init = bind(this.init, this);
    this.$el = $(".js-fadeObj");
    this.isAllActived = false;
    this.els = [];
    this.init();
    return;
  }

  FadeObj.prototype.init = function() {
    if (!detect.isPc()) {
      return;
    }
    this.$el.each((function(_this) {
      return function(i, o) {
        _this.els[i] = {};
        _this.els[i].id = i;
        _this.els[i].$el = $(o);
        _this.els[i].isActive = false;
        if ($(o).attr("data-delay")) {
          _this.els[i].delay = $(o).attr("data-delay");
        } else {
          _this.els[i].delay = 0;
        }
        return $(o).velocity({
          "translateY": 30,
          "scale": _this.SHOW_BEGIN_SCALE
        }, 0);
      };
    })(this));
  };

  FadeObj.prototype.show = function(current, delay) {
    if (!detect.isPc()) {
      return;
    }
    if (!delay) {
      delay = 0;
    }
    _.delay((function(_this) {
      return function() {
        return _this.$el.eq(current).velocity({
          "translateY": 0,
          "scale": 1
        }, _this.SHOW_SPEED, _this.SHOW_EASE);
      };
    })(this), delay);
  };

  FadeObj.prototype.scrollFire = function() {
    var el, j, len, ref;
    if (!detect.isPc()) {
      return;
    }
    if (this.isAllActived) {
      return;
    }
    ref = this.els;
    for (j = 0, len = ref.length; j < len; j++) {
      el = ref[j];
      this.isAllActived = el.isActive;
    }
    this.$el.each((function(_this) {
      return function(i, o) {
        var diff;
        if (_this.els[i].isActive) {
          return;
        }
        if (detect.isPc()) {
          diff = _this.PC_SCROLL_FIRE_DIFF_Y;
        } else {
          diff = _this.SP_SCROLL_FIRE_DIFF_Y;
        }
        if (_this.w.b() > _this.els[i].$el.offset().top + diff) {
          _this.show(_this.els[i].id, _this.els[i].delay);
          return _this.els[i].isActive = true;
        }
      };
    })(this));
  };

  FadeObj.prototype.onscroll = function() {
    this.scrollFire();
  };

  return FadeObj;

})();


},{"../../_config":1,"../../_helpers/detect":13}],31:[function(require,module,exports){
var Gmap,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports = Gmap = (function() {
  function Gmap() {
    this.setup = bind(this.setup, this);
    $(".js-gmap").each((function(_this) {
      return function(i, o) {
        var id, lat, lng;
        id = $(o).attr("id");
        lat = $(o).data("lat");
        lng = $(o).data("lng");
        return _this.setup(id, lat, lng);
      };
    })(this));
  }

  Gmap.prototype.setup = function(id, lat, lng) {
    var elMap, ggMap, marker, opt;
    opt = {
      gestureHandling: "cooperative",
      zoom: 17,
      center: new google.maps.LatLng(lat, lng),
      styles: [
        {
          "featureType": "all",
          "elementType": "all",
          "stylers": [
            {
              "saturation": -100
            }, {
              "gamma": 1.5
            }
          ]
        }
      ]
    };
    elMap = document.getElementById(id);
    ggMap = new google.maps.Map(elMap, opt);
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: ggMap
    });
  };

  return Gmap;

})();


},{}],32:[function(require,module,exports){
var EO, Modal, c, detect, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

c = require("../../_config");

EO = require("../../_helpers/EventObserver");

log = require("../../_helpers/log");

detect = require("../../_helpers/detect");

module.exports = Modal = (function(superClass) {
  extend(Modal, superClass);

  Modal.prototype.isOpened = false;

  Modal.prototype.OPEN_SPEED = 1000;

  Modal.prototype.OPEN_SPEED_DIFF = 300;

  Modal.prototype.CLOSE_SPEED = 600;

  function Modal(w, id, closed) {
    this.w = w;
    this.id = id;
    this.closed = closed;
    this.onresize = bind(this.onresize, this);
    this.setHeight = bind(this.setHeight, this);
    this.close = bind(this.close, this);
    this.open = bind(this.open, this);
    this.toggle = bind(this.toggle, this);
    this.init = bind(this.init, this);
    $(".js-modal").each((function(_this) {
      return function(i, o) {
        if ($(o).data("id") === _this.id) {
          _this.$el = $(o);
          _this.$mask = _this.$el.find(".js-modal__mask");
          _this.$shadow = _this.$el.find(".js-modal__shadow");
          _this.$unit = _this.$el.find(".js-modal__unit");
          return _this.$close = _this.$el.find(".js-modal__close");
        }
      };
    })(this));
    if (this.$close[0]) {
      this.$close.on("click", this.close);
    }
    this.setHeight();
    this.init();
    return;
  }

  Modal.prototype.init = function() {
    if (detect.isSafari()) {
      this.OPEN_SPEED_DIFF = 0;
    }
    this.$mask.velocity({
      opacity: 0,
      rotateX: 30,
      rotateY: 30
    }, 0);
    this.$shadow.velocity({
      opacity: 0,
      rotateX: 30,
      rotateY: 30
    }, 0);
  };

  Modal.prototype.toggle = function(callback) {
    if (this.isOpened) {
      this.close(callback);
    } else {
      this.open(callback);
    }
  };

  Modal.prototype.open = function(begin, end) {
    if (this.isOpened) {
      return;
    }
    this.isOpened = true;
    this.trigger("OPEN");
    this.$el.css({
      "display": "block"
    });
    this.setHeight();
    if (typeof begin === "function") {
      begin();
    }
    this.$shadow.stop().velocity({
      opacity: 0,
      rotateX: 30,
      rotateY: 30
    }, 0);
    this.$shadow.stop().velocity({
      opacity: 0.3,
      rotateX: 0,
      rotateY: 0
    }, {
      duration: this.OPEN_SPEED + this.OPEN_SPEED_DIFF,
      easing: "easeOutExpo"
    });
    this.$mask.stop().velocity({
      opacity: 0,
      rotateX: 30,
      rotateY: 30
    }, 0);
    this.$mask.stop().velocity({
      opacity: 1,
      rotateX: 0,
      rotateY: 0
    }, {
      duration: this.OPEN_SPEED + this.OPEN_SPEED_DIFF,
      easing: "easeOutExpo",
      complete: (function(_this) {
        return function() {
          if (typeof end === "function") {
            end();
          }
        };
      })(this)
    });
  };

  Modal.prototype.close = function(begin, end) {
    if (!this.isOpened) {
      return;
    }
    this.isOpened = false;
    if (typeof begin === "function") {
      begin();
    }
    this.$shadow.stop().velocity({
      opacity: 0.3,
      rotateX: 0,
      rotateY: 0
    }, 0);
    this.$shadow.stop().velocity({
      opacity: 0,
      rotateX: 10,
      rotateY: 10
    }, {
      duration: this.CLOSE_SPEED,
      easing: "easeOutExpo"
    });
    this.$mask.stop().velocity({
      opacity: 1,
      rotateX: 0,
      rotateY: 0
    }, 0);
    this.$mask.stop().velocity({
      opacity: 0,
      rotateX: 10,
      rotateY: 10
    }, {
      duration: this.CLOSE_SPEED,
      easing: "easeOutExpo",
      complete: (function(_this) {
        return function() {
          _this.$el.css({
            "display": "none"
          });
          _this.trigger("CLOSE");
          if (typeof _this.closed === "function") {
            _this.closed();
          }
          return typeof end === "function" ? end() : void 0;
        };
      })(this)
    });
  };

  Modal.prototype.setHeight = function() {
    var iphoneBugH, minH;
    iphoneBugH = 150;
    minH = this.w.h() + iphoneBugH;
    this.$el.css({
      "height": "auto"
    });
    this.$el.css({
      "min-height": minH,
      "height": this.$unit.height()
    });
    this.$mask.css({
      "height": minH
    });
    this.$shadow.css({
      "height": minH
    });
  };

  Modal.prototype.onresize = function() {
    this.setHeight();
  };

  return Modal;

})(EO);


},{"../../_config":1,"../../_helpers/EventObserver":7,"../../_helpers/detect":13,"../../_helpers/log":18}],33:[function(require,module,exports){
var OneLetter, c, log, math,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

c = require("../../_config");

log = require("../../_helpers/log");

math = require("../../_helpers/math");

module.exports = OneLetter = (function() {
  OneLetter.prototype.titles = [];

  OneLetter.prototype.isAllActived = false;

  OneLetter.prototype.PC_SCROLL_FIRE_DIFF_Y = 100;

  OneLetter.prototype.SP_SCROLL_FIRE_DIFF_Y = 30;

  function OneLetter(w, $el) {
    this.w = w;
    this.$el = $el;
    this.scrollFire = bind(this.scrollFire, this);
    this.show = bind(this.show, this);
    this.addSpanTag = bind(this.addSpanTag, this);
    this.isAllActived = false;
    this.titles = [];
    this.addSpanTag();
    return;
  }

  OneLetter.prototype.addSpanTag = function() {
    this.$el.each((function(_this) {
      return function(i, o) {
        var j, n, ref, spanStr, str;
        _this.titles[i] = {};
        _this.titles[i].id = i;
        _this.titles[i].$el = $(o);
        _this.titles[i].isActive = false;
        if ($(o).attr("data-delay")) {
          _this.titles[i].delay = $(o).attr("data-delay");
        } else {
          _this.titles[i].delay = 0;
        }
        _this.titles[i].orghtml = str = $(o).html();
        str = str.split("<br>");
        for (n = j = 0, ref = str.length; 0 <= ref ? j < ref : j > ref; n = 0 <= ref ? ++j : --j) {
          spanStr = "";
          str[n].split("").forEach(function(c) {
            if (c === " ") {
              return spanStr += "<span class='space'>" + c + "</span>";
            } else {
              return spanStr += "<span>" + c + "</span>";
            }
          });
          _this.titles[i].html += spanStr + "<br>";
        }
        _this.titles[i].html = _this.titles[i].html.replace(/undefined/g, "");
        _this.titles[i].html = _this.titles[i].html.slice(0, -4);
        return $(o).html(_this.titles[i].html);
      };
    })(this));
  };

  OneLetter.prototype.show = function(current) {
    var $spans;
    this.$el.css({
      "opacity": 1
    });
    if (!current) {
      current = 0;
    }
    $spans = this.titles[current].$el.find("span");
    $spans.removeClass("is-active");
    _.delay((function(_this) {
      return function() {
        return $spans.each(function(i, o) {
          return _.delay(function() {
            return $(o).addClass("is-active");
          }, i * 60);
        });
      };
    })(this), this.titles[current].delay);
  };

  OneLetter.prototype.scrollFire = function() {
    var j, len, ref, title;
    if (this.isAllActived) {
      return;
    }
    ref = this.titles;
    for (j = 0, len = ref.length; j < len; j++) {
      title = ref[j];
      this.isAllActived = title.isActive;
    }
    this.$el.each((function(_this) {
      return function(i, o) {
        var diff;
        if (_this.titles[i].isActive) {
          return;
        }
        if (detect.isPc()) {
          diff = _this.PC_SCROLL_FIRE_DIFF_Y;
        } else {
          diff = _this.SP_SCROLL_FIRE_DIFF_Y;
        }
        if (_this.w.b() > _this.titles[i].$el.offset().top + diff) {
          _this.show(_this.titles[i].id);
          return _this.titles[i].isActive = true;
        }
      };
    })(this));
  };

  return OneLetter;

})();


},{"../../_config":1,"../../_helpers/log":18,"../../_helpers/math":19}],34:[function(require,module,exports){
var Firstview, OneLetter, View, c, detect, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

c = require("../../../_config");

log = require("../../../_helpers/log");

detect = require("../../../_helpers/detect");

View = require("../../../_helpers/View");

OneLetter = require("../../_module/OneLetter");

module.exports = Firstview = (function(superClass) {
  extend(Firstview, superClass);

  Firstview.prototype.ViewName = "Firstview";

  function Firstview(w, viewport) {
    this.w = w;
    this.viewport = viewport;
    this.onresize = bind(this.onresize, this);
    this.onscroll = bind(this.onscroll, this);
    this.showComingSoon = bind(this.showComingSoon, this);
    this.showVis = bind(this.showVis, this);
    this.showTexts = bind(this.showTexts, this);
    this.init = bind(this.init, this);
    this.$el = $(".js-firstview");
    if (!this.$el[0]) {
      return;
    }
    this.$vis = $(".js-firstview__vis");
    this.$img = this.$vis.find("img");
    this.$cs = $(".js-firstview__cs");
    this.$rb = $(".js-firstview__rb");
    this.$logo = $(".js-firstview__logo");
    this.$share = $(".js-firstview__share");
    this.$vis.velocity({
      opacity: 0
    }, 0);
    this.$rb.velocity({
      opacity: 0,
      translateY: 50
    }, 0);
    this.$logo.velocity({
      opacity: 0,
      translateY: 50
    }, 0);
    this.$share.velocity({
      opacity: 0,
      translateY: -200
    }, 0);
    this.init();
    this.onresize();
    return;
  }

  Firstview.prototype.init = function() {
    this.showVis();
    this.showComingSoon();
    _.delay(this.showTexts, 500);
  };

  Firstview.prototype.showTexts = function() {
    _.delay((function(_this) {
      return function() {
        return _this.$share.velocity({
          opacity: 1,
          translateY: 0
        }, 1000, "easeOutExpo");
      };
    })(this), 500);
    _.delay((function(_this) {
      return function() {
        _this.$rb.velocity({
          opacity: 1,
          translateY: 0
        }, 1000, "easeOutExpo");
        return _this.$logo.velocity({
          opacity: 1,
          translateY: 0
        }, 1000, "easeOutExpo");
      };
    })(this), 1500);
  };

  Firstview.prototype.showVis = function() {
    console.log("showVis");
    _.delay((function(_this) {
      return function() {
        return _this.$vis.velocity({
          opacity: 1
        }, 2500, _this.viewport.on);
      };
    })(this), 200);
  };

  Firstview.prototype.showComingSoon = function() {
    if (!this.$cs[0]) {
      return;
    }
    this.$cs_txt = $(".js-firstview__cs_txt");
    this.$cs_date = $(".js-firstview__cs_date");
    this.$cs_txt.velocity({
      opacity: 0,
      translateY: 0
    }, 0);
    this.$cs_date.velocity({
      opacity: 0,
      translateY: 20
    }, 0);
    _.delay((function(_this) {
      return function() {
        return _this.$cs_txt.velocity({
          opacity: 1,
          translateY: 0
        }, 2000);
      };
    })(this), 1000);
    _.delay((function(_this) {
      return function() {
        return _this.$cs_date.velocity({
          opacity: 1,
          translateY: 0
        }, 2000, "easeOutExpo");
      };
    })(this), 2000);
  };

  Firstview.prototype.onscroll = function() {
    if (this.w.t() > ((this.w.h() * 2) - c.COLOR_SWITCH_DIFF_Y)) {
      this.$rb.removeClass("type-white");
      this.$rb.addClass("type-white");
    } else {
      this.$rb.removeClass("type-white");
    }
  };

  Firstview.prototype.onresize = function() {
    if (!this.$el[0]) {
      return;
    }
    if (!this.w.isTabletW()) {
      this.$el.css({
        "height": this.w.h(),
        "min-height": this.w.h()
      });
      this.visW = this.$img.width();
      this.$vis.css({
        "width": this.visW
      });
      this.$rb.css({
        "margin-left": this.visW / 2
      });
      this.$logo.css({
        "height": "100%",
        "margin-left": -(this.visW / 2 + this.$logo.width())
      });
      if (!this.$cs[0]) {
        return;
      }
      this.$cs.css({
        "margin-left": this.visW / 2
      });
    } else {
      this.$el.css({
        "height": "auto",
        "min-height": this.w.h()
      });
      this.$vis.css({
        "width": "100%"
      });
      this.visH = this.$img.height();
      this.$rb.css({
        "margin-left": 0
      });
      this.$logo.css({
        "height": this.visH,
        "margin-left": 0
      });
      if (!this.$cs[0]) {
        return;
      }
      this.$cs.css({
        "margin-left": 0
      });
    }
  };

  return Firstview;

})(View);


},{"../../../_config":1,"../../../_helpers/View":10,"../../../_helpers/detect":13,"../../../_helpers/log":18,"../../_module/OneLetter":33}],35:[function(require,module,exports){
var Look, LookItems, LookModal, View, c, detect, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

c = require("../../../_config");

log = require("../../../_helpers/log");

detect = require("../../../_helpers/detect");

View = require("../../../_helpers/View");

LookItems = require("./LookItems");

LookModal = require("./LookModal");

module.exports = Look = (function(superClass) {
  extend(Look, superClass);

  Look.prototype.ViewName = "Look";

  function Look(w, viewport) {
    this.w = w;
    this.viewport = viewport;
    this.onresize = bind(this.onresize, this);
    this.$el = $(".js-look");
    if (!this.$el[0]) {
      return;
    }
    this.items = new LookItems(this.w, this.viewport);
    this.modal = new LookModal(this.w, this.viewport, this.items);
    return;
  }

  Look.prototype.onresize = function() {
    this.modal.onresize();
    this.items.onresize();
    this.$el.height(this.items.h);
  };

  return Look;

})(View);


},{"../../../_config":1,"../../../_helpers/View":10,"../../../_helpers/detect":13,"../../../_helpers/log":18,"./LookItems":36,"./LookModal":37}],36:[function(require,module,exports){
var LookItems, View, c, detect, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

c = require("../../../_config");

log = require("../../../_helpers/log");

detect = require("../../../_helpers/detect");

View = require("../../../_helpers/View");

module.exports = LookItems = (function(superClass) {
  extend(LookItems, superClass);

  LookItems.prototype.ViewName = "LookItems";

  function LookItems(w, viewport) {
    this.w = w;
    this.viewport = viewport;
    this.onresize = bind(this.onresize, this);
    this.init = bind(this.init, this);
    this.$el = $(".js-look__items");
    this.init();
    return;
  }

  LookItems.prototype.init = function() {
    this.$el.find("li").each((function(_this) {
      return function(i, o) {
        var pic;
        pic = $(o).find(".js-look__items_pic");
        return pic.on("click", function() {
          return _this.trigger("CLICK", i);
        });
      };
    })(this));
  };

  LookItems.prototype.onresize = function() {};

  return LookItems;

})(View);


},{"../../../_config":1,"../../../_helpers/View":10,"../../../_helpers/detect":13,"../../../_helpers/log":18}],37:[function(require,module,exports){
var LookModal, View, c, detect, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

c = require("../../../_config");

log = require("../../../_helpers/log");

detect = require("../../../_helpers/detect");

View = require("../../../_helpers/View");

module.exports = LookModal = (function(superClass) {
  extend(LookModal, superClass);

  LookModal.prototype.ViewName = "LookModal";

  LookModal.prototype.OPEN_SPEED = 600;

  LookModal.prototype.OPEN_SPEED_DIFF = 300;

  LookModal.prototype.CLOSE_SPEED = 600;

  function LookModal(w, viewport, list) {
    this.w = w;
    this.viewport = viewport;
    this.list = list;
    this.onresize = bind(this.onresize, this);
    this.close = bind(this.close, this);
    this.open = bind(this.open, this);
    this.init = bind(this.init, this);
    this.$el = $(".js-lookModal");
    this.$shadow = $(".js-lookModal__shadow");
    this.$mask = $(".js-lookModal__mask");
    this.$close = $(".js-lookModal__close");
    this.$items = $(".js-lookModal__items_li");
    this.$pic = $(".js-lookModal__items_pic");
    this.$close.on("click", this.close);
    this.$pic.on("click", this.close);
    this.list.on("CLICK", this.open);
    this.init();
    return;
  }

  LookModal.prototype.init = function() {
    if (detect.isSafari()) {
      this.OPEN_SPEED_DIFF = 0;
    }
    this.$mask.stop().velocity({
      opacity: 0,
      rotateX: -30,
      rotateY: -30
    }, 0);
    this.$shadow.stop().velocity({
      opacity: 0,
      rotateX: -30,
      rotateY: -30
    }, 0);
  };

  LookModal.prototype.open = function(i) {
    this.$items.eq(i).addClass("is-active");
    this.$el.css({
      "display": "block"
    });
    this.$shadow.stop().velocity({
      opacity: 0,
      rotateX: -30,
      rotateY: -30
    }, 0);
    this.$shadow.stop().velocity({
      opacity: 1,
      rotateX: 0,
      rotateY: 0
    }, {
      duration: this.OPEN_SPEED + this.OPEN_SPEED_DIFF,
      easing: "easeOutExpo"
    });
    this.$mask.stop().velocity({
      opacity: 0,
      rotateX: -30,
      rotateY: -30
    }, 0);
    this.$mask.stop().velocity({
      opacity: 1,
      rotateX: 0,
      rotateY: 0
    }, {
      duration: this.OPEN_SPEED + this.OPEN_SPEED_DIFF,
      easing: "easeOutExpo"
    });
  };

  LookModal.prototype.close = function() {
    this.$shadow.stop().velocity({
      opacity: 1,
      rotateX: 0,
      rotateY: 0
    }, 0);
    this.$shadow.stop().velocity({
      opacity: 0,
      rotateX: 20,
      rotateY: 20
    }, {
      duration: this.CLOSE_SPEED,
      easing: "easeOutExpo"
    });
    this.$mask.stop().velocity({
      opacity: 1,
      rotateX: 0,
      rotateY: 0
    }, 0);
    this.$mask.stop().velocity({
      opacity: 0,
      rotateX: 20,
      rotateY: 20
    }, {
      duration: this.CLOSE_SPEED,
      easing: "easeOutExpo",
      complete: (function(_this) {
        return function() {
          _this.$el.css({
            "display": "none"
          });
          return _this.$items.removeClass("is-active");
        };
      })(this)
    });
  };

  LookModal.prototype.onresize = function() {
    if (!this.w.isTabletW()) {
      this.$pic.height(this.w.h());
    } else {
      this.$pic.height("auto");
    }
  };

  return LookModal;

})(View);


},{"../../../_config":1,"../../../_helpers/View":10,"../../../_helpers/detect":13,"../../../_helpers/log":18}],38:[function(require,module,exports){
var Modal, Modals, View, c, detect, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

c = require("../../../_config");

log = require("../../../_helpers/log");

detect = require("../../../_helpers/detect");

View = require("../../../_helpers/View");

Modal = require("../../../_views/_module/Modal");

module.exports = Modals = (function(superClass) {
  extend(Modals, superClass);

  Modals.prototype.ViewName = "Modals";

  function Modals(w, router, viewport, format, delayObj) {
    this.w = w;
    this.router = router;
    this.viewport = viewport;
    this.format = format;
    this.delayObj = delayObj;
    this.onresize = bind(this.onresize, this);
    this.returnTop = bind(this.returnTop, this);
    this.onClosed = bind(this.onClosed, this);
    this.onClose = bind(this.onClose, this);
    this.onOpened = bind(this.onOpened, this);
    this.onOpen = bind(this.onOpen, this);
    this.listener = bind(this.listener, this);
    this.initHash = bind(this.initHash, this);
    this.m1 = new Modal(this.w, "popup_shop");
    this.m2 = new Modal(this.w, "heel_shop");
    this.m3 = new Modal(this.w, "item_list");
    this.m4 = new Modal(this.w, "popup_concept");
    this.m5 = new Modal(this.w, "popup_perfume");
    this.m6 = new Modal(this.w, "popup_news");
    this.listener();
    this.initHash();
    return;
  }

  Modals.prototype.initHash = function() {
    if (this.router.hash === "#popup_shop") {
      _.delay((function(_this) {
        return function() {
          return _this.m1.open(_this.onOpen, _this.onOpened);
        };
      })(this), 1000);
    }
    if (this.router.hash === "#heel_shop") {
      _.delay((function(_this) {
        return function() {
          return _this.m2.open(_this.onOpen, _this.onOpened);
        };
      })(this), 1000);
    }
    if (this.router.hash === "#item_list") {
      _.delay((function(_this) {
        return function() {
          return _this.m3.open(_this.onOpen, _this.onOpened);
        };
      })(this), 1000);
    }
    if (this.router.hash === "#popup_concept") {
      _.delay((function(_this) {
        return function() {
          return _this.m4.open(_this.onOpen, _this.onOpened);
        };
      })(this), 1000);
    }
    if (this.router.hash === "#popup_perfume") {
      _.delay((function(_this) {
        return function() {
          return _this.m5.open(_this.onOpen, _this.onOpened);
        };
      })(this), 1000);
    }
    if (this.router.hash === "#popup_news") {
      _.delay((function(_this) {
        return function() {
          return _this.m6.open(_this.onOpen, _this.onOpened);
        };
      })(this), 1000);
    }
  };

  Modals.prototype.listener = function() {
    $('[data-modalopen="popup_shop"]').on("click", (function(_this) {
      return function() {
        _this.m2.close(_this.onClose, _this.onClosed);
        _this.m3.close(_this.onClose, _this.onClosed);
        _this.m1.open(_this.onOpen, _this.onOpened);
        _this.m4.close(_this.onOpen, _this.onOpened);
        _this.m5.close(_this.onOpen, _this.onOpened);
        return _this.m6.close(_this.onOpen, _this.onOpened);
      };
    })(this));
    $('[data-modalclose="popup_shop"]').on("click", (function(_this) {
      return function() {
        return _this.m1.close(_this.onClose, _this.returnTop);
      };
    })(this));
    $('[data-modalopen="heel_shop"]').on("click", (function(_this) {
      return function() {
        _this.m1.close(_this.onClose, _this.onClosed);
        _this.m3.close(_this.onClose, _this.onClosed);
        _this.m2.open(_this.onOpen, _this.onOpened);
        _this.m4.close(_this.onOpen, _this.onOpened);
        _this.m5.close(_this.onOpen, _this.onOpened);
        return _this.m6.close(_this.onOpen, _this.onOpened);
      };
    })(this));
    $('[data-modalclose="heel_shop"]').on("click", (function(_this) {
      return function() {
        return _this.m2.close(_this.onClose, _this.returnTop);
      };
    })(this));
    $('[data-modalopen="item_list"]').on("click", (function(_this) {
      return function() {
        _this.m1.close(_this.onClose, _this.onClosed);
        _this.m2.close(_this.onClose, _this.onClosed);
        _this.m3.open(_this.onOpen, _this.onOpened);
        _this.m4.close(_this.onOpen, _this.onOpened);
        _this.m5.close(_this.onOpen, _this.onOpened);
        return _this.m6.close(_this.onOpen, _this.onOpened);
      };
    })(this));
    $('[data-modalclose="item_list"]').on("click", (function(_this) {
      return function() {
        return _this.m3.close(_this.onClose, _this.returnTop);
      };
    })(this));
    $('[data-modalopen="popup_concept"]').on("click", (function(_this) {
      return function() {
        _this.m1.close(_this.onOpen, _this.onOpened);
        _this.m2.close(_this.onClose, _this.onClosed);
        _this.m3.close(_this.onClose, _this.onClosed);
        _this.m4.open(_this.onOpen, _this.onOpened);
        _this.m5.close(_this.onOpen, _this.onOpened);
        return _this.m6.close(_this.onOpen, _this.onOpened);
      };
    })(this));
    $('[data-modalclose="popup_concept"]').on("click", (function(_this) {
      return function() {
        return _this.m4.close(_this.onClose, _this.returnTop);
      };
    })(this));
    $('[data-modalopen="popup_perfume"]').on("click", (function(_this) {
      return function() {
        _this.m1.close(_this.onOpen, _this.onOpened);
        _this.m2.close(_this.onClose, _this.onClosed);
        _this.m3.close(_this.onClose, _this.onClosed);
        _this.m4.close(_this.onOpen, _this.onOpened);
        _this.m5.open(_this.onOpen, _this.onOpened);
        return _this.m6.close(_this.onOpen, _this.onOpened);
      };
    })(this));
    $('[data-modalclose="popup_perfume"]').on("click", (function(_this) {
      return function() {
        return _this.m5.close(_this.onClose, _this.returnTop);
      };
    })(this));
    $('[data-modalopen="popup_news"]').on("click", (function(_this) {
      return function() {
        _this.m1.close(_this.onOpen, _this.onOpened);
        _this.m2.close(_this.onClose, _this.onClosed);
        _this.m3.close(_this.onClose, _this.onClosed);
        _this.m4.close(_this.onOpen, _this.onOpened);
        _this.m5.close(_this.onOpen, _this.onOpened);
        return _this.m6.open(_this.onOpen, _this.onOpened);
      };
    })(this));
    $('[data-modalclose="popup_news"]').on("click", (function(_this) {
      return function() {
        return _this.m6.close(_this.onClose, _this.returnTop);
      };
    })(this));
  };

  Modals.prototype.onOpen = function() {
    this.viewport.setModalState(true);
    this.viewport.off();
    this.delayObj.resetY(0.5);
    this.format.contents.fixed();
    this.format.header.closeNav();
  };

  Modals.prototype.onOpened = function() {
    this.viewport.on();
    this.delayObj.on();
  };

  Modals.prototype.onClose = function() {
    this.viewport.setModalState(false);
    this.viewport.off();
    this.delayObj.resetY();
  };

  Modals.prototype.onClosed = function() {
    this.viewport.on();
    this.delayObj.on();
  };

  Modals.prototype.returnTop = function() {
    this.format.contents.relative();
    this.onClosed();
  };

  Modals.prototype.onresize = function() {
    this.m1.onresize();
    this.m2.onresize();
    this.m3.onresize();
  };

  return Modals;

})(View);


},{"../../../_config":1,"../../../_helpers/View":10,"../../../_helpers/detect":13,"../../../_helpers/log":18,"../../../_views/_module/Modal":32}],39:[function(require,module,exports){
var ShapeBg, View, c, detect, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

c = require("../../../_config");

log = require("../../../_helpers/log");

detect = require("../../../_helpers/detect");

View = require("../../../_helpers/View");

module.exports = ShapeBg = (function(superClass) {
  extend(ShapeBg, superClass);

  ShapeBg.prototype.ViewName = "ShapeBg";

  ShapeBg.prototype.isBlack = false;

  ShapeBg.prototype.isWhite = true;

  function ShapeBg(w, viewport) {
    this.w = w;
    this.viewport = viewport;
    this.onresize = bind(this.onresize, this);
    this.onscroll = bind(this.onscroll, this);
    this.$el = $(".js-shapeBg");
    this.$black = $(".js-shapeBg__black");
    this.$beige = $(".js-shapeBg__beige");
    this.$white = $(".js-shapeBg__white");
    this.$obj = $(".js-shapeBg__obj");
    this.$contents = $(".js-contents");
    return;
  }

  ShapeBg.prototype.onscroll = function() {
    if (this.w.t() < (this.w.h() - c.COLOR_SWITCH_DIFF_Y)) {
      if (this.isWhite) {
        return;
      }
      this.$white.stop().velocity({
        opacity: 1
      }, 1500);
      this.isWhite = true;
      this.isBlack = false;
    } else if (this.w.t() < ((this.w.h() * 2) - c.COLOR_SWITCH_DIFF_Y + 150)) {
      if (this.isWhite) {
        this.$white.stop().velocity({
          opacity: 0
        }, 1500);
        this.isWhite = false;
      }
      if (this.isBlack) {
        this.$beige.stop().velocity({
          opacity: 1
        }, 1500);
        this.isBlack = false;
      }
    } else {
      if (this.isBlack) {
        return;
      }
      this.$beige.stop().velocity({
        opacity: 0
      }, 1500);
      this.isBlack = true;
      this.isWhite = false;
    }
  };

  ShapeBg.prototype.onresize = function() {
    var h;
    this.$obj.css({
      "top": this.w.h()
    });
    h = this.$contents.height();
    this.$black.css({
      "min-height": h
    });
    return this.$beige.css({
      "min-height": h
    });
  };

  return ShapeBg;

})(View);


},{"../../../_config":1,"../../../_helpers/View":10,"../../../_helpers/detect":13,"../../../_helpers/log":18}]},{},[20]);
