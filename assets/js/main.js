// main.js - scripts for the Crumb & Co website

var businessEmail = 'mashaandthebear1627@gmail.com';

// ---------- EmailJS settings (see emailjs.com -> your dashboard) ----------
// Public Key:  Account -> General
// Service ID:  Email Services tab
// Template IDs: Email Templates tab (one for each form, or use the same one for both)
var emailjsPublicKey = 't53upPpUZOrklpnOH';
var emailjsServiceId = 'service_5reeyuc';
var emailjsEnquiryTemplateId = 'template_s14jbh6';
var emailjsContactTemplateId = 'template_bpg9dav';

// Placeholder prices in rand - change to your real prices.
// cupcake is the price per cupcake, the others are per cake (small size).
var prices = { birthday: 450, wedding: 1800, custom: 650, cupcake: 25 };
var sizeMultiplier = { small: 1, medium: 1.5, large: 2 };
var rushDays = 2;         // orders needed within this many days are rush orders
var rushFee = 0.25;       // 25% extra for rush orders
var weddingMinDays = 14;  // wedding cakes need this much notice
var maxQuantity = 50;

var typeNames = {
  birthday: 'Birthday cake',
  wedding: 'Wedding cake',
  custom: 'Custom cake',
  cupcake: 'Cupcakes'
};

var reviews = [
  { text: 'Crumb & Co. made my wedding cake, and it was absolutely stunning! The flavors were incredible, and the design was exactly what I wanted. Highly recommend!', author: 'Sarah L.' },
  { text: "I ordered a custom birthday cake for my son's party, and it was a hit! The kids loved it, and the adults couldn't stop raving about how delicious it was.", author: 'Mark T.' },
  { text: "The cupcakes from Crumb & Co. are to die for! Perfectly moist and beautifully decorated. I'll definitely be ordering again.", author: 'Emily R.' }
];

// ===================== SMALL HELPER FUNCTIONS =====================

// find one element on the page
function getEl(selector) {
  return document.querySelector(selector);
}

// find all elements and give back a normal array
function getAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

// make a new element with a class and some text
// (textContent is used so anything a user types is never run as HTML)
function makeEl(tag, className, text) {
  var element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  return element;
}

// turn a number into rand, e.g. 1350 -> R1,350
function money(number) {
  return 'R' + Math.round(number).toLocaleString('en-ZA');
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ===================== NAVIGATION MENU =====================

// open or close the mobile menu
function setMenu(open) {
  var links = getEl('.nav-links');
  var button = getEl('.nav-toggle');
  if (open) {
    links.classList.add('open');
    button.setAttribute('aria-expanded', 'true');
    button.textContent = '\u2715';
  } else {
    links.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
    button.textContent = '\u2630';
  }
}

function initNav() {
  var button = getEl('.nav-toggle');
  var links = getEl('.nav-links');
  if (!button || !links) {
    return;
  }

  // click the menu button
  button.addEventListener('click', function () {
    setMenu(!links.classList.contains('open'));
  });

  // press Escape to close the menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      setMenu(false);
      button.focus();
    }
  });

  // close the menu if the window becomes wide again
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      setMenu(false);
    }
  });

  // mark the link for the page we are on
  var currentPage = location.pathname.split('/').pop();
  if (currentPage === '') {
    currentPage = 'index.html';
  }
  var allLinks = links.querySelectorAll('a');
  for (var i = 0; i < allLinks.length; i++) {
    var fileName = allLinks[i].getAttribute('href').split('/').pop();
    if (fileName === currentPage) {
      allLinks[i].setAttribute('aria-current', 'page');
    }
  }
}

// ===================== FADE-IN WHEN SCROLLING =====================

function initReveal() {
  if (!('IntersectionObserver' in window)) {
    return;
  }
  if (prefersReducedMotion()) {
    return;
  }

  // when an element scrolls into view, add the "visible" class
  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('visible');
        observer.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.08 });

  var items = getAll('.container, .products-section h1, .fun-facts-border, .fun-facts-second-border, ' +
    '.product-category, .about-us-section, .services-container, .enquiry-form, .contact-form, ' +
    '.contact-info, .map, footer');
  for (var j = 0; j < items.length; j++) {
    items[j].classList.add('reveal');
    observer.observe(items[j]);
  }
}

// ===================== CUSTOMER REVIEWS (home page) =====================

