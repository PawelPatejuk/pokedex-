import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
	const s = initState();
	startREPL(s);
}

main();
