export async function commandMap(state) {
    const locations = state.nextLocationsURL ? await state.api.fetchLocations(state.nextLocationsURL) : await state.api.fetchLocations();
    for (const location of locations.results) {
        console.log(location.name);
    }
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
}
;
