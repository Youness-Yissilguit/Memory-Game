const bgSound = document.getElementById('bg-sound');
bgSound.volume = .1;
bgSound.loop = true;

//satr the game andcollect the player name
document.querySelector('.start .info .start-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const playerName = document.querySelector('.start .info input').value;
  if (playerName == null || playerName == ''){
    document.querySelector('.game-info .player').innerText = 'Unknown';
  } else{
    document.querySelector('.game-info .player').innerText = playerName;
  }
  document.querySelector('.start').remove();
  bgSound.play();
});
//audio control
document.querySelector('.fa-volume-mute').addEventListener('click', function(){
  bgSound.pause();
  this.classList.add('active');
  document.querySelector('.fa-volume-up').classList.remove('active');
});
document.querySelector('.fa-volume-up').addEventListener('click', function(){
  bgSound.play();
  this.classList.add('active');
  document.querySelector('.fa-volume-mute').classList.remove('active');
});
//order the game boxes
let duration = 1500;
let gameBoxContainer = document.querySelector('.game-container');
let boxes = Array.from(gameBoxContainer.children);
let orderArray = [...Array(boxes.length).keys()]; //or orderArray = Array.from(Array(boxes.length).keys());

//call the shuffle function
shuffle(orderArray);

//shuffle the order of boxes
boxes.forEach((box, index)=> {
  //add order property
  box.style.order = orderArray[index];
  //call the flip function
  box.addEventListener('click', function(){
    flipbox(box);
  });
});

//flip function
function flipbox(selectedBox){
  //flip the boxes
  selectedBox.classList.add('is-fliped');
  //collect the fliped boxes
  let flipedBoxes = boxes.filter(flipedBox => flipedBox.classList.contains('is-fliped'));

  if (flipedBoxes.length === 2){
    console.log('two boxes are fliped');
    //stop clicking to oder boxes
    stopClicking();
    //check if the boxes are the same
    checkTheWin(flipedBoxes[0], flipedBoxes[1]);
  };
  //finish the game
  let finishedBoxes = boxes.filter(finishedBox => finishedBox.classList.contains('done'));

  if(finishedBoxes.length === boxes.length){
    document.querySelector('.finish').classList.add('show');
    document.querySelector('.last-tries').innerHTML = document.querySelector('.game-info .tries').innerHTML;
    bgSound.pause();
  };
}

//shuffle function
function shuffle(array){
  let current = array.length;
  let temp;
  let random;
  while (current > 0) {
    //create a random Number
    random = Math.floor(Math.random() * current);
    //decrease the current by 1
    current--;
    console.log(random);
    //1 save the current number on the stesh
    temp = array[current];
    //2 the current number == random number
    array[current] = array[random];
    //3 random number == the number on the stesh
    array[random] = temp;
  }
  return array;
};

//stopClicking function
function stopClicking(){
  gameBoxContainer.classList.add('no-click');
  setTimeout(() =>{
    gameBoxContainer.classList.remove('no-click');
  }, duration)
};

//the win or lose fonction
function checkTheWin(box1, box2){

  let triesElement = document.querySelector('.game-info .tries');
  //compere the data
  if (box1.dataset.name === box2.dataset.name){
    console.log('you win');
    //remove flip class
    box1.classList.remove('is-fliped');
    box2.classList.remove('is-fliped');

    //add class done
    box1.classList.add('done');
    box2.classList.add('done');
  } else{
    setTimeout(() => {
      box1.classList.remove('is-fliped');
      box2.classList.remove('is-fliped');
    }, duration);
  }
  //add the counter tries
  triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
}
