import axios from "axios";
import { useEffect, useState } from "react";


function usePokemonDetails(id, pokemonName) {
  const [pokemonDetailsState, setPokemonDetailsState] = useState({
    pokemonDetails: {},
    isLoading: true,
  });

  async function singlePokemonDetailsDownload() {
    try {
      let responseDetails;
      console.log("id=", id, "name=", pokemonName);
      if (pokemonName) {
        responseDetails = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
      } else {
        responseDetails = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
      }

      setPokemonDetailsState({ ...pokemonDetailsState, isLoading: true });

      console.log(responseDetails.data);

      const details = {
        image: responseDetails.data.sprites.other
          ? responseDetails.data.sprites.other.dream_world.front_default
          : responseDetails.data.sprites.front_default,
        name: responseDetails.data.name,
        height: responseDetails.data.height,
        weight: responseDetails.data.weight,
        types: responseDetails.data.types.map((p) => p.type),
      };
      setPokemonDetailsState({
        ...pokemonDetailsState,
        pokemonDetails: details,
        isLoading: false,
      });
    } catch (error) {
      console.error(
        "Something went wrong Please try again or check your Internet",
        error
      );
    }
  }
  // UseEffect

  useEffect(() => {
    singlePokemonDetailsDownload();
  }, []);

  return [pokemonDetailsState];
}
export default usePokemonDetails;
