$(document).ready(function () {
  var $holes = $(".hole");
  var $scoreBoard = $("#score");
  var $timeBoard = $("#time");
  var score = 0;
  var timer;
  var gameInterval;
  var moleInterval;
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  var setIntervalNumber;
  var setTimeoutNumber;
  var playerName;
  var difficultyValue;
  var difficulty = $("#difficulty");

  difficulty.on("change", () => {
    difficultyValue = difficulty.val();

    switch (difficultyValue) {
      case "easy":
        setIntervalNumber = 1500;
        setTimeoutNumber = 1000;
        timer = 25;
        break;
      case "normal":
        setIntervalNumber = 800;
        setTimeoutNumber = 500;
        timer = 15;
        break;
      case "hard":
        setIntervalNumber = 500;
        setTimeoutNumber = 450;
        timer = 10;
        break;
      default:
        break;
    }
  });

  $timeBoard.text(timer);

  $("#start").on("click", function () {
    if (difficulty.val() == "") {
      alert("Don't forget to select difficulty of the game!");
      return;
    }
    playerName = prompt("Please enter your name:");
    if (playerName) {
      resetGame();
      startGame();
    }
  });

  $("#stop").on("click", function () {
    stopGame();
  });

  $("#leaderBoard>button").on("click", function () {
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
    if (difficulty.val() == "") {
      alert("don't forget to select difficulty of the game!");
      return;
    }
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
        }, setTimeoutNumber);
      }
    }, setIntervalNumber);
  }

  function stopGame() {
    if (!playerName) {
      return;
    }
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
