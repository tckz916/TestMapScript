var isGamestart = false;
var playerMap = new Object();
var playerArray = new Array();
match.on('start', function() {
  isGamestart = true;
});


match.on('end', function() {
  isGamestart = false;
  var players = match.getPlayers();
  for (var i = 0; i < players.length; i++) {
    if (!(players[i].getTeam == null)) {
      var playerKills = new Object();
      var player = players[i];
      playerArray[i] = {
        name: player.getName(),
        kills: player.getKills()
      };
    };
  }
  sort(playerArray, "kills", "DESC");
  for (var i = 0; i < 2; i++) {
    match.broadcast(playerArray[i]["name"] + playerArray[i]["kills"]);
  }
});

function sort(ary, key, order) {
  var reverse = 1;
  if (order && order.toLowerCase() == "desc")
    reverse = -1;
  ary.sort(
    function(a, b) {
      if (a[key] < b[key])
        return -1 * reverse;
      else if (a[key] == b[key])
        return 0;
      else
        return 1 * reverse;
    });
}

match.getWorld().on('use', function(event) {
  var player = event.getPlayer();
  var itemstack = event.getItemStack();
  var players = match.getPlayers();
  if (!isGamestart) {
    return;
  }
  if (player.getTeam() == null) {
    return;
  }
  if (itemstack.getType() != 'BLAZE_POWDER') {
    return;
  }

  if (!playerMap[player.getUUID()]) {
    playerMap[player.getUUID()] = true;
    var count = 5;
    var timer = setInterval(
      function() {
        if (count < 1) {
          match.broadcast(getPrefix(player) + getTeamColorCode(player) + "`lBOOM!");
          for (var i = 0; i < players.length; i++) {
            players[i].playSound('EXPLODE', 1, 1);
            if (!(players[i].getTeam().getName() == player.getTeam().getName() || players[i].getTeam == null)) {
              players[i].kill(player);
              match.broadcast(getPrefix(player) + getTeamColorCode(players[i]) + players[i].getName() + " `ewas nuked by " + getTeamColorCode(player) + player.getName());
            };
          }
          clearInterval(timer);
          player.removeItem(itemstack, 1);
          playerMap[player.getUUID()] = false;
        } else {
          for (var i = 0; i < players.length; i++) {
            players[i].playSound("WOLF_HOWL", 1, 255);
          }
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
