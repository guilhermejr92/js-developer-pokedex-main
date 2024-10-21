const pokemonContainer = document.querySelector('.pokedex-container');

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

    // Adiciona o cartão à seção da Pokedex
    pokemonContainer.appendChild(pokemonCard);
}

// Buscar os primeiros 9 Pokémons
for (let i = 1; i <= 9; i++) {
    fetchPokemonData(i).then(createPokemonCard);
}