var reviewIndex = 0;
var reviewBox = null;
var reviewTimer = null;

// show the current review
function showReview() {
  var review = reviews[reviewIndex];
  reviewBox.textContent = '';
  reviewBox.appendChild(makeEl('p', '', '"' + review.text + '" - ' + review.author));
}

// fade out, change to the next review, fade back in
function nextReview() {
  reviewBox.classList.add('fade');
  setTimeout(function () {
    reviewIndex = (reviewIndex + 1) % reviews.length;
    showReview();
    reviewBox.classList.remove('fade');
  }, 350);
}

function initReviews() {
  reviewBox = getEl('#reviews-list');
  if (!reviewBox) {
    return;
  }

  var nextButton = makeEl('button', 'btn-link review-next', 'Next review');
  nextButton.type = 'button';
  nextButton.addEventListener('click', function () {
    clearInterval(reviewTimer);
    nextReview();
  });
  reviewBox.after(nextButton);

  showReview();
  if (!prefersReducedMotion()) {
    reviewTimer = setInterval(nextReview, 8000);
  }
}

// ===================== SEARCH, FILTER AND SORT =====================
// used on the products page and the services page

function initFilter() {
  var searchBox = getEl('#search-input');
  var items = getAll('.filter-item');
  if (!searchBox || items.length === 0) {
    return;
  }
  var categoryBox = getEl('#category-filter');
  var sortBox = getEl('#sort-select');
  var noResults = getEl('#no-results');
  var parent = items[0].parentElement;

  // the name used when sorting
  function getName(item) {
    var name = item.dataset.name || item.textContent;
    return name.trim();
  }

  function applyFilter() {
    var searchText = searchBox.value.trim().toLowerCase();
    var chosenCategory = 'all';
    if (categoryBox) {
      chosenCategory = categoryBox.value;
    }

    // show or hide each item
    var shown = 0;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var words = (item.textContent + ' ' + (item.dataset.keywords || '')).toLowerCase();
      var categoryMatches = (chosenCategory === 'all' || item.dataset.category === chosenCategory);
      var textMatches = (searchText === '' || words.indexOf(searchText) !== -1);
      if (categoryMatches && textMatches) {
        item.hidden = false;
        shown++;
      } else {
        item.hidden = true;
      }
    }
    if (noResults) {
      noResults.hidden = (shown > 0);
    }

    // sort the items
    var mode = 'default';
    if (sortBox) {
      mode = sortBox.value;
    }
    var ordered = items.slice();
    if (mode === 'az' || mode === 'za') {
      ordered.sort(function (a, b) {
        var result = getName(a).localeCompare(getName(b));
        if (mode === 'za') {
          result = -result;
        }
        return result;
      });
    }
    for (var k = 0; k < ordered.length; k++) {
      parent.appendChild(ordered[k]);
    }
  }

  searchBox.addEventListener('input', applyFilter);
  if (categoryBox) {
    categoryBox.addEventListener('change', applyFilter);
  }
  if (sortBox) {
    sortBox.addEventListener('change', applyFilter);
  }
}

// ===================== ACCORDION (services page) =====================

// turn one <li> into a button + a panel that opens and closes
function makeAccordionItem(li, number) {
  // the title is the first piece of text directly inside the <li>
  var title = null;
  for (var n = 0; n < li.childNodes.length; n++) {
    var node = li.childNodes[n];
    if (node.nodeType === 3 && node.textContent.trim() !== '') {
      title = node;
      break;
    }
  }
  if (!title) {
    return;
  }

  var name = title.textContent.trim();
  var button = makeEl('button', 'accordion-btn', name);
  button.type = 'button';
  var panel = makeEl('div', 'panel');
  panel.id = 'panel-' + number;

  // move the paragraphs into the panel
  var kids = Array.from(li.children);
  for (var k = 0; k < kids.length; k++) {
    panel.appendChild(kids[k]);
  }
  title.remove();

  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', panel.id);
  li.dataset.name = name;
  li.classList.add('accordion-item');
  li.appendChild(button);
  li.appendChild(panel);

  button.addEventListener('click', function () {
    li.classList.toggle('open');
    if (li.classList.contains('open')) {
      button.setAttribute('aria-expanded', 'true');
    } else {
      button.setAttribute('aria-expanded', 'false');
    }
  });
}

