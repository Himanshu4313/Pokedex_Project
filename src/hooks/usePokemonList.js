import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokemonURL: "https://pokeapi.co/api/v2/pokemon",
    prevUrl: "",
    nextUrl: "",
  });
  async function downloadPokemon() {
    try {
      setPokemonListState((state) => ({
        ...state,
        isLoading: true,
      }));
      const response = await axios.get(pokemonListState.pokemonURL);
      // console respone
      console.log(response);

      setPokemonListState((state) => ({
        ...state,
        prevUrl: response.data.previous,
        nextUrl: response.data.next,
      }));
      // We print here responeData
      console.log(response.data);

      // take all result array of pokemon
      const pokemonResults = response.data.results;

      // We print pokemonresults and this pokemonResult we 20 array list of  pokemon.
      console.log(pokemonResults);
      const pokemonResultPromises = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );
      const pokemonData = await axios.all(pokemonResultPromises);
      const res = pokemonData.map((pokemonData) => {
        const pokemon = pokemonData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          type: pokemon.types,
          image: pokemon.sprites.other
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.front_default,
        };
      });
      console.log(res);

      setPokemonListState((state) => ({
        ...state,
        pokemonList: res,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Something went wrong", error);
    }
  }

  useEffect(() => {
    downloadPokemon();
  }, [pokemonListState.pokemonURL]);

  return [pokemonListState, setPokemonListState];
}
export default usePokemonList;
