$(document).ready(function () {
  var $holes = $(".hole");
  var $scoreBoard = $("#score");
  var $timeBoard = $("#time");
  var score = 0;
  var timer = 15;
  var gameInterval;
  var moleInterval;
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  $timeBoard.text(timer);

  $("#start").on("click", function () {
    playerName = prompt("Please enter your name:");
    if (playerName) {
      resetGame();
      startGame();
    }
  });

  $("#stop").on("click", function () {
    stopGame();
  });

  $("#leaderBoard").on("click", function () {
    window.open("leaderboard.html", "", "width=800, height=600");
  });

  function resetGame() {
    clearInterval(gameInterval);
    clearInterval(moleInterval);
    score = 0;
    gameTime = timer;
    $scoreBoard.text(score);
    $timeBoard.text(gameTime);
    $(".mole").remove();
  }

  function startGame() {
    gameInterval = setInterval(function () {
      gameTime--;
      $timeBoard.text(gameTime);

      if (gameTime <= 0) {
        stopGame();
      }
    }, 1000);
    moleInterval = setInterval(function () {
      var $hole = $($holes[Math.floor(Math.random() * $holes.length)]);

      if (!$hole.children(".mole").length) {
        var $mole = $("<div>").addClass("mole");
        $hole.append($mole);

        $mole.on("click", function () {
          score++;
          $scoreBoard.text(score);
          $mole.remove();
        });

        // Mole timeout
        setTimeout(function () {
          $mole.remove();
        }, 1500);
      }
    }, 800);
  }

  function stopGame() {
    clearInterval(gameInterval);
    clearInterval(moleInterval);
    alert("Game Over! Your score is " + score);

    var found = false;
    var indexFound = 0;
    for (let i = 0; i < highScores.length; i++) {
      if (highScores[i].name === playerName) {
        found = true;
        indexFound = i;
        break;
      }
    }

    if (found) {
      if (score > highScores[indexFound].score) {
        highScores[indexFound].score = score;
      }
    } else {
      highScores.push({ name: playerName, score: score });

      highScores.sort(function (a, b) {
        return b.score - a.score;
      });
    }

    localStorage.setItem("highScores", JSON.stringify(highScores));

    score = 0;
    gameTime = timer;
    $scoreBoard.text(score);
    $timeBoard.text(gameTime);
  }
});
