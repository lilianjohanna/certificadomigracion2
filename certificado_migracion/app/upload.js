function handleSubmit (event) {

	event.preventDefault();
	if (!file.value.length) return;
	let reader = new FileReader();
	reader.readAsDataURL(file.files[0]);
    console.log(file.files[0]);

}

let app = document.querySelector('#app');

if (app) {
    app.addEventListener("submit", handleVerification);
  }