
document.addEventListener("DOMContentLoaded", () => {
    fetch("https://zenquotes.io/api/random")
      .then(res => res.json())
      .then(data => {
        const quote = data[0].q + " — " + data[0].a;
        document.getElementById("quote").innerText = quote;
      })
      .catch(err => {
        console.error("Error fetching quote:", err);
        document.getElementById("quote").innerText = "Couldn't load quote.";
      });
  });
  