(function () {
  "use strict";

  var backdrops = {
    a: document.getElementById("backdrop-a"),
    b: document.getElementById("backdrop-b"),
  };
  var photos = {
    a: document.getElementById("photo-a"),
    b: document.getElementById("photo-b"),
  };

  var active = "a";
  var busy = false;
  var images = [];

  function pickRandom() {
    // Pure random on every scan/tap -- back-to-back repeats are fine.
    return images[Math.floor(Math.random() * images.length)];
  }

  function show(src) {
    if (busy) return;
    busy = true;

    var next = active === "a" ? "b" : "a";
    var loader = new Image();

    loader.onload = function () {
      backdrops[next].style.backgroundImage = "url(" + src + ")";
      photos[next].src = src;

      // next tick so the browser registers the new background before fading
      requestAnimationFrame(function () {
        backdrops[next].classList.add("is-visible");
        photos[next].classList.add("is-visible");
        backdrops[active].classList.remove("is-visible");
        photos[active].classList.remove("is-visible");
        active = next;
        setTimeout(function () {
          busy = false;
        }, 750);
      });
    };

    loader.onerror = function () {
      busy = false;
    };

    loader.src = src;
  }

  function init(list) {
    images = list.filter(Boolean);
    if (images.length === 0) return;
    show(pickRandom());
  }

  fetch("manifest.json", { cache: "no-store" })
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      init(data.images || []);
    })
    .catch(function (err) {
      // If this fails, you're likely opening the file directly (file://)
      // rather than through a local server -- serve the folder instead,
      // e.g. `python3 -m http.server` from inside /site.
      console.error("Could not load manifest.json:", err);
    });
})();
