const initHP = 4


function Player(pl){
    pl.hp = initHP;
    pl.bullet = 0;
    pl.shield = false;
    return pl
}

function attack(player1, player2){
    if (!player2.defense){player2.hp -= 1;}
    player1.bullet -=1;
}

function defense(pl){
    pl.shield = true;
    return pl
}

function charge(pl){
    pl.bullet ++;
}

function nextRound(pl){
    pl.defense = false;
}

