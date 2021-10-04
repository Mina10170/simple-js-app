// list of Pokemons
let pokemonRepository = (function () {
  let pokemonList = []

   // create a variable with the external api link.
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

 //Get all function returns the pokemonlist array.
  function getAll() {
    return pokemonList;
  }
  
// Make the modal container a global varaible to use with any function.
  let modalContainer = document.querySelector('#modal-container');

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function addListItem(pokemon){

  let unOrderedList = document.querySelector('ul');
  let listItem = document.createElement('li');
  let button = document.createElement('button')
  button.innerText = pokemon.name;

  button.classList.add('button');
  listItem.appendChild(button);
  unOrderedList.appendChild(listItem);
   button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

   //activating the loading image
    function showLoadingImage() {
        let loading = document.querySelector('#loading');
        window.addEventListener('load',function(){
            loading.style.visibility = 'visible';
        });
    }

    //turn the vibility of loading image back to hidden, add 0.5s before hidden
    function hideLoadingImage() {
        let loading = document.querySelector('#loading');
        setTimeout(function(){
            loading.style.visibility = 'hidden';
        }, 100);

    }

    //load the list of Pokémon
    function loadList() {
        showLoadingImage();
        return fetch(apiUrl).then(function(response) {
            return response.json(); //this returns promise
        }).then(function(json) {
            hideLoadingImage();
            json.results.forEach(function(item){
                //get pokemon's name and details url when resolved
                let pokemon = {
                    name : item.name,
                    detailsUrl : item.url
                };
                add(pokemon);
            });
        }).catch(function(e) {
            hideLoadingImage();
            console.error(e);
        })
    }

    //load details for each pokemon
    function loadDetails(item) {
        showLoadingImage();
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            hideLoadingImage();
            return response.json();
        }).then(function(details) {
            
            //adding details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.type = details.types;
            item.ability = details.abilities;
        }).catch(function(e) {
            hideLoadingImage();
            console.error(e);
        });
    }


 function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

    // Created a modal to display each pokemon and details.
  function showModal(pokemon) {
    let modalBody = document.querySelector('.modal-body');

    modalBody.innerText = '';

    let titleElement = document.querySelector('.modal-title');
    titleElement.innerText = pokemon.name;

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = 'Heigth: ' + pokemon.height;

    let pokemonImage = document.createElement('img');
    pokemonImage.classList.add('img-fluid');
    pokemonImage.src = pokemon.imageUrl;

    // created an array to store the type objects.
    let pokemonTypes = [];

    //Looped through the type array using for each.
    Object.keys(pokemon.type).forEach((key) => {
      pokemonTypes.push(pokemon.type[key].type.name);
    });

    let pokemonType = document.createElement('p');
    pokemonType.classList.add('pokemon-type');
    pokemonType.innerText = 'Types: ' + pokemonTypes;

    modalBody.appendChild(pokemonHeight);
    modalBody.appendChild(pokemonType);
    modalBody.appendChild(pokemonImage);
  }

  //Created a function promise to load the pokemon list by fetching it from an external api.
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Created a function promise to load the pokemon deatils from an external api.
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.type = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// Create a loop using the forEach predifined function to iterate through the array list within the pokemon repository created above. Only rechable by calling the function getAll(); within the line of code.
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});