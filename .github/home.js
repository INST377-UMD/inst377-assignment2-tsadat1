document.addEventListener("DOMContentLoaded", () => {
    fetch("https://api.quotable.io/random")
      .then(res => res.json())
      .then(data => {
        const quote = data.content + " — " + data.author;
        document.getElementById("quote").innerText = quote;
      })
      .catch(err => {
        console.error("Error fetching quote:", err);
        document.getElementById("quote").innerText = "Couldn't load quote.";
      });
  });
  