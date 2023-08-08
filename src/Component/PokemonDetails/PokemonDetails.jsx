import { Link, useParams } from "react-router-dom";
import "./PokemonDetails.css";
import axios from "axios";
import { useEffect, useState } from "react";
function PokemonDetails() {
    const {id} = useParams();
    console.log(id);
    const [pokemondetails, setPokemondetails] = useState({});
    // URL for pokemon 
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    async function singlePokemonDetailsDownload(){
        const responseDetails = await axios.get(pokemonUrl);
        console.log(responseDetails);

        const details = {
            image : (responseDetails.data.sprites.other) ? responseDetails.data.sprites.other.dream_world.front_default : responseDetails.data.sprites.front_default,
            name : responseDetails.data.name,
            height: responseDetails.data.height,
            weight : responseDetails.data.weight,
            types : responseDetails.data.types.map((p) => p.type.name ),
        }
        setPokemondetails(details);
    }

    // UseEffect

    useEffect( () => {
        singlePokemonDetailsDownload();
    },[])
  return (
    <>
      <Link to={'/'}>
        <h1>Pokedex</h1>
      </Link>
        <div className="pokemonDetails-container">
            <div className="Image">
                <img src={pokemondetails.image} alt="PokemonImage" />
            </div>
             <p className="forname"> Name: {pokemondetails.name}</p>
             <p className="forheight">Height: {pokemondetails.height}</p>
             <p className="forweight">Weight: {pokemondetails.weight}</p>
             <div className="type">
          Types: {  (pokemondetails.types) && pokemondetails.types.map((t) => <div>{t}</div> )}
              </div>
        </div>
    </>
  );
}

export default PokemonDetails;
