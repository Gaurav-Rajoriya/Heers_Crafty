/* Shared layout: announcement bar, header, footer, icons. */
(function () {
  var HC = (window.HC = window.HC || {});
  HC.LOGO_URL =
    "https://export4tradeindia.com/vendor/company_logo/company_WhatsApp_Image_2026-11-20_at_12_25_03_PM_6afff1db3575e.jpeg";
  var P = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    left: '<path d="M15 6l-6 6 6 6"/>',
    right: '<path d="M9 6l6 6-6 6"/>',
    chev: '<path d="M6 9l6 6 6-6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/>',
    spark:
      '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="8" cy="8" r="1"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
    send: '<path d="M21 3L10 14M21 3l-7 18-4-7-7-4 18-7z"/>',
    book: '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z"/><path d="M4 21h15"/>',
  };
  HC.icon = function (n) {
    return (
      '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">' +
      P[n] +
      "</svg>"
    );
  };
  HC.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  };
  var brand = function () {
    return (
      '<a class="brand" href="index.html" aria-label="Heer\u2019s-crafty home"><img src="' +
      HC.LOGO_URL +
      '" alt="Heer\u2019s-crafty logo" width="44" height="44" onerror="this.style.display=\'none\'"><span>HEER\u2019S-CRAFTY</span></a>'
    );
  };
  var CATS = [
    ["bedsheets", "Bedsheets"],
    ["clothing", "Clothing"],
    ["candles", "Candles"],
    ["home-decor", "Home Decor"],
  ];
  HC.CATS = CATS;
  HC.catLabel = function (k) {
    for (var i = 0; i < CATS.length; i++)
      if (CATS[i][0] === k) return CATS[i][1];
    return k;
  };

  function header(page) {
    var cur = function (k) {
      return page === k ? ' aria-current="page"' : "";
    };
    var isCol =
      [
        "products",
        "bedsheets",
        "clothing",
        "candles",
        "home-decor",
        "product",
      ].indexOf(page) > -1;
    var dd =
      CATS.map(function (c) {
        return '<a href="' + c[0] + '.html"' + cur(c[0]) + ">" + c[1] + "</a>";
      }).join("") + '<a class="all" href="products.html">View All Products</a>';
    var mob = CATS.map(function (c) {
      return '<a href="' + c[0] + '.html">' + c[1] + "</a>";
    }).join("");
    return (
      '<div class="header-in wrap">' +
      brand() +
      '<ul class="nav" role="list"><li><a href="index.html"' +
      cur("home") +
      '>Home</a></li><li><a href="about.html"' +
      cur("about") +
      ">About Us</a></li>" +
      '<li class="has-dd"><button class="dd-btn" aria-expanded="false" aria-haspopup="true"' +
      (isCol ? ' aria-current="true"' : "") +
      ">Collections " +
      HC.icon("chev") +
      '</button><div class="dd">' +
      dd +
      "</div></li>" +
      '<li><a href="journal.html"' +
      cur("journal") +
      '>The Heer\u2019s Edit</a></li><li><a href="contact.html"' +
      cur("contact") +
      ">Contact</a></li></ul>" +
      '<div class="header-actions" style="display:flex;align-items:center;gap:1rem"><a class="btn btn-primary btn-sm" href="contact.html">Enquire Now</a>' +
      '<button class="burger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span></button></div></div>' +
      ""
    );
  }

  function mobileMenu() {
    var sub =
      CATS.map(function (c) {
        return '<a href="' + c[0] + '.html">' + c[1] + "</a>";
      }).join("") + '<a href="products.html">View All Products</a>';
    return (
      '<a class="mm-link" href="index.html">Home</a><a class="mm-link" href="about.html">About Us</a>' +
      '<button class="mm-toggle" type="button" aria-expanded="false" aria-controls="mm-sub">Collections ' +
      HC.icon("chev") +
      "</button>" +
      '<div class="mm-sub" id="mm-sub"><div>' +
      sub +
      "</div></div>" +
      '<a class="mm-link" href="journal.html">The Heer\u2019s Edit</a><a class="mm-link" href="contact.html">Contact</a><a class="mm-link" href="faq.html">FAQ</a>' +
      '<div class="mm-cta"><a class="btn btn-primary" href="contact.html">Enquire Now</a></div>'
    );
  }
  function footer() {
    var cols = CATS.map(function (c) {
      return '<li><a href="' + c[0] + '.html">' + c[1] + "</a></li>";
    }).join("");
    return (
      '<div class="wrap"><div class="f-grid">' +
      '<div class="f-brand">' +
      brand() +
      '<p>A curated world of bedsheets, clothing, candles and home d\u00e9cor, presented as a catalogue you can enquire about.</p><span class="f-chip">Enquiry-based catalogue</span></div>' +

      '<div><h4>Navigation</h4><ul><li><a href="index.html">Home</a></li><li><a href="about.html">About Us</a></li><li><a href="products.html">All Products</a></li><li><a href="journal.html">The Heer\u2019s Edit</a></li><li><a href="contact.html">Contact Us</a></li><li><a href="faq.html">FAQ</a></li></ul></div>' +

      "<div><h4>Collections</h4><ul>" +
      cols +
      "</ul></div>" +
      '<div class="f-cta"><h4>Let\u2019s connect.</h4> <ul> <li><p>Address :-<span> B-504,shree vinayak residency,gangotri to das khaman road,nikol-382350</span></p></li> <li><p>Email :-<span> heerXXXXXXXX94@gmail.com</span></p></li> <li><p>Phone :-<span> +91 79XXXXXX15</span></p></li> </ul>  <a class="btn btn-primary btn-sm" href="contact.html">Send an Enquiry</a></div>' +
      '</div><div class="f-bottom"><span>\u00a9 <span id="yr"></span>All Rights Reserved. by <a href="https://export4tradeindia.com/">Export 4 Trade India Pvt. Ltd.</a></span><span><img class="f-logo" src="https://ms-export.co.in/wp-content/uploads/2024/01/MEMBER-OF-2.png"/></span></div></div>'
    );
  }
  HC.mountLayout = function () {
    var page = document.body.getAttribute("data-page") || "";
    var a = document.getElementById("announce");
    if (a) a.innerHTML = "Browse the collection \u2022 Enquire on any product";
    var h = document.getElementById("site-header");
    if (h) {
      h.innerHTML = header(page);
      var mnav = document.createElement("nav");
      mnav.className = "mobile-menu";
      mnav.id = "mobile-menu";
      mnav.setAttribute("aria-label", "Mobile");
      mnav.innerHTML = mobileMenu();
      h.insertAdjacentElement("afterend", mnav);
      if (document.body.hasAttribute("data-dark-hero"))
        h.classList.add("over-dark");
    }
    var f = document.getElementById("site-footer");
    if (f) {
      f.innerHTML = footer();
      f.querySelector("#yr").textContent = new Date().getFullYear();
    }
  };
})();
