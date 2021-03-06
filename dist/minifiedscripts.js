let pokemonRepository = (function() {
  let e = [],
    t = 'https://pokeapi.co/api/v2/pokemon/?limit=150',
    n = document.querySelector('#filter');
  function i(t) {
    return e.push(t);
  }
  function o(e) {
    l(e).then(function() {
      !(function(e) {
        let t = document.querySelector('.modal-body');
        (t.innerText = ''), (document.querySelector('.modal-title').innerText = e.name);
        let n = document.createElement('p');
        n.classList.add('pokemon-height'), (n.innerText = 'Heigth:' + e.height);
        let i = document.createElement('img');
        i.classList.add('img-fluid'), (i.src = e.imageUrl);
        let o = [];
        Object.keys(e.type).forEach(t => {
          o.push(e.type[t].type.name);
        });
        let l = document.createElement('p');
        l.classList.add('pokemon-type'), (l.innerText = 'Type: ' + o);
        let a = [];
        Object.keys(e.abilities).forEach(t => {
          a.push(e.abilities[t].ability.name);
        });
        let r = document.createElement('p');
        r.classList.add('pokemon-ability'), (r.innerText = 'Abilities: ' + a);
        let c = document.createElement('p');
        c.classList.add(
          'pokemon-weight',
        ), (c.innerText = 'Weight: ' + e.weight), t.appendChild(i), t.appendChild(c), t.appendChild(n), t.appendChild(l), t.appendChild(r);
      })(e);
    });
  }
  function l(e) {
    let t = e.detailsUrl;
    return fetch(t)
      .then(function(e) {
        return e.json();
      })
      .then(function(t) {
        (e.imageUrl = t.sprites.other.dream_world.front_default), (e.height = t.height), (e.type = t.types), (e.abilities = t.abilities), (e.weight = t.weight);
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  return n.addEventListener('input', function() {
    let e = document.querySelectorAll('.list-group-item'),
      t = n.value.toLowerCase();
    e.forEach(function(e) {
      e.innerText.toLowerCase().indexOf(t) > -1
        ? (e.style.display = '')
        : (e.style.display = 'none');
    });
  }), {
    getAll: function() {
      return e;
    },
    add: i,
    addListItem: function(e) {
      let t = document.querySelector('ul');
      t.classList.add('row');
      let n = document.createElement('li');
      n.classList.add('list-group-item', 'col-xl-3', 'col-lg-4', 'col-md-6');
      let i = document.createElement('button');
      i.classList.add('btn', 'button-styles'), i.setAttribute(
        'data-toggle',
        'modal',
      ), i.setAttribute(
        'data-target',
        '#exampleModal',
      ), (i.innerText = e.name), n.appendChild(i), t.appendChild(n), (function(
        e,
        t,
      ) {
        e.addEventListener('click', function() {
          o(t);
        });
      })(i, e);
    },
    loadList: function() {
      return fetch(t)
        .then(function(e) {
          return e.json();
        })
        .then(function(e) {
          e.results.forEach(function(e) {
            i({name: e.name, detailsUrl: e.url});
          });
        })
        .catch(function(e) {
          console.error(e);
        });
    },
    loadDetails: l,
    showDetails: o,
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(e) {
    pokemonRepository.addListItem(e);
  });
});
