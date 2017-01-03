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
      $(label).attr('for', 'tile-' + index);
      var check = document.createElement('input');
      $(check).attr('id', 'tile-' + index);
      $(check).attr('type', 'checkbox');
      $(check).attr('id', 'r'+c+'c'+k);
      $(check).click(checkForWin);
      if(term == "FREE SPACE") {
        $(check).attr('checked', 'true');
        $(check).attr('onclick', 'return false;');
        $(check).attr('onkeydown', 'e = e || window.event; if(e.keyCode !== 9) return false;');
      }
      var tile = document.createElement('div');
      $(tile).attr('class', 'tile');
      tile.appendChild(label);
      cell[k].appendChild(check);
      cell[k].appendChild(tile);
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
  $(container).html("");
  $(container).append(board);
}

function showInstructions(){
  swal({
    title: 'FRC Bingo!',
    text: 'Welcome to FRC Kickoff Bingo! Fill out a card and get excited for FIRST STEAMWORKS! Whenever something said or done matches your bingo card, click on the box to check it off. If you get 5 in a row in any direction - vertical, horizontal, or diagonal, click the BINGO button to win!',
    confirmButtonText: 'Let\'s play!'
  });
}

function checkForWin(){
  var checked = $('input:checkbox:checked');

  var allchecked = "";
  for (var cb = 0; cb < checked.length; cb++){
    allchecked += $(checked[cb]).attr('id');
  }
  // the stuff inside match is regex and regex is hell so i'm hardcoding it sorry not sorry
  if(((allchecked.match(/r0/g) || []).length) == 5 ||
  ((allchecked.match(/r1/g) || []).length) == 5 ||
  ((allchecked.match(/r3/g) || []).length) == 5 ||
  ((allchecked.match(/r2/g) || []).length) == 5 ||
  ((allchecked.match(/r4/g) || []).length) == 5 ||
  ((allchecked.match(/c1/g) || []).length) == 5 ||
  ((allchecked.match(/c0/g) || []).length) == 5 ||
  ((allchecked.match(/c2/g) || []).length) == 5 ||
  ((allchecked.match(/c3/g) || []).length) == 5 ||
  ((allchecked.match(/c4/g) || []).length) == 5){
    console.log('yer a winner harry');
    return true;
  } else {
    if(allchecked.includes("r0c0")&&allchecked.includes("r1c1")&&allchecked.includes("r2c2")&&allchecked.includes("r3c3")&&allchecked.includes("r4c4")){
      console.log('still a winner harry - backward diagonal');
      return true;
    } else if(allchecked.includes("r0c4")&&allchecked.includes("r1c3")&&allchecked.includes("r2c2")&&allchecked.includes("r3c1")&&allchecked.includes("r4c0")){
      console.log('still a winner harry - forward diagonal');
      return true;
    }
  }
}



$( window ).load(function() {
  showInstructions();
  createBoard();
});
