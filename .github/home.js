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
  
  function toggleVoice(turnOn) {
    if (annyang) {
      if (turnOn) {
        const commands = {
          'hello': () => alert('Hello World'),
          'change the color to *color': (color) => {
            document.body.style.backgroundColor = color;
          },
          'navigate to *page': (page) => {
            const pageMap = {
              home: 'index.html',
              stocks: 'stocks.html',
              dogs: 'dogs.html',
            };
            const destination = pageMap[page.toLowerCase()];
            if (destination) {
              window.location.href = destination;
            } else {
              alert(`No page found for "${page}"`);
            }
          }
        };
        annyang.addCommands(commands);
        annyang.start();
        console.log("Voice control ON");
      } else {
        annyang.abort();
        console.log("Voice control OFF");
      }
    } else {
      alert("Voice recognition not supported in this browser.");
    }
  }