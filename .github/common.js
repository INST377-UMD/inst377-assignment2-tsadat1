function toggleVoice(enable) {
    if (annyang) {
      if (enable) {
        annyang.start();
      } else {
        annyang.abort();
      }
    }
  }
  
  if (annyang) {
    const commands = {
      'hello': () => alert('Hello World'),
      'change the color to *color': color => {
        document.body.style.backgroundColor = color;
      },
      'navigate to *page': page => {
        const lower = page.toLowerCase();
        if (lower.includes('home')) window.location.href = 'index.html';
        else if (lower.includes('stocks')) window.location.href = 'stocks.html';
        else if (lower.includes('dogs')) window.location.href = 'dogs.html';
      }
    };
  
    annyang.addCommands(commands);
  } else {
    console.warn('Annyang not supported');
  } 
  