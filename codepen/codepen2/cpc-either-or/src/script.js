const swEl = document.querySelector('.switch')

swEl.addEventListener('change',()=>{
	let currColor = (swEl.checked) ? '#111' : '#FFF'
	document.body.style.backgroundColor = currColor
	document.body.style.color = (swEl.checked) ? '#FFF' : '#111' 
})