function initAccordion() {
  var items = getAll('.services-container li.filter-item');
  for (var i = 0; i < items.length; i++) {
    makeAccordionItem(items[i], i);
  }
}

// ===================== PHOTO LIGHTBOX (products page) =====================

var lbAll = [];      // every gallery image
var lbList = [];     // images that are currently visible
var lbIndex = 0;     // which image is showing
var lbBox = null;    // the dark overlay
var lbBig = null;    // the big image
var lbOpener = null; // the image that was clicked

// show the image at position i (wraps around at the ends)
function lbShow(i) {
  lbIndex = (i + lbList.length) % lbList.length;
  lbBig.src = lbList[lbIndex].currentSrc || lbList[lbIndex].src;
  lbBig.alt = lbList[lbIndex].alt;
}

function lbClose() {
  if (!lbBox) {
    return;
  }
  lbBox.remove();
  lbBox = null;
  document.body.style.overflow = '';
  document.removeEventListener('keydown', lbKey);
  if (lbOpener) {
    lbOpener.focus();
  }
}

// keyboard controls while the lightbox is open
function lbKey(e) {
  if (e.key === 'Escape') {
    lbClose();
  } else if (e.key === 'ArrowLeft') {
    lbShow(lbIndex - 1);
  } else if (e.key === 'ArrowRight') {
    lbShow(lbIndex + 1);
  }
}

function makeLbButton(className, label, text, action) {
  var button = makeEl('button', className, text);
  button.type = 'button';
  button.setAttribute('aria-label', label);
  button.addEventListener('click', function (e) {
    e.stopPropagation();
    action();
  });
  return button;
}

function lbOpen(image) {
  // only use the images that are not hidden by the search filter
  lbList = [];
  for (var i = 0; i < lbAll.length; i++) {
    if (lbAll[i].offsetParent !== null) {
      lbList.push(lbAll[i]);
    }
  }
  lbOpener = image;

  lbBox = makeEl('div', 'lightbox');
  lbBox.setAttribute('role', 'dialog');
  lbBox.setAttribute('aria-modal', 'true');
  lbBox.setAttribute('aria-label', 'Enlarged cake photo');
  lbBig = makeEl('img');

  var closeButton = makeLbButton('lb-close', 'Close', '\u2715', lbClose);
  var prevButton = makeLbButton('lb-prev', 'Previous photo', '\u2039', function () {
    lbShow(lbIndex - 1);
  });
  var nextButton = makeLbButton('lb-next', 'Next photo', '\u203A', function () {
    lbShow(lbIndex + 1);
  });
  lbBox.appendChild(lbBig);
  lbBox.appendChild(closeButton);
  lbBox.appendChild(prevButton);
  lbBox.appendChild(nextButton);

  // clicking the dark background closes it
  lbBox.addEventListener('click', function (e) {
    if (e.target === lbBox) {
      lbClose();
    }
  });

  document.body.appendChild(lbBox);
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', lbKey);
  lbShow(lbList.indexOf(image));
  closeButton.focus();
}

// make one image clickable (also works with the keyboard)
function setupLbImage(image) {
  image.tabIndex = 0;
  image.setAttribute('role', 'button');
  image.addEventListener('click', function () {
    lbOpen(image);
  });
  image.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      lbOpen(image);
    }
  });
}

function initLightbox() {
  lbAll = getAll('.birthday-cakes img, .products-section2 img');
  for (var i = 0; i < lbAll.length; i++) {
    setupLbImage(lbAll[i]);
  }
}

// ===================== MAP (contact page, uses Leaflet) =====================

function initMap() {
  var mapBox = getEl('#leaflet-map');
  if (!mapBox) {
    return;
  }
  // if the Leaflet library did not load, show a message instead
  if (!window.L) {
    mapBox.textContent = 'The map could not load. Please use the "Get directions" link below.';
    return;
  }

  var position = [-33.9326, 18.4092]; // 14 Kloof Street, Gardens - adjust if the pin is slightly off
  var map = L.map(mapBox, { scrollWheelZoom: false }).setView(position, 16);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker(position).addTo(map)
    .bindPopup('<strong>Crumb &amp; Co.</strong><br>14 Kloof Street, Gardens, Cape Town')
    .openPopup();

  // only allow scroll-zoom after the map is clicked, so page scrolling still works
  map.on('click', function () {
    map.scrollWheelZoom.enable();
  });
  map.on('mouseout', function () {
    map.scrollWheelZoom.disable();
  });
}

