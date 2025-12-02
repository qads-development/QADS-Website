const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3cTypcF49VHQT92As7TGYDAA-jggaaaiScvoSL5-5qO1LZ22EC8j87OKxgpm7kaaW/exec";

window.addEventListener("load", function() {
  const form = document.getElementById("contact-form");
  const submitButton = document.getElementById("submit-button");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      
      submitButton.disabled = true;
      const originalText = submitButton.textContent;
      submitButton.textContent = "Sending...";

      const formData = new FormData(form);

      fetch(SCRIPT_URL, {
        method: "POST",
        body: formData
      })
      .then(response => {
        submitButton.textContent = "Sent!";
        form.reset();
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 5000);
      })
      .catch(error => {
        console.error("Error!", error.message);
        submitButton.textContent = "Error. Try again.";
        submitButton.disabled = false;
      });
    });
  }
});
