export async function commandPokedex(state) {
    const pokedex = state.pokedex;
    if (Object.keys(pokedex).length) {
        console.log("Your Pokedex:");
        for (const pokemonName of Object.keys(pokedex)) {
            console.log(` - ${pokemonName}`);
        }
    }
    else {
        console.log("Your Pokedex is empty.");
    }
}
;
