$(document).ready(function () {

  // loader
  $(".loader").fadeOut("slow");

  // modals
  $('.js-modal').fancybox({
    modal: true,
    helpers: {
      overlay: {
        locked: false
      }
    }
  });

  // for navigation lk sticky navigation
  $('.js-fixed').theiaStickySidebar({
    minWidth: 1024,
    additionalMarginTop: 30,
    additionalMarginBottom: 30
  });

  $(window).resize(function () {
    if ($(window).width() < 1024) {
      $('.js-fixed').theiaStickySidebar({
        defaultPosition: "fixed",
        minWidth: 1024
      });
    } else {
      $('.js-fixed').theiaStickySidebar({
        defaultPosition: "relative",
        minWidth: 1024
      });
    }
  })


  // menu
  $('.header__navigation').click(function () {
    $('.navigation-icon').toggleClass('open');
    $('.main-menu').toggleClass('open');
  });
  $(document).mouseup(function (e) {
    var div = $(".header__navigation, .main-menu");
    if (!div.is(e.target) &&
      div.has(e.target).length === 0) {
      $('.main-menu').removeClass('open');
      $('.navigation-icon').removeClass('open');
    }
  });

  //Рекурсия ищем количество вложенности одного элемента в другой
 function findNesting(elementFor,elementTo){
   if(elementFor.hasClass(elementTo.attr('class'))){
     return 1;
   } else
   {
    return findNesting(elementFor.parent(),elementTo) + 1;
   }
 }

  $('.main-menu__list > .has-podmenu a').click(function () {
    $(this).parent().children('ul').toggle();
    $(this).toggleClass('active');
    //Находим количество вложенности ссылки, на которую кликаем, в лист меню
    var nesting = findNesting($(this),$('.main-menu__list'));

    //Если это элемент 5-ого уровня вложенности относительно main-menu__list (2-его уровня ссылки)
    if(nesting == 5){
      //Убираем из потока все соседние элементы
      $(this).parent().siblings().css({'display':'none'});
      $(this).css({'display':'none'});
    }

  });
  $('.has-podmenu ul li.back').click(function () {
    $(this).parent('ul').toggle();
    $(this).parent().parent('.has-podmenu').children('a.active').removeClass('active');
    //Если нажали кнопку назад, то добавляем обратно в поток все соседние элементы
    $(this).parent().parent().siblings().css({'display':'block'});
    $(this).parent().parent().find('a').css({'display':'block'});
  })

  // map
  $('#map').each(function (index, el) {
    var adr = $(this).attr('data-address-for-map');

    function init() {
      var myGeocoder = ymaps.geocode(adr);
      myGeocoder.then(
        function (res) {
          var coord = res.geoObjects.get(0).geometry.getCoordinates();
          var myMap = new ymaps.Map(el, {
            center: coord,
            zoom: 16,
            controls: ['']
          }, {
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true,
          });
          myMap.controls.add(
            // new ymaps.control.ZoomControl()
          );
          myPlacemark = new ymaps.Placemark(coord, {
            hintContent: "Юрист 24",
            balloonContentHeader: adr
          });
          myMap.geoObjects.add(myPlacemark);
        },
        function (err) {
          alert('Error');
        }
      );
    }
    ymaps.ready(init);
  });

})