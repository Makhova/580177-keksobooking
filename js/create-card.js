'use strict';

(function () {
  window.createCards = function (advertsNumber) {
    advertsNumber = 8;
    var LOCATION_MIN_Y = 130;
    var LOCATION_MAX_Y = 630;
    var card = {};
    var cards = [];
    var accomodation = ['palace', 'flat', 'house', 'bungalo'];
    var body = document.querySelector('body');
    var bodyWidth = body.offsetWidth;
    var pin = document.querySelector('.map__pin');
    var pinWidth = pin.offsetWidth;
    var pinHalfWidth = pinWidth / 2;
    var LOCATION_MIN_X = pinHalfWidth;
    var LOCATION_MAX_X = bodyWidth - pinHalfWidth;

    for (var i = 0; i < advertsNumber; i++) {
      card = {
        author: {
          avatar: window.utils.getLinkAvatar(i),
        },

        offer: {
          type: window.utils.getRandomNumberFromArray(accomodation),
        },

        location: {
          x: window.utils.getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X),
          y: window.utils.getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y),
        },
      };
      cards.push(card);
    }

    return cards;
  };
})();
