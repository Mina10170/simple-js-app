// list of Pokemons
let pokemonList=[
{name:"balbasure",height:7, type:['grass', 'poison']},
{name: "Ivysaur", height:1, type:['grass', 'poison']},
{name: "Venusaur",height:2, type:['grass', 'poison']}
]
for (let i = 0; i < pokemonList.length; i++) {
  // Created variables containing each pokemon height and name.
  let pokemonName = pokemonList[i].name;
  let pokemonHeight = pokemonList[i].height;
  if (pokemonHeight >= 7) {
    document.write(
      '<p>' +
        pokemonName +
        ' ' +
        '(Height: ' +
        pokemonHeight +
        ')' +
        "Wow that's big!" +
        '</p>'
    );
  } else {
    document.write(
      '<p>' + pokemonName + ' ' + '(Height: ' + pokemonHeight + ')' + '</p>'
    );
  }
}
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
pokemonRepository.getAll();
console.log(pokemonRepository.getAll());

