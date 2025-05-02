document.addEventListener("DOMContentLoaded", () => {
    loadCarousel();
    loadBreeds();
  
    if (annyang) {
      annyang.addCommands({
        'load dog breed *breed': breed => {
          const buttons = document.querySelectorAll('#breedButtons button');
          for (let btn of buttons) {
            if (btn.textContent.toLowerCase() === breed.toLowerCase()) {
              btn.click();
              break;
            }
          }
        }
      });
    }
  });
  
  function loadCarousel() {
    fetch('https://dog.ceo/api/breeds/image/random/10')
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById('dogCarousel');
        container.innerHTML = '';
        data.message.forEach(url => {
          const img = document.createElement('img');
          img.src = url;
          img.alt = 'Dog';
          container.appendChild(img);
        });
        simpleSlider(container);
      })
      .catch(err => console.error('Carousel error:', err));
  }
  
  function loadBreeds() {
    fetch('https://api.thedogapi.com/v1/breeds')
      .then(res => res.json())
      .then(breeds => {
        const btnContainer = document.getElementById('breedButtons');
        btnContainer.innerHTML = '';
        breeds.forEach(breed => {
          const btn = document.createElement('button');
          btn.className = 'custom-button';
          btn.textContent = breed.name;
          btn.onclick = () => showBreedInfo(breed);
          btnContainer.appendChild(btn);
        });
      })
      .catch(err => console.error('Breed button error:', err));
  }
  
  function showBreedInfo(breed) {
    document.getElementById('breedName').textContent = breed.name;
    document.getElementById('breedDesc').textContent = breed.bred_for || 'No description available';
    document.getElementById('minLife').textContent = breed.life_span.split(' - ')[0] || 'N/A';
    document.getElementById('maxLife').textContent = breed.life_span.split(' - ')[1] || 'N/A';
    document.getElementById('breedInfo').classList.remove('hidden');
  }