// list of Pokemons
let pokemonRepository = (function () {
let pokemonList = [
{name:"balbasure",height:7, type:['grass', 'poison']},
{name: "Ivysaur", height:1, type:['grass', 'poison']},
{name: "Venusaur",height:2, type:['grass', 'poison']}
];
  function add(item) {
   return pokemonList.push(item);
  }
  function addListItem(pokemon){

  let unOrderedList = document.querySelector('ul');
  let listItem = document.createElement('li');
  let button = document.createElement('button')
  button.innerText = pokemon.name;

  button.classList.add('button');
  listItem.appendChild(button);
  unOrderedList.appendChild(listItem);
  button.addEventListener('click', function () { showDetails(pokemon); });
}

function showDetails(pokemon) {
     {console.log(pokemon); };
}

  function getAll() {
    return pokemonList;
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });


