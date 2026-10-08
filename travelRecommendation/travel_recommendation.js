const searchButton = document.getElementById("btnSearch");
const clearButton = document.getElementById("btnClear");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const patients = [];

function searchKeyword() {
    const keyword = document.getElementById('keywordInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    const heading = document.createElement("h2");
    heading.textContent = "Search results";
    resultDiv.appendChild(heading);

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const keys = Object.keys(data);

        if (keys.includes(keyword)) {
          const searchdata = data[keyword];
          let places = [];
  
          places = keyword === "country"
            ? searchdata.flatMap(country => country.cities)
            : searchdata;
  
          if (places.length === 0) {
            resultDiv.textContent = "No results found.";
          } else {
            places.forEach(place => {
              const tile = document.createElement("div");
              tile.className = "tile";
  
              const img = document.createElement("img");
              img.src = place.imageUrl;
              img.alt = place.name;
  
              const title = document.createElement("h3");
              title.textContent = place.name;
  
              const desc = document.createElement("p");
              desc.textContent = place.description;
  
              tile.appendChild(img);
              tile.appendChild(title);
              tile.appendChild(desc);
              resultDiv.appendChild(tile);
            });
          }
        } else {
            const message = document.createElement("p");
            message.textContent = "No match found.";
            resultDiv.appendChild(message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }

    

function resetForm() {
		  document.getElementById("result").innerHTML = "";
		}

if (searchButton) {
    searchButton.addEventListener("click", searchKeyword);
}
if (clearButton) {
    clearButton.addEventListener("click", resetForm);
}