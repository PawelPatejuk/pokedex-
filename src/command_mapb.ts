import type { State } from "./state.js";

export async function commandMapb(state: State): Promise<void> {
    if (state.prevLocationsURL === "") {
        console.log("you're on first page");
        return;
    }
    const locations = await state.api.fetchLocations(state.prevLocationsURL);
    for (const location of locations.results) {
        console.log(location.name);
    }
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
};
