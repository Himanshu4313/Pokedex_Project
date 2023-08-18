import { Link,} from "react-router-dom";
import "./PokemonDetails.css";
import usePokemonDetails from "../../hooks/usePokemonDetails";
function PokemonDetails() {
  const [pokemonDetailsState] = usePokemonDetails();
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
