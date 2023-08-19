import { useState } from "react";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import "./Pokedex.css";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
function Pokedex() {
  const [searchTerms , setSearchTerms] = useState('');
  return (
    <>
      <div className="pokedex-wrapper">
        <h1>Pokedex</h1>
        <Search  updateSearchTerm={setSearchTerms}/>
        
      </div>
      {(!searchTerms) ? <PokemonList/> : <PokemonDetails key = {searchTerms} pokemonName={searchTerms}/>}
      
    </>
  );
}
export default Pokedex;
