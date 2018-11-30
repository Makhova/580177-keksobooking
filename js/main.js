'use strict';

var body = document.querySelector('body');
var bodyWidth = window.getComputedStyle(body).maxWidth;
var map = document.querySelector('.map');
var accomodationType = ['palace', 'flat', 'house', 'bungalo'];
var accomodationCards = [];
var mapPin = document.querySelector('.map__pin');
var mapPinWidth = window.getComputedStyle(mapPin).width;
var mapPinHeight = window.getComputedStyle(mapPin).height;
var locationX = parseInt(bodyWidth, 10) - parseInt(mapPinWidth, 10);
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsList = document.querySelector('.map__pins');

var createAccomodationCard = function (array) {

  var accomodationCard = {
    author: {
      avatar: 'img/avatars/user' + 0 + (i + 1) + '.png',
    },

    offer: {
      type: array[i],
    },

    location: {
      x: Math.floor(Math.random() * locationX + 0.5 * parseInt(mapPinWidth, 10)),
      y: Math.floor(Math.random() * (630 - 130) + 130),
    },
  };

  return accomodationCard;
};

var addPinElement = function (accomodation) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = accomodation.location.x - 0.5 * parseInt(mapPinWidth, 10) + 'px';
  pin.style.top = accomodation.location.y - parseInt(mapPinHeight, 10) + 'px';
  pin.querySelector('img').src = accomodation.author.avatar;
  pin.querySelector('img').alt = 'Заголовок объявления';

  return pin;
};

map.classList.remove('map--faded');

for (var i = 0; i < 8; i++) {
  createAccomodationCard(accomodationType);
  accomodationCards.push(createAccomodationCard(accomodationType));
  addPinElement(accomodationCards[i]);
  pinsList.appendChild(addPinElement(accomodationCards[i]));
}

