
$(document).ready(function(){
  $('.carousel__inner').slick({
      speed: 1200,
      adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow-left.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow-right.png"></button>',
       responsive: [ /* адаптация под различные устройства */
          {
              breakpoint: 992, /* правила, описанные ниже будут работать для расширения экрана от 0 до 992 пикселей, всё,что выше 992, будет работать по вышеперечисленным правилам */
              settings: {
                  dots: true,
                  arrows: false
              }
          }
      ] 
  });
  
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active')
        .siblings()
        .removeClass('catalog__tab_active')
        .closest('div.container')
        .find('div.catalog__content')
        .removeClass('catalog__content_active')
        .eq($(this).index())
        .addClass('catalog__content_active');
  });

  function toggleSlide(item) {  
      $(item).each(function(i) {
          $(this).on('click', function(e) {
              e.preventDefault(); //отменяет стандартное поведение браузера(при клике на ссылку с заглушкой курсор перемещается вверх страницы с ее перезагрузкой, при клике на слово оно выделяется и т.д.)
              $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active'); // команда переключения класса(если класс есть, то он убирается, если его нет, то он добавляется)
              $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          }) // команда eq(i) позволяет получать элемент по определенному индексу
      });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');



    

    // Modal

    $('[data-modal=consultation]'). on('click',function(){   // $- чтобы получить элементы со страницы, [] - по определенному дата-атрибуту, который задаем сами.
      $('.overlay, #consultation').fadeIn('slow');
    }); //т.к. секция с модальными окнами изначально скрта, то используется команда fadeIn, чтобы показать её и модальное окно консультация
    $('.modal__close').on('click',function(){  //пользователь будет обращаться к модулю крестика, прописывается функция. которая будет выполняться после клика на крестик
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');//будут закрываться все элементы, которые нас не интересуют
    });
    

    //для каждой карточки с товаром необходимо,чтобы при нажатии кнопки КУПИТЬ появлялось модальное окно с названием этого товара и формой заказа, меняя текст в заголовке для каждой карточки
    
    /* $('.button_mini').on('click', function() {
      $('.overlay, #order').fadeIn('slow');
    });
 */

    // чтобы в модальном окне менялось название товара при клике кнопки КУПИТЬ, необходимо прописать команду, которая будет находить тэг с заголовком и вставлять его в модальное окно с заказом 
      // прописываем функцию, которая будет выполняться при клике на кнопку именно для этой конкретной карточки 
     $('.button_mini').each(function(i){
      $(this).on('click', function(){
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
         $('.overlay, #order').fadeIn('slow');
      });
    }); 
  
     //в JQ есть команда для получения текста, который есть в данном элементею. Она помещает текст, полученный из карточки, т.е. название товара, в данный элемент Если в команде text () что-то написано, то это помещается вместо текста в элементе.eq-позволяет получить определенный элемент по порядку

    /* $('#consultation form').validate();  */// данный плагин работает на первой форме с указанным селектором
   
    function valideForms(form){
      $(form).validate({
        rules: {
            name: {
              required: true,
              minlength: 2
            },
            phone:"required",
            email:{
              required: true,
              email: true
            }
          },
          messages: {
            name:  {
              required: "Пожалуйста, введите свое имя",
              minlength: jQuery.validator.format("Введите {0} символов!")
            },
            phone:"Пожалуйста, введите свой номер телефона",
            email: {
              required: "Пожалуйста, введите свою почту",
              email: "Неправильно введен арес почты "
            }
          }
      }); 
    };

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) { //при подтверждении аргумента(формы) т.е. когда выполнены все условия в input, прошли все валидации, форма отправляется. Это событие называется submit
      e.preventDefault();// отменить стандартное поведение браузера (e- event), т.е.при стандартном поведении, когда мы кликаем "подтвердить форму",форма отправляется и  страница сайта перезагружается. Но с данной строчкой перезагрузки уже не будет
      $.ajax({ //позволяет отправить данные на сервер
        type: "POST",
        url: "mailer/smart.php", //обработчик события
        data: $(this).serialize() // данные, которые отправляют на сервер
      }).done(function(){//когда вышеперечисленные действия выполнятся, запуститься функция 
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');


        $('form').trigger('reset');
      });
      return false;
    });

    //Smoth to scroll and pageup

    $(window).scroll(function(){  //при прокрутке окна будет выполняться функция
      if ($(this).scrollTop() > 1600) { //если пользователь прокрутил больше 1600 пикселей экрана,то появляеься значок pageup
        $('.pageup').fadeIn();               
      } else {
      $('.pageup').fadeOut(); // в противном случае он не показывается
      }
    });

    $("a[href^=#up]").click(function(){
            var _href = $(this).attr("href");
            $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
            return false;
    });

    new WOW().init();

  });



