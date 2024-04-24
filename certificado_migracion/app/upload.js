function handleSubmit (event) {

	event.preventDefault();
	if (!file.value.length) return;
	let reader = new FileReader();
	reader.readAsDataURL(file.files[0]);
    console.log(file.files[0]);

}
function handleUpload (event) {

	alert('Hola mundo');

}
const app = document.querySelector('#upload');

if (app) {
    app.addEventListener("submit", handleUpload);
  }