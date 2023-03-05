$(document).ready(() => {
  var highScores = JSON.parse(localStorage.getItem("highScores"));
  var playersStats = $("#playersStats");
  var rank = 1;

  highScores.forEach((player) => {
    var playerStats = $("<div id='playerStats'>");
    var playerRank = $("<div>").text(rank);
    var playerName = $("<div>").text(player.name);
    var playerScore = $("<div>").text(player.score);
    playerStats.append(playerRank, playerName, playerScore);
    playersStats.append(playerStats);
    rank++;
  });
});
