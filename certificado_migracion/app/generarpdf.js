const uploadForm = document.querySelector("#upload");
const handleSign = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const sig = await signMessage({
      message: data.get("message")
    });
    if (sig) {
      document.getElementById('signFooter').setAttribute("style", "display: block;")
      console.log(sig);
      // document.getElementById('message').innerHTML = message.value;
      document.getElementById('signatureDisplay').innerHTML = sig.signature;
      document.getElementById('addressDisplay').innerHTML = sig.address;
    }
}
if(uploadForm)
{
    alert('Hola mundo');
}
