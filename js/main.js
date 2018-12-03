'use strict';

var body = document.querySelector('body');
var bodyWidth = window.getComputedStyle(body).maxWidth;
var map = document.querySelector('.map');
var accomodationType = ['palace', 'flat', 'house', 'bungalo'];
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var cards = [];
var mapPin = document.querySelector('.map__pin');
var mapPinWidth = window.getComputedStyle(mapPin).width;
var mapPinHeight = window.getComputedStyle(mapPin).height;
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsList = document.querySelector('.map__pins');
var advertsNumber = 8;

var getLinkAvatar = function (index) {
  var avatar = 'img/avatars/user' + 0 + (index + 1) + '.png';

  return avatar;
};

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min) + min);

  return randomNumber;
};

var getLocationMinX = function () {
  var locationMinX = 0.5 * parseInt(mapPinWidth, 10);

  return locationMinX;
};

var getLocationMaxX = function () {
  var locationMaxX = parseInt(bodyWidth, 10) - getLocationMinX();

  return locationMaxX;
};

var createCard = function (array, index) {

  var card = {
    author: {
      avatar: getLinkAvatar(index),
    },

    offer: {
      type: array[index],
    },

    location: {
      x: getRandomNumber(getLocationMinX(), getLocationMaxX()),
      y: getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y),
    },
  };

  return card;
};

var addPinElement = function (advert) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = advert.location.x - getLocationMinX() + 'px';
  pin.style.top = advert.location.y - parseInt(mapPinHeight, 10) + 'px';
  pin.querySelector('img').src = advert.author.avatar;
  pin.querySelector('img').alt = 'Заголовок объявления';

  return pin;
};

var addAdvertPin = function (advertsCounter) {
  for (var i = 0; i < advertsCounter; i++) {
    createCard(accomodationType, i);
    cards.push(createCard(accomodationType, i));
    addPinElement(cards[i]);
    var advertPin = pinsList.appendChild(addPinElement(cards[i]));
  }

  return advertPin;
};

map.classList.remove('map--faded');
addAdvertPin(advertsNumber);


