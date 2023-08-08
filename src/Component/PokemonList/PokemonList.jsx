import { useEffect } from "react";
import "./PokemonList.css";
import axios from "axios";
import { useState } from "react";
import PokemonPrint from "../PokemonPrint/PokemonPrint";
function PokemonList() {
  //state variable
  // This pokemonList variable store list of pokemon
  const [pokemonList, setPokemonList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // URL for get details about all pokemon
  const [POKEMON_URL , setPOLEMON_URL] = useState("https://pokeapi.co/api/v2/pokemon");


   const [prevUrl , setPrevUrl] = useState('');
   const [nextUrl , setNextUrl] = useState('');
  async function downloadPokemon() {
      setIsLoading(true);
    const response = await axios.get(POKEMON_URL);
    // console respone
    console.log(response);
         
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);
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
    setPokemonList(res);
    setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemon();
  }, [POKEMON_URL]);

  return (
    <>
      <div className="PokemonList-wrapper">
        <div id="pokemonList">PokemonList</div>
        <div className="Loading">
          {isLoading
            ? "Loading....."
            : pokemonList.map((p) => (
                <PokemonPrint name={p.name} Image={p.image} key={p.id} />
              ))}
        </div>
      </div>
      <div className="button">
        <button className="prevbtn" disabled={prevUrl == null} onClick={() => setPOLEMON_URL(prevUrl)}>Prev</button>
         <button className="nextbtn" disabled={nextUrl == null} onClick={() => setPOLEMON_URL(nextUrl)}>Next</button>
      </div>
    </>
  );
}

export default PokemonList;
 