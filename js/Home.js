// Select all the elements with the same class// Select all the "More" buttons
// var moreButtons = document.querySelectorAll(".btn");

const moreButtons = document.querySelectorAll(".btn");

// Add an event listener for the click event to each button
moreButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Remove the newClass class from any previously selected button
    var previouslySelectedbtn = document.querySelector(".btn-hover");
    if (previouslySelectedbtn) {
      previouslySelectedbtn.classList.remove("btn-hover");
    }
    // Add the newClass class to the current button
    button.classList.add("btn-hover");
  });
});

fetch(
  "http://line.extraott-iptv.com:88/player_api.php?username=0485762425&password=3472153721&action=get_live_streams&category_id=3105"
)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((stream) => {
      const newLi = `
  <li class="card live" data-id="${stream.stream_id}">
      <div class="img">
          <img src="${stream.stream_icon}" alt="${stream.name}" loading="lazy" >
      </div>
      <div class="info">
          <h2 class="title">${stream.name}</h2>
      </div>
  </li>
  `;
      document.querySelector("#tv").insertAdjacentHTML("beforeend", newLi);
    });
  });

fetch(
  "http://line.extraott-iptv.com:88/player_api.php?username=0485762425&password=3472153721&action=get_vod_streams&category_id=3618"
)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((movie) => {
      const newLi = `

                     <li class="card" data-id="${movie.stream_id}">
      <div class="img">
          <img src="${movie.stream_icon}" alt="${movie.name}" loading="lazy" >
      </div>
      <div class="info">
          <h2 class="title">${movie.name} movie</h2>
      </div>
  </li>
                     `;
      document.querySelector("#movies").insertAdjacentHTML("beforeend", newLi);
    });
    var elements = document.querySelectorAll(".card");

    // Add an event listener for the click event to each element
    elements.forEach(function (element) {
      element.addEventListener("click", function () {
        // Remove the newClass class from any previously selected element
        var previouslySelected = document.querySelector(".newClass");
        if (previouslySelected) {
          previouslySelected.classList.remove("newClass");
        }

        // Add the newClass class to the current element
        element.classList.add("newClass");
        const cards = document.querySelectorAll(".newClass");

        MovieDetails(cards);
      });
    });
  });
function MovieDetails(cards) {
  cards.forEach((card) => {
    card.addEventListener("click", () => show_moviedetails(card));
  });
}
async function get_movie_by_id(id) {
  const resp = await fetch(
    `http://line.extraott-iptv.com:88/player_api.php?username=0485762425&password=3472153721&action=get_vod_info&vod_id=${id}`
  );
  const respData = await resp.json();
  return respData;
}

async function show_moviedetails(card) {
  const popup_container = document.querySelector(".popup-container");
  popup_container.classList.add("show-popup");

  const movie_id = card.getAttribute("data-id");
  console.log(
    `http://line.extraott-iptv.com:88/movie/0485762425/3472153721/${movie_id}.mkv`
  );
  const movie = await get_movie_by_id(movie_id);

  popup_container.innerHTML = `
    <div class="app__image">
    <img
      loading="lazy"
      alt="Imagem do filme destaque"
      src="${movie.info.backdrop_path[0]}"
    />
  </div>
 
              <span class="x-icon">&#10006;</span>

              <video class="trailer" id="trailer" controls>
  <source src="http://line.extraott-iptv.com:88/movie/0485762425/3472153721/${movie_id}.mkv" type="video/mp4">
  Your browser does not support HTML video.
</video>
              <div class="content">
                  <div class="left">
                      <div class="poster-img">
                          <img src="${movie.info.movie_image}" alt="${movie.movie_data.name}">
                      </div>
                  </div>
                  <div class="right">

                  <div class="action_buttons">
                  <a id="trailerBTN" href="https://www.youtube.com/watch?v=${movie.info.youtube_trailer}" class="btn">TRAILER</a>
                  <a id="movieBTN" class="btn">PLAY NOW</a>
                </div>

                  <div class="rating">
                  <img src="./../assets/icons/logo-imdb.png" alt="Logo da IMDB" />
                  <strong>${movie.info.rating} / 10</strong>
                </div>
                <div class="single-info">
                <span>${movie.info.releasedate}</span>
            </div>
                      <h1 class="Name">${movie.movie_data.name}</h1>
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
                      <div class="genres">
                          <h2>Duration:</h2>
                          <p>${movie.info.duration}</p>
                      </div>
  
  
                  </div>
              </div>
      `;
  const trailer = document.querySelector(".trailer");
  const trailerBTN = document.querySelector("#movieBTN");
  trailerBTN.addEventListener("click", () => (trailer.style.display = "block"));
  const x_icon = document.querySelector(".x-icon");
  x_icon.addEventListener("click", () =>
    popup_container.classList.remove("show-popup")
  );
}

