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
  });
})(jQuery);
