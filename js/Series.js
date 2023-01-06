fetch(
  "http://line.extraott-iptv.com:88/player_api.php?username=0485762425&password=3472153721&action=get_series_categories"
)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((category) => {
      const newdiv = `
             <div class="inner-container">
             <div class="headings">
               <h2>${category.category_name}</h2>
             </div>
             <ul class="ul" id="${category.category_id}">
  
             </ul>
           </div>
             `;
      document
        .querySelector("#container")
        .insertAdjacentHTML("beforeend", newdiv);
      fetch(
        `http://line.extraott-iptv.com:88/player_api.php?username=0485762425&password=3472153721&action=get_series&category_id=${category.category_id}`
      )
        .then((res) => res.json())
        .then((data) => {
          data.forEach((series) => {
            const newli = `
              <li class="card" data-id="${series.series_id}">
              <div class="img">
                  <img src="${series.cover}" alt="${series.name}" loading="lazy" >
              </div>
              <div class="info">
                  <h2 class="title">${series.name}</h2>
              </div>
          </li>
             `;
            id = category.category_id;
            document.getElementById(id).insertAdjacentHTML("beforeend", newli);
          });
          const cards = document.querySelectorAll(".card");
          SeriesDetails(cards);
        });
    });
  });

function SeriesDetails(cards) {
  cards.forEach((card) => {
    card.addEventListener("click", () => show_popup(card));
  });
}
async function get_series_by_id(id) {
  const resp = await fetch(
    `http://line.extraott-iptv.com:88/player_api.php?username=0485762425&password=3472153721&action=get_series_info&series_id=${id}`
  );
  const respData = await resp.json();
  console.log(respData);
  return respData;
}

async function show_popup(card) {
  const popup_container = document.querySelector(".popup-container");
  popup_container.classList.add("show-popup");

  const movie_id = card.getAttribute("data-id");
  const movie = await get_series_by_id(movie_id);

  popup_container.innerHTML = `
        <div class="app__image">
        <img
          loading="lazy"
          alt="Imagem do filme destaque"
          src="${movie.info.backdrop_path[0]}"
        />
      </div>
     
                  <span class="x-icon">&#10006;</span>
                  <div class="content">
                      <div class="left">
                          <div class="poster-img">
                              <img src="${movie.info.cover}" alt="${movie.info.name}">
                          </div>
                      </div>
                      <div class="right">
    
                      <div class="action_buttons">
                      <a id="movieBTN" class="btn btn-hover">PLAY NOW</a>
                    </div>
    
                      <div class="rating">
                      <img src="./../assets/icons/logo-imdb.png" alt="Logo da IMDB" />
                      <strong>${movie.info.rating} / 10</strong>
                    </div>
                    <div class="single-info">
                    <span>${movie.info.releaseDate}</span>
                </div>
                          <h1 class="Name">${movie.info.name}</h1>
                          <p class="Plot">${movie.info.plot}</p>
                          <div class="single-info-container">
      
                          </div>
                          <div class="genres">
                          <h2>Director:</h2>
                          <p>${movie.info.director}</p>
                      </div>
                          <div class="genres">
                              <h2>Genres:</h2>
                              <p>${movie.info.genre}</p>
                          </div>
                          <div class="genres">
                              <h2>Casts:</h2>
                              <p>${movie.info.cast}</p>
                          </div>  
                      </div>
                  </div>
          `;
  const x_icon = document.querySelector(".x-icon");
  x_icon.addEventListener("click", () =>
    popup_container.classList.remove("show-popup")
  );
}
