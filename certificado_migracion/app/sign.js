const signMessage = async ({ message }) => {
    try {
      console.log({ message });
      if (!window.ethereum)
        throw new Error("No wallet found.");
  
      await window.ethereum.send("eth_requestAccounts");
      const signer = PROVIDER.getSigner();
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();
  
      return {
        message,
        signature,
        address
      };
    } catch (err) {
      console.log(err.message);
    }
  };

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

  const signForm = document.querySelector("#signForm");

  if (signForm) {
    signForm.addEventListener("submit", handleSign);
  }

  