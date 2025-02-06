
// Check the winner variable from the core.js script
window.onload = function () {
    let winner = winnerIs();
    console.log(winner, winner == true);

    if (winner == 'true') {
        document.getElementById("result-heading").textContent = "You Win!";
        document.getElementById("result-message").textContent = "Congratulations! You defeated your opponent!";
    } else if (winner == 'false') {
        document.getElementById("result-heading").textContent = "You Lose!";
        document.getElementById("result-message").textContent = "Better luck next time! You were defeated.";
    } else {
        document.getElementById("result-heading").textContent = "Error!";
        document.getElementById("result-message").textContent = "An error occurred with the game result.";
    }
}