const pokemonContainer = document.querySelector('.pokedex-container');
const modal = document.getElementById('pokemon-modal');
const closeModal = document.getElementById('close-modal');

// Função para buscar dados da PokeAPI
async function fetchPokemonData(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();
    return data;
}

// Função para criar o cartão de Pokémon
function createPokemonCard(pokemon) {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');

    // Criação do conteúdo HTML do cartão
    pokemonCard.innerHTML = `
        <div class="pokemon-image">
            <img src="${pokemon.sprites.other['dream_world'].front_default}" alt="${pokemon.name}">
        </div>
        <div class="pokemon-info">
            <span class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h2 class="pokemon-name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <div class="pokemon-types">
                ${pokemon.types.map(type => `<span class="type ${type.type.name}">${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>`).join('')}
            </div>
        </div>
    `;

    // Adicionar evento de clique ao card para abrir o modal com detalhes
    pokemonCard.addEventListener('click', () => {
        console.log('Card clicado'); // Verificar se o clique está sendo detectado
        showPokemonDetails(pokemon);
    });


    // Adiciona o cartão à seção da Pokedex
    pokemonContainer.appendChild(pokemonCard);
}

// Função para mostrar detalhes do Pokémon no modal
function showPokemonDetails(pokemon) {
    document.getElementById('modal-pokemon-name').textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    document.getElementById('modal-pokemon-id').textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
    document.getElementById('modal-pokemon-types').innerHTML = pokemon.types.map(type => `<span class="type ${type.type.name}">${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>`).join('');
    document.getElementById('modal-pokemon-height').textContent = pokemon.height / 10;
    document.getElementById('modal-pokemon-weight').textContent = pokemon.weight / 10;

    const abilities = pokemon.abilities.map(ability => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)).join(', ');
    document.getElementById('modal-pokemon-abilities').textContent = abilities;

    // Exibe as stats do Pokémon
    document.getElementById('stat-hp').textContent = pokemon.stats[0].base_stat;
    document.getElementById('stat-attack').textContent = pokemon.stats[1].base_stat;
    document.getElementById('stat-defense').textContent = pokemon.stats[2].base_stat;
    document.getElementById('stat-sp-attack').textContent = pokemon.stats[3].base_stat;
    document.getElementById('stat-sp-defense').textContent = pokemon.stats[4].base_stat;
    document.getElementById('stat-speed').textContent = pokemon.stats[5].base_stat;

    // Exibe o modal adicionando a classe 'show'
    modal.classList.add('show');
}

// Fechar o modal ao clicar no botão de fechar
closeModal.addEventListener('click', () => {
    modal.classList.remove('show'); // Remove a classe 'show' para ocultar o modal
});


// Buscar os primeiros 9 Pokémons
for (let i = 1; i <= 10; i++) {
    fetchPokemonData(i).then(createPokemonCard);
}




