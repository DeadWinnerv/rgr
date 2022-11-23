const phoneInput = document.getElementById('phone');
const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const btn = document.querySelector('.navbar__send_button')

const sendForm = async (e) => {
	e.preventDefault();
	await fetch('http://localhost:5000/create', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			phone: phoneInput.value,
			name: nameInput.value,
			surname: surnameInput.value,
		})
	}).then((res) => {
		console.log('suc');
	}).catch((err) => {
		console.log(err);
	})
}

btn.addEventListener('click', sendForm)