// ===================== FORM VALIDATION =====================

function startOfToday() {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

// how many days from today until a date like "2026-11-20"
function daysUntil(dateText) {
  var date = new Date(dateText + 'T00:00:00');
  return Math.round((date - startOfToday()) / 86400000);
}

// check one value against a rule. Returns '' if fine, or an error message.
function checkRule(rule, value, input) {
  if (rule === 'name') {
    if (/^[A-Za-z\u00C0-\u024F'\u2019 .-]{2,60}$/.test(value)) {
      return '';
    }
    return 'Please enter your name (2\u201360 letters, no numbers).';
  }

  if (rule === 'email') {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      return '';
    }
    return 'Please enter a valid email, e.g. name@example.com.';
  }

  if (rule === 'phone') {
    var digits = value.replace(/[\s\-()]/g, ''); // remove spaces, dashes, brackets
    if (/^(\+27|0)\d{9}$/.test(digits)) {
      return '';
    }
    return 'Enter a valid South African number, e.g. 021 123 4567 or +27 21 123 4567.';
  }

  if (rule === 'flavour') {
    if (value.length >= 2 && value.length <= 50) {
      return '';
    }
    return 'Please enter a flavour (2\u201350 characters).';
  }

  if (rule === 'quantity') {
    if (/^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= maxQuantity) {
      return '';
    }
    return 'Enter a whole number between 1 and ' + maxQuantity + '.';
  }

  if (rule === 'date') {
    if (isNaN(new Date(value + 'T00:00:00'))) {
      return 'Please choose a valid date.';
    }
    var days = daysUntil(value);
    if (days < 1) {
      return 'Please choose a date from tomorrow onwards.';
    }
    if (days > 365) {
      return 'Please choose a date within the next 12 months.';
    }
    return '';
  }

  if (rule === 'delivery') {
    if (value === 'pickup') {
      return '';
    }
    return 'Delivery is coming soon \u2014 please choose in-store pickup for now.';
  }

  if (rule === 'message') {
    if (value.length < 10) {
      return 'Please write at least 10 characters.';
    }
    if (value.length > input.maxLength) {
      return 'Please keep it under ' + input.maxLength + ' characters.';
    }
    return '';
  }

  return ''; // no rule for this field
}

// show (or clear) the error message under a field
function setError(input, message) {
  var field = input.closest('.field');
  field.querySelector('.error-msg').textContent = message;
  if (message) {
    field.classList.add('invalid');
    input.setAttribute('aria-invalid', 'true');
  } else {
    field.classList.remove('invalid');
    input.setAttribute('aria-invalid', 'false');
  }
}

// validate one field. Returns true if it is OK.
function validateField(input) {
  var value = input.value.trim();
  var message = '';
  if (input.required && value === '') {
    message = 'This field is required.';
  } else if (value !== '') {
    message = checkRule(input.dataset.rule, value, input);
  }
  setError(input, message);
  return message === '';
}

// check a field when the user leaves it, and re-check while typing if it has an error
function watchField(input) {
  input.addEventListener('blur', function () {
    validateField(input);
  });
  input.addEventListener('input', function () {
    if (input.closest('.field').classList.contains('invalid')) {
      validateField(input);
    }
  });
}

// connect a form to the validation. onValid runs only when everything is correct.
function setupForm(form, onValid) {
  var allFields = form.querySelectorAll('input, select, textarea');
  var fields = [];
  for (var i = 0; i < allFields.length; i++) {
    if (allFields[i].name) {
      fields.push(allFields[i]);
      watchField(allFields[i]);
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // stop the page from reloading

    var firstBad = null;
    for (var j = 0; j < fields.length; j++) {
      var ok = validateField(fields[j]);
      if (!ok && firstBad === null) {
        firstBad = fields[j];
      }
    }
    if (firstBad !== null) {
      firstBad.focus();
      return;
    }

    // put all the answers into one object
    var data = {};
    var formData = new FormData(form);
    formData.forEach(function (value, key) {
      data[key] = String(value).trim();
    });
    onValid(data);
  });
}

// ===================== SENDING / EMAIL HELPERS =====================

// build a mailto: link that opens the visitor's email app
function mailtoLink(subject, body) {
  var text = body.replace(/\n/g, '\r\n');
  return 'mailto:' + businessEmail + '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(text);
}

// ===================== EMAILJS (sends the form to your email) =====================

// returns true once you have replaced all the YOUR_... placeholders at the top
function emailjsIsSetUp(templateId) {
  var values = [emailjsPublicKey, emailjsServiceId, templateId];
  for (var i = 0; i < values.length; i++) {
    if (values[i] === '' || values[i].indexOf('YOUR_') === 0) {
      return false;
    }
  }
  return true;
}

// Sends the form details to EmailJS in the background (AJAX).
// templateId   = which EmailJS template to use
// params       = the values that fill in the {{variables}} in that template
// box          = the response box on the page (shows the sending status)
// fallbackLink = the "email us instead" link, only shown if sending fails
function sendToEmailJS(templateId, params, box, fallbackLink) {
  var note = makeEl('p', '', '');
  box.appendChild(note);
  var submitButton = box.parentElement.querySelector('button[type="submit"]');

  // if the keys have not been added yet, fall back to the email link
  if (!emailjsIsSetUp(templateId)) {
    note.textContent = 'Automatic sending is not set up yet. Please use the button below to email us.';
    note.className = 'status-warn';
    box.appendChild(fallbackLink);
    return;
  }

  note.textContent = 'Sending your message...';
  submitButton.disabled = true; // stops the customer clicking twice

  fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: emailjsServiceId,
      template_id: templateId,
      user_id: emailjsPublicKey,
      template_params: params
    })
  }).then(function (response) {
    if (!response.ok) {
      throw new Error('EmailJS returned status ' + response.status);
    }
    note.textContent = '\u2714 Your message was sent to Crumb & Co. We will get back to you soon.';
    note.className = 'status-ok';
  }).catch(function (error) {
    console.log('EmailJS error:', error);
    note.textContent = 'Sorry, we could not send this automatically. Please use the button below to email us instead.';
    note.className = 'status-warn';
    box.appendChild(fallbackLink);
  }).then(function () {
    submitButton.disabled = false; // runs after success or failure
  });
}

