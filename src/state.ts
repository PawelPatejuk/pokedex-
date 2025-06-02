import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export type CLICommand = {
	name: string,
	description: string,
	callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
	readline: Interface,
	commands: Record<string, CLICommand>,
	api: PokeAPI,
	nextLocationsURL: string,
	prevLocationsURL: string,
	pokedex: Record<string, Pokemon>,
};

function getCommands(): Record<string, CLICommand> {
	return {
		exit: {
			name: "exit",
			description: "Exits the pokedex",
			callback: commandExit,
		},
		help: {
			name: "help",
			description: "Displays a help message",
			callback: commandHelp,
		},
		map: {
			name: "map",
			description: "Displays 20 results",
			callback: commandMap,
		},
		mapb: {
			name: "mapb",
			description: "Displays previous 20 results",
			callback: commandMapb,
		},
		explore: {
			name: "explore",
			description: "Explores location-area",
			callback: commandExplore,
		},
		catch: {
			name: "catch",
			description: "Catch pokemon",
			callback: commandCatch,
		},
		inspect: {
			name: "inspect",
			description: "Inspect pokemon",
			callback: commandInspect,
		},
		pokedex: {
			name: "pokedex",
			description: "Display caught pokemons",
			callback: commandPokedex,
		},
		// other commands
	};
};

export function initState(): State {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "Pokedex > "
	});	

	return {
		readline: rl,
		commands: getCommands(),
		api: new PokeAPI,
		nextLocationsURL: "",
		prevLocationsURL: "",
		pokedex: {}
	};	
};
