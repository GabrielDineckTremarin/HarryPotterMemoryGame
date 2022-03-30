'use strict'

const cards = document.querySelectorAll('.card');

let hasFlippedCard = false, lockBoard = false;
let firstCard, secondCard;
let points = 0;
let flipCard = function () {
    if(lockBoard != true && this != firstCard){
        /*
        if(lockBoard != true)
            If lockBoards is true, the board is locked, it means that there's a pair of cards  being 
            flipped/unflipped, so in this situation the board has to be locked, because while these 
            two cards are active, other cards can't be flipped.

        if(this != firstCard)
            if this equals firstCard, it means a card was clicked twice, and the program would consider it
            a match and it would cause a bug 

    
        */



        new Audio('assets/sounds/PopSound.mp3').play()
        if(!hasFlippedCard) {
            /*
            This condition represents the first click, if there isn't a flipped card
            on the board the variable has FlippedCard is false, but a card was flipped,
            then the variable hasFlippedCard needs to be set to true
            */
            hasFlippedCard = true;
            firstCard = this;
        } else {
    
            /*
            This condition represents the second click, if !(hasFlippedCard) isn't true,
            then it means the first card was flipped and the variable hasFlippedcard is
            set to true already. So, the second card will be flipped and the variablie 
            hasFlippedCard will be reset to false
            */
            hasFlippedCard = false;
            secondCard = this;
            checkingMatches();
          
        }
        this.classList.add('flip');

    }


    


 
}

let score = document.getElementById('score'); 
function checkingMatches() {

    if (firstCard.dataset.character === secondCard.dataset.character) {
        /*
        if the two datasets are the same, then the cards match. In this situation
        the cards are going to be kept flipped.
        */
        disableCards();
        new Audio('assets/sounds/SuccessSound.mp3').play()
        
        points++;
        score.innerText = `Score: ${points}`;
        if(points == cards.length/2) {
            score.innerText = 'You won the game! Congratulations!!'
           new Audio('assets/sounds/VictorySoundEffect.mp3').play()
        }
    } else {
        /*
        if the two cards dont match, they're goint to be be unflipped.
        */
        unflipCards();

    }
    
}



function disableCards() {
    /*
    This function removes the eventListener of the matching cards, then
    the cards will remain flipped 
    */
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}


function unflipCards() {
    
    lockBoard = true;
    //if lockBoard equals true, the flipCard function won't be executed 
    
    setTimeout(() => {
      /*
        This function removes the class 'flip', by doing that the cards
        are goint to be unflipped.

        The setTimeout is being used to give enough time to the player, so
        they can see the cards they just clicked
      */
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
  
      resetBoard();
      
    }, 1500);
  }


function resetBoard() {
    /*
    This function resets the board by sending the variables used 
    in the code's logic to their initial state
    */

    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}


(function shuffle() {
    /* 
    Order is a property of flex items, by atributing random numbers
    to all of the elements of the array, the cards will be shuffled
    */
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * cards.length )
        /*The math.floor function will round the number to an integer

        On this occasion, cards.length equals 34. We're multiplying by 34
        because we want 34 different numbers
        */
        card.style.order = randomPosition;


  
    })
})()


/*
IIFE (Immediately Invoked Function Expression)

(function(){
    code
})()


This function will be executed right after its definition
*/



cards.forEach(card => card.addEventListener('click',flipCard))



function playRandomSound() {
    new Audio('assets/sounds/ButtonEffect.mp3').play()
    let randomNumber = Math.floor(Math.random() * 3)
    if(randomNumber == 0){
        new Audio('assets/sounds/LeviosaNotLeviosaah.mp3').play()
    } else if(randomNumber == 1) {
        new Audio('assets/sounds/AvedaKedavra.mp3').play()
    } else if(randomNumber == 2) {
        new Audio('assets/sounds/ExpectoPatronum.mp3').play()
    } 
   
}





let buttons = document.querySelectorAll('.btn')
let isPlaying = false;

let bgMusic = document.getElementById('audio');
let btnPlay = document.querySelector("#btn-play");
let btnPause = document.querySelector("#btn-pause");

function playBgMusic() {
    new Audio('assets/sounds/ButtonEffect.mp3').play()

   if(!isPlaying){
       bgMusic.play();
       isPlaying = true;

       btnPause.style.display = 'block';
       btnPlay.style.display = 'none';
  
   } else {
       bgMusic.pause();
       isPlaying = false
       btnPause.style.display = 'none';
       btnPlay.style.display = 'block';
   }

   
}

buttons.forEach((button) => button.addEventListener('click',playBgMusic))