// reveal the response box and move focus to it
function showBox(box) {
  box.hidden = false;
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  box.focus();
}

// ===================== ENQUIRY FORM (price + availability) =====================

function buildQuote(d) {
  var quantity = Number(d['number-of-cakes']);
  var days = daysUntil(d['pickup-date']);
  var total = prices[d['cake-type']] * sizeMultiplier[d['cake-size']] * quantity;
  var status = 'ok';
  var availability = 'Available \u2014 we have space for this date.';

  if (d['cake-type'] === 'wedding' && days < weddingMinDays) {
    status = 'warn';
    availability = 'Wedding cakes need at least ' + weddingMinDays +
      ' days\u2019 notice. Please contact us so we can check if we can still fit you in.';
  } else if (days <= rushDays) {
    status = 'warn';
    total = total * (1 + rushFee);
    availability = 'Rush order (' + Math.round(rushFee * 100) +
      '% rush fee included) \u2014 subject to confirmation by our bakers.';
  }

  // opening hours depend on the day of the week (0 = Sunday, 6 = Saturday)
  var weekday = new Date(d['pickup-date'] + 'T00:00:00').getDay();
  var hours = '9:00 AM \u2013 5:00 PM (weekday)';
  if (weekday === 0 || weekday === 6) {
    hours = '10:00 AM \u2013 2:00 PM (weekend)';
  }

  return { total: total, status: status, availability: availability, hours: hours };
}

