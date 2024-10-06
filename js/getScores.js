// take scores from localStorage to objects and show highscores, if localStorage had scores
function showHighScores() {
  if (localStorage.getItem("scores_easy")) {
    scores_easy = JSON.parse(localStorage.getItem("scores_easy"));
    if (Object.keys(scores_easy).length) {
      let first_key = Object.keys(scores_easy)[0];
      let min_time = scores_easy[first_key];
      let best_player = first_key;
      for (let key in scores_easy) {
        if (scores_easy[key] < min_time) {
          min_time = scores_easy[key];
          best_player = key;
        }
      }
      high_score_easy.innerHTML = `${scores_easy[best_player]}<br>(${best_player})`;
    }
  }

  if (localStorage.getItem("scores_medium")) {
    scores_medium = JSON.parse(localStorage.getItem("scores_medium"));
    if (Object.keys(scores_medium).length) {
      let first_key = Object.keys(scores_medium)[0];
      let min_time = scores_medium[first_key];
      let best_player = first_key;
      for (let key in scores_medium) {
        if (scores_medium[key] < min_time) {
          min_time = scores_medium[key];
          best_player = key;
        }
      }
      high_score_medium.innerHTML = `${scores_medium[best_player]}<br>(${best_player})`;
    }
  }

  if (localStorage.getItem("scores_hard")) {
    scores_hard = JSON.parse(localStorage.getItem("scores_hard"));
    if (Object.keys(scores_hard).length) {
      let first_key = Object.keys(scores_hard)[0];
      let min_time = scores_hard[first_key];
      let best_player = first_key;
      for (let key in scores_hard) {
        if (scores_hard[key] < min_time) {
          min_time = scores_hard[key];
          best_player = key;
        }
      }
      high_score_easy.innerHTML = `${scores_hard[best_player]}<br>(${best_player})`;
    }
  }
}

showHighScores();
