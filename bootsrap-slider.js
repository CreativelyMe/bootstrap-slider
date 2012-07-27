(function ($) {
  bootsrapSliderClass = function (element, opts) {

    $.extend(bootsrapSliderClass, opts)

    var $this = $(element);

    this.init = function() {
      self = this;

      $this.css({'overflow': 'hidden'});
      this.links = $this.find('a.' + opts.link);
      this.back_links = $this.find('a.' + opts.back);

      this.pages = $this.find('.' + opts.page);
      this.container = $this.find('.' + opts.container);

      this.width = this.pages.first().width();
      this.number = this.pages.length;

      this.container.width(this.number * this.width)
      this.pages.css({'float':'left', 'width':(100/this.number)+'%'})

      this.bind(this);
      this.remember(this);
    }

    this.bind = function(self) {
      this.links.each(function() {
        console.log(self)
        console.log(self.pages)

        if($(this).data("remote") === true) {
          // $(this).bind("ajax:beforeSend", function(et, e) {  })

          $(this).bind("ajax:complete", function(object, xhr) {
            if($(this).data("target") === undefined) {
              self.pages.last().html(xhr.responseText);
              // FIXME set location hash
              forward(self, true);
            } else {
              $('.' + $(this).data("target")).html(xhr.responseText);
              forward(self, true);
            }
          })
        } else {
          $(this).live("click", function(e) {
            e.preventDefault();
            forward(self, true);
          });
        }
      })

      this.back_links.live('click', function(e) {
        e.preventDefault();
        if(location.hash.length > 0) {
          history.pushState("", document.title, window.location.pathname + window.location.search);
        }
        backward(self, true);
      })
    }

    this.remember = function(self) {
      try {
        var hash = location.hash.substr(1, location.hash.length);
        if (hash.length > 0 && hash.match(/[0-9]+/)) {
          $.ajax({
            url      : location.pathname + '/' + hash,
            type     : 'GET',
            dataType : 'script'
          }).complete(function(xhr) {
            self.pages.last().html(xhr.responseText);
            forward(self, false);
          });
        }
      } catch(err) { }
    }

    forward = function(self, animation) {
      if(animation) {
        self.container.stop().delay(opts.delay).animate({
          'margin-left': -self.width
        }, opts.speed);
      } else {
        self.container.css('margin-left', -self.width);
      }
    }

    backward = function(self, animation) {
      if(animation) {
        self.container.stop().animate({
          'margin-left': 0
        }, opts.speed);
      } else {
        self.container.css('margin-left', 0);
      }
    }

  };

  $.fn.bootsrapSlider = function (options) {
    var opts = $.extend({}, $.fn.bootsrapSlider.defaults, options);
     return this.each(function () {
      var instance = new bootsrapSliderClass($(this), opts);
      instance.init();
    });
  }

  $.fn.bootsrapSlider.defaults = {
    link : 'cs_link',
    back : 'cs_back',
    container : 'cs_container',
    page : 'cs_page',
    delay : 100,
    speed : 200
  };


})(jQuery);

//(function($){
//  $.fn.jqSlider = function(options){
//    var $this = $(this);
//    var defaults = {
//      'link' : 'cs_link',
//      'back' : 'cs_back',
//      'container' : 'cs_container',
//      'page' : 'cs_page',
//      'delay' : 100,
//      'speed' : 200
//    }

//    var opts = $.extend(defaults, options);

//    return this.each(function(){
//      $this.css({'overflow': 'hidden'});

//      var $pages = $this.find('.' + opts.page);
//      var $container = $this.find('.' + opts.container);

//      var width = $pages.first().width();
//      var number = $pages.length;

//      $container.width(number * width)
//      $pages.each(function() { $(this).css({'float':'left', 'width':(100/number)+'%'})})

//      var $links = $this.find('a.' + opts.link);
//      var $back_links = $this.find('a.' + opts.back);

//      $links.each(function() {
//        if($(this).data("remote") === true) {
////          $(this).bind("ajax:beforeSend", function(et, e) {
////          do something
////          })

//          $(this).bind("ajax:complete", function(object, xhr) {
//            if($(this).data("target") === undefined) {
//              $pages.last().html(xhr.responseText);
//              // FIXME set location hash
////              window.location.hash = location.pathname.substr(2, .length);
//              forward(true);
//            } else {
//              $('.' + $(this).data("target")).html(xhr.responseText);
//              forward(true);
//            }
//          })
//        } else {

//          $(this).live("click", function(e) {
//            e.preventDefault();
//            forward(true);
//          });
//        }
//      })

//      $back_links.live('click', function(e) {
//        if(location.hash.length > 0) {
//          console.log(window.location.search)
//          console.log(window.location.pathname)
//          history.pushState("", document.title, window.location.pathname + window.location.search);
//        }
//        e.preventDefault();
//        backward(true);
//      })

//      forward = function(animation) {
//        if(animation) {
//          $container.stop().delay(opts.delay).animate({
//              'margin-left': -width
//          }, opts.speed);
//        } else {
//          $container.css('margin-left', -width);
//        }
//      }

//      forward = function(animation) {
//        if(animation) {
//          $container.stop().delay(opts.delay).animate({
//              'margin-left': -width
//          }, opts.speed);
//        } else {
//          $container.css('margin-left', -width);
//        }
//      }

//      backward = function(animation) {
//        if(animation) {
//          $container.stop().animate({
//            'margin-left': 0
//          }, opts.speed);
//        } else {
//          $container.css('margin-left', 0);
//        }
//      }

//      redirect = function() {
//        try {
//          var hash = location.hash.substr(1, location.hash.length);
//          if (hash.length > 0 && hash.match(/[0-9]+/)) {
//            $.ajax({
//              url      : location.pathname + '/' + hash,
//              type     : 'GET',
//              dataType : 'script'
//            }).complete(function(xhr) {
//              $pages.last().html(xhr.responseText);
//              forward(false);
//            });
//          }
//        } catch(err) { }
//      }

//      redirect();

//    });
//  };
//})(jQuery);
