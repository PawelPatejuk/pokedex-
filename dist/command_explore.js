export async function commandExplore(state, ...args) {
    console.log(`Exploring ${args[0]}...`);
    console.log("Found Pokemon:");
    const locations = await state.api.fetchLocation(args[0]);
    for (const pokemon of locations.pokemon_encounters) {
        console.log(` - ${pokemon.pokemon.name}`);
    }
}
;
