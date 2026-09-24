// Surendo Jekyll - minimal interactions
document.addEventListener('DOMContentLoaded', function(){
  // portable WA order button on products
  document.querySelectorAll('[data-wa-order]').forEach(function(b){
    b.addEventListener('click', function(e){
      var title = b.getAttribute('data-wa-order');
      var url = 'https://wa.me/6282276398888?text=' + encodeURIComponent('Halo SURENDO, saya tertarik dengan produk: ' + title + ' (' + location.href + ')');
      window.open(url, '_blank');
    });
  });
});
