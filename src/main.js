import LoL from './data/lol/lol.js';
import { filterChampions, sortChampions, searchChampions } from './data.js';


const arrayChampions = [];

/* eslint-disable guard-for-in */
// eslint-disable-next-line no-restricted-syntax
for (const i in LoL.data) {
  arrayChampions.push(LoL.data[i]);
}
// const contenedor = document.getElementById('containerSearch');
const contenedor = document.getElementById('root');
const containerSort = document.getElementById('containerSortBy')
const sort = document.getElementById('sortBy');
const modal = document.getElementById('myModal');



const showModal = (champion) => {
  modal.style.display = 'block';
  document.getElementById('modal-splash').innerHTML = `<img class="imgModal" src="${champion.splash}">`;
  document.getElementById('modal-blurb').innerHTML = `<p class="blurbModal">${champion.blurb}</p>`;

  modal.onclick = () => {
    modal.style.display = 'none';
  };
};

export const filterDataByRol = (roles) => {
  contenedor.innerHTML = '';
  containerSort.className = 'containerSortBy';
  sort.className = 'sortBy';// Style para que este visible
  contenedor.className = 'filterChamp'; // Style contenedor tarjetas
  const result = filterChampions(roles, arrayChampions);
  // eslint-disable-next-line array-callback-return
  result.map((element) => {
    contenedor.innerHTML += `<div class="elementos" id="${element.id}">
    <img class="imgChamp" src="${element.splash}">
    <p class="name">${element.name}</p>
    <p class="name">${element.tags}</p>
    <p class="info"> Attack: ${element.info.attack}</p>
    <p class="info"> Defense: ${element.info.defense}</p>
    <p class="info"> Magic: ${element.info.magic}</p>
    <p class="info"> Difficulty: ${element.info.difficulty}</p>
    
    </div>`;
  });
  // eslint-disable-next-line array-callback-return
  result.map((element) => {
    document.getElementById(element.id).addEventListener('click', () => showModal(element));
  });
};

// FUNCION PARA VOLVER A LA PAGINA PRINCIPAL
export const goToHome = () => {
  contenedor.className = 'elemento';
  contenedor.innerHTML = '';
  sort.className = 'hidden';
};

// FUNCION PARA ORDENAR POR AZ - ZA
export const sortBy = (sortAz) => {
  contenedor.innerHTML = '';
  const result = sortChampions(arrayChampions, sortAz);
  // eslint-disable-next-line array-callback-return
  result.map((element) => {
    contenedor.innerHTML += `<div class="elementos" id="${element.id}">
    <img class="imgChamp" src="${element.splash}">
    <p class="name">${element.name}</p>
    <p class="name">${element.tags}</p>
    <p class="info"> Attack: ${element.info.attack}</p>
    <p class="info"> Defense: ${element.info.defense}</p>
    <p class="info"> Magic: ${element.info.magic}</p>
    <p class="info"> Difficulty: ${element.info.difficulty}</p>
    
    </div>`;
    // eslint-disable-next-line array-callback-return
    result.map((i) => {
      if (document.getElementById(i.id) != null) {
        document.getElementById(i.id).addEventListener('click', () => showModal(element));
      }
    });
  });
};

// FUNCION BARRA DE BUSQUEDA
export const search = (e) => {
  contenedor.innerHTML = '';
  contenedor.className = 'filterChamp';
  const result = searchChampions(arrayChampions, e);
  // eslint-disable-next-line array-callback-return
  result.map((element) => {
    contenedor.innerHTML += `<div class="elementos" id="${element.id}">
    <img class="imgChamp" src="${element.splash}">
    <p class="name">${element.name}</p>
    <p class="name">${element.tags}</p>
    <p class="info"> Attack: ${element.info.attack}</p>
    <p class="info"> Defense: ${element.info.defense}</p>
    <p class="info"> Magic: ${element.info.magic}</p>
    <p class="info"> Difficulty: ${element.info.difficulty}</p>
    </div>`;
  });
  e.preventDefault();
  result.forEach((element) => document.getElementById(element.id).addEventListener('click', () => showModal(element)));
};

// PONGO AL ESCUCHA EL LOGO PARA QUE REGRESE A LA PAG PRINCIPAL
document.getElementById('logo').addEventListener('click', () => goToHome());
// IDENTIFICO LOS BTNS DE LA BARRA NAV Y LOS PONGO AL ESCUCHA DE LA FUNCION FILTAR(filterDataByRol)
document.getElementById('Fighter').addEventListener('click', () => filterDataByRol('Fighter'));
document.getElementById('Marksman').addEventListener('click', () => filterDataByRol('Marksman'));
document.getElementById('Mage').addEventListener('click', () => filterDataByRol('Mage'));
document.getElementById('Assassin').addEventListener('click', () => filterDataByRol('Assassin'));
document.getElementById('Tank').addEventListener('click', () => filterDataByRol('Tank'));
document.getElementById('Support').addEventListener('click', () => filterDataByRol('Support'));

// ORDENAR AZ - ZA (FUNCION SORTBY)
document.getElementById('sortBy').addEventListener('change', () => {
  const value = document.getElementById('sortBy').value;
  sortBy(value);
});

// BARRA DE BUSQUEDA (SEARCH)
document.getElementById('barra-busqueda').addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    search(e);
  }
});
