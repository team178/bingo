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

function generateBoard(container) {
  var row = [];
  var num_rows = 5;

  // Empties old table container
  container.html('');

  // Creates randomized list of values
  permuteList(values);
  var terms = values.slice(0, 24); // get only 25 values
  terms.splice(terms.length/2, 0, "FREE SPACE"); // Inserts the free space in the middle

  var headerRow = document.createElement('div');
  $(headerRow).attr('class', 'row');
  $(headerRow).attr('id', 'boardHeader');
    var content = 'BINGO';
    for (var i = 0; i < content.length; i++) {
      var headerTile = document.createElement('div');
      $(headerTile).text(content.charAt(i));
      $(headerTile).attr('class', 'tile');
      headerRow.appendChild(headerTile);
    }
  container.append(headerRow);

  var termindex = 0;
  for (var r = 0; r < num_rows; r++){ //r is for row
    row[r] = document.createElement('div');
    row[r].className = "row";

    for (t = 0; t < num_rows; t++) { // t is for tile
      var term = terms[termindex];
      termindex++;

      var label = document.createElement('label');
        $(label).attr('for', 'r' + r + 'c' + t);
      var span = document.createElement('span');
        span.innerHTML = term;
      var check = document.createElement('input');
        $(check).attr('id', 'r' + r + 'c' + t );
        $(check).attr('type', 'checkbox');
        $(check).click(checkForWin);
      var tile = document.createElement('div');
        $(tile).attr('class', 'tile');

        if(term == "FREE SPACE") {
          $(check).attr('checked', 'true');
          $(check).attr('onclick', 'return false;');
          $(check).attr('onkeydown', 'e = e || window.event; if(e.keyCode !== 9) return false;');
          $(tile).attr('id', 'freeSpace');
        }

      label.appendChild(span);
      tile.appendChild(label);
      row[r].appendChild(check);
      row[r].appendChild(tile);
    }
    container.append(row[r]);
  }
}

function createBoard() {
  toggleBingoWin(false);
  var container = $("#board"); // same as document.getElementById('board');
  var board = generateBoard(container);
}

function showInstructions(){
  swal({
    title: 'FRC Bingo!',
    html: 'Welcome to FRC Kickoff Bingo! Fill out a card and get excited for <i>FIRST</i> INFINITE RECHARGE! Whenever something is said or done that matches with your bingo card, click on the box to check it off. If you get 5 in a row in any direction (vertical, horizontal, or diagonal) click the BINGO button to win!',
    confirmButtonText: 'Let\'s play!',
    confirmButtonClass: 'button'
  });
}

function showWin(){
  swal({
    title: 'BINGO!',
    text: 'Congratulations, you did it! Here\'s to an awesome build season. Share your BINGO win with your friends:\n\n',
    confirmButtonText: 'Play again!',
    onOpen: function(){
      $('<div></div>').attr("id","confetti").appendTo('.swal2-title');
      $('#social-share').appendTo('.swal2-content');
      $("body").append('<div id="social-share"><iframe src="https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Ffarmingtonrobotics.org%2Fbingo%2F&layout=button&size=small&mobile_iframe=true&width=65&height=20&appId" width="65" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe><a href="https://twitter.com/share" class="twitter-share-button" data-text="BINGO! #omgrobots #FIRST #INFINITERECHARGE Play #FRCKickoff Bingo at" data-url="http://farmingtonrobotics.org/bingo/" data-via="team178" data-related="FIRSTweets" data-show-count="false">Tweet</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></div>');
      for(var i = 0; i < 50; i++){
        $('#confetti').append($('<i></i>'));
      }
    },
    onClose: createBoard,
    confirmButtonClass: 'button'
  });
}

function checkForWin(){
  var bingo = false;
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
    bingo = true;
  } else {
    if(allchecked.includes("r0c0")&&allchecked.includes("r1c1")&&allchecked.includes("r2c2")&&allchecked.includes("r3c3")&&allchecked.includes("r4c4")){
      console.log('still a winner harry - backward diagonal');
      bingo = true;
    } else if(allchecked.includes("r0c4")&&allchecked.includes("r1c3")&&allchecked.includes("r2c2")&&allchecked.includes("r3c1")&&allchecked.includes("r4c0")){
      console.log('still a winner harry - forward diagonal');
      bingo = true;
    } else {
      bingo = false;
    }
  }
  toggleBingoWin(bingo);
}
function toggleBingoWin(bingo) {
  if(bingo == true) {
    $("#freeSpace").html('<label><div class="button" id="bingo"><div>BINGO!</div><i class="shine" id="shine1"></i><i class="shine" id="shine2"></i></div></label>');
    $("#bingo").click(showWin);
  } else {
    $("#freeSpace").html('<label for="r2c2"><span>FREE SPACE</span></label>');
  }
}

$( window ).load(function() {
  showInstructions();
  createBoard();
});
