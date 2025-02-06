
let playerEnergy = 0;
let opponentEnergy = 0;
let turn = 1;
const historyLog = document.getElementById('historyLog');
var winner = undefined;

function winnerIs() { return localStorage.getItem("winner"); }

function decideWinner(move1, move2, energy1, energy2) {
    if (move1 == 'charge' && move2 == 'attack' && energy2 > 0) return -1
    if (move1 == 'attack' && energy1 == 0 && move2 == 'attack' && energy2 > 0) return -1

    if (move2 == 'charge' && move1 == 'attack' && energy1 > 0) return 1
    if (move2 == 'attack' && energy2 == 0 && move1 == 'attack' && energy1 > 0) return 1

    return 0
}

function endTurn() {
    console.log(winner);
    if (winner === undefined) turn++;
    else {
        localStorage.setItem("winner", winner)
        setTimeout(window.location.href = 'ended.html', 1000)
    }
}

function playerMove(action) {
    const playerCharge = document.getElementById('playerCharge');
    const playerMoveCard = document.getElementById('playerMove');
    const turnNumber = document.getElementById('turnNumber');

    let energy1 = analyzeMove(action, playerEnergy, playerMoveCard, `Player`, playerCharge);
    turnNumber.innerHTML = `Turn: ${turn + 1}`;

    // Opponent makes a move (simple random choice)
    let [move2, energy2] = opponentMove();
    console.log(action, move2, energy1, energy2);
    res = decideWinner(action, move2, energy1, energy2);
    console.log(res);
    if (res > 0) winner = true;
    else if (res < 0) winner = false;
    console.log(winner);
    playerEnergy = energy1;

    setTimeout(endTurn(), 300)

}

function getOpponentMove() {
    const opponentActions = ['charge', 'attack', 'defend'];
    return opponentActions[Math.floor(Math.random() * opponentActions.length)];

}

function opponentMove() {
    const opponentAction = getOpponentMove()
    const opponentMoveCard = document.getElementById('opponentMove');
    const opponentCharge = document.getElementById('opponentCharge');

    let energy = opponentEnergy;
    opponentEnergy = analyzeMove(opponentAction, opponentEnergy,
        opponentMoveCard, `Opponent`, opponentCharge);

    return [opponentAction, energy]

}

function analyzeMove(action, energy, moveCard, player, chargeCircle) {

    // Handle energy changes based on action

    if (action === 'charge') {
        actionEnergyChange = Math.min(energy + 30, 100);
    } else if (action === 'attack') {
        actionEnergyChange = Math.max(energy - 30, 0);
    } else if (action === 'defend') {
        actionEnergyChange = energy;
    }


    // Update energy circle
    chargeCircle.style.width = actionEnergyChange + '%';
    chargeCircle.style.height = actionEnergyChange + '%';

    // Show move
    moveCard.innerHTML = action.charAt(0).toUpperCase() + action.slice(1);
    moveCard.classList.add('show');

    // Log move
    historyLog.innerHTML += `<p>Turn ${turn}: ${player} chose ${action}</p>`;

    return actionEnergyChange;
}