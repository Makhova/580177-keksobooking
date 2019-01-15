'use strict';

(function (advertsNumber) {
  var card = {};
  var accomodation = ['palace', 'flat', 'house', 'bungalo'];
  advertsNumber = 8;

  for (var i = 0; i < advertsNumber; i++) {
    card = {
      author: {
        avatar: window.global.getLinkAvatar(i),
      },

      offer: {
        type: window.global.getRandomNumberFromArray(accomodation),
      },

      location: {
        x: window.global.getRandomNumber(window.global.LOCATION_MIN_X, window.global.LOCATION_MAX_X),
        y: window.global.getRandomNumber(window.global.LOCATION_MIN_Y, window.global.LOCATION_MAX_Y),
      },
    };
    window.global.cards.push(card);
  }

  return window.global.cards;
}) ();
