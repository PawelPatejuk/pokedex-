import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2/";
    cache = new Cache(60000);
    constructor() { }
    async fetchLocations(pageURL) {
        const fullURL = `${pageURL ? pageURL : PokeAPI.baseURL + "/location-area"}`;
        const c = this.cache.get(fullURL);
        if (c) {
            return c.val;
        }
        const response = await fetch(fullURL, {
            method: "GET"
        });
        const r = await response.json();
        this.cache.add(fullURL, r);
        return r;
    }
    async fetchLocation(locationName) {
        const fullURL = PokeAPI.baseURL + "/location-area/" + locationName;
        const c = this.cache.get(fullURL);
        if (c) {
            return c.val;
        }
        const response = await fetch(fullURL, {
            method: "GET"
        });
        const r = await response.json();
        this.cache.add(fullURL, r);
        return r;
    }
    async fetchPokemon(pokemonName) {
        const fullURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        const c = this.cache.get(fullURL);
        if (c) {
            return c.val;
        }
        const response = await fetch(fullURL, {
            method: "GET"
        });
        const r = await response.json();
        this.cache.add(fullURL, r);
        return r;
    }
}
