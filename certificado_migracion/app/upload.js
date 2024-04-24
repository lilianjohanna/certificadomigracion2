/*function handleSubmit (event) {

	event.preventDefault();
	if (!file.value.length) return;
	let reader = new FileReader();
	reader.readAsDataURL(file.files[0]);
    console.log(file.files[0]);

}*/
function handleUpload (event) {
	event.document.getElementById('checkRecordResult').innerHTML = 'Campos obligatorios';
}
const app = document.querySelector('#upload');

if (app) {
    app.addEventListener("submit", handleUpload);
  }