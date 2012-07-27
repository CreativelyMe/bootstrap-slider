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

        if($(this).data("remote") === true) {
          $(this).bind("ajax:beforeSend", function(object, xhr) {
            window.location.href='#' + object.currentTarget.pathname.split('/').pop();
          })

          $(this).bind("ajax:complete", function(object, xhr) {
            if($(this).data("target") === undefined) {
              self.pages.last().html(xhr.responseText);
              forward(self, true);
            } else {
              $('.' + $(this).data(opts.target)).html(xhr.responseText);
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
    target : 'target',
    page : 'cs_page',
    delay : 100,
    speed : 200
  };


})(jQuery);
