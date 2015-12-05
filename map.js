var isStart = false;

match.getWorld().on('use', function(event) {
  var player = event.getPlayer();
  if (player.getTeam() == null) {
    console.log(player.getName() + "はチームに属していません。");
    return;
  }

  var itemstack = event.getItemStack();

  if (itemstack.getType() == 'STICK') {
    if (!checkBoolean(isStart)) {
      isStart = true;
      var count = 10;
      var timer = setInterval(function() {
        match.broadcast(count + "");
        count--;
        if (count < 0) {
          var x = getRandom(-50, 50);
          var z = getRandom(-50, 50);
          match.getWorld().strikeLightning(x, 0, z, false);
          clearInterval(timer);
          isStart = false;
        }
      }, 1000);


    }
  }
});

function checkBoolean(val) {
    if (val) {
        return true;
    } else {
        return false;
    }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
