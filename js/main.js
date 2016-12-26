'use strict'
window.onload = function() {
  var time;
  let startTest1 = document.querySelector('.start-test-1');
  let startTest2 = document.querySelector('.start-test-2');
  let popUp = document.querySelector('.pop-up');
  let warning = document.querySelector('.pop-up-warning');
  let text = document.querySelector('.pop-up-text');
  let result = document.querySelector('.result');
  let test = document.querySelector('.pop-up-test');
  let exit = document.querySelector('.exit');
  let start = document.querySelector('.start');
  let stop = document.querySelector('.stop-button');
  let testSubmit = document.querySelector('.test-submit');
  startTest1.onclick = function() {
    popUp.classList.add('visible');
  }
  startTest2.onclick = function() {
    popUp.classList.add('visible');
    window.location.hash = 'top';
  }
  exit.onclick = function() {
    popUp.classList.remove('visible');
  }
  start.onclick = function() {
    warning.classList.add('invisible');
    text.classList.remove('invisible');
    time = performance.now();
  }
  stop.onclick = function() {
    time = performance.now() - time;
    let timeToPrint = Math.round(time / 1000);
    text.classList.add('invisible');
    test.classList.remove('invisible');
    let wordsAndSymbols = countWordsAndSymb(text);
    let speed = speedOfRead(timeToPrint, wordsAndSymbols[0], wordsAndSymbols[1]);
    document.querySelector('.time').innerHTML = `${timeToPrint}`;
    document.querySelector('.words').innerHTML = `${wordsAndSymbols[0]}`;
    document.querySelector('.symbols').innerHTML = `${wordsAndSymbols[1]}`;
    document.querySelector('.wpm').innerHTML = `${speed[0]}`;
    document.querySelector('.spm').innerHTML = `${speed[1]}`;
  }
  testSubmit.onclick = function() {
    test.classList.add('invisible');
    result.classList.remove('invisible');
    console.log(document.testForm);
    document.querySelector('.quality').innerHTML = `${checkTest()}`;
  }

}

function checkTest() {
  let result = 0;
  document.testForm.question1.value === '4' ? result += 1 : result;
  document.testForm.question2.value === '1' ? result += 1 : result;
  document.testForm.question3.value === '1' ? result += 1 : result;
  document.testForm.question4.value === '3' ? result += 1 : result;
  document.testForm.question5.value === '2' ? result += 1 : result;
  return Math.round(result * 100 / 5);
}

function speedOfRead(seconds, amountWords, amountSymbols) {
  let wpm = Math.round(amountWords / seconds * 60);
  let spm = Math.round(amountSymbols / seconds * 60);
  return [wpm, spm];
}

function countWordsAndSymb(textHtml) {
  // usage: textHtml => [amountWords, amountSymbols]
  const textArr = textHtml.getElementsByTagName('p');
  let string = '';
  for(let i = 0; i < textArr.length; i++) {
    string += textArr[i].innerHTML;
  }
  let newArr = string.split(' ').filter(elem => elem.length && elem !== '\n' && elem !== '—');
  let symb = newArr.reduce((acc, elem) => {
    if (elem[elem.length - 2] === '.') {
      return acc + elem.length - 2;
    }
    else if (elem[elem.length - 1] === '.' || elem[elem.length - 1] === '\n') {
      return acc + elem.length - 1;
    }
    return acc + elem.length;
  }, 0);
  return [newArr.length, symb];
}
