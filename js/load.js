'use strict';

(function () {
  window.load = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      console.log(xhr.response);
    });

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };

  window.load();
})();
