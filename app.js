// alert for Game rules

document.querySelector('.btn-rule').addEventListener('click', function(){

    alert(`
    1) GAME RULES The game has 2 players, playing in rounds. 
    2) In each turn, a player rolls a dice as many times as he whishes. 
    3) Each result get added to his ROUND score. BUT, if the player rolls a 1, all his ROUND score gets lost. 
    4) After that, it's the next player's turn.                
    5) The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. 
    6) After that, it's the next player's turn. 
    7) The first player to reach 100 points on GLOBAL score wins the game
    `)

})

//  initial conditions

let scores, roundScore, activePlayer, dice, gamePlaying;

// function call for initial conditions

init();

// eventHandle for Hold button

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
    
            // adding to global value

            scores[activePlayer]+=roundScore;
            document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

            // checking if player won the game

            if (scores[activePlayer]>=100){
                document.querySelector('#name-'+activePlayer).textContent = 'WINNER!'
                document.querySelector('.dice').style.display='none';

                document.querySelector('.game-over').style.display = 'block';

                document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
                document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');

                // setting playingGame to false
                gamePlaying=false;
            } 
            else{
                // next player function call
                nextPlayer();
            }
    }
})

// eventHandler for Roll Dice button

document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying){
    // 1. random no.

    let dice = Math.floor(Math.random()*6)+1;

    // 2. display the result

    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-'+dice+'.png';


    // 3. update the result score IF the rolled number was NOT a 1

    if (dice !== 1){
        // add score
        roundScore+=dice;
        document.querySelector('#current-'+ activePlayer).textContent = roundScore;
    }
    else{

        // next player function call
        nextPlayer();

    }
    }
}    
);

// eventHandler for new button

document.querySelector('.btn-new').addEventListener('click', init);

// function for next player to maintain DRY (Don't repeat your code) principle 

function nextPlayer() {
    activePlayer = (activePlayer===1)?0:1;
    roundScore=0;
    
    //making the current score back to zero when player turn is switched 

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //making the dice hide when there is 1 

    document.querySelector('.dice').style.display = 'none'
    
    // change active region by using toggle 
    // toggle add class if not present and removes if present
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    
}

//function for initial conditions to maintain DRY(Don't repeat your code) principle 

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying=true;

    document.getElementById('score-0').textContent ='0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.game-over').style.display = 'none';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}