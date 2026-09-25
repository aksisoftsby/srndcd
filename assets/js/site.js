/* Site glue JS: slider init, mobile nav, search toggle (mimics Customify + FlexSlider behavior). */
(function ($) {
  $(function () {
    // FlexSlider init (MetaSlider equivalent)
    if ($.fn.flexSlider) {
      $('#metaslider_165.flexslider').flexslider({
        animation: 'fade',
        slideshowSpeed: 6000,
        animationSpeed: 600,
        controlNav: true,
        directionNav: false,
        pauseOnHover: true,
        prevText: 'Previous',
        nextText: 'Next'
      });
    }

    // Mobile nav toggle
    $(document).on('click', '.menu-mobile-toggle', function (e) {
      e.preventDefault();
      $('#mobile-nav-panel').addClass('open').attr('aria-hidden', 'false');
    });
    $(document).on('click', '.close-mobile-nav', function (e) {
      e.preventDefault();
      $('#mobile-nav-panel').removeClass('open').attr('aria-hidden', 'true');
    });

    // Header search toggle
    $(document).on('click', '.header-search_icon-item .search-icon', function (e) {
      e.preventDefault();
      $(this).toggleClass('is-open');
      $(this).siblings('.header-search-modal-wrapper').toggle();
    });

    // Product tabs
    $(document).on('click', '.wc-tabs li a', function (e) {
      e.preventDefault();
      var $li = $(this).parent();
      $li.addClass('active').siblings().removeClass('active');
      $($('.wc-tabs-wrapper .panel')).hide();
      $($(this).attr('href')).show();
    });

    // Floating WhatsApp toggle
    $(document).on('click', '.wa-float-btn', function (e) {
      e.preventDefault();
      var $panel = $('.wa-float-panel');
      var open = !$panel.prop('hidden');
      $panel.prop('hidden', open);
      $(this).attr('aria-expanded', String(!open)).toggleClass('is-open', !open);
    });
    $(document).on('click', function (e) {
      if (!$(e.target).closest('.wa-float').length) {
        $('.wa-float-panel').prop('hidden', true);
      $('.wa-float-btn').attr('aria-expanded', 'false').removeClass('is-open');
      }
    });

    // Gallery lightbox
    var lbItems = [];
    var lbIndex = 0;
    function lbRender() {
      var it = lbItems[lbIndex];
      if (!it) return;
      var $img = $('.glightbox-stage img');
      $img.attr('src', it.src).attr('alt', it.alt || '');
      $('.glightbox-caption').text(it.title || '');
      $('.glightbox-count').text((lbIndex + 1) + ' / ' + lbItems.length);
      $('.glightbox-thumbs img').removeClass('active').eq(lbIndex).addClass('active');
      var $thumb = $('.glightbox-thumbs img').eq(lbIndex);
      if ($thumb.length) { $thumb[0].scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
    }
    function lbShow(i) {
      if (!lbItems.length) return;
      lbIndex = (i + lbItems.length) % lbItems.length;
      lbRender();
    }
    $(document).on('click', '.gallery-item', function (e) {
      e.preventDefault();
      var $gallery = $(this).closest('.gallery');
      lbItems = $gallery.find('.gallery-item').map(function () {
        var $i = $(this).find('img');
        return { src: this.getAttribute('href'), alt: $i.attr('alt'), title: $i.attr('title') || this.getAttribute('data-title') };
      }).get();
      lbShow($gallery.find('.gallery-item').index(this));
      var $thumbs = $('.glightbox-thumbs').empty();
      $.each(lbItems, function (i, it) {
        $('<img>').attr('src', it.src).attr('alt', '').attr('loading', 'lazy').on('click', function () { lbShow(i); }).appendTo($thumbs);
      });
      $('.glightbox').addClass('open');
      $('body').css('overflow', 'hidden');
    });
    $(document).on('click', '.glightbox-prev', function () { lbShow(lbIndex - 1); });
    $(document).on('click', '.glightbox-next', function () { lbShow(lbIndex + 1); });
    $(document).on('click', '.glightbox-close', function () { $('.glightbox').removeClass('open'); $('body').css('overflow', ''); });
    $(document).on('click', '.glightbox', function (e) {
      if ($(e.target).is('.glightbox') || $(e.target).is('.glightbox-stage')) {
        $('.glightbox').removeClass('open'); $('body').css('overflow', '');
      }
    });
    $(document).on('keydown', function (e) {
      if (!$('.glightbox').hasClass('open')) return;
      if (e.key === 'Escape') { $('.glightbox').removeClass('open'); $('body').css('overflow', ''); }
      if (e.key === 'ArrowLeft') { lbShow(lbIndex - 1); }
      if (e.key === 'ArrowRight') { lbShow(lbIndex + 1); }
    });
  });
})(jQuery);
