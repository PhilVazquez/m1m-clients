$(document).ready(function() {

  var moitie = $(window).width() / 2;
  var touchY = 0;
  var rotCadran = 0;

  $(document).on('touchmove', function(e){

    document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
    }, false);

    function rot_cadran() {
      $('#cadran').removeClass('animated');

      var touchX = e.changedTouches[0].pageX;

      if (touchX < moitie) {
        if (e.changedTouches[0].pageY > touchY) {
          $('#cadran').css('transform', 'rotate(' + rotCadran + 'deg)')
          rotCadran = rotCadran - 3

        } else {
          $('#cadran').css('transform', 'rotate(' + rotCadran + 'deg)')
          rotCadran = rotCadran + 3
        }
      } else {
        if (e.changedTouches[0].pageY < touchY) {
          $('#cadran').css('transform', 'rotate(' + rotCadran + 'deg)')
          rotCadran = rotCadran - 3

        } else {
          $('#cadran').css('transform', 'rotate(' + rotCadran + 'deg)')
          rotCadran = rotCadran + 3
        }
      }

      touchY = e.changedTouches[0].pageY;

    }
    rot_cadran();
    afficher_selection();

  });

  function afficher_selection() {
    cibleOffset = $('.centre').offset();
    element = document.elementFromPoint(cibleOffset.left,cibleOffset.top);
    if ($('element').hasClass('selected')) {

    } else if ($(element).hasClass('dir') || $(element).hasClass('server')) {
      $('.selected').removeClass('selected');
      $(element).addClass('selected');
      var selectedText = $(element).text();
      $('#selection p').text(selectedText);
    }
  }

  $("*").on("click", function(){
    setTimeout(function(){$('.nothome').removeClass('nothome');}, 1000);
    console.log('yey');
    setTimeout(afficher_selection, 500);
  });

});
