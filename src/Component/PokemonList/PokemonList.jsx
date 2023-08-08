import { useEffect } from "react";
import "./PokemonList.css";
import axios from "axios";
import { useState } from "react";
import PokemonPrint from "../PokemonPrint/PokemonPrint";
function PokemonList() {
  //state variable
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon";
  async function downloadPokemon() {
    const response = await axios.get(POKEMON_URL);
    const pokemonResults = response.data.results; // take all result array of pokemon
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
    setPokemonList(res);
    setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <>
      <div className="PokemonList-wrapper">
        <div id="pokemonList">PokemonList</div>
        <div className="Loading">
          {isLoading
            ? "Loading....."
            : pokemonList.map((p) => (
                <PokemonPrint name={p.name} Image={p.image} key={p.id}/>
              ))}
        </div>
        
      </div>
      <div className="button">
          <button className="prevbtn">Prev</button>
          <button className="nextbtn">Next</button>
        </div>
    </>
  );
}

export default PokemonList;
