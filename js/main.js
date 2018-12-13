'use strict';

var body = document.querySelector('body');
var bodyWidth = body.offsetWidth;
var accomodation = ['palace', 'flat', 'house', 'bungalo'];
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var pin = document.querySelector('.map__pin');
var pinWidth = pin.offsetWidth;
var pinHeight = pin.offsetHeight;
var advertsNumber = 8;

var getLinkAvatar = function (index) {
  var avatar = 'img/avatars/user' + 0 + (index + 1) + '.png';

  return avatar;
};

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min) + min);

  return randomNumber;
};

var getRandomNumberFromArray = function (array) {
  var randomIndex = getRandomNumber(0, array.length - 1);

  return array[randomIndex];
};

var getLocationMinX = function () {
  var locationMinX = 0.5 * pinWidth;

  return locationMinX;
};

var getLocationMaxX = function () {
  var locationMaxX = bodyWidth - getLocationMinX();

  return locationMaxX;
};

var createCards = function (cardsCount) {
  var cards = [];
  var card = {};

  for (var i = 0; i < cardsCount; i++) {
    card = {
      author: {
        avatar: getLinkAvatar(i),
      },

      offer: {
        type: getRandomNumberFromArray(accomodation),
      },

      location: {
        x: getRandomNumber(getLocationMinX(), getLocationMaxX()),
        y: getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y),
      },
    };
    cards.push(card);
  }

  return cards;
};

var cards = createCards(advertsNumber);

var renderPins = function (adverts) {
  var template = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  adverts.forEach(function (item) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = item.author.avatar;
    pinElement.style.left = (item.location.x - 0.5 * pinWidth) + 'px';
    pinElement.style.top = item.location.y - pinHeight + 'px';
    fragment.appendChild(pinElement);
    template.appendChild(fragment);
  });
};

var activatePage = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  var advertForm = document.querySelector('.ad-form');
  advertForm.classList.remove('ad-form--disabled');
  var fieldset = document.querySelectorAll('fieldset');
  var select = document.querySelectorAll('select');
  fieldset.disabled = false;
  select.disabled = false;
};

var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('click', function (evt) {
  evt.preventDefault();
  activatePage();
  renderPins(cards);
});
mainPin.addEventListener('keypress', function (evt) {
  evt.preventDefault();
  activatePage();
  renderPins(cards);
});

