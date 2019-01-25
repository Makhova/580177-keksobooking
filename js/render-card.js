'use strict';

(function () {
  var map = document.querySelector('.map');
  var pins = document.querySelector('.map__pins');
  var pin = document.querySelector('.map__pin');
  var activePin = pin.dataset.id;

  window.renderCard = function (cards) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = cards[activePin].author.avatar;
    cardElement.querySelector('.popup__type').textContent = cards[activePin].offer.type;
    cardElement.querySelector('.popup__text--address').textContent = cards[activePin].offer.address;
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cards[activePin].offer.checkin + ' выезд до ' + cards[activePin].offer.checkout;
    cardElement.querySelector('.popup__description').textContent = cards[activePin].offer.description;
    cardElement.querySelector('.popup__text--price').textContent = cards[activePin].offer.price + ' \u20BD ' + '/ночь';
    var cardFragment = document.createDocumentFragment();
    cardFragment.appendChild(cardElement);
    var popup = map.querySelector('.popup');

    if (popup) {
      map.replaceChild(cardFragment, popup);
    } else {
      map.appendChild(cardFragment);
    }

    var popupButtonClickHandler = function () {
      var popupCloseButton = document.querySelector('.popup__close');

      popupCloseButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        map.removeChild(map.querySelector('.popup'));
      });
    };

    var closeCard = function () {
      popup = map.querySelector('.popup');
      if (!(popup === null)) {
        map.removeChild(map.querySelector('.popup'));
      }
    };

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        closeCard();
      }
    });

    popupButtonClickHandler();
  };

  window.pinClickHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    activePin = target.parentElement.dataset.id;

    if (activePin) {
      document.querySelector('.map__pin').classList.add('map__pin--active');
      window.backend.load(window.renderCard, window.backend.errorHandler);
    }
  };

  pins.addEventListener('click', window.pinClickHandler);
})();