fetch(
  "http://line.extraott-iptv.com:88/player_api.php?username=0485762425&password=3472153721&action=get_series&category_id=4300"
)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((series) => {
      const newLi = `
                     
                     <li class="card" data-id="${series.series_id}">
      <div class="img">
          <img src="${series.cover}" alt="${series.name}" loading="lazy" >
      </div>
      <div class="info">
          <h2 class="title">${series.name}</h2>
      </div>
  </li>
                
  `;
      document.querySelector("#series").insertAdjacentHTML("beforeend", newLi);
    });
    var elements = document.querySelectorAll(".card");

    // Add an event listener for the click event to each element
    elements.forEach(function (element) {
      element.addEventListener("click", function () {
        // Remove the newClass class from any previously selected element
        var previouslySelected = document.querySelector(".newClass");
        if (previouslySelected) {
          previouslySelected.classList.remove("newClass");
        }

        // Add the newClass class to the current element
        element.classList.add("newClass");
        const cards = document.querySelectorAll(".newClass");

        SeriesDetails(cards);
      });
    });

    // const cards = document.querySelectorAll(".card");
    // SeriesDetails(cards);
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

// document.addEventListener("visibilitychange", function () {
//   if (document.hidden) {
//     // Something you want to do when hide or exit.
//   } else {
//     // Something you want to do when resume.
//   }
// });

var init = function () {
  // Add an event listener for the click event to each button

  // add eventListener for keydown
  document.addEventListener("keydown", (event) => {
    var previouslySelected = document.querySelector(".newClass");
    if (previouslySelected) {
      previouslySelected.classList.remove("newClass");
    }
    var previouslySelectedbtn = document.querySelector(".btn-hover");
    if (previouslySelectedbtn) {
      previouslySelectedbtn.classList.remove("btn-hover");
    }
    // Check the key that was pressed
    if (event.keyCode === 37) {
      // Select the previous element
      var nextElement = previouslySelected.previousElementSibling;
    } else if (event.keyCode === 39) {
      // Select the next element
      var nextElement = previouslySelected.nextElementSibling;
    }

    // Add the newClass class to the next element
    if (nextElement) {
      nextElement.classList.add("newClass");
    } else if (event.keyCode === 38) {
      // Handle the up arrow key
      var nextButton = previouslySelectedbtn.nextElementSibling;
      // Perform the appropriate action for the up arrow key
    } else if (event.keyCode === 40) {
      // Handle the down arrow key
      var nextButton = previouslySelectedbtn.nextElementSibling;
      // Perform the appropriate action for the down arrow key
    }
    if (nextButton) {
      nextButton.classList.add("btn-hover");
    } else if (event.keyCode === 13) {
      // Handle the Enter key
      // Perform the appropriate action for the Enter key
    } else {
      // Handle any other keys
    }
  });
};
// window.onload can work without <body onload="">
window.onload = init;

// Select the "More" buttons
// const moreButtons = document.querySelectorAll(".btn");

// // Add an event listener for the click event to each button
// moreButtons.forEach(function (button) {
//   button.addEventListener("click", function () {
//     // Remove the newClass class from any previously selected button
//     var previouslySelected = document.querySelector(".btn-hover");
//     if (previouslySelected) {
//       previouslySelected.classList.remove("btn-hover");
//     }
//     // Add the newClass class to the current button
//     button.classList.add("btn-hover");
//   });
// });

// // Add event listener for keydown
// document.addEventListener("keydown", (event) => {
//   var previouslySelected = document.querySelector(".btn-hover");
//   if (previouslySelected) {
//     previouslySelected.classList.remove("btn-hover");
//   }

//   // Check the key that was pressed
//   if (event.keyCode === 38) {
//     // Select the previous button
//     var nextButton = previouslySelected.previousElementSibling;
//   } else if (event.keyCode === 40) {
//     // Select the next button
//     var nextButton = previouslySelected.nextElementSibling;
//   }

//   // Add the newClass class to the next button
//   if (nextButton) {
//     nextButton.classList.add("btn-hover");
//   }
// });
