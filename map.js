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
  var isStart = new Map();
  if (!isGamestart) {
    return;
  }
  if (player.getTeam() == null) {
    return;
  }
  if (itemstack.getType() != 'BLAZE_POWDER') {
    return;
  }

  if (!isStart.get(player.getName())) {
    isStart.set(player.getName, true);
    var count = 5;
    var timer = setInterval(
      function() {
        if (count < 1) {
          match.broadcast("`7[" + player.getTeam().getDisplayName().substring(0, 1) + player.getName() + "'s Nuke`7]: `c`lBOOM!");
          var players = match.getPlayers();
          for (var i = 0; i < players.length; i++) {
            players[i].playSound('EXPLODE', 1, 1);
            if (!(players[i].getTeam().getName() == player.getTeam().getName() || players[i].getTeam == null)) {
              players[i].kill(player);
              match.broadcast("`7[" + player.getTeam().getDisplayName().substring(0, 1) + player.getName() + "'s Nuke`7]: `9" + players[i].getName() + " `ewas nuked by `6" + player.getName());
            };
          }
          clearInterval(timer);
          player.removeItem(itemstack, 1);
          isStart.set(player.getName, false);
        } else {
          match.broadcast("`7[" + player.getTeam().getDisplayName().substring(0, 1) + player.getName() + "'s Nuke`7]: `rImpact in `c" + count);
        }
        count--;
      }, 1000);
  }
});
