import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2/";
    cache = new Cache(60000);

    constructor () {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
      const fullURL = `${pageURL ? pageURL : PokeAPI.baseURL + "/location-area"}`;
      const c = this.cache.get<ShallowLocations>(fullURL);
      if (c) {
        return c.val; 
      }
      const response = await fetch(fullURL, {
        method: "GET"
      })
      const r = await response.json();
      this.cache.add(fullURL, r);
      return r;
    }
    
    async fetchLocation(locationName: string): Promise<Root> {
      const fullURL = PokeAPI.baseURL + "/location-area/" + locationName;
      const c = this.cache.get<Root>(fullURL);
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
    
    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
      const fullURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
      const c = this.cache.get<Pokemon>(fullURL);
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

export type ShallowLocations = {
    count: number,
    next: string,
    previous: string,
    results: {
        name: string,
        url: string
    }[]
};

export interface Root {
  id: number
  name: string
  game_index: number
  encounter_method_rates: EncounterMethodRate[]
  location: Location
  names: Name[]
  pokemon_encounters: PokemonEncounter[]
}

export interface EncounterMethodRate {
  encounter_method: EncounterMethod
  version_details: VersionDetail[]
}

export interface EncounterMethod {
  name: string
  url: string
}

export interface VersionDetail {
  rate: number
  version: Version
}

export interface Version {
  name: string
  url: string
}

export interface Location {
  name: string
  url: string
}

export interface Name {
  name: string
  language: Language
}

export interface Language {
  name: string
  url: string
}

export interface PokemonEncounter {
  pokemon: Pokemon
  version_details: VersionDetail2[]
}

export interface Pokemon {
  name: string
  url: string
  base_experience: number
  weight: number
  height: number
  stats: Stat[]
  types: Type[]
}

export interface VersionDetail2 {
  version: Version2
  max_chance: number
  encounter_details: EncounterDetail[]
}

export interface Version2 {
  name: string
  url: string
}

export interface EncounterDetail {
  min_level: number
  max_level: number
  condition_values: any[]
  chance: number
  method: Method
}

export interface Method {
  name: string
  url: string
}

export interface Stat {
  base_stat: number
  effort: number
  stat: Stat2
}

export interface Stat2 {
  name: string
  url: string
}

export interface Type {
  slot: number
  type: Type2
}

export interface Type2 {
  name: string
  url: string
}
