'use strict';

(function () {
  var renderCard = function (item) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = item.author.avatar;
    cardElement.querySelector('.popup__type').textContent = item.offer.type;
    var cardFragment = document.createDocumentFragment();
    cardFragment.appendChild(cardElement);
    var popup = window.global.map.querySelector('.popup');
    if (popup) {
      window.global.map.replaceChild(cardFragment, popup);
    } else {
      window.global.map.appendChild(cardFragment);
    }
  };

  var popupButtonClickHandler = function () {
    var popup = window.global.map.querySelector('.popup');
    var popupCloseButton = document.querySelector('.popup__close');

    popupCloseButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.global.map.removeChild(popup);
    });
  };

  var closeCard = function () {
    var popup = document.querySelector('.popup');
    if (!(popup === null)) {
      window.global.map.removeChild(popup);
    }
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.global.ESC_KEYCODE) {
      closeCard();
    }
  });

  window.global.pins.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target;
    var activePin = target.parentElement.dataset.id;

    if (activePin) {
      renderCard(window.global.cards[activePin]);
      popupButtonClickHandler();
    }
  });
}) ();
