const swEl = document.querySelector('.switch')

swEl.addEventListener('change',()=>{
	let currColor = (swEl.checked) ? '#ff9428' : '#009dc4'
	document.body.style.backgroundColor = currColor
	document.body.style.color = (swEl.checked) ? '#009dc4' : '#ff9428' 
})