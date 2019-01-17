'use strict';

(function () {
  window.load = function (callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      console.log(xhr.response);
      callback(xhr.response);
    });

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };
})();
