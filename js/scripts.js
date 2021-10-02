// list of Pokemons
let pokemonRepository = (function () {
  let pokemonList = []

   // create a variable with the external api link.
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

function showModal(title, text) {
    // Clear all existing modal content
    modalContainer.innerHTML = '';
    
    let modal = document.createElement('div');
    modal.classList.add('modal');

    
    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
    
    //Created a title for the modal and stored the pokemon's name in it.
  let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;

    //Created an element storing the height of the pokemon.
    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pokemon.height;
  // created an array to store the type objects.
    let pokemonTypes = [];

    //Looped through the type array using for each.
    Object.keys(pokemon.type).forEach((key) => {
      pokemonTypes.push(pokemon.type[key].type.name);
    });

    // Created the element in wich the pokemon type will be displayed.
    let contentType = document.createElement('p');
    contentType.classList.add('pokemon-type');
    contentType.innerText = 'Type: ' + pokemonTypes;

    contentElement.innerText = 'Height: ' + pokeHeight + ' m '+ '\r\n' 
                                    + 'Weight: ' + pokeWeight + ' kg '+ '\r\n' 
                                    + 'Types: ' + pokeTypes + '\r\n'
                                    + 'Abilities: ' + pokeAbilities;

    //Created an element to display the pokemon image.
    let container = document.querySelector('#image-container');
    let contentImage = document.createElement('img');
    contentImage.classList.add('content-image');
    contentImage.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(contentType);
    modal.appendChild(contentImage);
    modalContainer.appendChild(modal);
    
    modalContainer.classList.add('is-visible');
  }
  
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }
  
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  //Created an event listener to close the modal clicking on the overlay.
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

//Created an event listener for the pokemon button.
  function addEventListener(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
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

  
  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal:hideModal,
  };
})();
pokemonRepository.loadList().then(function () {
pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

