const searchBar = document.getElementById("searchbar");
const searchButton = document.querySelector("#searchbtn");

movieTitleValue = () =>{
  let movieTitleValue = searchBar.value;
  return movieTitleValue;
};

moviePlot = (movieTitle, number) =>{
  let imdb = movieTitle;
  const movie =`https://www.omdbapi.com/?i=${imdb}&apikey=a5755f9e&`;
  fetch(movie)
  .then((response) => response.json())
  .then((element) => {
    // console.log(element);
    const plot = element;
    // console.log(plot);
    buttonPlot(number);
    showPlot(plot, number);
  })
  .catch((error) => console.error(error));
  
}

const buttonPlot = (number) => {
  const btn = document.querySelector(`#btn-${number}`);
};

const showPlot = (plot, number) =>{
  container.innerHTML +=`
  <div class="modal fade" id="exampleModal-${number}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${plot.Title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="text-center">
      <img src="${plot.Poster}" class="" alt="...">
      </div>
        <h5>Plot :</h5>
        <p>${plot.Plot}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
  `
}

const findMovie =(movie) =>{
  container.innerHTML =""
  const movieTitle = `https://www.omdbapi.com/?s=${movie}&apikey=a5755f9e&`;
  fetch(movieTitle)
    .then((response) => response.json())
    .then((elements)=>{
      let number = 0
      let arrayMovies = elements.Search;
      arrayMovies.map(movie =>{
        number +=1
        const title = movie.Title;
        const year = movie.Year;
        const imdb = movie.imdbID;
        const poster = movie.Poster;
        showMovie(title, year, poster, number);
        moviePlot(imdb, number);
      });
      animations();
    })
    .catch((error) => console.error(error));
};

const container = document.querySelector('.movies')

const showMovie =(title, year, poster, number) =>{
  container.innerHTML +=`
<div class="card card-container mb-3 reveal reveal-loaded reveal-2" style="max-width: 700px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="${poster}" class="card-img" alt="...">
    </div>
    <div class="col-md-8 d-flex align-items-start flex-column">
      <div class="card-body ">
        <h4 class="card-title p-2">${title}</h4>
        <p class="card-text p-2">released : ${year}
        </p>
      </div>
      <div class="mt-auto p-2 justify-content-end">
      <button type="button" id="btn-${number}" class="btn btn-success" data-toggle="modal" data-target="#exampleModal-${number}">Read More</button>
      <div>
    </div>
  </div>
</div>
`
}
function removeDefaultLink(e){
  e.preventDefault();
  findMovie(movieTitleValue());
};

searchButton.addEventListener('click', removeDefaultLink);

const threshold = .3
const options = {
  root: null,
  rootMargin: '0px',
  threshold    
}

let animations = () =>{
  const targets = document.querySelectorAll('.reveal')
  console.log(targets);
  document.documentElement.classList.add('reveal-loaded');

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > threshold) {
        entry.target.classList.remove('reveal')
        observer.unobserve(entry.target);  
      } else {
        entry.target.style.animation = `none`;
      };
    });
  });
  targets.forEach(target => {
    observer.observe(target);
  })
};




