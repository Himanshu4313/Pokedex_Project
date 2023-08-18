import { Link, useParams } from "react-router-dom";
import "./PokemonDetails.css";
import axios from "axios";
import { useEffect, useState } from "react";
function PokemonDetails() {
  const { id } = useParams();
  console.log(id);
  //Advance useState for use
  const [pokemonDetailsState, setPokemonDetailsState] = useState({
    pokemonDetails: {},
    isLoading: true,
  });

  // URL for pokemon
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
  return (
    <>
      <Link to={"/"}>
        <h1>Pokedex</h1>
      </Link>
      {pokemonDetailsState.isLoading ? (
        <h3 className="loading-details">Loading_Details....</h3>
      ) : (
        <div className="pokemonDetails-container">
          <div className="Image">
            <img
              src={pokemonDetailsState.pokemonDetails.image}
              alt="PokemonImage"
            />
          </div>
          <p className="forname">
            {" "}
            Name: {pokemonDetailsState.pokemonDetails.name}
          </p>
          <p className="forheight">
            Height: {pokemonDetailsState.pokemonDetails.height}
          </p>
          <p className="forweight">
            Weight: {pokemonDetailsState.pokemonDetails.weight}
          </p>
          <div className="type">
            Types:{" "}
            {pokemonDetailsState.pokemonDetails.types &&
              pokemonDetailsState.pokemonDetails.types.map((t) => (
                <div key={t.url}>{t.name}</div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonDetails;
