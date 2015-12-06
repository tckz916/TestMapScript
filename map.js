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
  var uuid = player.getUUID();
  var playerMap = new Object();
  if (!isGamestart) {
    return;
  }
  if (player.getTeam() == null) {
    return;
  }
  if (itemstack.getType() != 'BLAZE_POWDER') {
    return;
  }

  player.sendMessage(playerMap);

  if (!playerMap.uuid) {
    playerMap.uuid = true;
    var count = 5;
    var timer = setInterval(
      function() {
        if (count < 1) {
          match.broadcast(getPrefix(player) + getTeamColorCode(player) + "`lBOOM!");
          var players = match.getPlayers();
          for (var i = 0; i < players.length; i++) {
            players[i].playSound('EXPLODE', 1, 1);
            if (!(players[i].getTeam().getName() == player.getTeam().getName() || players[i].getTeam == null)) {
              players[i].kill(player);
              match.broadcast(getPrefix(player) + getTeamColorCode(players[i]) + players[i].getName() + " `ewas nuked by " + getTeamColorCode(player) + player.getName());
            };
          }
          clearInterval(timer);
          player.removeItem(itemstack, 1);
          playerMap.uuid = false;
        } else {
          match.broadcast(getPrefix(player) + "`rImpact in " + getTeamColorCode(player) + count);
        }
        count--;
      }, 1000);
  }
});

function getTeamColorCode(player) {
  return player.getTeam().getColorCode();
}

function getPrefix(player) {
  return "`7[" + getTeamColorCode(player) + player.getName() + "'s Nuke`7]: ";
}
