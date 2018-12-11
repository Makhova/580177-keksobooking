'use strict';

var body = document.querySelector('body');
var bodyWidth = window.getComputedStyle(body).maxWidth;
var map = document.querySelector('.map');
var accomodation = ['palace', 'flat', 'house', 'bungalo'];
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var cards = [];
var pin = document.querySelector('.map__pin');
var pinWidth = window.getComputedStyle(pin).width;
var pinHeight = window.getComputedStyle(pin).height;
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsList = document.querySelector('.map__pins');
var advertsNumber = 8;
var form = document.querySelector('.ad-form');
var fieldset = form.querySelectorAll('fieldset');
var filters = document.querySelector('.map__filters');
var mainPin = document.querySelector('.map__pin--main');
var mainPinWidth = window.getComputedStyle(mainPin).width;
var mainPinHeight = window.getComputedStyle(mainPin).height;
var addressField = document.querySelector('#address');
var popupButton = document.querySelector('.popup__close');

var getLinkAvatar = function (index) {
  var avatar = 'img/avatars/user' + 0 + (index + 1) + '.png';

  return avatar;
};

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min) + min);

  return randomNumber;
};

var getLocationMinX = function () {
  var locationMinX = 0.5 * parseInt(pinWidth, 10);

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
      type: array[Math.floor(index / 2)],
    },

    location: {
      x: getRandomNumber(getLocationMinX(), getLocationMaxX()),
      y: getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y),
    },
  };

  return card;
};

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var openCard = function (evt) {
  var cardElement = cardTemplate.cloneNode(true);
  var cardAvatar = cardTemplate.querySelector('.popup__avatar');
  cardAvatar.src = evt.target.src;
  var newCard = pinsList.appendChild(cardElement);

  return newCard;
};

var addPinElement = function (advert) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = advert.location.x - getLocationMinX() + 'px';
  pinElement.style.top = advert.location.y - parseInt(pinHeight, 10) + 'px';
  pinElement.querySelector('img').src = advert.author.avatar;
  pinElement.querySelector('img').alt = 'Заголовок объявления';
  pinElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    openCard(evt);
  });

  return pinElement;
};

var getMainPinX = function () {
  var mainPinX = Math.round(parseInt(mainPin.style.left, 10) + 0.5 * parseInt(mainPinWidth, 10));

  return mainPinX;
};
var getMainPinCentreY = function () {
  var mainPinCentreY = Math.round(parseInt(mainPin.style.top, 10) + 0.5 * parseInt(mainPinHeight, 10));

  return mainPinCentreY;
};

var getMainPinY = function () {
  var mainPinY = Math.round(parseInt(mainPin.style.top, 10) + parseInt(mainPinHeight, 10));

  return mainPinY;
};

var buttonClickHandler = function () {
  map.classList.remove('map--faded');
  filters.classList.remove('map__filters--disabled');
  form.classList.remove('ad-form--disabled');
  fieldset.disabled = false;
  addAdvertPin(advertsNumber);
  addressField.value = getMainPinX() + ', ' + getMainPinY();
};

var popupButtonClickHandler = function () {
  var popup = document.querySelector('.popup');
  pinsList.removeChild(popup);
};

filters.classList.add('map__filters--disabled');
fieldset.disabled = true;
addressField.value = getMainPinX() + ', ' + getMainPinCentreY();
mainPin.addEventListener('click', buttonClickHandler);
mainPin.addEventListener('keypress', buttonClickHandler);

var addAdvertPin = function (advertsCounter) {
  for (var i = 0; i < advertsCounter; i++) {
    createCard(accomodation, i);
    cards.push(createCard(accomodation, i));
    addPinElement(cards[i]);
    var advertPin = pinsList.appendChild(addPinElement(cards[i]));
  }

  return advertPin;
};

popupButton.addEventListener('click', popupButtonClickHandler);

var accomodationList = document.querySelector('#type');
var price = document.querySelector('#price');
var isSelected = document.querySelector(':checked');
var accomodationType = accomodationList.querySelectorAll('option');

for (var i = 0; i < accomodationList.length; i++) {
  if (accomodationType[i].value === 'bungalo' && isSelected) {
    price.placeholder = 0;
  } else {
    price.placeholder = 10;
  }
}
