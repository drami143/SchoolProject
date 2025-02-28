const API_KEY = "api_key=ed02b30bdd218e78bfb2c53ab9147616";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main=document.getElementById("main");
const tagsEl= document.getElementById("tags");


const genres = [
  {
        id: 28,
        name: "Action",
      },
      {
        id: 12,
        name: "Adventure",
      },
      {
        id: 16,
        name: "Animation",
      },
      {
        id: 35,
        name: "Comedy",
      },
      {
        id: 80,
        name: "Crime",
      },
      {
        id: 99,
        name: "Documentary",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 10751,
        name: "Family",
      },
      {
        id: 14,
        name: "Fantasy",
      },
      {
        id: 36,
        name: "History",
      },
      {
        id: 27,
        name: "Horror",
      },
      {
        id: 10402,
        name: "Music",
      },
      {
        id: 9648,
        name: "Mystery",
      },
      {
        id: 10749,
        name: "Romance",
      },
      {
        id: 878,
        name: "Science Fiction",
      },
      {
        id: 10770,
        name: "TV Movie",
      },
      {
        id: 53,
        name: "Thriller",
      },
      {
        id: 10752,
        name: "War",
      },
      {
        id: 37,
        name: "Western",
      },
    ]


var selectedGenre = []
setGenre();
function setGenre() {
    tagsEl.innerHTML= '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            } else{
                if(selectedGenre.includes(genre.id)) {
                     selectedGenre.forEach((id, idx) => {
                         if(id == genre.id) {
                            selectedGenre.splice(idx, 1);
                     }
                })
                } else {
                    selectedGenre.push(genre.id);
                }
            }
            // console.log(selectedGenre)
            getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
            higlightSelection()
        })
        tagsEl.append(t);
    })
}

function higlightSelection(){
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight');
    })
    clearBtn()
    if(selectedGenre.length != 0) {
        selectedGenre.forEach(id => {
            const highlightedTag = document.getElementById(id);
            highlightedTag.classList.add('highlight');
        })
    }
}
function clearBtn(){
let clearBtn = document.getElementById('clear');
if(clearBtn){
    clearBtn.classList.add('highlight');
}else{

    let clear = document.createElement('div');
    clear.classList.add('tag', 'highlight');
    clear.id = 'clear';
    clear.innerText = 'CLEAR';
    clear.addEventListener('click', () => {
        selectedGenre = [];
        setGenre();
        getMovies(API_URL);
    })
    tagsEl.append(clear);
}
}

getMovies(API_URL);
function getMovies(url) {
  fetch(url).then((res) => res.json()).then((data) => {
      console.log(data.results);
      if(data.results.length != 0){
        showMovies(data.results);
      }else{
        main.innerHTML = `<h1 class='error'>No movies found </h1>`
      }
    //   return data.results;
    })
}

function showMovies(data) {
    main.innerHTML = "";
  data.forEach((movie) => {
    const {title, poster_path, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img src="${IMG_URL + poster_path}" alt="${title}">
    <div class="movie-info">
    <h3 class="movie-title">${title}</h3>
    </div>
    <div class="overview">
    <h2 class="overview-title">Overview</h3>
    ${overview}
    </div>
`
    main.appendChild(movieEl);
  })
}

function showSidebar(){
  const sidebar = document.querySelector(".sidebar")
  sidebar.style.display= "flex";
}


function hideSidebar(){
  const sidebar = document.querySelector(".sidebar")
  sidebar.style.display= "none";
}