'use strict';

(function () {
  var map = document.querySelector('.map');
  var pins = document.querySelector('.map__pins');

  var renderCard = function (item) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = item.author.avatar;
    cardElement.querySelector('.popup__type').textContent = item.offer.type;
    var cardFragment = document.createDocumentFragment();
    cardFragment.appendChild(cardElement);
    var popup = map.querySelector('.popup');
    if (popup) {
      map.replaceChild(cardFragment, popup);
    } else {
      map.appendChild(cardFragment);
    }
  };

  var popupButtonClickHandler = function () {
    var popup = map.querySelector('.popup');
    var popupCloseButton = document.querySelector('.popup__close');

    popupCloseButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      map.removeChild(popup);
    });
  };

  var closeCard = function () {
    var popup = document.querySelector('.popup');
    if (!(popup === null)) {
      map.removeChild(popup);
    }
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeCard();
    }
  });

  pins.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target;
    var activePin = target.parentElement.dataset.id;

    if (activePin) {
      var cards = window.createCards();
      renderCard(cards[activePin]);
      popupButtonClickHandler();
    }
  });
})();
