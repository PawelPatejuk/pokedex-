import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
	return input.trim().split(" ").filter(i => i);
}

export async function startREPL(state: State) {
	const rl = state.readline;
	const commands = state.commands;

	rl.prompt();

	rl.on("line", async (input: string) => {
		const words = cleanInput(input);
		if (words.length) {
			const command = words[0].toLowerCase();
			if (command in commands) {
				await commands[command].callback(state, ...words.slice(1));
			} else {
				console.log("Unknown command");
			}
		}
		rl.prompt();
	});
}