function initEnquiry() {
  var form = getEl('#enquiry-form');
  var box = getEl('#enquiry-response');
  if (!form) {
    return;
  }

  // the earliest date you can pick is tomorrow
  var tomorrow = new Date(startOfToday().getTime() + 86400000);
  getEl('#pickup-date').min = tomorrow.toISOString().slice(0, 10);

  setupForm(form, function (d) {
    var quote = buildQuote(d);
    var quantity = Number(d['number-of-cakes']);

    box.textContent = '';
    box.className = 'form-response';
    box.appendChild(makeEl('h3', '', 'Thank you, ' + d.name.split(' ')[0] + '!'));

    // list of details
    var lines = [
      ['Order', quantity + ' \u00D7 ' + typeNames[d['cake-type']] + ' (' + d['cake-size'] + '), ' +
        d['cake-flavour'] + ' for ' + d.occasion.replace('-', ' ')],
      ['Estimated price', money(quote.total)],
      ['Availability', quote.availability],
      ['Pickup on ' + d['pickup-date'], 'in-store hours ' + quote.hours]
    ];
    var list = makeEl('ul');
    for (var i = 0; i < lines.length; i++) {
      var item = makeEl('li');
      item.appendChild(makeEl('strong', '', lines[i][0] + ': '));
      item.appendChild(document.createTextNode(lines[i][1]));
      list.appendChild(item);
    }
    box.appendChild(list);

    var noteClass = 'status-warn';
    if (quote.status === 'ok') {
      noteClass = 'status-ok';
    }
    box.appendChild(makeEl('p', noteClass,
      'This is an estimate only. Brian will confirm the final price and design with you.'));

    // the text for the email
    var body = 'Cake enquiry from ' + d.name + '\n' +
      'Email: ' + d.email + '\n' +
      'Phone: ' + d.phone + '\n\n' +
      'Type: ' + typeNames[d['cake-type']] + '\n' +
      'Flavour: ' + d['cake-flavour'] + '\n' +
      'Size: ' + d['cake-size'] + '\n' +
      'Quantity: ' + quantity + '\n' +
      'Occasion: ' + d.occasion + '\n' +
      'Date: ' + d['pickup-date'] + ' (' + d['pickup-or-delivery'] + ')\n' +
      'Estimated price: ' + money(quote.total) + '\n\n' +
      'Details:\n' + d.message;

    // backup link, only shown if EmailJS is not set up or fails
    var emailLink = makeEl('a', 'btn-link', 'Email this enquiry to Crumb & Co. instead');
    emailLink.href = mailtoLink('Cake enquiry from ' + d.name, body);

    // these names must match the {{variables}} in your EmailJS enquiry template
    var params = {
      form_type: 'Cake enquiry',
      subject: 'Cake enquiry from ' + d.name,
      from_name: d.name,
      from_email: d.email,
      reply_to: d.email,
      phone: d.phone,
      cake_type: typeNames[d['cake-type']],
      cake_flavour: d['cake-flavour'],
      cake_size: d['cake-size'],
      quantity: quantity,
      occasion: d.occasion,
      pickup_date: d['pickup-date'],
      pickup_or_delivery: d['pickup-or-delivery'],
      estimated_price: money(quote.total),
      availability: quote.availability,
      message: d.message
    };

    showBox(box);
    sendToEmailJS(emailjsEnquiryTemplateId, params, box, emailLink);
  });
}

// ===================== CONTACT FORM (builds an email) =====================

function initContact() {
  var form = getEl('#contact-form');
  var box = getEl('#contact-response');
  if (!form) {
    return;
  }

  setupForm(form, function (d) {
    var reason = form.querySelector('#subject option:checked').textContent;
    var subject = reason + ' \u2014 message from ' + d.name;
    var phone = d.phone;
    if (phone === '') {
      phone = 'not given';
    }
    var body = 'Name: ' + d.name + '\n' +
      'Email: ' + d.email + '\n' +
      'Phone: ' + phone + '\n' +
      'Reason for contact: ' + reason + '\n\n' +
      'Message:\n' + d.message;

    box.textContent = '';
    box.className = 'form-response';
    box.appendChild(makeEl('h3', '', 'Thank you, ' + d.name.split(' ')[0] + '! Here is a copy of your message:'));
    box.appendChild(makeEl('p', '', 'To: ' + businessEmail));
    box.appendChild(makeEl('p', '', 'Subject: ' + subject));
    box.appendChild(makeEl('pre', '', body));

    // backup link, only shown if EmailJS is not set up or fails
    var emailLink = makeEl('a', 'btn-link', 'Open in my email app to send instead');
    emailLink.href = mailtoLink(subject, body);

    // these names must match the {{variables}} in your EmailJS contact template
    var params = {
      form_type: 'Contact message',
      subject: subject,
      from_name: d.name,
      from_email: d.email,
      reply_to: d.email,
      phone: phone,
      reason: reason,
      message: d.message
    };

    showBox(box);
    sendToEmailJS(emailjsContactTemplateId, params, box, emailLink);
  });
}

// ===================== START EVERYTHING WHEN THE PAGE IS READY =====================

document.addEventListener('DOMContentLoaded', function () {
  initNav();
  initAccordion();
  initFilter();
  initLightbox();
  initMap();
  initReviews();
  initEnquiry();
  initContact();
  initReveal();
});
