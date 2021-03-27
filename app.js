'strict';

const movieName = document.querySelector('.movie-name');
const releaseYear = document.querySelector('.year');
const plot = document.querySelector('.plot');
const movieImage = document.querySelector('.movie-img-container');
const body = document.querySelector('body');
const sliderimg1 = document.querySelector('.img-holder1');
const sliderimg2 = document.querySelector('.img-holder2');
const sliderimg3 = document.querySelector('.img-holder3');
const sliderimg4 = document.querySelector('.img-holder4');
const sliderimg5 = document.querySelector('.img-holder5');
const sliderimg6 = document.querySelector('.img-holder6');
const searchInput = document.querySelector('.search');
const form = document.querySelector('.form');
const searchTitle = document.querySelector('.instant-search__title');
const searchYear = document.querySelector('.instant-search__year');
const searchImg = document.querySelector('.search-img');
const searchImgContainer = document.querySelector('.search-imgContainer');
const searchResultContainer = document.querySelector(
	'.instant-search__results-container'
);
//  FUNCTIONS
//Getting image on click
const getImg = function () {
	api(this.dataset.value);
};

// FUNCTIONS

// FETCHING
const key = 'fc75738f';
const api = function (title) {
	fetch(`http://www.omdbapi.com/?t=${title}&apikey=fc75738f`)
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {
			//Gettig Title of Movie
			movieName.innerText = response.Title;
			//Getting release year
			releaseYear.innerText = '(' + response.Year + ')' + ' ' + response.Genre;
			//Getting plot
			plot.innerText = response.Plot;
			//Removing default image
			movieImage.innerHTML = '';
			//Adding clicked movie's image
			movieImage.insertAdjacentHTML(
				'beforeend',
				`<img src="${response.Poster}" alt="">`
			);
		});
};

const search = function (input) {
	fetch(`http://www.omdbapi.com/?s=${input}&apikey=fc75738f`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			console.log(data);
			api(input);
			return data;
		})
		.catch((err) => alert(`${err}`));
};

form.addEventListener('submit', function (e) {
	e.preventDefault();
	search(searchInput.value);
	searchResultContainer.style.visibility = 'hidden';
	form.reset();
});

sliderimg1.addEventListener('click', getImg);
sliderimg2.addEventListener('click', getImg);
sliderimg3.addEventListener('click', getImg);
sliderimg4.addEventListener('click', getImg);
sliderimg5.addEventListener('click', getImg);
sliderimg6.addEventListener('click', getImg);

// Search bar suggestions

// SEARCH STATES.json and filter it

const searchStates = function (title) {
	fetch(`http://www.omdbapi.com/?s=${title}&apikey=fc75738f`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if (searchInput.value.length < 3) {
				searchResultContainer.style.visibility = 'hidden';
			}
			if (data.Response == 'False') return data;

			if (searchInput.value.length > 2) {
				for (let i = 0; i < 1; i++) {
					searchResultContainer.style.visibility = 'visible';
					searchTitle.innerText = data.Search[i].Title;
					searchYear.innerText = data.Search[i].Year;
					searchImg.src = data.Search[i].Poster;

					searchResultContainer.addEventListener('click', function (e) {
						api(searchTitle.innerHTML);
						form.reset();
						searchResultContainer.style.visibility = 'hidden';
					});
				}
			}
		});
};
searchInput.addEventListener('input', () => searchStates(searchInput.value));
