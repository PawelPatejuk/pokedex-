import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    console.log(`Throwing a Pokeball at ${args[0]}...`);
    const pokemon = await state.api.fetchPokemon(args[0]);
    if (Math.random() < 1 / (1 + Math.exp((pokemon.base_experience - 100) / 20))) {
        console.log(`${args[0]} was caught!`);
        console.log("You may now inspect it with the inspect command.");
        state.pokedex[args[0]] = pokemon;
    } else {
        console.log(`${args[0]} escaped!`);
    }
};
