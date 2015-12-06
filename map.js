var isStart = false;
var isGamestart = false;
match.on('start', function() {
  isGamestart = true;
});

match.on('end', function() {
  isGamestart = false;
});

match.getWorld().on('use', function(event) {
  var player = event.getPlayer();
  var itemstack = event.getItemStack();
  if (!isGamestart) {
    console.log("Game is not start.");
    return;
  }
  if (itemstack.getType() != 'BLAZE_POWDER') {
    console.log(player.getName() + "is not a BLAZE_POWDER.");
    return;
  }
  if (player.getTeam() == null) {
    console.log(player.getName() + "is not in the Team.");
    return;
  }

  if (!isStart) {
    isStart = true;
    var count = 5;
    var timer = setInterval(
      function() {
        if (count < 1) {
          match.broadcast("`7[`cPB`7]: `c`lBOOM!");
          var players = match.getPlayers();
          for (var i = 0; i < players.length; i++) {
            players[i].playSound('EXPLODE', 1, 1);
            if (!(players[i].getTeam().getName() == player.getTeam().getName() || players[i].getTeam == null)) {
              players[i].kill(player);
              match.broadcast("`7[`cPB`7]: `9" + players[i].getName() + " `ewas nuked by `6" + player.getName());
            };
          }
          clearInterval(timer);
          itemstack.setType('AIR');
          isStart = false;
        } else {
          match.broadcast("`7[`cPB`7]: `rImpact in `c" + count);
        }
        count--;
      }, 1000);
  }
});

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
