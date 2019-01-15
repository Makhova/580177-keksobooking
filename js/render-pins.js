'use strict';

(function (adverts) {
  adverts = window.global.cards;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();

  adverts.forEach(function (item, index) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = item.author.avatar;
    pinElement.style.left = (item.location.x - 0.5 * window.global.pinWidth) + 'px';
    pinElement.style.top = item.location.y - window.global.pinHeight + 'px';
    pinElement.dataset.id = index;
    pinFragment.appendChild(pinElement);
    window.global.pins.appendChild(pinFragment);
  });
}) ();
