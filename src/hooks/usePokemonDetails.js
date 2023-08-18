import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function usePokemonDetails(){
    const { id } = useParams();
    console.log(id);
    const [pokemonDetailsState, setPokemonDetailsState] = useState({
        pokemonDetails: {},
        isLoading: true,
      });
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;

  async function singlePokemonDetailsDownload() {
    try {
      setPokemonDetailsState({ ...pokemonDetailsState, isLoading: true });
      const responseDetails = await axios.get(pokemonUrl);
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
  },[])

  return [pokemonDetailsState];
}
export default usePokemonDetails;