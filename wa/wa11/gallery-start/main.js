const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const photoArr = ["images/FLCLpic1.jpg", "images/FLCLpic2.png", "images/FLCLpic3.jpg", "images/FLCLpic4.jpg", "images/FLCLpic5.jpg"];

/* Declaring the alternative text for each image file */
const altTxtArr = ["Sound Track Cover", "Stand Off", "Character Spread", "Manga Cover", "Characters Proportions"];

/* Looping through images */
for(let i = 0; i < 5; i++){
    const newImage = document.createElement('img');
    newImage.setAttribute('src', photoArr[i]);
    newImage.setAttribute('alt', altTxtArr[i]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', () =>{
        displayedImage.setAttribute('src', photoArr[i]);
        displayedImage.setAttribute('alt', altTxtArr[i]);
    });
}

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', () =>{
    const button = btn.getAttribute("class");
    if(button == "dark"){
        btn.setAttribute("class", "light");
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
    }else{
        btn.setAttribute("class", "dark");
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
    }
})