let cards = document.querySelector('#cards');
let searchInput = document.querySelector('#search');
let sortBtn = document.querySelector('#sortBtn');
let countriesData = [];

async function requestCountries() {
    const url = 'https://country-state-city-search-rest-api.p.rapidapi.com/allcountries';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '97f5ae37c8mshaae9d41da8975b3p1bbd2ejsn6487b24b4564',
            'x-rapidapi-host': 'country-state-city-search-rest-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        countriesData = result;
        displayCountries(result);
    } catch (error) {
        console.error(error);
    }
}

function displayCountries(data) {
    cards.innerHTML = '';
    data.forEach(item => {
        const flagUrl = `https://flagcdn.com/w320/${item.isoCode.toLowerCase()}.png`;

        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
      <img src="${flagUrl}" alt="${item.name} flag" onerror="this.src='https://flagcdn.com/w320/unknown.png'">
      <h3>${item.name}</h3>
      <p><b>Currency:</b> ${item.currency || '—'}</p>
      <p><b>Code:</b> ${item.isoCode}</p>
      <p><b>Phone:</b> +${item.phonecode}</p>
      <p><b>Latitude:</b> ${item.latitude}</p>
      <p><b>Longitude:</b> ${item.longitude}</p>
    `;
        cards.append(card);
    });
}

searchInput.addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    const filtered = countriesData.filter(country =>
        country.name.toLowerCase().includes(query)
    );
    displayCountries(filtered);
});

let isSorted = false;
sortBtn.addEventListener('click', () => {
    isSorted = !isSorted;
    const sorted = [...countriesData].sort((a, b) =>
        isSorted ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    sortBtn.textContent = isSorted ? "Sort Z–A" : "Sort A–Z";
    displayCountries(sorted);
});

requestCountries();
