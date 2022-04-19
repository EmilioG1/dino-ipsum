import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Dino from "./dino.js";

function GuessWord(word, letter) {
  for (let i = 0; i < word.length; i++) {
    if(word[i] === letter){
      return true;
    }
  }
  return false;
}

function GetElements(response) {
  if (response) {
    return response[0][0].toLowerCase().split("");
  } else {
    return false;
  }
}

function buildWordOutline(word) {
  for (let i = 0; i < word.length; i++) {
    $("#word-output").append(`<p>_</p>`);
  }
}
function updateWordOutline(rightLettersArray, word) {
  $("#word-output").text(``);
  for (let i = 0; i < word.length; i++) {
    let index = 0;
    let match = false;
    rightLettersArray.forEach(rightLetter => {
      if(word[i] === rightLetter){
        $("#word-output").append(`<p>${rightLetter}</p>`);
        match = true;
      }
      if(rightLettersArray.length === index + 1 && match === false){
        $("#word-output").append(`<p>_</p>`);
      }
      index++;
    });
  }
 
}
function updateWordGuesses(wrongLettersArray){
  $("#word-guess").text("");
  wrongLettersArray.forEach(letter => {
    $("#word-guess").append(`<p>${letter}</p>`);
  }); 
}

$(document).ready( function () {
  let promise =  Dino.getIpsum().then(function (response) {
    return GetElements(response);
  });
  promise.then(function(value) {
    let word = value;
    let rightLettersArray = [];
    let wrongLettersArray = [];
    let guessArray = [];
    let maxGuessNum = 5;
    let currentGuessNumber = 0;
    
    buildWordOutline(word);
    
    $('#form').submit(function (event) {
      event.preventDefault();
      const letter = $('#letter').val();
      $('#letter').val("");
      let isGuessed = false;
      if(guessArray.length !== 0){
        guessArray.forEach((guessedLetter) => {
          if(guessedLetter === letter){
            alert("You have already guessed this letter!");
            isGuessed = true;
          }
        });
        if(!isGuessed){
          const bool = GuessWord(word, letter);
          if(bool) {
            rightLettersArray.push(letter);
          }else {
            wrongLettersArray.push(letter);
            currentGuessNumber++;
          }
          guessArray.push(letter);
          updateWordOutline(rightLettersArray, word);
          updateWordGuesses(wrongLettersArray);
        }
      }else {
        const bool = GuessWord(word, letter);
        if(bool) {
          rightLettersArray.push(letter);
        }else {
          wrongLettersArray.push(letter);
          currentGuessNumber++;
        }
        guessArray.push(letter);
        updateWordOutline(rightLettersArray, word);
        updateWordGuesses(wrongLettersArray);
      }
      if(currentGuessNumber === maxGuessNum){
        alert("gameOver");
      }
      if(rightLettersArray.length === word.length){
        alert("YOu WON!");
      }
    });
  });
  
  
});