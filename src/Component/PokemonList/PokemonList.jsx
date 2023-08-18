import "./PokemonList.css";
import PokemonPrint from "../PokemonPrint/PokemonPrint";
import usePokemonList from "../../hooks/usePokemonList";
function PokemonList() {
  const [pokemonListState, setPokemonListState] = usePokemonList();
  return (
    <>
      <div className="PokemonList-wrapper">
        <div id="pokemonList">PokemonList</div>
        <div className="Loading">
          {pokemonListState.isLoading
            ? "Loading....."
            : pokemonListState.pokemonList.map((p, idex) => (
                <PokemonPrint
                  name={p.name}
                  Image={p.image}
                  id={p.id}
                  key={idex}
                />
              ))}
        </div>
      </div>
      <div className="button">
        <button
          className="prevbtn"
          disabled={pokemonListState.prevUrl == null}
          onClick={() => {
            setPokemonListState({
              ...pokemonListState,
              pokemonURL: pokemonListState.prevUrl,
            });
          }}
        >
          Prev
        </button>
        <button
          className="nextbtn"
          disabled={pokemonListState.nextUrl == null}
          onClick={() => {
            setPokemonListState({
              ...pokemonListState,
              pokemonURL: pokemonListState.nextUrl,
            });
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default PokemonList;
