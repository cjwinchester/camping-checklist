// a list of camping supplies to pack
// obv we won't need everything for every trip
var ls = [
  'Hammock',
  'Sleeping bags',
  'Thermal underwear',
  'Tiny stove',
  'Tiny stove fuel',
  'Rain gear',
  'Warm jacket',
  'Firestarters',
  'Dryer lint and newspaper',
  'Compass',
  'Whistle',
  'Cell phone (in waterproof)',
  'Cell phone charger (in waterproof)',
  'First aid kit',
  'Food and coffee',
  'Picnic tablecloth',
  'Carabiners',
  'Lifestraw',
  'Flashlights',
  'Knife or multitool',
  'Camp sandals',
  'Hand sanitizer',
  'Coffee',
  'Spade',
  'Trash bags',
  'Toilet paper',
  'Toiletries: Deodorant, toothpaste and toothbrushes',
  'Whiskey',
  'Tent',
  'Shovel',
  'Tarp',
  'Firewood',
  'Hatchet',
  'Mallet',
  'Ice',
  'Camp stove',
  'Pillows',
  'Games',
  'Dog food',
  'Dog leashes/harnesses',
  'Dog bowls',
  'Dog poop bags',
  'Camp stove fuel',
  'Ziploc bags',
  'Aluminum foil',
  'Cookware and cutlery',
  'Washtub x 2',
  'Towels and dish scrubby',
  'Coffee pot',
  'Portable speaker',
  'Swimsuits',
  'Hiking boots',
  'Water bottles/bladder (filled)',
  'Wallets',
  'Change of clothes',
  'Batteries (in waterproof)',
  'Camp chairs',
  'Towels',
  'Hot pad holders',
  'Bottle/can opener',
  'Tape (duct or electrical)',
  'Sunscreen',
  'Bug spray',
  'Chapstick',
  'Hats',
  'Antibacterial wipes',
  'Sunglasses',
  'Food seasoning'
].sort();

// the container div
var cl = document.querySelector('div#checklist');

// the clear button
var clear_button = document.querySelector('button#clear');

// slugify function via https://gist.github.com/mathewbyrne/1280286
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/,/g, '-')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// empty string to hold the HTML for our boxes
var checklist_items = '';

// loop over the array of items
ls.forEach(function(item, i) {

  // slugify the item name
  var item_id = slugify(item);

  // the template for each box div
  var tpl = `
  <div class="box" data-slug="${item_id}" tabindex=${i}>
    <span class="check"></span>
      ${item}
  </div>`;

  // add templated div code to empty string
  checklist_items += tpl;
});

// set container div HTML equal to the string of divs we just made
cl.innerHTML = checklist_items;

// get a handle to those boxes
var boxes = document.querySelectorAll('div.box');

// an empty array to hold "saved" items
// eventually will get set as value to `saved` key in localStorage
var saved_list = [];

// if we have stuff loaded in the localStorage key already
if (localStorage['saved']) {

  // turn that comma-separated string into an array
  var ls_saved = localStorage['saved'].split(',');

  // set it equal to our array of saved items
  saved_list = ls_saved;

  // loop over the box divs
  for (var i=0; i<boxes.length; i++) {

    // if the saved list includes its slug value
    if (ls_saved.includes(boxes[i].dataset.slug)) {

      // set the checkmark and change the style to "active"
      boxes[i].firstElementChild.innerHTML = '✓';
      boxes[i].classList.add('active');
    }
  }
}

// loop over the boxes
for (var i=0; i<boxes.length; i++) {

  // add a click listener
  boxes[i].addEventListener('click', function() {

    // toggle the active class
    this.classList.toggle('active');

    // get a handle to the item slug
    var slug = this.dataset.slug;

    // if this element is now active, add a checkmark
    // and add a slug to saved list
    if (this.classList.contains('active')) {
      this.firstElementChild.innerHTML = '✓';
      saved_list.push(slug);
    } else {
      // otherwise, remove the checkmark
      this.firstElementChild.innerHTML = '';

      // and remove the slug from the saved list
      saved_list = saved_list.filter(function(item) {
        return item !== slug;
      });
    }

    // finally, set the localStorage value to the saved list
    localStorage['saved'] = saved_list;
  });
}

// when the "clear" button is clicked
clear_button.addEventListener('click', function() {

  // loop over the box divs
  for (var i=0; i<boxes.length; i++) {

    // remove the checkmark
    boxes[i].firstElementChild.innerHTML = '';

    // reset the box style
    boxes[i].classList.remove('active');

    // empty the saved list
    saved_list.length = 0;

    // reset the localStorage value
    localStorage['saved'] = saved_list;
  }
});

// add a keydown listener
window.addEventListener('keydown', function(e) {
  
  // get a handle to the element in focus
  var focused = document.activeElement;
  
  // if it's a box div and the key pressed is enter (13) or space (32)
  if (focused.classList.contains('box') && [13, 32].includes(e.keyCode)) {
    
    // simulate a click on that element
    e.preventDefault();
    focused.click();
  }
});
