// take scores to arrays and show highscores if localStorage had scores
if (localStorage.getItem("scores_easy")) {
  scores_easy = localStorage.getItem("scores_easy").split(",");
  if (scores_easy[0]) {
    high_score_easy.innerHTML = scores_easy[0];
  }
}
if (localStorage.getItem("scores_medium")) {
  scores_medium = localStorage.getItem("scores_medium").split(",");
  if (scores_medium[0]) {
    high_score_medium.innerHTML = scores_medium[0];
  }
}
if (localStorage.getItem("scores_hard")) {
  scores_hard = localStorage.getItem("scores_hard").split(",");
  if (scores_hard[0]) {
    high_score_hard.innerHTML = scores_hard[0];
  }
}
