export function cleanInput(input) {
    return input.trim().split(" ").filter(i => i);
}
export async function startREPL(state) {
    const rl = state.readline;
    const commands = state.commands;
    rl.prompt();
    rl.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length) {
            const command = words[0].toLowerCase();
            if (command in commands) {
                await commands[command].callback(state, ...words.slice(1));
            }
            else {
                console.log("Unknown command");
            }
        }
        rl.prompt();
    });
}
