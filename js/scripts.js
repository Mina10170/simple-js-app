// list of Pokemons
pokemonList.forEach(function(pokemonList) {
  console.log(pokemonList.name + ' is ' + pokemonList.height + ' Feet height.');
});
let pokemonRepository = (function () {
let pokemonList = [
{name:"balbasure",height:7, type:['grass', 'poison']},
{name: "Ivysaur", height:1, type:['grass', 'poison']},
{name: "Venusaur",height:2, type:['grass', 'poison']}
];
  function add(item) {
   return pokemonList.push(item);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();
 pokemonRepository.getAll().forEach(pokemon)



