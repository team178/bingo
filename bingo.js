values =
[
  "STEM",
  "Scholarships - Apply, apply, apply!",
  "Someone mentions Water Game",
  "Past Game piece in Kickoff stream",
  "Havabanana Productions",
  "Dean Kamen is wearing denim",
  "Woodie Flowers in a steampunk costume",
  "Gracious Professionalism",
  "Dean's Homework",
  "Encryption Password is 1337",
  "Scripted role-play with steampunk theme",
  "Scramble to download the game manual",
  "Dozer is in the game animation",
  "Someone is sad because Dozer's not in the game animation",
  "One of the animation robots has a plunger",
  "The team eats a meal together",
  "Someone in the room tweets and ends up in the livestream",
  "Someone references previous year's game",
  "Sponsor animation loops more than once",
  "Rule update before the end of the day"
];

function permuteList(list) { // Creates randomly ordered version of list
  for (var i = 0; i < list.length; i++) {
    var j = Math.floor(Math.random() * i);
    if (i != j) {
      var swap = list[i];
      list[i] = list[j];
      list[j] = swap;
    }
  }
}

function generateBoard() {
  var row = [];
  var cell = [];
  var num_rows = 5;

  // Creates table
  var tab = document.createElement('table');
  var tbo = document.createElement('tbody');

  // Creates randomized list of values
  permuteList(values);
  var terms = values.slice(0, 24);
  terms.splice(terms.length/2, 0, "FREE SPACE"); // Inserts the free space in the middle
  var index = 0;
  for (var c = 0; c < num_rows; c++){
    row[c] = document.createElement('tr');
    for (k = 0; k < num_rows; k++) {
      cell[k] = document.createElement('td');
      var term = terms[index];
      index++
      var label = document.createElement('label');
      label.innerHTML = term;
      var check = document.createElement('input');
      $(check).attr("type", "checkbox");
      label.appendChild(check);
      cell[k].appendChild(label);
      row[c].appendChild(cell[k]);
    }
    tbo.appendChild(row[c]);
  }
  tab.appendChild(tbo);
  return tab;
}

function createBoard() {
  var board = generateBoard();
  var container = document.getElementById('board');
  console.log(container);
  $(container).html("");
  $(container).append(board);
}

$( document ).ready(createBoard());
