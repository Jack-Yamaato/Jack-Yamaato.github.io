// 1. COMPLETE VARIABLE AND FUNCTION DEFINITIONS

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');
const storyText = 'It was 94 Fahrenheit outside, so :insertx: decided to go for a stroll. When they arrived at :inserty:, something unexpected happened — they :insertz:. Bob witnessed the whole thing but just chuckled — after all, :insertx: is known for wild adventures, especially on a hot day.';

const insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];
const insertY = ['the local park', 'the ice cream parlor', 'the city library'];
const insertZ = [
  'started breakdancing in front of everyone',
  'accidentally tripped over a squirrel but quickly recovered',
  'treated everyone around to ice cream'
];


function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

//3. EVENT LISTENER AND PARTIAL FUNCTION DEFINITION

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    
    const itemX = randomValueFromArray(insertX);
    const itemY = randomValueFromArray(insertY);
    const itemZ = randomValueFromArray(insertZ);

    newStory = newStory.replace(':insertx:', itemX);
    newStory = newStory.replace(':insertx:', itemX);
    newStory = newStory.replace(':inserty:', itemY);
    newStory = newStory.replace(':insertz:', itemZ);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace('Bob',name);
  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300/14) + ' stone';
    const temperature =  Math.round((94 - 34) * 5 / 9) + ' centigrade';

    newStory = newStory.replace('300 pounds' , weight);
    newStory = newStory.replace('94 fahrenheit', temperature);

    document.body.style.backgroundImage = "url('./AdobeStock_237334117_Preview.jpeg')";
    document.body.style.backgroundImage = "cover";
    document.body.style.color = "black";
  }else{
    document.body.style.backgroundImage = "url('./AdobeStock_421852062_Preview.jpeg')";
    document.body.style.backgroundImage = "cover";
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}